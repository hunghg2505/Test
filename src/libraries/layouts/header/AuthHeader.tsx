import LogoWhite from 'assets/icons/logo-white';
import useAuth from 'hooks/redux/auth/useAuth';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export default function AuthHeader() {
  const { t } = useTranslation();
  const { isLogin, onLogin, onLogout } = useAuth();

  return (
    <div className={styles.mainAuthHeader}>
      <div className={styles.logoView}>
        <LogoWhite />
      </div>
      <div className={styles.avatarView}>
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
