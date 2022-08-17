import { Form, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { useDataSubjectManagement } from './utils/service';

import { useClickAway } from 'ahooks';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useRef } from 'react';
import SearchUsersAdvance from './components/SearchUsersAdvance';
import SuggestListUsers from './components/SuggestListUsers';
import styles from './index.module.scss';

const MIN_SEARCH_USER = 3;

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
    width: 70,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: 216,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 216,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    width: 254,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 254,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 204,
  },
  {
    title: 'Application',
    dataIndex: 'application',
    key: 'application',
    width: 270,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <Row justify='center' align='middle' style={{ flexFlow: 'nowrap' }} className={styles.action}>
        <Link to={`/data-subject/${action}`}>Detail</Link>
      </Row>
    ),
    width: 105,
  },
];

function DataSubjectManagement() {
  const { t } = useTranslation();

  const {
    data,
    loading,
    onChange,
    onSearchDataSubject,
    requestSearchUsers,
    onSearchUsersDebounce,
    users,
    onResetUsers,
    onLoadMoreUsers,
  } = useDataSubjectManagement();
  const [formSearch]: any = Form.useForm();

  const refForm: any = useRef();
  const refListUsers: any = useRef();

  const onFinishSubmitForm = () => {
    if (refListUsers.current?.closeListUser) {
      refListUsers.current.closeListUser();
      onResetUsers();
    }
  };

  useClickAway(() => {
    onFinishSubmitForm();
  }, refForm);

  const onFinish = (values: any) => {
    onSearchDataSubject({ ...values, type: 'enter' }, onFinishSubmitForm);
  };

  const onFieldsChange = (values: any) => {
    if (values?.length < MIN_SEARCH_USER) refListUsers.current.closeListUser();
    onSearchUsersDebounce(
      values,
      () => {
        if (refListUsers.current?.openListUser) refListUsers.current.openListUser();
      },
      'firstNameEn',
    );
  };

  return (
    <ContainerLayout title='Data Subject Management'>
      <div className={styles.dataSubjectPage}>
        <Row justify='center' align='middle' className={styles.dataSubjectHeader}>
          <Form onFinish={onFinish} onFieldsChange={onFieldsChange} form={formSearch}>
            <div ref={refForm} className={styles.formSearchWrap}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='username'
                  placeholder='Search Firstname'
                  className={styles.inputSearch}
                  classNameFormInput={styles.inputSearchForm}
                  maxLength={55}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                    {
                      min: 3,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                    {
                      max: 55,
                      message: t('messages.errors.max_search_firstname', { max: 55 }),
                    },
                  ]}
                  onBlur={() => {
                    const username = formSearch.getFieldValue('username');

                    if (!username) {
                      formSearch.setFields([
                        {
                          name: 'username',
                          errors: [t('messages.errors.min', { min: 3 })],
                        },
                      ]);
                    }
                  }}
                />

                <Button
                  htmlType='submit'
                  className={styles.btnSearch}
                  type='secondary'
                  icon={<IconSearch />}
                >
                  {t('Search')}
                </Button>
              </Row>

              <SuggestListUsers
                data={requestSearchUsers.data}
                loading={requestSearchUsers.loading}
                onSearchDataSubject={onSearchDataSubject}
                ref={refListUsers}
                users={users}
                onLoadMoreUsers={() => onLoadMoreUsers('firstNameEn')}
                onResetUsers={onResetUsers}
              />
            </div>
          </Form>

          <SearchUsersAdvance onSearchDataSubject={onSearchDataSubject} t={t} />
        </Row>
        <div
          className={clsx(styles.dataSubjectContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length,
          })}
        >
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
                itemRender: paginationItemRender,
              }}
            />
          )}
        </div>
      </div>
    </ContainerLayout>
  );
}

export default DataSubjectManagement;
