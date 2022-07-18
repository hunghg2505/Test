import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import clsx from 'clsx';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CaseManagementTable from '../components/CaseManagementTable';

import styles from './index.module.scss';
import SearchCaseAdvance from './SearchCaseAdvance';
import { useSearchCase } from './service';

function SearchCase() {
  const { t } = useTranslation();
  const refListUsers: any = useRef();
  const {
    data,
    loading,
    onChangePage,
    onSearchCaseSuggestion,
    reqSearchCaseSuggestion,
    onSearchCaseSuggestionDebounce,
    onSearchCaseList,
    onResetUsers,
    onLoadMoreUsers,
    users,
  } = useSearchCase();

  const onFinish = (values: any) => {
    onSearchCaseSuggestion({ ...values, type: 'enter' }, () => {
      if (refListUsers.current?.closeListUser) {
        refListUsers.current.closeListUser();
        onResetUsers();
      }
    });
  };

  const onFieldsChange = (values: any) => {
    if (values?.length < 3) refListUsers.current.closeListUser();
    onSearchCaseSuggestionDebounce(values, () => {
      if (refListUsers.current?.openListUser) refListUsers.current.openListUser();
    });
  };

  return (
    <ContainerLayout title='Assign To You'>
      <div className={styles.wrap}>
        <Row justify='center' align='middle' className={styles.searchCaseHeader}>
          <Form onFinish={onFinish} onFieldsChange={onFieldsChange}>
            <div className={styles.formSearchWrap}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='searchString'
                  placeholder='Search Case ID, Assign to'
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
                data={reqSearchCaseSuggestion.data}
                loading={reqSearchCaseSuggestion.loading}
                onSearchDataSubject={(v: any) => {
                  onSearchCaseList({
                    value: v?.firstname,
                    isEqualSearch: v?.isEqualSearch,
                  });
                }}
                ref={refListUsers}
                users={users}
                onLoadMoreUsers={onLoadMoreUsers}
                onResetUsers={onResetUsers}
              />
            </div>
          </Form>

          <SearchCaseAdvance onSearchDataSubject={(v: any) => onSearchCaseList(v)} t={t} />
        </Row>

        <div
          className={clsx(styles.searchCaseContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length,
          })}
        >
          <CaseManagementTable data={data} loading={loading} onChange={onChangePage} />
        </div>
      </div>
    </ContainerLayout>
  );
}

export default SearchCase;
