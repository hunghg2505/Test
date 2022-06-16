import { Col, Dropdown, Form, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { RegexUtils } from 'utils/regex-helper';
import { useDataSubjectManagement } from './utils/service';

import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import Select from 'libraries/UI/Select';
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
      <Form
        onFinish={(values) => {
          onSearchDataSubject({
            advanceSearch: values
          });
        }}
        layout="vertical">
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <InputForm
              label="First Name"
              name="firstname"
              placeholder="First Name"
              // rules={[
              //   {
              //     required: true,
              //     message: t('messages.errors.require', { field: t('first_name') })
              //   }
              // ]}
            />
          </Col>
          <Col xs={24}>
            <InputForm
              label="Last Name"
              name="lastNameEn"
              placeholder="Last Name"
              // rules={[
              //   {
              //     required: true,
              //     message: t('messages.errors.require', { field: t('last_name') })
              //   }
              // ]}
            />
          </Col>

          <Col xs={24}>
            <InputForm
              label="Company"
              name="company"
              placeholder="Company"
              // rules={[
              //   {
              //     required: true,
              //     message: t('messages.errors.require', { field: t('company') })
              //   }
              // ]}
            />
          </Col>
          <Col xs={24}>
            <InputForm
              label="Email"
              name="email"
              placeholder="Email"
              rules={[
                {
                  min: 3,
                  message: t('messages.errors.min', { min: 3 })
                }
              ]}
            />
          </Col>

          <Col xs={24}>
            <InputForm
              label="Mobile number"
              name="mobile"
              placeholder="Mobile number"
              // rules={[
              //   {
              //     required: true,
              //     message: t('messages.errors.require', { field: t('mobile_number') })
              //   }
              // ]}
            />
          </Col>
          <Col xs={24}>
            <Form.Item label="Application" name="application">
              <Select placeholder="Please Select">
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="lucy1">Lucy1</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Button
          htmlType="submit"
          type="secondary"
          className={styles.btnSearchAdvancedDd}
          icon={<IconSearch />}>
          {t('Search')}
        </Button>
      </Form>
    </div>
  );
};

function DataSubjectManagement() {
  const { t } = useTranslation();
  const { data, loading, onChange, onSearchDataSubject } = useDataSubjectManagement();
  console.log(data?.data);

  return (
    <ContainerLayout title="Data Subject Management">
      <div className={styles.dataSubjectPage}>
        <Row justify="center" align="middle" className={styles.dataSubjectHeader}>
          <Form onFinish={onSearchDataSubject}>
            <Row justify="center" align="middle" className={styles.searchForm}>
              <IconSearch />

              <InputForm
                name="username"
                placeholder="Search Firstname"
                className={styles.inputSearch}
                classNameFormInput={styles.inputSearchForm}
              />

              <Button
                htmlType="submit"
                className={styles.btnSearch}
                type="secondary"
                icon={<IconSearch />}>
                {t('Search')}
              </Button>
            </Row>
          </Form>

          <Dropdown
            overlay={<SearchDataSubjectAdvanced onSearchDataSubject={onSearchDataSubject} t={t} />}
            trigger={['click']}>
            <Button typeDisplay="ghost" className={styles.btnSearchAdvanced} icon={<IconCross />}>
              {t('advanced')}
            </Button>
          </Dropdown>
        </Row>
        <div
          className={clsx(styles.dataSubjectContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length
          })}>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            loading={loading}
            pagination={{
              current: data?.current,
              total: data?.total,
              showSizeChanger: false,
              onChange,
              itemRender: paginationItemRender
            }}
          />
        </div>
      </div>
    </ContainerLayout>
  );
}

export default DataSubjectManagement;
