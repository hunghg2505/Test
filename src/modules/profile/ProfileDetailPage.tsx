import { useRequest, useUnmount } from 'ahooks';
import UserInfo from 'libraries/components/UserInfo';
import { ConsentsList } from 'modules/dataSubjectManagement/components/Consents';
import { useConsent } from 'modules/dataSubjectManagement/components/Consents/service';
import DataSubjectHistory from 'modules/dataSubjectManagement/components/DataSubjectHistory';
import { useNavigate, useParams } from 'react-router-dom';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

import styles from './index.module.scss';

const getDataById = (value: any, defaultVal = '') => {
  return value || defaultVal;
};

const Consents = ({ userId }: any) => {
  const { data, loading, onChange } = useConsent({ userId, onlyView: true });

  if (loading || !data) return null;

  return (
    <div className={styles.consentsWrap}>
      <h3>Consents</h3>
      <ConsentsList
        data={data}
        loading={loading}
        onChange={onChange}
        userId={data?.id || ''}
        onlyView={true}
      />
    </div>
  );
};

const ProfileDetailPage = () => {
  const { hash } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useRequest(async () => {
    localStorage.setItem('user_token_profile_public', `${hash}`);
    const r: any = await ApiUtils.fetch(
      API_PATH.GENERATE_LINK_DETAIL(hash || ''),
      {},
      {
        user_token_profile_public: hash,
      },
    );

    return {
      id: r?.content?.id,
      imageUrl: '',
      firstNameEn: getDataById(r?.content?.firstNameEn),
      lastNameEn: getDataById(r?.content?.lastNameEn),
      firstNameTh: getDataById(r?.content?.firstNameTh),
      lastNameTh: getDataById(r?.content?.lastNameTh),
      email: getDataById(r?.content?.email),
      address: 'Test Address',
      dateOfBirth: getDataById(r?.content?.dateOfBirth),
      nationality: getDataById(r?.content?.nationality),
      cardId: getDataById(r?.content?.cardId),
      passportNo: getDataById(r?.content?.passportNo),
      laserCode: getDataById(r?.content?.laserCode),
      mobile: getDataById(r?.content?.mobile),
    };
  });

  useUnmount(() => {
    localStorage.removeItem('user_token_profile_public');
  });

  if (!hash || (!loading && !data?.id)) {
    navigate('/');
    return null;
  }

  if (loading) return null;

  return (
    <div className={styles.container}>
      <UserInfo userInfo={data} isChangeProfile={false} />
      <Consents userId={data?.id || ''} />
      <DataSubjectHistory userId={data?.id || ''} subjectId={data?.id} onlyView={true} />
    </div>
  );
};

export default ProfileDetailPage;
