import ContainerLayout from 'libraries/layouts/container.layout';
import ConsentList from './components/ConsentList';
import UserInfo from '../../libraries/components/UserInfo';
import ActivityLog from './components/ActivityLog';

import styles from './index.module.scss';
import CreateCaseForm from './components/CreateCaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCaseDetail } from './services';
import { useRef } from 'react';

function CaseManagementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, refresh } = useCaseDetail(id);
  const refActivityLog: any = useRef(null);

  if (!id) {
    navigate('/case-management');
    return null;
  }
  return (
    <ContainerLayout title='Case Management Detail'>
      <div className={styles.wrap}>
        <UserInfo userInfo={data?.userProfile} />
        <ActivityLog caseId={Number(id)} ref={refActivityLog} />
        <ConsentList />
        <CreateCaseForm
          data={data}
          loading={loading}
          refActivityLog={refActivityLog}
          refreshDataCaseDetail={refresh}
        />
      </div>
    </ContainerLayout>
  );
}

export default CaseManagementDetail;
