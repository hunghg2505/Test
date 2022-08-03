import Loading from 'libraries/components/loading';
import ContainerLayout from 'libraries/layouts/container.layout';
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Consents from './components/Consents';
import DataSubjectHistory from './components/DataSubjectHistory';
import UserInfo from '../../libraries/components/UserInfo';
import { useDataSubjectDetail } from './utils/service';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import { Row } from 'antd';
import Button from 'libraries/UI/Button';

import styles from './index.module.scss';
import EditProfile from './components/EditUserProfileForm';

function DataSubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refDataHistory: any = useRef(null);
  const { isHavePermissionEditProfile } = useDataSubjectManagementPermission();

  const { loading, data } = useDataSubjectDetail(`${id}`);

  if (!id) {
    navigate('/data-subject');
    return null;
  }

  if (loading) {
    return (
      <ContainerLayout title='Data Subject Detail'>
        <Loading />
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout title='Data Subject Detail'>
      {/* {isHavePermissionEditProfile && (
        <Row justify='end' className={styles.btnEdit}>
          <Button>Submit</Button>
          <Button className={styles.btnCancel}>Cancel</Button>
        </Row>
      )} */}
      {/* <UserInfo userInfo={data?.userInfo} /> */}
      <EditProfile userInfo={data?.userInfo} loading={loading} />
      <Consents userId={Number(data?.userInfo?.id)} refDataHistory={refDataHistory} />
      <DataSubjectHistory userId={data?.userInfo?.id || ''} subjectId={id} ref={refDataHistory} />
    </ContainerLayout>
  );
}

export default DataSubjectDetail;
