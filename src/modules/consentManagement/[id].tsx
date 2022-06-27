import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConsentDetail from './components/ConsentDetail';
import NewConsent from './components/NewConsent';

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
