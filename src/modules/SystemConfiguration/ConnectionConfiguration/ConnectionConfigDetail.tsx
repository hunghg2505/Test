import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Applications } from './components/TableCompany/Applications';

interface LocationState {
  companyNameEn: string;
}

const ConnectionConfigDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <>
      <Applications companyId={id} companyName={state?.companyNameEn} />
    </>
  );
};

export default ConnectionConfigDetail;
