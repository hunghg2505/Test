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
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  // custom
  classNameFormInput?: any;
  className?: any;
  required?: boolean;
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  initialValue?: string;

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
  defaultValue,
  disabled = false,
  required,
  normalize,
  onBlur,
  initialValue,
  value,
}: Props) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={clsx(styles.customInputFormItem, {
        [classNameFormInput]: true,
      })}
      required={required}
      normalize={normalize}
      initialValue={initialValue}
    >
      <Input
        className={clsx(styles.customInputForm, {
          [className]: true,
        })}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
      />
    </Form.Item>
  );
}
