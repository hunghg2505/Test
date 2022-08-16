import { Form, Modal } from 'antd';
import { METHOD_DROPDOWN_DATA } from 'constants/common.constants';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const ModalAddEndpoint = ({ children, appId, addEndpoint }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

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
    addEndpoint({ ...values, applicationId: appId });
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
        <Form form={form} onFinish={onFinish} className={styles.form}>
          <div className='mb-16'>
            <InputForm
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Name' }),
                },
              ]}
              classNameFormInput={styles.input}
              required
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='URL'
              name='url'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Url' }),
                },
              ]}
              classNameFormInput={styles.input}
              required
            />
          </div>

          <div className='mb-16'>
            <Form.Item
              label='Method'
              name='method'
              className={styles.input}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Method' }),
                },
              ]}
              required
            >
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
              label='Parammeter'
              name='request'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Parammeter' }),
                },
              ]}
              classNameFormInput={styles.input}
              required
            />
          </div>

          <div className='mb-16'>
            <InputForm
              label='Response'
              name='response'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Response' }),
                },
              ]}
              classNameFormInput={styles.input}
              required
            />
          </div>
          <div className='mb-16'>
            <InputForm label='Key' name='key' classNameFormInput={styles.input} />
          </div>

          <Button htmlType='submit' className={styles.submitBtn}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddEndpoint;
