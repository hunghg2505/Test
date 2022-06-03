import { Col, Dropdown, Form, Row, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import CustomPagination from 'libraries/components/CustomPagination';
import ButtonForm from 'libraries/form/button/button-form';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import IconArrowDown from 'assets/icons/icon-arrow-down';

import { RegexUtils } from 'utils/regex-helper';
import { useDataSubjectManagement } from './utils/service';

import styles from './index.module.scss';

export interface DataType {
  key: string;
  noId: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  application: string;
  action: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'noId',
    key: 'noId',
    width: 70
  },
  {
    title: 'Username',
    // dataIndex: 'appId',
    // key: 'appId',
    width: 433,
    children: [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 216
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 216
      }
    ]
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    width: 254
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 254
  },
  {
    title: 'Mobile Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 204
  },
  {
    title: 'Application',
    dataIndex: 'application',
    key: 'application',
    width: 270
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <Row justify="center" align="middle" style={{ flexFlow: 'nowrap' }} className={styles.action}>
        <Link to={`/data-subject/${action}`}>Detail</Link>
      </Row>
    ),
    width: 105
  }
];

const SearchDataSubjectAdvanced = ({ onSearchDataSubject, t }: any) => {
  return (
    <div className={styles.formSearchAdvanced}>
      <h4>Advanced Search</h4>
      <Form onFinish={onSearchDataSubject} layout="vertical" autoComplete="off">
        <Row gutter={[26, 32]}>
          <Col md={12}>
            <InputForm
              label="First Name"
              name="first_name"
              placeholder="First Name"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('first_name') })
                }
              ]}
            />
          </Col>
          <Col md={12}>
            <InputForm
              label="Last Name"
              name="last_name"
              placeholder="Last Name"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('last_name') })
                }
              ]}
            />
          </Col>

          <Col md={12}>
            <InputForm
              label="Company"
              name="company"
              placeholder="Company"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('company') })
                }
              ]}
            />
          </Col>
          <Col md={12}>
            <InputForm
              label="Email"
              name="email"
              placeholder="Email"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('email') })
                },
                {
                  pattern: new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL),
                  message: `${t('messages.errors.email_invalid')}`
                }
              ]}
            />
          </Col>

          <Col md={12}>
            <InputForm
              label="Mobile number"
              name="mobile_number"
              placeholder="Mobile number"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('mobile_number') })
                }
              ]}
            />
          </Col>
          <Col md={12}>
            <Form.Item label="Application">
              <Select suffixIcon={<IconArrowDown />}>
                <Select.Option value="lucy">Lucy</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <ButtonForm
          title={t('Search')}
          htmlType="submit"
          buttonType="dark"
          borderRadius={5}
          className={styles.btnSearchAdvancedDd}
        />
      </Form>
    </div>
  );
};

function DataSubjectManagement() {
  const { t } = useTranslation();
  const { data, loading, onNext, onPrev, onSearchDataSubject } = useDataSubjectManagement();

  return (
    <ContainerLayout title="Data Subject Management">
      <div className={styles.dataSubjectPage}>
        <Row justify="center" align="middle" className={styles.dataSubjectHeader}>
          <Form onFinish={onSearchDataSubject}>
            <Row justify="center" align="middle" className={styles.searchForm}>
              <IconSearch />

              <InputForm
                name="search_username"
                placeholder="Search username"
                className={styles.inputSearch}
                classNameFormInput={styles.inputSearchForm}
              />

              <ButtonForm
                title={t('Search')}
                htmlType="submit"
                buttonType="dark"
                borderRadius={5}
                className={styles.btnSearch}
              />
            </Row>
          </Form>

          <Dropdown
            overlay={<SearchDataSubjectAdvanced onSearchDataSubject={onSearchDataSubject} t={t} />}
            trigger={['click']}>
            <div className={styles.btnSearchAdvanced}>
              <IconCross />
              <span>{t('advanced')}</span>
            </div>
          </Dropdown>
        </Row>
        <div
          className={clsx(styles.dataSubjectContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.list?.length
          })}>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            pagination={false}
            loading={loading}
          />

          {!loading && data?.data?.length ? (
            <CustomPagination
              current={data.current}
              totalPage={data.total}
              onNext={onNext}
              onPrev={onPrev}
            />
          ) : null}
        </div>
      </div>
    </ContainerLayout>
  );
}

export default DataSubjectManagement;
