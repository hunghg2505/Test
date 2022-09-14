import { useUpdateEffect } from 'ahooks';
import { Checkbox, Col, Form, Pagination, Row } from 'antd';

import IconSearch from 'assets/icons/icon-search';
import clsx from 'clsx';
import Loading from 'libraries/components/loading';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import get from 'lodash/get';
import { useConsent } from 'modules/dataSubjectManagement/components/Consents/service';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export interface DataType {
  id: number;
  name: string;
  lastUpdated: string;
  version: string;
  status: string;
  description: string;
  selected: boolean;
  value: string;
  title: string;
}

const Consents = ({ data, loading, onChange, onSearchConsent }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useUpdateEffect(() => {
    const initialValues = data?.data?.reduce((acc: any, v: any) => {
      return {
        ...acc,
        [v?.id]: v?.selected,
      };
    }, {});
    form.setFieldsValue(initialValues);
  }, [data?.data]);

  const onFinish = (values: any) => {
    const value = get(values, 'search', '');
    onSearchConsent(value);
  };

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

      <Form form={form}>
        <div className={styles.formWrap}>
          {data?.data?.length === 0 ? (
            <p className={styles.noResultText}>{t('no_result_found')}</p>
          ) : (
            <div className={styles.listConsent}>
              {data?.data?.map((it: DataType) => {
                return (
                  <Row
                    key={it?.id}
                    className={styles.consentItem}
                    align='middle'
                    justify='space-between'
                  >
                    <Col flex='1'>
                      <p className={styles.name}>{it?.title}</p>
                      <Row className={styles.consentInfo} align='middle'>
                        <p>{it?.lastUpdated}</p>

                        <p>{it?.version}</p>

                        <p
                          className={clsx(styles.status, {
                            [styles.statusActive]: it?.status === 'Published',
                          })}
                        >
                          {it?.status}
                        </p>
                      </Row>
                      <p className={styles.description}>{it?.description}</p>
                    </Col>
                    <Col>
                      <Form.Item
                        className={styles.panelContent}
                        name={`${it?.id}`}
                        valuePropName='checked'
                      >
                        <Checkbox disabled={true} />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

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
          {loading && (
            <div className={styles.loading}>
              <Loading />
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

function ConsentList({ userId, application }: { userId: string | undefined; application?: any }) {
  const { data, loading, onChange, onSearchConsent } = useConsent({
    userId: `${userId}`,
    applicationName: application,
  });

  return (
    <div className={styles.consentsWrap}>
      <h2>{application}</h2>
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
