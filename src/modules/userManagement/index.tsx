import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import AdminPermissions from './components/AdminPermissions';
import { useAdminPermissions } from './components/AdminPermissions/service';
import SearchUsers from './components/SearchUsers';

import styles from './index.module.scss';

const UserManagement = () => {
  // check role and show table tương ứng ở đây
  const { data, loading, onChangePage, onSearchUserPermissions } = useAdminPermissions();

  return (
    <ContainerLayout title='User Management'>
      <div className={styles.userWrap}>
        <SearchUsers onSearchUserPermissions={onSearchUserPermissions} />

        <AdminPermissions data={data} loading={loading} onChangePage={onChangePage} />
      </div>
    </ContainerLayout>
  );
};

export default UserManagement;
