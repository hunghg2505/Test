import { useState } from 'react';
import dayjs from 'dayjs';
import { Col, Form, Row, Divider } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import Button from 'libraries/UI/Button';

const ICON_EDIT = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='#CF2A2B'>
    <path
      d='M3.5 21H21.5'
      stroke='#CF2A2B'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z'
      fill='white'
      stroke='#CF2A2B'
      strokeWidth={2}
      strokeLinejoin='round'
    />
  </svg>
);

const CreateCaseForm = () => {
  const { t } = useTranslation();
  const [createCaseForm] = Form.useForm();

  const [isEdit, setIsEdit] = useState(true);
  return (
    <div className={styles.form}>
      <Form layout='vertical' form={createCaseForm} disabled={isEdit}>
        <Row gutter={[15, 24]}>
          <Col xs={12}>
            <Form.Item
              label='Data Subject Rights'
              name='action'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Data Subject Rights' }),
                },
              ]}
            >
              <Select placeholder='Select a Right'>
                <Select.Option value={null}>Select a Right</Select.Option>
                <Select.Option value={0}>Action 1</Select.Option>
                <Select.Option value={1}>Action 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label='Related Department'
              name='department'
              required
              rules={[
                { required: true, message: t('messages.errors.require', { field: 'Department' }) },
              ]}
            >
              <Select placeholder='Select a Department'>
                <Select.Option value={null}>Select an Department</Select.Option>
                <Select.Option value={0}>Department 1</Select.Option>
                <Select.Option value={1}>Department 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label='Assign to'
              name='assignTo'
              required
              rules={[
                { required: true, message: t('messages.errors.require', { field: 'Assign' }) },
              ]}
            >
              <Select placeholder='Assign to'>
                <Select.Option value={null}>Assign to</Select.Option>
                <Select.Option value={0}>user 1</Select.Option>
                <Select.Option value={1}>user 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <InputTextAreaForm
              name='description'
              label='Description'
              placeholder='Details of Execution'
              rows={6}
              className={styles.textarea}
              rules={[
                { required: true, message: t('messages.errors.require', { field: 'Description' }) },
              ]}
            />
          </Col>

          <Col xs={12}>
            <Form.Item
              label='Status'
              name='responseStatus'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Status' }),
                },
              ]}
            >
              <Select placeholder='List of Status'>
                <Select.Option value={null}>List of Status</Select.Option>
                <Select.Option value={1}>Status 1</Select.Option>
                <Select.Option value={0}>Status 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <InputForm
              label='Accepted Date'
              name='acceptedDate'
              defaultValue={dayjs(Date.now()).format('DD/MM/YYYY')}
              disabled={true}
            />
          </Col>
          <Divider />
          <Col xs={12}>
            <Form.Item
              label='Result'
              name='status'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Result' }),
                },
              ]}
            >
              <Select placeholder='Result'>
                <Select.Option value={null}>Result</Select.Option>
                <Select.Option value={1}>Completed</Select.Option>
                <Select.Option value={0}>Rejected</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <InputTextAreaForm
              name='reason'
              label='Reason'
              placeholder='Reason to Approve or Reject'
              rows={6}
              className={styles.textarea}
              required={true}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Reason' }),
                },
              ]}
            />
          </Col>
          <Col xs={12}>
            <InputForm
              label='Date of Response'
              name='dateOfResponse'
              defaultValue={dayjs(Date.now()).format('DD/MM/YYYY')}
              disabled={true}
            />
          </Col>
          {!isEdit && (
            <Col xs={24}>
              <InputTextAreaForm
                name='comment'
                label='Update comment'
                placeholder='Comment ...'
                rows={6}
                maxLength={250}
                required={true}
              />
            </Col>
          )}
        </Row>
      </Form>
      {
        <div className={styles.actions}>
          {isEdit ? (
            <Button onClick={() => setIsEdit(false)} icon={ICON_EDIT} className={styles.editBtn}>
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsEdit(true)} className={styles.cancelBtn}>
                Cancel
              </Button>{' '}
              <Button htmlType='submit' onClick={() => createCaseForm.submit()}>
                Submit
              </Button>
            </>
          )}
        </div>
      }
    </div>
  );
};

export default CreateCaseForm;
