import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import AdminPermissions from './components/AdminPermissions';
import SearchUsers from './components/SearchUsers';

import styles from './index.module.scss';

const UserManagement = () => {
  // check role and show table tương ứng ở đây
  return (
    <ContainerLayout title='User Management'>
      <div className={styles.userWrap}>
        <SearchUsers />

        <AdminPermissions />
      </div>
    </ContainerLayout>
  );
};

export default UserManagement;
