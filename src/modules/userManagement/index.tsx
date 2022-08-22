import ContainerLayout from 'libraries/layouts/ContainerLayout';
import React from 'react';
import AdminPermissions from './components/AdminPermissions';
import { useAdminPermissions } from './components/AdminPermissions/service';
import SearchUsers from './components/SearchUsers';

import styles from './index.module.scss';

const UserManagement = () => {
  // check role and show table tương ứng ở đây
  const {
    data,
    loading,
    onChangePage,
    onSearchUserPermissions,
    onResetUsers,
    onLoadMoreUsers,
    onSearchUserSuggestionDebounce,

    users,
    reqSearchUserSuggestion,
  } = useAdminPermissions();

  return (
    <ContainerLayout title='User Management'>
      <div className={styles.userWrap}>
        <SearchUsers
          onSearchUserPermissions={onSearchUserPermissions}
          onResetUsers={onResetUsers}
          onLoadMoreUsers={onLoadMoreUsers}
          onSearchUserSuggestionDebounce={onSearchUserSuggestionDebounce}
          users={users}
          reqSearchUserSuggestion={reqSearchUserSuggestion}
        />

        <AdminPermissions data={data} loading={loading} onChangePage={onChangePage} />
      </div>
    </ContainerLayout>
  );
};

export default UserManagement;
