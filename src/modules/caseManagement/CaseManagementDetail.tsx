import ContainerLayout from 'libraries/layouts/ContainerLayout';
import ConsentList from './components/ConsentList';
import UserInfo from './components/UserInfo';
import ActivityLog from './components/ActivityLog';

import styles from './index.module.scss';
import CreateCaseForm from './components/CreateCaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCaseDetail } from './services';
import { useRef } from 'react';
import Button from 'libraries/UI/Button';
import { Row } from 'antd';
import useConsentManagementPermission from 'hooks/useConsentManagementPermission';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';

function CaseManagementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, refresh, deleteCaseRequest } = useCaseDetail(id);
  const refActivityLog: any = useRef(null);
  const { isHavePermissionViewConsent } = useConsentManagementPermission();
  const { isHavePermissionViewDSM } = useDataSubjectManagementPermission();

  if (!id) {
    navigate('/case-management');
    return null;
  }

  if (data?.redirect) {
    navigate('/');
    return null;
  }

  return (
    <ContainerLayout title='Case Management Detail'>
      {data?.userProfile && (
        <div className={styles.wrap}>
          {isHavePermissionViewDSM && (
            <Row justify='end'>
              <Button onClick={() => navigate(`/data-subject/${data?.userProfile?.id}`)}>
                View DSM Detail
              </Button>
            </Row>
          )}

          <UserInfo userInfo={data?.userProfile} />
          {isHavePermissionViewConsent && <ConsentList userId={data?.userProfile?.id} />}
          <CreateCaseForm
            data={data}
            loading={loading}
            refActivityLog={refActivityLog}
            refreshDataCaseDetail={refresh}
            deleteCaseRequest={deleteCaseRequest}
          />
          <ActivityLog caseId={Number(id)} ref={refActivityLog} />
        </div>
      )}
    </ContainerLayout>
  );
}

export default CaseManagementDetail;
