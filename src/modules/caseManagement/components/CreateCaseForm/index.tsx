import { useState } from 'react';
import dayjs from 'dayjs';
import { Col, Form, Row, Divider, DatePicker } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  DATA_SUBJECT_RIGHT_DROPDOWN_DATA,
  STATUS_DROPDOWN_DATA,
  RESULT_DROPDOWN_DATA,
} from 'constants/common.constants';

import styles from './index.module.scss';
import Button from 'libraries/UI/Button';
import { useGetListDataDropDropdown } from 'modules/caseManagement/services';

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
  const [editCaseForm] = Form.useForm();
  const { actionsData, departmentsData, usersData } = useGetListDataDropDropdown();

  const [isEdit, setIsEdit] = useState(true);
  const [acceptedDate, setAcceptedDate] = useState(moment());
  const [dateOfResponse, setDateOfResponse] = useState(null);

  return (
    <div className={styles.form}>
      <Form layout='vertical' form={editCaseForm} disabled={isEdit}>
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
                {DATA_SUBJECT_RIGHT_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              label='Related Department'
              name='department'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Department' }),
                },
              ]}
            >
              <Select placeholder='Select a Department'>
                <Select.Option value={'Department 1'}>Department 1</Select.Option>
                <Select.Option value={'Department 2'}>Department 2</Select.Option>
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
                {usersData?.data?.map((item: any) => (
                  <Select.Option value={item.value} key={`${item.sid}`}>
                    {item.value}
                  </Select.Option>
                ))}
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
              required
              maxLength={250}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Description' }),
                },
              ]}
            />
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
              <Select placeholder='List of Status'>
                {STATUS_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <p className={styles.datePickerLabel}>
              Accepted Date <span style={{ color: 'red' }}>*</span>
            </p>
            <DatePicker
              getPopupContainer={(trigger: any) => trigger.parentElement}
              format='DD/MM/YYYY'
              onChange={(date: any) => setAcceptedDate(date)}
              allowClear={false}
              value={acceptedDate}
            />
          </Col>
          <Divider />
          <Col xs={12}>
            <Form.Item label='Result' name='responseStatus'>
              <Select placeholder='Select Result'>
                {RESULT_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <InputTextAreaForm
              name='reason'
              label='Reason'
              placeholder='Reason for Completed or Reject'
              rows={6}
              className={styles.textarea}
              maxLength={250}
            />
          </Col>
          <Col xs={12}>
            <p className={styles.datePickerLabel}>Date of Response</p>
            <DatePicker
              getPopupContainer={(trigger: any) => trigger.parentElement}
              format='DD/MM/YYYY'
              onChange={(date: any) => setDateOfResponse(date)}
              value={dateOfResponse}
            />
          </Col>
        </Row>
      </Form>
      {/* {
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
              <Button htmlType='submit' onClick={() => editCaseForm.submit()}>
                Submit
              </Button>
            </>
          )}
        </div>
      } */}
    </div>
  );
};

export default CreateCaseForm;
