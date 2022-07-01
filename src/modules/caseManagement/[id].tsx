import ContainerLayout from 'libraries/layouts/container.layout';
import ConsentList from './components/ConsentList';
import UserInfo from '../../libraries/components/UserInfo';
import ActivityLog from './components/ActivityLog';

import styles from './index.module.scss';
import CreateCaseForm from './components/CreateCaseForm';

function CaseManagementDetail() {
  return (
    <ContainerLayout title='Case Management Detail'>
      <div className={styles.wrap}>
        <UserInfo />
        <ActivityLog />
        <ConsentList />
        <CreateCaseForm />
      </div>
    </ContainerLayout>
  );
}

export default CaseManagementDetail;
