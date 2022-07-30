import { Checkbox, Col, Collapse, Form, Pagination, Row } from 'antd';

import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';
import IconSearch from 'assets/icons/icon-search';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { useConsentList } from './service';

const { Panel } = Collapse;

export interface DataType {
  key: string;
  name: string;
  lastUpdated: string;
  version: string;
  status: string;
  description: string;
  list?: {
    title: string;
    description: string;
    value: string;
  }[];
  defaultValue: { [key: string]: string };
}

const ConsentOption = ({ value, onChange, dataConsent }: any) => {
  const onChangeValues = (checkedValues: any) => {
    onChange(checkedValues);
  };

  if (!dataConsent?.length) {
    return null;
  }

  return (
    <Checkbox.Group onChange={onChangeValues} defaultValue={value} disabled={true}>
      {dataConsent.map((item: any) => {
        return (
          <Checkbox key={item.value} value={item.value}>
            <h4>{item.title}</h4>
            <Row className={styles.consentInfo}>
              <Col>{item?.lastUpdated}</Col>
              <Col>{item?.version}</Col>
              <Col className={item?.status === 'Published' ? styles.active : ''}>
                {item?.status}
              </Col>
            </Row>
            <div>{item.description}</div>
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};

const Consents = ({ data, loading, onChange, onSearchConsent }: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();

  const initialValues = data?.data?.reduce((acc: any, v: any) => {
    acc[v?.name] = [];
    v?.list?.forEach((it: any) => {
      if (it?.selected) acc[v?.name].push(it?.value);
    });

    return acc;
  }, {});

  const onFinish = (values: any) => {
    const value = get(values, 'search', '');
    onSearchConsent(value);
  };

  if (loading) return null;

  return (
    <div className={styles.consentWrap}>
      <Row className={styles.consentsSearch} align='middle'>
        <Form onFinish={onFinish}>
          <div
            style={{
              position: 'relative',
            }}
          >
            <Row align='middle' className={styles.searchBox}>
              <Row align='middle' className={styles.searchContent}>
                <IconSearch />
                <Form.Item
                  name='search'
                  className={styles.formSearchItem}
                  rules={[
                    {
                      min: 3,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                    {
                      max: 55,
                      message: t('messages.errors.max_search_firstname', { max: 55 }),
                    },
                  ]}
                >
                  <Input placeholder='Search' maxLength={55} />
                </Form.Item>
              </Row>
              <Button
                htmlType='submit'
                size='middle'
                className={styles.btnSearch}
                icon={<IconSearch />}
                type='secondary'
              >
                {t('search')}
              </Button>
            </Row>
          </div>
        </Form>
      </Row>
      {!loading && !data?.data?.length ? (
        <p className={styles.noResultText}>{t('no_result_found')}</p>
      ) : (
        <Form
          className={styles.formConsent}
          // onFinish={onUpdateConsent}
          form={formConsent}
          initialValues={initialValues}
        >
          {data?.data?.length === 0 ? (
            <p className={styles.noResultText}>{t('no_result_found')}</p>
          ) : (
            <div className={styles.listConsent}>
              <Collapse
                // accordion
                expandIcon={({ isActive }) => {
                  return isActive ? ArrowUpCollapse : ArrowDownCollapse;
                }}
              >
                {data?.data?.map((it: DataType) => {
                  const content = (
                    <Panel
                      key={it?.key}
                      header={
                        <div className={styles.panelHeader}>
                          <div className={styles.name}>{it?.name}</div>
                          <div className={styles.description}>{it?.description}</div>
                        </div>
                      }
                    >
                      <Form.Item className={styles.panelContent} name={`${it?.key}`}>
                        <ConsentOption dataConsent={it?.list} />
                      </Form.Item>
                    </Panel>
                  );
                  return content;
                })}
              </Collapse>
              <Row justify='space-between'>
                <Pagination
                  className={styles.pagination}
                  current={data?.current}
                  onChange={onChange}
                  total={data?.total}
                  defaultPageSize={data?.pageSize}
                  itemRender={paginationItemRender}
                  showSizeChanger={false}
                />
              </Row>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

function ConsentList({ userId }: { userId: string | undefined }) {
  const { data, loading, onChange, onSearchConsent } = useConsentList({ userId: Number(userId) });

  return (
    <div className={styles.consentsWrap}>
      <h2>Consent</h2>
      <Consents
        data={data}
        loading={loading}
        onChange={onChange}
        onSearchConsent={onSearchConsent}
      />
    </div>
  );
}

export default ConsentList;
