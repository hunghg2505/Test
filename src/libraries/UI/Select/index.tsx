import React from 'react';
import { Select as SelectAntd } from 'antd';

import styles from './index.module.scss';
import clsx from 'clsx';
import IconArrowDown2 from 'assets/icons/icon-arrow-down-2';

interface IProps {
  children?: React.ReactNode;
  className?: string;
  suffixIcon?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  options?: { label: any; value: any }[];
  disabled?: boolean;
  showSearch?: boolean;
  onSelect?: (value: any) => void;
  onChange?: (value: any) => void;
}

const Select = ({
  children,
  className,
  placeholder = 'Placeholder',
  options,
  suffixIcon = <IconArrowDown2 />,
  ...props
}: IProps) => {
  return (
    <SelectAntd
      className={clsx(styles.select, {
        [`${className}`]: className,
      })}
      placeholder={placeholder}
      suffixIcon={suffixIcon}
      options={options}
      {...props}
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      <>{children}</>
    </SelectAntd>
  );
};

Select.Option = SelectAntd.Option;

Select.Name = 'Select';

export default Select;
