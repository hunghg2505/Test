import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ConsentDetail from 'libraries/components/ConsentManagement/ConsentDetail';
import NewConsent from 'libraries/components/ConsentManagement/NewConsent';

export default function ConsentNewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/consent');
    return null;
  }

  if (id === 'new') {
    return <NewConsent />;
  }

  return <ConsentDetail id={id} />;
}
