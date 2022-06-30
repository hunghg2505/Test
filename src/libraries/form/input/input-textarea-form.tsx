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
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  // custom
  classNameFormInput?: any;
  className?: any;
}

const InputTextAreaForm = ({
  label,
  placeholder,
  name,
  rules,
  autoComplete = 'off',
  disabled = false,
  classNameFormInput,
  className,
  maxLength,
  rows,
  required,
}: Props) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      className={clsx(styles.customTextAreaFormItem, {
        [classNameFormInput]: true,
      })}
      required={required}
    >
      <Input
        className={clsx(styles.customInputPasswordForm, {
          [className]: true,
        })}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type='textarea'
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default InputTextAreaForm;
