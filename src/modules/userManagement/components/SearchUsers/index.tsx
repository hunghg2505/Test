import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const SearchUsers = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row justify='center' align='middle' className={styles.usersHeader}>
        <Form>
          <div className={styles.formSearchWrap}>
            <Row justify='center' align='middle' className={styles.searchForm}>
              <IconSearch />

              <InputForm
                name='keyword'
                placeholder='Search First Name'
                className={styles.inputSearch}
                classNameFormInput={styles.inputSearchForm}
                maxLength={55}
                rules={[
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
          </div>
        </Form>
      </Row>
    </>
  );
};

export default SearchUsers;
