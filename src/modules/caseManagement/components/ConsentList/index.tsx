import { Checkbox, Collapse, Form, Pagination, Row } from 'antd';

import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { useConsentList } from './service';

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

const ConsentOption = ({ value, onChange, dataConsent }: any) => {
  const onChangeValues = (checkedValues: any) => {
    onChange(checkedValues);
  };

  if (!dataConsent?.length) {
    return null;
  }

  return (
    <Checkbox.Group onChange={onChangeValues} defaultValue={value} disabled>
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

const Consents = ({ data, loading, onChange }: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();

  if (loading) return null;

  return data?.data?.length === 0 ? (
    <p className={styles.noResultText}>{t('no_result_found')}</p>
  ) : (
    <div className={styles.consentWrap}>
      <Form
        className={styles.formConsent}
        // onFinish={onUpdateConsent}
        form={formConsent}
      >
        {data?.data?.length === 0 ? (
          <p className={styles.noResultText}>{t('no_result_found')}</p>
        ) : (
          <div className={styles.listConsent}>
            <Collapse
              expandIcon={({ isActive }) => {
                return isActive ? ArrowUpCollapse : ArrowDownCollapse;
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

        {/* <Button htmlType='submit' className={styles.btnSave}>
          {t('save')}
        </Button> */}
      </Form>
    </div>
  );
};

function ConsentList() {
  const { data, loading, onChange } = useConsentList();

  return (
    <div className={styles.consentsWrap}>
      <h2>Consent</h2>
      <Consents data={data} loading={loading} onChange={onChange} />
    </div>
  );
}

export default ConsentList;
