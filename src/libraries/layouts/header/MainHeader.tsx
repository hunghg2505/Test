import { useKeycloak } from '@react-keycloak/web';
import IconLogout from 'assets/icons/icon-logout';
import useAuth from 'hooks/redux/auth/useAuth';
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
      <div className={styles.avatarView}>
        <p className={styles.welcomeUser}>
          {user?.email || keycloak?.tokenParsed?.preferred_username}
        </p>
        <Button onClick={onLogout} className={styles.btnLogout} suffixIcon={<IconLogout />}>
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}
