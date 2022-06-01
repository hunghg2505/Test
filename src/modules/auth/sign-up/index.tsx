import ContainerLayout from 'libraries/layouts/container.layout';
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
  const { t } = useTranslation();
  return (
    <ContainerLayout title={t('sign_up.title')}>
      <div>SignUpPage</div>
    </ContainerLayout>
  );
}
