import React, { useRef, useState } from 'react';
import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import AdvancedSearch from './components/AdvanceSearch';
import InputForm from 'libraries/form/input/input-form';
import CreateCompanyForm from './components/CreateCompanyForm';

import { useCompanies } from './services';
import TableCompany from './components/TableCompany';
import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import { useClickAway } from 'ahooks';

const ConnectionConfiguration = () => {
  const { t } = useTranslation();
  const refFormSearch: any = useRef();
  const refListCompanies: any = useRef();

  const [isOpenCreateCompanyForm, setIsOpenCreateCompanyForm] = useState(false);

  const {
    data,
    loading,
    run,
    onChangePage,
    onSearchCompany,
    refresh,
    onReloadCompanyData,
    companies,
    onResetCompaniesSuggestion,
    onLoadMoreCompanies,
    onSearchCompaniesDebounce,
    requestSearchCompaniesSuggestion,
  } = useCompanies();

  useClickAway(() => {
    if (refListCompanies.current?.closeListUser) {
      refListCompanies.current.closeListUser();
      onResetCompaniesSuggestion();
    }
  }, refFormSearch);

  const onFinish = (values: any) => {
    onSearchCompany({ ...values, type: 'enter' }, () => {
      if (refListCompanies.current?.closeListUser) {
        refListCompanies.current.closeListUser();
        onResetCompaniesSuggestion();
      }
    });
  };

  const onFieldsChange = (values: any) => {
    if (values?.length < 3) refListCompanies.current.closeListUser();

    onSearchCompaniesDebounce(
      values?.[0]?.value,
      () => {
        if (refListCompanies.current?.openListUser) refListCompanies.current.openListUser();
      },
      'name',
    );
  };

  return (
    <ContainerLayout title='Connection Configuration'>
      <div className={styles.wrap}>
        <Row justify='center' align='middle' className={styles.searchHeader}>
          <Form onFinish={onFinish} onFieldsChange={onFieldsChange}>
            <div className={styles.formSearchWrap} ref={refFormSearch}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='name'
                  placeholder='Search Company'
                  className={styles.inputSearch}
                  classNameFormInput={styles.inputSearchForm}
                  maxLength={55}
                  rules={[
                    {
                      min: 3,
                      message: t('messages.errors.min', { min: 3 }),
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
                data={requestSearchCompaniesSuggestion.data}
                loading={requestSearchCompaniesSuggestion.loading}
                onSearchDataSubject={(value: any) => {
                  onSearchCompany({ name: value?.firstname, type: 'enter' }, () => {
                    if (refListCompanies.current?.closeListUser) {
                      refListCompanies.current.closeListUser();
                      onResetCompaniesSuggestion();
                    }
                  });
                }}
                ref={refListCompanies}
                users={companies}
                onLoadMoreUsers={() => onLoadMoreCompanies('name')}
                onResetUsers={onResetCompaniesSuggestion}
              />
            </div>
          </Form>

          <AdvancedSearch onSearchCompany={onSearchCompany} />

          <Button
            onClick={() => setIsOpenCreateCompanyForm(true)}
            typeDisplay='ghost'
            className={styles.btnCreate}
          >
            Create Company
          </Button>
        </Row>
      </div>

      <CreateCompanyForm
        visible={isOpenCreateCompanyForm}
        onClose={() => setIsOpenCreateCompanyForm(false)}
        onReloadCompanyData={onReloadCompanyData}
      />

      <TableCompany
        data={data}
        onChangePage={onChangePage}
        refresh={refresh}
        ononReloadCompanyData={onReloadCompanyData}
      />
    </ContainerLayout>
  );
};

export default ConnectionConfiguration;
