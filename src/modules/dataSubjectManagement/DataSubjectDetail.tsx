import useConsentManagementPermission from 'hooks/useConsentManagementPermission';
import userProfilePermission from 'hooks/userProfilePermission';
import ContainerLayout from 'libraries/layouts/ContainerLayout';
import { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Consents from './components/Consents';
import DataSubjectHistory from './components/DataSubjectHistory';

import UserProfile from './components/UserProfile';

function DataSubjectDetail() {
  // delete id when done, for testing
  const { businessProfileId, idNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const refDataHistory: any = useRef(null);
  const { isHavePermissionViewConsent } = useConsentManagementPermission();
  const { isHavePermissionViewProfile } = userProfilePermission();

  const application = location?.search?.split('=')?.[1];

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
        <Consents
          userId={businessProfileId}
          applicationName={application}
          refDataHistory={refDataHistory}
        />
      )}
      <DataSubjectHistory
        userId={businessProfileId || ''}
        applicationName={application}
        idNo={idNo}
        ref={refDataHistory}
      />
    </ContainerLayout>
  );
}

export default DataSubjectDetail;
