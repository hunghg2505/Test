import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  return (
    <ContainerLayout title={t('forgot_password_page.title')}>
      <div>ForgotPasswordPage</div>
    </ContainerLayout>
  );
}
