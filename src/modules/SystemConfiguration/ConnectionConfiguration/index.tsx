import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InputForm from 'libraries/form/input/input-form';
import AdvancedSearch from './components/AdvanceSearch';
import CreateCompanyForm from './components/CreateCompanyForm';
import styles from './index.module.scss';

import { useClickAway } from 'ahooks';
import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import TableCompany from './components/TableCompany';
import { useCompanies } from './services';

const ConnectionConfiguration = () => {
  const { t } = useTranslation();
  const refFormSearch: any = useRef();
  const refListCompanies: any = useRef();

  const [isOpenCreateCompanyForm, setIsOpenCreateCompanyForm] = useState(false);

  const {
    data,
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

  const onFinishSubmitForm = () => {
    if (refListCompanies.current?.closeListUser) {
      refListCompanies.current.closeListUser();
      onResetCompaniesSuggestion();
    }
  };

  useClickAway(() => {
    onFinishSubmitForm();
  }, refFormSearch);

  const onFinish = (values: any) => {
    onSearchCompany({ ...values, type: 'enter' }, onFinishSubmitForm);
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
                  onSearchCompany({ name: value?.firstname, type: 'enter' }, onFinishSubmitForm);
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
