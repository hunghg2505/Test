import React from 'react';
import { useParams } from 'react-router-dom';
import { Applications } from './components/TableCompany/Applications';

const ConnectionConfigDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Applications companyId={id} />
    </>
  );
};

export default ConnectionConfigDetail;
