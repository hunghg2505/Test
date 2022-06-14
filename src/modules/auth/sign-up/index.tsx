import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import InputForm from 'libraries/form/input/input-form';
import InputPasswordForm from 'libraries/form/input/input-password-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import { RegexUtils } from 'utils/regex-helper';
import ButtonForm from 'libraries/form/button/button-form';

import styles from './styles.module.scss';

export default function SignUpPage() {
  const { t } = useTranslation();

  const onSignUp = (values: any) => {
    console.log({ values });
  };

  return (
    <ContainerLayout title={t('sign_up.title')}>
      <div className={styles.signUpPage}>
        <h1 className={styles.titlePage}>{t('sign_up.title')}</h1>
        <Form layout="vertical" name="basic" onFinish={onSignUp} autoComplete="off">
          <div className="mb-16">
            <InputForm
              label={t('email_address')}
              name="email"
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

          <div className="mb-16">
            <InputForm
              label={t('name')}
              name="name"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('name') })
                },
                {
                  max: 50,
                  message: t('messages.errors.max', { max: 50 })
                }
              ]}
            />
          </div>

          <div className="mb-16">
            <InputPasswordForm
              label={t('password')}
              name="password"
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: t('password') })
                }
              ]}
            />
          </div>

          <div className="mb-40">
            <InputPasswordForm
              label={t('confirm_password')}
              name="confirm_password"
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        t('messages.errors.require', { field: t('confirm_password') })
                      );
                    }
                    if (getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t('password_not_match'));
                  }
                })
              ]}
            />
          </div>

          <ButtonForm
            title={t('continue')}
            htmlType="submit"
            buttonType="light"
            borderRadius={16}
            className={styles.buttonSubmit}
          />
        </Form>

        <div className={styles.actionMore}>
          <p>
            <span>By continuing, you’re agreeing to our </span>
            <a href="/" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </ContainerLayout>
  );
}
