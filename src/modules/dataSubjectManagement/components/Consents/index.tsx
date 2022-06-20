import { Checkbox, Collapse, Form, Pagination, Row } from 'antd';

import IconSearch from 'assets/icons/icon-search';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { useConsent } from './service';

const { Panel } = Collapse;

const SearchBox = ({
  onSearchConsent
}: {
  onSearchConsent: ({ search }: { search: string }) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Row className={styles.consentsSearch} align="middle">
      <h3>Consent</h3>

      <Form onFinish={onSearchConsent}>
        <Row align="middle" className={styles.searchBox}>
          <Row align="middle" className={styles.searchContent}>
            <IconSearch />
            <Form.Item name="search">
              <Input placeholder="Search" />
            </Form.Item>
          </Row>
          <Button
            htmlType="submit"
            size="middle"
            className={styles.btnSearch}
            suffixIcon={<IconSearch />}>
            {t('search')}
          </Button>
        </Row>
      </Form>

      <Button size="middle" className={styles.btnCreateCase} typeDisplay="ghost">
        {t('create_case')}
      </Button>
    </Row>
  );
};

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
}

const ArrowDown = (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={8} viewBox="0 0 15 8" fill="none">
    <path
      d="M13.5 1L7.5 7L1.5 1"
      stroke="#BDBDBD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUp = (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={8} viewBox="0 0 15 8" fill="none">
    <path
      d="M13.5 7L7.5 1L1.5 7"
      stroke="#092C4C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ConsentOption = ({ value, onChange, dataConsent }: any) => {
  const onChangeConsent = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
    onChange(checkedValues);
  };

  if (!dataConsent?.length) {
    return null;
  }

  return (
    <Checkbox.Group onChange={onChangeConsent} defaultValue={['personalised-marketing-0']}>
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

const ConsentsList = () => {
  const { data, loading, onChange } = useConsent();

  const onUpdateConsent = (value: any) => {
    console.log(value);
  };

  if (loading || !data) return null;

  return (
    <div className={styles.consentWrap}>
      <Form className={styles.formConsent} onFinish={onUpdateConsent}>
        <div className={styles.listConsent}>
          <Collapse
            accordion
            expandIcon={({ isActive }) => {
              return isActive ? ArrowUp : ArrowDown;
            }}>
            {data?.data?.map(({ dataConsent, key }: DataType) => {
              const content = (
                <Panel
                  key={key}
                  header={
                    <div className={styles.panelHeader}>
                      <div className={styles.name}>{dataConsent.name}</div>
                      <Row align="middle">
                        <div className={styles.lastUpdated}>{dataConsent.lastUpdated}</div>
                        <div className={styles.version}>{dataConsent.version}</div>
                        <div
                          className={`${styles.status} ${
                            dataConsent.status === 'Accepted' ? styles.active : ''
                          }`}>
                          {dataConsent.status}
                        </div>
                      </Row>
                      <div className={styles.description}>{dataConsent.description}</div>
                    </div>
                  }>
                  <Form.Item className={styles.panelContent} name={`FormItem_${key}`}>
                    <ConsentOption dataConsent={dataConsent?.list} />
                  </Form.Item>
                </Panel>
              );
              return content;
            })}
          </Collapse>
          <Row justify="space-between">
            <Pagination
              className={styles.pagination}
              current={data?.current}
              onChange={onChange}
              total={data?.list?.length}
              defaultPageSize={6}
              itemRender={paginationItemRender}
            />
          </Row>
        </div>

        <Button htmlType="submit" className={styles.btnSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

function Consents() {
  const onSearchConsent = ({ search }: { search: string }) => {
    console.log(search);
  };

  return (
    <div className={styles.consentsWrap}>
      <SearchBox onSearchConsent={onSearchConsent} />

      <ConsentsList />
    </div>
  );
}

export default Consents;
