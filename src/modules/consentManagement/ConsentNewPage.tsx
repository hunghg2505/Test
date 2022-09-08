import ContainerLayout from 'libraries/layouts/ContainerLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConsentInfo from './components/ConsentInfo';

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
        <ConsentInfo />
      </div>
    </ContainerLayout>
  );
}
