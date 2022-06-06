import React from 'react';
import { Input as InputAntd } from 'antd';
import clsx from 'clsx';

import styles from './index.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  status?: 'default' | 'success' | 'error' | 'warning';
  suffix?: React.ReactNode | string;
  prefix?: React.ReactNode | string;
  type?: 'input' | 'textarea' | 'password';
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Input({
  className = '',
  suffix = '',
  prefix = '',
  status = 'default',
  type = 'input',
  ...props
}: Props) {
  if (type === 'textarea') {
    return (
      <InputAntd.TextArea
        className={clsx(styles.input, {
          [styles[status]]: styles[status],
          [`${className}`]: className
        })}
        {...props}
      />
    );
  }

  if (type === 'password') {
    return (
      <InputAntd.Password
        className={clsx(styles.input, {
          [styles[status]]: styles[status],
          [`${className}`]: className
        })}
        suffix={suffix}
        prefix={prefix}
        {...props}
      />
    );
  }

  return (
    <InputAntd
      className={clsx(styles.input, {
        [styles[status]]: styles[status],
        [`${className}`]: className
      })}
      suffix={suffix}
      prefix={prefix}
      {...props}
    />
  );
}

Input.Name = 'Input';

export default Input;
