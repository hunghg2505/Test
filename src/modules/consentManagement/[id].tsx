import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditConsentForm from './components/EditConsentForm';
import styles from './index.module.scss';

export default function ConsentNewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/consent');
    return null;
  }

  return (
    <ContainerLayout title='Consent Detail'>
      <div className={styles.wrap}>
        <EditConsentForm />
      </div>
    </ContainerLayout>
  );
}
