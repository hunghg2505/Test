import { useClickAway } from 'ahooks';
import { Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const SearchUsers = ({
  onSearchUserPermissions,
  onResetUsers,
  onLoadMoreUsers,
  onSearchUserSuggestionDebounce,

  reqSearchUserSuggestion,
  users,
}: any) => {
  const { t } = useTranslation();
  const refListUsers: any = useRef();
  const refForm: any = useRef();

  useClickAway(() => {
    if (refListUsers.current?.closeListUser) {
      refListUsers.current.closeListUser();
      onResetUsers();
    }
  }, refForm);

  const onFinish = (values: any) => {
    onSearchUserPermissions({ ...values, type: 'enter' }, () => {
      if (refListUsers.current?.closeListUser) {
        refListUsers.current.closeListUser();
        onResetUsers();
      }
    });
  };

  const onFieldsChange = (values: any) => {
    if (values[0]?.value.length === 0) refListUsers.current.closeListUser();
    onSearchUserSuggestionDebounce(values, () => {
      if (refListUsers.current?.openListUser) refListUsers.current.openListUser();
    });
  };

  return (
    <>
      <Row justify='center' align='middle' className={styles.usersHeader}>
        <Form onFinish={onFinish} onFieldsChange={onFieldsChange}>
          <div ref={refForm} className={styles.formSearchWrap}>
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
              <SuggestListUsers
                data={reqSearchUserSuggestion.data}
                loading={reqSearchUserSuggestion.loading}
                onSearchDataSubject={(item: any) => {
                  onSearchUserPermissions({
                    keyword: item?.firstname,
                  });
                }}
                ref={refListUsers}
                users={users}
                onLoadMoreUsers={onLoadMoreUsers}
                onResetUsers={onResetUsers}
              />
            </Row>
          </div>
        </Form>
      </Row>
    </>
  );
};

export default SearchUsers;
