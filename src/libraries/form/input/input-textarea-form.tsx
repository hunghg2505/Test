import { Button, Form, Upload, message } from 'antd';

import IconUpload from 'assets/icons/icon-upload';
import Input from 'libraries/UI/Input';
import { Rule } from 'antd/lib/form';
import type { UploadProps } from 'antd';
import clsx from 'clsx';
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
  uploadFile?: boolean;
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
  uploadFile,
  rows,
  required,
}: Props) => {
  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
      {uploadFile && (
        <Upload {...uploadProps}>
          <Button icon={<IconUpload />} className={styles.uploadButton} />
        </Upload>
      )}
    </Form.Item>
  );
};

export default InputTextAreaForm;
