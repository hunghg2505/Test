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

const ConnectionConfiguration = () => {
  const { t } = useTranslation();
  const refFormSearch: any = useRef();

  const [isOpenCreateCompanyForm, setIsOpenCreateCompanyForm] = useState(false);

  const { companies, loading } = useCompanies();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <ContainerLayout title='Connection Configuration'>
      <div className={styles.wrap}>
        <Row justify='center' align='middle' className={styles.searchHeader}>
          <Form onFinish={onFinish}>
            <div className={styles.formSearchWrap} ref={refFormSearch}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='searchString'
                  placeholder='Search'
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
            </div>
          </Form>

          <AdvancedSearch />

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
      />

      <TableCompany companies={companies} />
    </ContainerLayout>
  );
};

export default ConnectionConfiguration;
