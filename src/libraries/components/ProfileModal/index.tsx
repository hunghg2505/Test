import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

type IProps = {
  children: React.ReactElement;
};

const MENU = [
  {
    label: 'profile',
    path: '/profile',
  },
  {
    label: 'create_request',
    path: '/create-request',
  },
  {
    label: 'reports',
    path: '/reports',
  },
  {
    label: 'help',
    path: '/help',
  },
  {
    label: 'settings',
    path: '/settings',
  },
];

const ProfileModal = ({ children }: IProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [_isTransitioning, shouldBeVisible, refModal] = useFadeEffect(visible);
  const navigate = useNavigate();

  const onNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <>
      <div className={styles.btnProfile} onClick={() => setVisible(!visible)}>
        {children}
      </div>
      {_isTransitioning && (
        <ul
          className={styles.menus}
          ref={refModal}
          style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}
        >
          {MENU.map((menu, idx) => {
            return (
              <li
                key={idx}
                onClick={onNavigate(menu.path)}
                className={location.pathname === menu.path ? styles.active : ''}
              >
                {t(menu.label)}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ProfileModal;
