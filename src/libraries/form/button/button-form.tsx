import { ReactNode } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  title?: string;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'middle' | 'small';
  type?: 'primary' | 'default' | 'dashed';
  icon?: ReactNode;
  className?: any;
  buttonType?: 'light' | 'dark';
  borderRadius?: 5 | 8 | 16;
  onClick?: () => void;
}

export default function ButtonForm({
  title,
  loading = false,
  htmlType = 'button',
  type = 'primary',
  size = 'large',
  icon,
  buttonType = 'dark',
  className,
  borderRadius = 5,
  onClick
}: Props) {
  const { t } = useTranslation();
  return (
    <Button
      onClick={onClick}
      loading={loading}
      htmlType={htmlType}
      size={size}
      icon={icon}
      type={type}
      className={clsx(styles.buttonForm, {
        [styles.buttonFormDark]: buttonType === 'dark',
        [styles.buttonFormLight]: buttonType === 'light',
        [className]: true
      })}
      style={{ borderRadius: borderRadius }}
    >
      {title || t('logout')}
    </Button>
  );
}
