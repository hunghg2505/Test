import React, { useRef } from 'react';
import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import AdvancedSearch from './components/AdvanceSearch';
import InputForm from 'libraries/form/input/input-form';

const ConnectionConfiguration = () => {
  const { t } = useTranslation();
  const refFormSearch: any = useRef();

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

          <Button typeDisplay='ghost' className={styles.btnCreate}>
            Create Company
          </Button>
        </Row>
      </div>
    </ContainerLayout>
  );
};

export default ConnectionConfiguration;
