import { Form } from 'antd';
import { Rule } from 'antd/lib/form';
import clsx from 'clsx';
import Input from 'libraries/UI/Input';
import styles from './styles.module.scss';

interface Props {
  label?: string;
  name: string;
  rules?: Rule[];
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  dependencies?: string[];
  normalize?: (value: any) => any;
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
  className,
  normalize,
}: Props) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      normalize={normalize}
      className={clsx(styles.customInputPasswordFormItem, {
        [classNameFormInput]: true,
      })}
      dependencies={dependencies}
    >
      <Input
        className={clsx(styles.customInputPasswordForm, {
          [className]: true,
        })}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type='password'
      />
    </Form.Item>
  );
}
