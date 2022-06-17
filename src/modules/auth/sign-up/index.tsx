import { Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import InputForm from 'libraries/form/input/input-form';
import InputPasswordForm from 'libraries/form/input/input-password-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import TermOfServiceModal from './components/TermOfServiceModal';
import { RegexUtils } from 'utils/regex-helper';

import styles from './styles.module.scss';
import Button from 'libraries/UI/Button';
import { useSignUp } from './service';

export default function SignUpPage() {
  const { t } = useTranslation();

  const reqSignUp = useSignUp();

  const [isShowTermOfServiceModal, setIsShowTermOfServiceModal] = useState(false);

  const onSignUp = (values: any) => {
    reqSignUp.run(values);
  };

  return (
    <ContainerLayout title={t('sign_up.title')}>
      <div className={styles.signUpPage}>
        <h1 className={styles.titlePage}>{t('welcome_auth')}</h1>

        <div className={styles.formWrap}>
          <h3 className={styles.titleSignUp}>{t('sign_up.title')}</h3>
          <Form layout="vertical" name="basic" onFinish={onSignUp}>
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
                    message: t('messages.errors.max_name', { max: 50 })
                  },
                  {
                    whitespace: true,
                    message: t('messages.errors.empty_name')
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
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.reject(
                          t('messages.errors.require', { field: t('password') })
                        );
                      }
                      if (value?.length < 8) {
                        return Promise.reject(t('messages.errors.min', { min: 8 }));
                      }

                      const regPassword = new RegExp(RegexUtils.RegexConstants.REGEX_PASSWORD);

                      if (!regPassword.test(value)) {
                        return Promise.reject(t('messages.errors.password_invalid'));
                      }

                      return Promise.resolve();
                    }
                  }
                ]}
              />
            </div>

            <div>
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

            <Button htmlType="submit" className={styles.buttonSubmit} loading={reqSignUp.loading}>
              {t('continue')}
            </Button>
          </Form>

          <div className={styles.actionMore}>
            <p>
              <span>By continuing, you’re agreeing to our </span>
              <p
                onClick={() => setIsShowTermOfServiceModal(true)}
                className={styles.termOfServiceText}>
                Terms of Service
              </p>
            </p>
          </div>
        </div>
      </div>
      <TermOfServiceModal
        onCloseTermOfServiceModal={() => setIsShowTermOfServiceModal(false)}
        isShowTermOfServiceModal={isShowTermOfServiceModal}
      />
    </ContainerLayout>
  );
}
