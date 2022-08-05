import useConsentManagementPermission from 'hooks/useConsentManagementPermission';
import userProfilePermission from 'hooks/userProfilePermission';
import ContainerLayout from 'libraries/layouts/container.layout';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Consents from './components/Consents';
import DataSubjectHistory from './components/DataSubjectHistory';

import UserProfile from './components/UserProfile';

function DataSubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refDataHistory: any = useRef(null);
  const { isHavePermissionViewConsent } = useConsentManagementPermission();
  const { isHavePermissionViewProfile } = userProfilePermission();

  if (!id) {
    navigate('/data-subject');
    return null;
  }

  return (
    <ContainerLayout title='Data Subject Detail'>
      {isHavePermissionViewProfile && <UserProfile id={id} />}
      {isHavePermissionViewConsent && (
        <Consents userId={Number(id)} refDataHistory={refDataHistory} />
      )}
      <DataSubjectHistory userId={id || ''} subjectId={id} ref={refDataHistory} />
    </ContainerLayout>
  );
}

export default DataSubjectDetail;
