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
  options?: { label: any; value: any }[];
  onSelect?: (value: any) => void;
}

const Select = ({
  children,
  className,
  placeholder = 'Placeholder',
  options,
  suffixIcon = <IconArrowDown2 />
}: IProps) => {
  return (
    <SelectAntd
      className={clsx(styles.select, {
        [`${className}`]: className
      })}
      placeholder={placeholder}
      suffixIcon={suffixIcon}
      options={options}>
      <>{children}</>
    </SelectAntd>
  );
};

Select.Option = SelectAntd.Option;

Select.Name = 'Select';

export default Select;
