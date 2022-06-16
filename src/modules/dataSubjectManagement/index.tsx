import { Col, Dropdown, Form, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { useDataSubjectManagement } from './utils/service';

import { LoadingOutlined } from '@ant-design/icons';
import { useClickAway } from 'ahooks';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import Select from 'libraries/UI/Select';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.scss';
import { t } from 'i18next';

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
            <InputForm label="First Name" name="firstname" placeholder="First Name" />
          </Col>
          <Col xs={24}>
            <InputForm label="Last Name" name="lastNameEn" placeholder="Last Name" />
          </Col>

          <Col xs={24}>
            <InputForm label="Company" name="company" placeholder="Company" />
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
            <InputForm label="Mobile number" name="mobile" placeholder="Mobile number" />
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

const ListUsers = forwardRef(({ data, loading, onSearchDataSubject }: any, ref: any) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      closeListUser: () => setDropdownVisible(false),
      openListUser: () => setDropdownVisible(true)
    };
  });

  const onSelect = (item: any) => () => {
    onSearchDataSubject({
      firstname: item.name
    });
    setDropdownVisible(false);
  };

  if (!dropdownVisible || (!loading && !data)) return null;

  return (
    <ul className={styles.listUsers}>
      {loading ? (
        <div className={styles.loadingUser}>
          <LoadingOutlined />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <p className={styles.noResultText}>{t('no_result_found')}</p>
          ) : (
            data.map((item: any) => {
              return (
                <li onMouseDown={onSelect(item)} key={item.id}>
                  {item.name}
                </li>
              );
            })
          )}
        </>
      )}
    </ul>
  );
});

function DataSubjectManagement() {
  const { t } = useTranslation();

  const {
    data,
    loading,
    onChange,
    onSearchDataSubject,
    requestSearchUsers,
    onSearchUsersDebounce
  } = useDataSubjectManagement();
  const [formSearch]: any = Form.useForm();

  const refForm: any = useRef();
  const refListUsers: any = useRef();

  useClickAway(() => {
    if (refListUsers.current?.closeListUser) refListUsers.current.closeListUser();
  }, refForm);

  const onFinish = (values: any) => {
    onSearchDataSubject(values, () => {
      if (refListUsers.current?.closeListUser) refListUsers.current.closeListUser();
    });
  };

  const onFieldsChange = (values: any) => {
    onSearchUsersDebounce(values, () => {
      if (refListUsers.current?.openListUser) refListUsers.current.openListUser();
    });
  };

  return (
    <ContainerLayout title="Data Subject Management">
      <div className={styles.dataSubjectPage}>
        <Row justify="center" align="middle" className={styles.dataSubjectHeader}>
          <Form onFinish={onFinish} onFieldsChange={onFieldsChange} form={formSearch}>
            <div ref={refForm} className={styles.formSearchWrap}>
              <Row justify="center" align="middle" className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name="username"
                  placeholder="Search username"
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

              <ListUsers
                data={requestSearchUsers.data}
                loading={requestSearchUsers.loading}
                onSearchDataSubject={onSearchDataSubject}
                ref={refListUsers}
              />
            </div>
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
          {data?.data?.length === 0 ? (
            <p className={styles.noResultText}>{t('no_result_found')}</p>
          ) : (
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
          )}
        </div>
      </div>
    </ContainerLayout>
  );
}

export default DataSubjectManagement;
