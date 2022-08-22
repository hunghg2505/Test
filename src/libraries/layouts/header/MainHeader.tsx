import { useKeycloak } from '@react-keycloak/web';
import IconLogout from 'assets/icons/icon-logout';
import IconUser from 'assets/icons/icon-user';
import useAuth from 'hooks/redux/auth/useAuth';
import ProfileModal from 'libraries/components/ProfileModal';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';
import { User } from 'types/common.types';
import styles from './styles.module.scss';

interface Props {
  user?: User;
  showSider: boolean;
  isMobile: boolean;
}

export default function MainHeader({ user }: Props) {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const { onLogout } = useAuth();

  return (
    <div className={styles.mainHeader}>
      <p className={styles.welcomeUser}>
        {t('welcome', { username: user?.email || keycloak?.tokenParsed?.preferred_username })}
      </p>
      <div className={styles.avatarView}>
        <div className={styles.profileUser}>
          <ProfileModal>
            <>
              <div className={styles.avatar}>
                <IconUser />
              </div>
              <p className={styles.titleProfile}>{t('profile')}</p>
            </>
          </ProfileModal>
        </div>
        <Button onClick={onLogout} className={styles.btnLogout} suffixIcon={<IconLogout />}>
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}
