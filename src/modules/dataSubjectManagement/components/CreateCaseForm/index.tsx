import { Col, DatePicker, Divider, Form, Modal, Row } from 'antd';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Select from 'libraries/UI/Select';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import Button from 'libraries/UI/Button';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { useCreateCase, useGetDataDropdown, useGetListDataDropDropdown } from './service';

interface IProps {
  visible: boolean;
  onClose: () => void;
  refDataHistory: any;
}

export const CustomSelectDropdown = ({ placeholder, data, allowClear, value, onChange }: any) => {
  const [visible, setVisible] = useState(false);

  const { run } = useDebounceFn(
    () => {
      setVisible(!visible);
    },
    {
      wait: 300,
    },
  );

  return (
    <Select
      value={value}
      placeholder={placeholder}
      showSearch
      onSelect={onChange}
      open={visible}
      onMouseDown={run}
    >
      {data?.map((item: any) => (
        <Select.Option value={item?.name} key={item?.id} allowClear={allowClear}>
          {item?.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const { confirm } = Modal;

const CreateCaseForm = ({ visible, onClose, refDataHistory }: IProps) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [acceptedDate, setAcceptedDate] = useState(moment());
  const [dateOfResponse, setDateOfResponse] = useState(null);

  const onFinishSubmitForm = () => {
    onClose();
    createCaseForm.resetFields();
    if (refDataHistory.current?.refreshDataHistory) refDataHistory.current.refreshDataHistory();
    setDateOfResponse(null);
    setAcceptedDate(moment());
  };

  const createCaseFormRequest = useCreateCase(onFinishSubmitForm);
  {
    /** Use hardcode data for test purpose */
  }
  const { usersData } = useGetListDataDropDropdown();
  const { data } = useGetDataDropdown();
  const [createCaseForm] = Form.useForm();

  const onFinish = (values: any) => {
    createCaseFormRequest.run({
      ...values,
      userProfileId: Number(id),
      acceptedDate,
      dateOfResponse,
    });
    setDateOfResponse(null);
    setAcceptedDate(moment());
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Cancel',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to cancel Case Creation?',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      okButtonProps: {
        className: styles.btnDelete,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        onClose();
        createCaseForm.resetFields();
        setDateOfResponse(null);
        setAcceptedDate(moment());
      },
    });
  }, []);

  return (
    <Modal
      footer={null}
      visible={visible}
      className={styles.form}
      width={1200}
      onCancel={() => {
        onClose();
        createCaseForm.resetFields();
      }}
    >
      <Form layout='vertical' form={createCaseForm} onFinish={onFinish}>
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
              <CustomSelectDropdown data={data?.subjectRightData} placeholder='Select a Right' />
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
              <CustomSelectDropdown
                data={data?.relatedDepartmentData}
                placeholder='Select a Department'
              />
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
              <CustomSelectDropdown data={usersData?.data} placeholder='Assign to' />
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
              <CustomSelectDropdown data={data?.statusData} placeholder='List of Status' />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <p className={styles.datePickerLabel}>
              Accepted Date <span style={{ color: 'red' }}>*</span>
            </p>
            <DatePicker
              getPopupContainer={(trigger: any) => trigger.parentElement}
              // defaultValue={moment()}
              format='DD/MM/YYYY'
              onChange={(date: any) => setAcceptedDate(date)}
              allowClear={false}
              value={acceptedDate}
            />
          </Col>
          <Divider />
          <Col xs={12}>
            <Form.Item label='Result' name='responseStatus'>
              <CustomSelectDropdown
                data={data?.resultData}
                placeholder='Select Result'
                allowClear={true}
              />
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

      <div className={styles.actions}>
        <Button
          className={styles.cancelBtn}
          onClick={() => {
            if (
              Object.keys(createCaseForm.getFieldsValue(true)).length === 0 ||
              Object.values(createCaseForm.getFieldsValue(true)).every(
                (item: any) => item.length === 0,
              )
            ) {
              onClose();
              createCaseForm.resetFields();
              setDateOfResponse(null);
              setAcceptedDate(moment());
              return;
            }
            showConfirm();
          }}
        >
          Cancel
        </Button>{' '}
        <Button
          htmlType='submit'
          onClick={() => createCaseForm.submit()}
          className={styles.submitBtn}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCaseForm;
