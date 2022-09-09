import ContainerLayout from 'libraries/layouts/ContainerLayout';
import ActivityLog from './components/ActivityLog';
import ConsentList from './components/ConsentList';
import UserInfo from './components/UserInfo';

import { Row } from 'antd';
import useConsentManagementPermission from 'hooks/useConsentManagementPermission';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import Button from 'libraries/UI/Button';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateCaseForm from './components/CreateCaseForm';
import styles from './index.module.scss';
import { useCaseDetail } from './services';

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

  const query = data?.application ? `?application=${data?.application}` : '';

  return (
    <ContainerLayout title='Case Management Detail'>
      {data?.userProfile && (
        <div className={styles.wrap}>
          {isHavePermissionViewDSM && (
            <Row justify='end'>
              <Button
                onClick={() =>
                  navigate(`/data-subject/${data?.businessProfileId}/${data?.idNo}${query}`)
                }
              >
                View DSM Detail
              </Button>
            </Row>
          )}

          <UserInfo userInfo={data?.userProfile} />
          {isHavePermissionViewConsent && data?.application && (
            <ConsentList userId={data?.businessProfileId} application={data?.application} />
          )}
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
