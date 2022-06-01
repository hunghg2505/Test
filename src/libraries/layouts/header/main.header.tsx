import IconUser from 'assets/icons/icon-user';
import Logo from 'assets/icons/logo';
import ButtonForm from 'libraries/form/button/button-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { User } from 'types/common.types';

interface Props {
  user?: User;
  showSider: boolean;
  toggleSider: () => void;
  onLogout: () => void;
}

export default function MainHeader({ showSider, user, toggleSider, onLogout }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.mainHeader}>
      <div className={styles.logoView}>
        <Button
          className={styles.navbarIcon}
          type="link"
          icon={showSider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => toggleSider && toggleSider()}
        />
        <Logo />
      </div>
      <p className={styles.welcomeUser}>{t('welcome', { username: user?.email })}</p>
      <div className={styles.avatarView}>
        <div className={styles.profileUser}>
          <div className={styles.avatar}>
            <IconUser />
          </div>
          <p className={styles.titleProfile}>{t('profile')}</p>
        </div>
        <ButtonForm onClick={onLogout} />
      </div>
    </div>
  );
}
