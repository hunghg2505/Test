import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Applications } from './components/TableCompany/Applications';

const ConnectionConfigDetail = () => {
  const params = useParams();
  const location = useLocation();

  const companyName = useMemo(() => {
    try {
      return decodeURIComponent(location?.search?.split?.('=')?.[1] || '');
    } catch (error) {
      return '';
    }
  }, [location?.search]);

  return (
    <>
      <Applications companyId={params?.id} companyName={companyName} />
    </>
  );
};

export default ConnectionConfigDetail;
