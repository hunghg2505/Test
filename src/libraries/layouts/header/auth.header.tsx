import Logo from 'assets/icons/logo';
import clsx from 'clsx';
import ButtonForm from 'libraries/form/button/button-form';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import styles from './styles.module.scss';

export default function AuthHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState({ showBtnSignIn: false, showBtnSignUp: false });

  useEffect(() => {
    getButtonHeader(location.pathname);
  }, [location.pathname]);

  // check path render button auth header
  const getButtonHeader = (path: string) => {
    let dataCheck = { showBtnSignIn: false, showBtnSignUp: false };
    switch (path) {
      case routePath.SignIn:
        dataCheck.showBtnSignUp = true;
        break;
      case routePath.SignUp:
        dataCheck.showBtnSignIn = true;
        break;
      case routePath.ForgotPassword:
        dataCheck.showBtnSignIn = true;
        dataCheck.showBtnSignUp = true;
    }
    setShowButton(dataCheck);
  };

  // on redirect to path
  const onGoTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.mainHeader}>
      <div className={styles.logoView}>
        <Logo />
      </div>
      <p className={styles.welcomeUser}>{t('welcome_auth')}</p>
      <div className={styles.avatarView}>
        {showButton.showBtnSignUp && (
          <div
            className={clsx({
              'mr-12': showButton.showBtnSignIn === true && showButton.showBtnSignUp === true
            })}
          >
            <ButtonForm title={t('sign_up_button')} onClick={() => onGoTo(routePath.SignUp)} />
          </div>
        )}
        {showButton.showBtnSignIn && (
          <div>
            <ButtonForm title={t('login_button')} onClick={() => onGoTo(routePath.SignIn)} />
          </div>
        )}
      </div>
    </div>
  );
}
