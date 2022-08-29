import useConsentManagementPermission from 'hooks/useConsentManagementPermission';
import userProfilePermission from 'hooks/userProfilePermission';
import ContainerLayout from 'libraries/layouts/ContainerLayout';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Consents from './components/Consents';
import DataSubjectHistory from './components/DataSubjectHistory';

import UserProfile from './components/UserProfile';

function DataSubjectDetail() {
  // delete id when done, for testing
  const { businessProfileId, idNo } = useParams();
  const navigate = useNavigate();
  const refDataHistory: any = useRef(null);
  const { isHavePermissionViewConsent } = useConsentManagementPermission();
  const { isHavePermissionViewProfile } = userProfilePermission();

  if (!businessProfileId || !idNo) {
    navigate('/data-subject');
    return null;
  }

  return (
    <ContainerLayout title='Data Subject Detail'>
      {isHavePermissionViewProfile && (
        <UserProfile businessProfileId={businessProfileId} idNo={idNo} />
      )}
      {isHavePermissionViewConsent && (
        <Consents userId={Number(businessProfileId)} refDataHistory={refDataHistory} />
      )}
      <DataSubjectHistory
        userId={businessProfileId || ''}
        subjectId={businessProfileId || ''}
        ref={refDataHistory}
      />
    </ContainerLayout>
  );
}

export default DataSubjectDetail;
