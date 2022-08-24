import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import ContainerLayout from 'libraries/layouts/ContainerLayout';
import Button from 'libraries/UI/Button';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import InputForm from 'libraries/form/input/input-form';
import AdvancedSearch from './components/AdvanceSearch';
import styles from './index.module.scss';

import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import TableCompany from './components/TableCompany';
import { useCompanies } from './services';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import { useClickAway } from 'ahooks';
import FormCompany from './components/FormCompany';

const ConnectionConfiguration = () => {
  const { t } = useTranslation();
  const refFormSearch: any = useRef();
  const refListCompanies: any = useRef();

  const {
    data,
    onChangePage,
    onSearchCompany,
    onReloadCompanyData,
    companies,
    onResetCompaniesSuggestion,
    onLoadMoreCompanies,
    onSearchCompaniesDebounce,
    requestSearchCompaniesSuggestion,
  } = useCompanies();

  const { isHavePermissionCreateSystem } = useSystemConfigPermission();
  useClickAway(() => {
    if (refListCompanies.current?.closeListUser) {
      refListCompanies.current.closeListUser();
      onResetCompaniesSuggestion();
    }
  }, refFormSearch);

  const callbackSearch = () => {
    refListCompanies.current.closeListUser();
    onResetCompaniesSuggestion();
  };

  const onFinish = (values: any) => {
    onSearchCompany({ ...values, type: 'enter' }, callbackSearch);
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
                  onSearchCompany({ name: value?.firstname, type: 'enter' }, callbackSearch);
                }}
                ref={refListCompanies}
                users={companies}
                onLoadMoreUsers={() => onLoadMoreCompanies('name')}
                onResetUsers={onResetCompaniesSuggestion}
              />
            </div>
          </Form>

          <AdvancedSearch onSearchCompany={onSearchCompany} />

          {isHavePermissionCreateSystem && (
            <FormCompany onReloadCompanyData={onReloadCompanyData}>
              <Button typeDisplay='ghost' className={styles.btnCreate}>
                Create Company
              </Button>
            </FormCompany>
          )}
        </Row>
      </div>

      <TableCompany
        data={data}
        onChangePage={onChangePage}
        onReloadCompanyData={onReloadCompanyData}
      />
    </ContainerLayout>
  );
};

export default ConnectionConfiguration;
