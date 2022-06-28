import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import ConsentList from './components/ConsentList';
import UserInfo from './components/UserInfo';

import styles from './index.module.scss';

function CaseManagementDetail() {
  return (
    <ContainerLayout title='Case Management Detail'>
      <div className={styles.wrap}>
        <UserInfo />
        <ConsentList />
      </div>
    </ContainerLayout>
  );
}

export default CaseManagementDetail;
