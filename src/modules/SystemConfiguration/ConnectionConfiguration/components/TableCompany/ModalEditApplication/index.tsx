import { Form, Modal } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

const ModalEditApplication = ({ children, appId, appName, updateApplication }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldValue('app_name', appName);
    }
  }, [visible]);

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinish = (values: any) => {
    updateApplication(appId, values?.app_name);
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
            app_name: appName,
          }}
          className={styles.form}
        >
          <div className='mb-16'>
            <InputForm
              label='Application Name'
              name='app_name'
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

export default ModalEditApplication;
