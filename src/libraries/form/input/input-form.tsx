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
  maxLength?: number;
  // custom
  classNameFormInput?: any;
  className?: any;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export default function InputForm({
  label,
  placeholder,
  name,
  rules,
  autoComplete = 'off',
  maxLength,
  classNameFormInput,
  className,
  onBlur
}: Props) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={clsx(styles.customInputFormItem, {
        [classNameFormInput]: true
      })}>
      <Input
        className={clsx(styles.customInputForm, {
          [className]: true
        })}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onBlur={onBlur}
      />
    </Form.Item>
  );
}
