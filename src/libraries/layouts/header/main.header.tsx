import { useKeycloak } from '@react-keycloak/web';
import IconLogout from 'assets/icons/icon-logout';
import IconUser from 'assets/icons/icon-user';
import useAuth from 'hooks/redux/auth/useAuth';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';
import { User } from 'types/common.types';
import styles from './styles.module.scss';

interface Props {
  user?: User;
  showSider: boolean;
  toggleSider: () => void;
  onLogout: () => void;
  isMobile: boolean;
}

export default function MainHeader({ isMobile, showSider, user, toggleSider }: Props) {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const { onLogout } = useAuth();

  return (
    <div className={styles.mainHeader}>
      {/* <div className={styles.logoView}>
        {!isMobile && (
          <Button
            className={styles.navbarIcon}
            type="link"
            icon={showSider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => toggleSider && toggleSider()}
          />
        )}
        <Logo />
      </div> */}
      <p className={styles.welcomeUser}>
        {t('welcome', { username: user?.email || keycloak?.tokenParsed?.preferred_username })}
      </p>
      <div className={styles.avatarView}>
        <div className={styles.profileUser}>
          <div className={styles.avatar}>
            <IconUser />
          </div>
          <p className={styles.titleProfile}>{t('profile')}</p>
        </div>
        <Button onClick={onLogout} className={styles.btnLogout} suffixIcon={<IconLogout />}>
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}
