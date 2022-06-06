import IconUser from 'assets/icons/icon-user';
import Logo from 'assets/icons/logo';
import ButtonForm from 'libraries/form/button/button-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { User } from 'types/common.types';
import Button from 'libraries/UI/Button';
import IconLogout from 'assets/icons/icon-logout';

interface Props {
  user?: User;
  showSider: boolean;
  toggleSider: () => void;
  onLogout: () => void;
  isMobile: boolean;
}

export default function MainHeader({ isMobile, showSider, user, toggleSider, onLogout }: Props) {
  const { t } = useTranslation();
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
      <p className={styles.welcomeUser}>{t('welcome', { username: user?.email })}</p>
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
