import React from 'react';

import ContainerLayout from 'libraries/layouts/container.layout';

import styles from './index.module.scss';

interface IConsentDetailProps {
  id: string;
}

export default function ConsentDetail({ id }: IConsentDetailProps) {
  return (
    <ContainerLayout title="Consent Detail">
      <h1>Consent Detail {id}</h1>
    </ContainerLayout>
  );
}
