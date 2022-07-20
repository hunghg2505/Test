import { Button, Form, Upload, message, Row, Col } from 'antd';

import IconUpload from 'assets/icons/icon-upload';
import Input from 'libraries/UI/Input';
import { Rule } from 'antd/lib/form';
import type { UploadProps } from 'antd';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { AnyKindOfDictionary, debounce } from 'lodash';
import { useImperativeHandle, useRef, useState } from 'react';

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
  refFiles?: any;
}

const funcDebounce = (func: any, time: any) => {
  return debounce(func, time);
};

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
  refFiles,
}: Props) => {
  const refFileImage: any = useRef([]);
  const [fileData, setFileData] = useState<any[]>([]);

  useImperativeHandle(refFiles, () => {
    return {
      getFileData: () => fileData,
    };
  });

  const selectFileDebounce = funcDebounce((values: any, fileData: any) => {
    const newData = [...values];
    setFileData(newData);
  }, 500);

  const handleBeforeUpload = (files: any) => {
    refFileImage.current.push(files);
    selectFileDebounce(refFileImage.current, fileData);
  };

  const onDeleteFile = (id: string) => () => {
    const newFile = fileData?.filter((v: any) => v?.uid !== id);
    refFileImage.current = newFile;
    setFileData(newFile);
  };

  return (
    <div>
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
      {uploadFile && (
        <Upload
          accept={'.doc, .docx, .xls, .xlsx, .txt, .jpg, .jpeg, .png'}
          beforeUpload={handleBeforeUpload}
          itemRender={() => <></>}
          customRequest={function () {
            return void 0;
          }}
          fileList={fileData}
          disabled={fileData?.length >= 1}
          className={styles.uploadWrap}
        >
          <Button icon={<IconUpload />} className={styles.uploadButton} />
        </Upload>
      )}
      <Row>
        {fileData?.map((item: any) => {
          return (
            <Row key={item?.uid} className={styles.fileItem} align='middle'>
              <Col>{item?.name}</Col>
              <Col className={styles.btnDelete} onClick={onDeleteFile(item?.uid)}>
                X
              </Col>
            </Row>
          );
        })}
      </Row>
    </div>
  );
};

export default InputTextAreaForm;
