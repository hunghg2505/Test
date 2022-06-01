import { Form } from 'antd';
import ButtonForm from 'libraries/form/button/button-form';
import InputForm from 'libraries/form/input/input-form';
import InputPasswordForm from 'libraries/form/input/input-password-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import { useTranslation } from 'react-i18next';
import SignInUtils from './utils/sign-in.utils';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { RegexUtils } from 'utils/regex-helper';

export default function SignInPage() {
  const { t } = useTranslation();
  const { onLogin, onGoToRegister, onGoToForgotPassword } = SignInUtils();

  return (
    <ContainerLayout title={t('sign_in.title')}>
      <div className={styles.signInPage}>
        <h1 className={clsx('mb-52 mt-86', styles.titlePage)}>{t('sign_in.title')}</h1>
        <Form layout="vertical" name="basic" onFinish={onLogin} autoComplete="off">
          <div className="mb-16">
            <InputForm
              label={t('email_address')}
              name="email_abc"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('email_address') })
                },
                {
                  pattern: new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL),
                  message: `${t('messages.errors.email_invalid')}`
                }
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
          <div className={clsx('mb-44', styles.actionMore)}>
            <p className={styles.actionItem} onClick={onGoToForgotPassword}>
              {t('forgot_password')}
            </p>
            <p className={styles.actionItem} onClick={onGoToRegister}>
              {t('create_an_account')}
            </p>
          </div>

          <Form.Item>
            <ButtonForm
              title={t('login_button')}
              htmlType="submit"
              buttonType="light"
              borderRadius={16}
              className={styles.buttonSubmit}
            />
          </Form.Item>
        </Form>
      </div>
    </ContainerLayout>
  );
}
