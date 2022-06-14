import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  label?: string;
  name: string;
  rules?: Rule[];
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  dependencies?: string[];

  // custom
  classNameFormInput?: any;
  className?: any;
}

export default function InputPasswordForm({
  label,
  placeholder,
  name,
  rules,
  autoComplete = 'off',
  dependencies,
  classNameFormInput,
  className
}: Props) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={clsx(styles.customInputPasswordFormItem, {
        [classNameFormInput]: true
      })}
      dependencies={dependencies}>
      <Input.Password
        className={clsx(styles.customInputPasswordForm, {
          [className]: true
        })}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
}
