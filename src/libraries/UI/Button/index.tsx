import { Button as ButtonAntd } from 'antd';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  type?: 'primary' | 'secondary';
  typeDisplay?: 'ghost' | 'dashed' | undefined;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  size?: 'large' | 'small' | 'default';
}

const Button = ({
  children,
  loading = false,
  htmlType = 'button',
  type = 'primary',
  size = 'small',
  align = 'center',
  icon,
  suffixIcon,
  className = '',
  disabled = false,
  typeDisplay,
  onClick
}: Props) => {
  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
      if (disabled || loading) return;

      if (onClick) {
        onClick(event);
      }
    },
    [loading, disabled, onClick]
  );

  return (
    <ButtonAntd
      onClick={onClickHandler}
      loading={loading}
      htmlType={htmlType}
      icon={icon}
      className={clsx(styles.btn, {
        [styles[type]]: true,
        [styles[align]]: true,
        [styles[size]]: true,
        [styles[`${typeDisplay}`]]: typeDisplay,
        [styles['disabled']]: disabled,
        [className]: true
      })}>
      {children}
      {suffixIcon}
    </ButtonAntd>
  );
};

Button.Name = 'Button';

export default Button;
