import ContainerLayout from 'libraries/layouts/ContainerLayout';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { t } = useTranslation();

  return <ContainerLayout title={t('sign_in.title')}></ContainerLayout>;
}
