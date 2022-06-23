import Loading from 'libraries/components/loading';
import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Consents from './components/Consents';
import DataSubjectHistory from './components/DataSubjectHistory';
import UserInfo from './components/UserInfo';
import { useDataSubjectDetail } from './utils/service';

function DataSubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <UserInfo userInfo={data?.userInfo} />
      <Consents userId={Number(data?.userInfo?.id)} />
      <DataSubjectHistory userId={data?.userInfo?.id || ''} subjectId={id} />
    </ContainerLayout>
  );
}

export default DataSubjectDetail;
