import React, { useState } from 'react';

import styles from './index.module.scss';
import { Col, DatePicker, Form, Row } from 'antd';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import ConsentInfo from '../ConsentInfo';

export default function EditConsentForm() {
  const { t } = useTranslation();

  const [isEdit, setIsEdit] = useState(true);

  return (
    <>
      {!isEdit ? (
        <div className={styles.form}>
          <Form layout='vertical'>
            <Row gutter={[15, 24]}>
              <Col xs={12}>
                <InputForm
                  label='Consent Name'
                  name='consentName'
                  required
                  maxLength={55}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Data Subject Rights' }),
                    },
                  ]}
                />
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Application'
                  name='application'
                  required
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Data Subject Rights' }),
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value={'test1'}>Test 1</Select.Option>
                    <Select.Option value={'test2'}>Test 2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12}>
                <InputForm
                  label='Product ID'
                  name='productId'
                  maxLength={55}
                  required
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Product ID' }),
                    },
                  ]}
                />
              </Col>
              <Col xs={12}>
                <InputForm
                  label='Product Name'
                  name='productName'
                  required
                  maxLength={55}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Product Name' }),
                    },
                  ]}
                />
              </Col>
              <Col xs={24}>
                <Form.Item
                  label='Services'
                  name='services'
                  required
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Services' }),
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value={'test1'}>Test 1</Select.Option>
                    <Select.Option value={'test2'}>Test 2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Status'
                  name='status'
                  required
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Status' }),
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value={'test1'}>Test 1</Select.Option>
                    <Select.Option value={'test2'}>Test 2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12}>
                <p className={styles.datePickerLabel}>Expiry Date</p>
                <DatePicker
                  getPopupContainer={(trigger: any) => trigger.parentElement}
                  format='DD/MM/YYYY'
                  style={{ width: '100%' }}
                  size='large'
                />
              </Col>
              <Col xs={12}>
                <InputForm
                  label='Title'
                  name='title'
                  required
                  maxLength={55}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Title' }),
                    },
                  ]}
                />
              </Col>
              <Col xs={12}>
                <InputForm
                  label='Version'
                  name='version'
                  required
                  maxLength={6}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.require', { field: 'Version' }),
                    },
                  ]}
                />
              </Col>
              <Col xs={24}>
                <InputTextAreaForm
                  name='content'
                  label='Content'
                  rows={6}
                  className={styles.textarea}
                  maxLength={500}
                  required
                />
              </Col>
            </Row>
          </Form>

          <div className={styles.actions}>
            <>
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{' '}
              <Button htmlType='submit'>Submit</Button>
            </>
          </div>
        </div>
      ) : (
        <ConsentInfo onClickEdit={() => setIsEdit(false)} />
      )}
    </>
  );
}
