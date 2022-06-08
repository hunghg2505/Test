import React from 'react';
import { Checkbox, Collapse, Form, Pagination, PaginationProps, Row } from 'antd';

import styles from './index.module.scss';
import Input from 'libraries/UI/Input';
import Button from 'libraries/UI/Button';
import { useConsent } from './service';
import { paginationItemRender } from 'libraries/UI/Pagination';

const { Panel } = Collapse;

const IconSearch = (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.1498 8.79955C14.1498 9.50214 14.0114 10.1979 13.7424 10.847C13.4736 11.4961 13.0795 12.0859 12.5827 12.5827C12.0859 13.0795 11.4961 13.4736 10.847 13.7425C10.1979 14.0114 9.50214 14.1498 8.79954 14.1498C8.09694 14.1498 7.40122 14.0114 6.7521 13.7425C6.10299 13.4736 5.51318 13.0795 5.01637 12.5827C4.51955 12.0859 4.12547 11.4961 3.85659 10.847C3.58771 10.1979 3.44933 9.50214 3.44933 8.79955C3.44933 7.38058 4.01301 6.01973 5.01637 5.01638C6.01973 4.01301 7.38057 3.44933 8.79954 3.44933C10.2185 3.44933 11.5793 4.01301 12.5827 5.01638C13.5861 6.01973 14.1498 7.38058 14.1498 8.79955ZM13.1748 14.4351C11.7414 15.5479 9.93779 16.0726 8.13112 15.9024C6.32445 15.7322 4.65056 14.8799 3.45022 13.5189C2.24987 12.1579 1.61332 10.3907 1.67013 8.57692C1.72694 6.76314 2.47286 5.03918 3.75602 3.75602C5.03919 2.47286 6.76313 1.72695 8.57691 1.67013C10.3907 1.61332 12.1579 2.24988 13.5189 3.45023C14.8799 4.65056 15.7322 6.32446 15.9024 8.13113C16.0726 9.93779 15.5479 11.7414 14.4351 13.1748L18.0495 16.7892C18.1371 16.8709 18.2074 16.9693 18.2561 17.0787C18.3049 17.1881 18.331 17.3061 18.3332 17.4259C18.3353 17.5456 18.3132 17.6645 18.2684 17.7755C18.2235 17.8866 18.1567 17.9874 18.0721 18.0721C17.9874 18.1568 17.8866 18.2235 17.7755 18.2684C17.6645 18.3132 17.5456 18.3353 17.4259 18.3332C17.3061 18.331 17.188 18.3049 17.0787 18.2561C16.9693 18.2074 16.8709 18.1371 16.7892 18.0495L13.1748 14.4351Z"
      fill="white"
    />
  </svg>
);

const SearchBox = ({
  onSearchConsent
}: {
  onSearchConsent: ({ search }: { search: string }) => void;
}) => {
  return (
    <Row className={styles.consentsSearch} align="middle">
      <h3>Consent</h3>

      <Form onFinish={onSearchConsent}>
        <Row align="middle" className={styles.searchBox}>
          <Row align="middle" className={styles.searchContent}>
            {IconSearch}
            <Form.Item name="search">
              <Input placeholder="Search" />
            </Form.Item>
          </Row>
          <Button
            htmlType="submit"
            size="middle"
            className={styles.btnSearch}
            suffixIcon={IconSearch}>
            Search
          </Button>
        </Row>
      </Form>

      <Button size="middle" className={styles.btnCreateCase} typeDisplay="ghost">
        Create Case
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
                    <Checkbox.Group>
                      {dataConsent?.list?.map((item: any) => {
                        return (
                          <Checkbox key={item.value} value={item.value}>
                            <h4>{item.title}</h4>
                            <div>{item.description}</div>
                          </Checkbox>
                        );
                      })}
                    </Checkbox.Group>
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
