import { Form, Modal } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

const ModalEditEndpoint = ({ children, endpoint, updateEndpoint }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const t = setTimeout(() => {
      if (!visible) {
        form.resetFields();
      }
    }, 350);

    return () => {
      clearTimeout(t);
    };
  }, [visible]);

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinish = (values: any) => {
    updateEndpoint({ ...values, endpointId: endpoint?.id });
    onVisible();
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Modal
        visible={visible}
        footer={false}
        centered
        onCancel={onVisible}
        className={styles.modal}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            name: endpoint?.name || '',
            url: endpoint?.url || '',
            method: endpoint?.key || '',
            request: endpoint?.request || '',
            response: endpoint?.response || '',
            key: endpoint?.key || '',
          }}
          className={styles.form}
        >
          <div className='mb-16'>
            <InputForm
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='URL'
              name='url'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='Method'
              name='method'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='Request'
              name='request'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='Response'
              name='response'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>
          <div className='mb-16'>
            <InputForm
              label='Key'
              name='key'
              rules={[{ required: true, message: 'Require' }]}
              classNameFormInput={styles.input}
            />
          </div>

          <Button htmlType='submit'>Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditEndpoint;
