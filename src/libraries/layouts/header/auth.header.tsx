import LogoWhite from 'assets/icons/logo-white';
import useAuth from 'hooks/redux/auth/useAuth';
import Button from 'libraries/UI/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import styles from './styles.module.scss';

export default function AuthHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState({ showBtnSignIn: false, showBtnSignUp: false });
  const { isLogin, onLogin, onLogout } = useAuth();

  useEffect(() => {
    getButtonHeader(location.pathname);
  }, [location.pathname]);

  // check path render button auth header
  const getButtonHeader = (path: string) => {
    const dataCheck = { showBtnSignIn: false, showBtnSignUp: false };
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

  return (
    <div className={styles.mainAuthHeader}>
      <div className={styles.logoView}>
        <LogoWhite />
      </div>
      <div className={styles.avatarView}>
        {/* {showButton.showBtnSignUp && (
          <div
            className={clsx({
              'mr-12': showButton.showBtnSignIn === true && showButton.showBtnSignUp === true,
            })}
          >
            <Button style={{ padding: '10px 24px' }} onClick={() => onGoTo(routePath.SignUp)}>
              {t('sign_up_button')}
            </Button>
          </div>
        )} */}
        {/* {showButton.showBtnSignIn && (
          <div>
            <Button style={{ padding: '10px 24px' }} onClick={() => onGoTo(routePath.SignIn)}>
              {t('login_button')}
            </Button>
          </div>
        )} */}

        {!isLogin && (
          <div>
            <Button style={{ padding: '10px 24px' }} onClick={onLogin}>
              {t('login_button', 'Login')}
            </Button>
          </div>
        )}
        {isLogin && (
          <div>
            <Button style={{ padding: '10px 24px' }} onClick={onLogout}>
              {t('logout', 'Logout')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
