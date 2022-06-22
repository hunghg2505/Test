import { Form } from 'antd';
import clsx from 'clsx';
import InputForm from 'libraries/form/input/input-form';
import InputPasswordForm from 'libraries/form/input/input-password-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';
import { RegexUtils } from 'utils/regex-helper';
import styles from './styles.module.scss';
import SignInUtils from './utils/sign-in.utils';

export default function SignInPage() {
  const { t } = useTranslation();
  // const { loadingSignIn, onLogin, onGoToRegister, onGoToForgotPassword } = SignInUtils();

  return (
    <ContainerLayout title={t('sign_in.title')}>
      <div className={styles.signInPage}>
        <h1 className={styles.titlePage}>{t('welcome_auth')}</h1>
      </div>
    </ContainerLayout>
  );
}
