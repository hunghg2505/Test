import ContainerLayout from 'libraries/layouts/container.layout';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { t } = useTranslation();
  // const { loadingSignIn, onLogin, onGoToRegister, onGoToForgotPassword } = SignInUtils();

  return (
    <ContainerLayout title={t('sign_in.title')}>
      {/* <div className={styles.signInPage}>
        <h1 className={styles.titlePage}>{t('welcome_auth')}</h1>
      </div> */}
    </ContainerLayout>
  );
}
