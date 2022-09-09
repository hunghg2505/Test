import { useRequest } from 'ahooks';
import ContainerLayout from 'libraries/layouts/ContainerLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConsentInfo from './components/ConsentInfo';
import { getConsentFromLocalStorage } from './components/utils/service';

import styles from './index.module.scss';

export default function ConsentNewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useRequest(async () => {
    const [application, consentName, version] = `${id}`.split('-');
    const consents = getConsentFromLocalStorage();
    return consents?.find(
      (consent: any) =>
        consent.application === application &&
        consent?.consentName === consentName &&
        consent?.version === version,
    );
  });

  if (!id) {
    navigate('/consent');
    return null;
  }

  return (
    <ContainerLayout title='Consent Detail'>
      <div className={styles.wrap}>
        <ConsentInfo data={data} />
      </div>
    </ContainerLayout>
  );
}
