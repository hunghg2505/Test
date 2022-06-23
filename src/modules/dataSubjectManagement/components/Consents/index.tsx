import { Checkbox, Collapse, Form, Pagination, Row } from 'antd';

import IconSearch from 'assets/icons/icon-search';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { useConsent } from './service';

const { Panel } = Collapse;

interface IItem {
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
}

export interface DataType {
  key: string;
  dataConsent: IItem;
  defaultValue: { [key: string]: string };
}

const ArrowDown = (
  <svg xmlns='http://www.w3.org/2000/svg' width={15} height={8} viewBox='0 0 15 8' fill='none'>
    <path
      d='M13.5 1L7.5 7L1.5 1'
      stroke='#BDBDBD'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ArrowUp = (
  <svg xmlns='http://www.w3.org/2000/svg' width={15} height={8} viewBox='0 0 15 8' fill='none'>
    <path
      d='M13.5 7L7.5 1L1.5 7'
      stroke='#092C4C'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const SearchBox = ({
  onSearchConsent,
}: {
  onSearchConsent: ({ search }: { search: string }) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Row className={styles.consentsSearch} align='middle'>
      <h3>{t('consent')}</h3>

      <Form onFinish={onSearchConsent}>
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
            suffixIcon={<IconSearch />}
          >
            {t('search')}
          </Button>
        </Row>
      </Form>

      <Button size='middle' className={styles.btnCreateCase} typeDisplay='ghost'>
        {t('create_case')}
      </Button>
    </Row>
  );
};

const ConsentOption = ({ value, onChange, dataConsent }: any) => {
  const onChangeValues = (checkedValues: any) => {
    onChange(checkedValues);
  };

  if (!dataConsent?.length) {
    return null;
  }

  return (
    <Checkbox.Group onChange={onChangeValues} defaultValue={value}>
      {dataConsent.map((item: any) => {
        return (
          <Checkbox key={item.value} value={item.value}>
            <h4>{item.title}</h4>
            <div>{item.description}</div>
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};

const ConsentsList = ({ data, loading, onChange, onSaveConsent, loadingUpdateConsent }: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();

  const onUpdateConsent = (value: any) => {
    onSaveConsent(value);
  };

  const initialValues = data?.data?.reduce(
    (acc: any, v: any) => ({ ...acc, [v?.key]: Object.keys(v?.defaultValue) }),
    {},
  );

  if (loading) return null;
  console.log(data?.data?.length === 0);

  return data?.data?.length === 0 ? (
    <p className={styles.noResultText}>{t('no_result_found')}</p>
  ) : (
    <div className={styles.consentWrap}>
      <Form
        className={styles.formConsent}
        onFinish={onUpdateConsent}
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
                return isActive ? ArrowUp : ArrowDown;
              }}
            >
              {data?.data?.map(({ dataConsent, key }: DataType) => {
                const content = (
                  <Panel
                    key={key}
                    header={
                      <div className={styles.panelHeader}>
                        <div className={styles.name}>{dataConsent.name}</div>
                        <Row align='middle'>
                          <div className={styles.lastUpdated}>{dataConsent.lastUpdated}</div>
                          <div className={styles.version}>{dataConsent.version}</div>
                          <div
                            className={`${styles.status} ${
                              dataConsent.status === 'Accepted' ? styles.active : ''
                            }`}
                          >
                            {dataConsent.status}
                          </div>
                        </Row>
                        <div className={styles.description}>{dataConsent.description}</div>
                      </div>
                    }
                  >
                    <Form.Item className={styles.panelContent} name={`${key}`}>
                      <ConsentOption dataConsent={dataConsent?.list} />
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

        <Button htmlType='submit' className={styles.btnSave} loading={loadingUpdateConsent}>
          {t('save')}
        </Button>
      </Form>
    </div>
  );
};

function Consents({ userId }: { userId: number }) {
  const { data, loading, onChange, onSearchConsent, onSaveConsent, loadingUpdateConsent } =
    useConsent({ userId });

  const onSearch = ({ search }: { search: string }) => {
    onSearchConsent(search);
  };

  return (
    <div className={styles.consentsWrap}>
      <SearchBox onSearchConsent={onSearch} />

      <ConsentsList
        data={data}
        loading={loading}
        onChange={onChange}
        onSaveConsent={onSaveConsent}
        loadingUpdateConsent={loadingUpdateConsent}
      />
    </div>
  );
}

export default Consents;
