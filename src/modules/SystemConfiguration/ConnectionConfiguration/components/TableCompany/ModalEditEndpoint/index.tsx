import { Form, Modal } from 'antd';
import { METHOD_DROPDOWN_DATA } from 'constants/common.constants';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

const ModalEditEndpoint = ({ children, endpoint, updateEndpoint }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const initial = {
    name: endpoint?.name || '',
    url: endpoint?.url || '',
    method: endpoint?.method || '',
    request: endpoint?.request || '',
    response: endpoint?.response || '',
    key: endpoint?.key || '',
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initial);
    }
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
        <Form form={form} onFinish={onFinish} initialValues={initial} className={styles.form}>
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
            <Form.Item label='Method' name='method' className={styles.input}>
              <Select placeholder='Select Result' allowClear>
                {METHOD_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
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
            <InputForm label='Key' name='key' classNameFormInput={styles.input} />
          </div>

          <Button htmlType='submit'>Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditEndpoint;
