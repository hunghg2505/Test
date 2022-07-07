import React from 'react';
import { Input as InputAntd } from 'antd';
import clsx from 'clsx';

import styles from './index.module.scss';
import IconShowPassword from 'assets/icons/icon-show-password';
import IconHiddenPassword from 'assets/icons/icon-hidden-password';

interface Props {
  className?: string;
  placeholder?: string;
  status?: 'default' | 'success' | 'error' | 'warning';
  suffix?: React.ReactNode | string;
  prefix?: React.ReactNode | string;
  type?: 'input' | 'textarea' | 'password';
  value?: string | number;
  defaultValue?: string | number;
  autoComplete?: 'on' | 'off';
  maxLength?: number;
  disabled?: boolean;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Input({
  className = '',
  suffix = '',
  prefix = '',
  status = 'default',
  type = 'input',
  maxLength,
  ...props
}: Props) {
  if (type === 'textarea') {
    return (
      <InputAntd.TextArea
        className={clsx(styles.input, {
          [styles[status]]: styles[status],
          [`${className}`]: className,
        })}
        maxLength={maxLength}
        {...props}
      />
    );
  }

  if (type === 'password') {
    return (
      <InputAntd.Password
        className={clsx(styles.input, {
          [styles[status]]: styles[status],
          [`${className}`]: className,
        })}
        suffix={suffix}
        prefix={prefix}
        iconRender={(visible) => {
          if (visible) {
            return IconShowPassword;
          }

          return IconHiddenPassword;
        }}
        {...props}
      />
    );
  }

  return (
    <InputAntd
      className={clsx(styles.input, {
        [styles[status]]: styles[status],
        [`${className}`]: className,
      })}
      suffix={suffix}
      prefix={prefix}
      maxLength={maxLength}
      {...props}
    />
  );
}

Input.Name = 'Input';

export default Input;
