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
  const { loadingSignIn, onLogin, onGoToRegister, onGoToForgotPassword } = SignInUtils();

  return (
    <ContainerLayout title={t('sign_in.title')}>
      <div className={styles.signInPage}>
        <h1 className={styles.titlePage}>{t('welcome_auth')}</h1>

        <div className={styles.formWrap}>
          <h4 className={clsx('mb-52 mt-86', styles.titleSignIn)}>{t('sign_in.title')}</h4>
          <Form layout="vertical" name="basic" onFinish={onLogin} autoComplete="off">
            <div className="mb-16">
              <InputForm
                label={t('Username')}
                name="email_abc"
                rules={[
                  {
                    required: true,
                    message: t('messages.errors.require', { field: t('email_address') })
                  }
                  // {
                  //   pattern: new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL),
                  //   message: `${t('messages.errors.email_invalid')}`
                  // }
                ]}
              />
            </div>

            <div className="mb-12">
              <InputPasswordForm
                label={t('password')}
                name="password_abc"
                rules={[
                  {
                    required: true,
                    message: t('messages.errors.require', { field: t('password') })
                  }
                ]}
              />
            </div>

            {/** Action more */}
            <div className={clsx(styles.actionMore)}>
              <p className={styles.actionItem} onClick={onGoToForgotPassword}>
                {t('forgot_password')}
              </p>
            </div>

            <Form.Item>
              <Button htmlType="submit" className={styles.buttonSubmit} loading={loadingSignIn}>
                {t('login_button')}
              </Button>
            </Form.Item>

            <p onClick={onGoToRegister} className={styles.link}>
              Create an account
            </p>
          </Form>
        </div>
      </div>
    </ContainerLayout>
  );
}
