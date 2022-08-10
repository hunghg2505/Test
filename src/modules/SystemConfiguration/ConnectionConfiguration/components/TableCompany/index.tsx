import { Col, Form, Pagination, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import React, { useState } from 'react';

import styles from './index.module.scss';

const AppItem = ({ item }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  const onShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={styles.appInfo}>
      <Row
        onClick={onShowInfo}
        className={styles.appInfoName}
        align='middle'
        justify='space-between'
      >
        <span>{item?.name}</span>
        <span className={styles.arrow}>
          <IconArrowDown />
        </span>
      </Row>
      {showInfo && (
        <div className={styles.infoWrap}>
          <div>
            <div className={styles.label}>Link URL</div>
            <div className={styles.content}>{item?.info?.linkUrl}</div>
          </div>

          <div>
            <div className={styles.label}>Method</div>
            <div className={styles.content}>{item?.info?.method}</div>
          </div>

          <div>
            <div className={styles.label}>Parameters</div>
            <div className={styles.content}>{item?.info?.parameters}</div>
          </div>

          <div>
            <div className={styles.label}>Response</div>
            <div className={styles.content}>{item?.info?.response}</div>
          </div>

          <div>
            <div className={styles.label}>Key</div>
            <div className={styles.content}>{item?.info?.key}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationItem = ({ application }: any) => {
  const [showApp, setShowApp] = useState(false);

  const onShowApp = () => {
    setShowApp(!showApp);
  };

  return (
    <div>
      <div className={styles.table}>
        <Row align='middle' justify='space-between'>
          <div className={styles.appName}>{application?.applicationName}</div>
          <div>
            <span className={styles.btnDelete}>Delete</span>
            <span className={styles.btnEdit}>Edit</span>
            <span onClick={onShowApp} className={styles.arrow}>
              <IconArrowDown />
            </span>
          </div>
        </Row>

        {showApp && (
          <div>
            {application?.applicationList?.map((item: any) => {
              return <AppItem key={item?.id} item={item} />;
            })}
            <div className={styles.btnLoadMore}>Load More</div>
          </div>
        )}
      </div>
    </div>
  );
};

const AddNewApplications = () => {
  return (
    <div className={styles.formAddNew}>
      <Form>
        <h4>Add new Application</h4>
        <Row align='middle' justify='space-between' className={styles.divRow}>
          <InputForm className={styles.input} name='search' />
          <Button>Add</Button>
        </Row>
      </Form>
    </div>
  );
};

const Applications = ({ applications }: any) => {
  return (
    <div className={styles.applicationWrap}>
      <h4>Applications</h4>

      {applications?.map((application: any) => {
        return <ApplicationItem key={application?.id} application={application} />;
      })}

      <AddNewApplications />
    </div>
  );
};

const CompanyItem = ({ company }: any) => {
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Row className={styles.body}>
        <Col className={styles.companyName}>
          <span>{company?.name}</span>
          <span onClick={onVisible} className={styles.arrow}>
            <IconArrowDown />
          </span>
        </Col>
        <Col className={styles.companyCreatedDate}>{company?.createdDate}</Col>
        <Col className={styles.companyAction}>
          <span className={styles.btnDelete}>Delete</span>
          <span className={styles.btnEdit}>Edit</span>
        </Col>
      </Row>

      {visible && <Applications applications={company?.applications} />}
    </div>
  );
};

const TableCompany = ({ data, onChangePage }: any) => {
  return (
    <div className={styles.container}>
      <div>
        <Row className={styles.header}>
          <Col className={styles.companyName}>Company Name</Col>
          <Col className={styles.companyCreatedDate}>Created Date</Col>
          <Col className={styles.companyAction}>Action</Col>
        </Row>

        <div>
          {data?.data?.map((company: any) => {
            return <CompanyItem key={company?.id} company={company} />;
          })}
        </div>
      </div>

      <Row justify='end' className={styles.pagination}>
        <Pagination
          current={data?.current}
          onChange={onChangePage}
          total={data?.total}
          defaultPageSize={data?.pageSize}
          itemRender={paginationItemRender}
          showSizeChanger={false}
        />
      </Row>
    </div>
  );
};

export default TableCompany;
