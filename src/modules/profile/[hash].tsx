import { useRequest } from 'ahooks';
import UserInfo from 'libraries/components/UserInfo';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const ProfileHash = () => {
  const { hash } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useRequest(async () => {
    const r: any = await ApiUtils.fetch(API_PATH.GENERATE_LINK_DETAIL(hash || ''));

    return {
      id: r?.content?.id,
      imageUrl: '',
      firstNameEn: r?.content?.firstNameEn || '',
      lastNameEn: r?.content?.lastNameEn || '',
      firstNameTh: r?.content?.firstNameTh || '',
      lastNameTh: r?.content?.lastNameTh || '',
      email: r?.content?.email || '',
      address: 'Test Address',
      dateOfBirth: r?.content?.dateOfBirth || '',
      nationality: r?.content?.nationality || '',
      cardId: r?.content?.cardId || '',
      passportNo: r?.content?.passportNo || '',
      laserCode: r?.content?.laserCode || '',
      mobile: r?.content?.mobile || '',
    };
  });

  if (!hash) {
    navigate('/');
    return null;
  }

  if (loading || !data) return null;

  return (
    <>
      <UserInfo userInfo={data} isChangeProfile={false} />
    </>
  );
};

export default ProfileHash;
