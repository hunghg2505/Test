import dayjs from 'dayjs';
import { Col, Form, Row, Divider, Modal } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';
import {
  DATA_SUBJECT_RIGHT_DROPDOWN_DATA,
  STATUS_DROPDOWN_DATA,
  RESULT_DROPDOWN_DATA,
} from 'constants/common.constants';

import styles from './index.module.scss';
import Button from 'libraries/UI/Button';
import { useParams } from 'react-router-dom';
import { useCreateCase, useGetListDataDropDropdown } from './service';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const CreateCaseForm = ({ visible, onClose }: IProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const createCaseFormRequest = useCreateCase();
  {
    /** Use hardcode data for test purpose */
  }
  // const { actionsData, departmentsData, usersData } = useGetListDataDropDropdown();
  const [createCaseForm] = Form.useForm();

  const onFinish = (values: any) => {
    delete values.acceptedDate;
    delete values.dateOfResponse;
    createCaseFormRequest.run({ ...values, userProfileId: Number(id) });
  };

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
                <Select.Option value={'User 1'}>User 1</Select.Option>
                <Select.Option value={'User 2'}>User 2</Select.Option>
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
                {STATUS_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.value}
                  </Select.Option>
                ))}
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
              placeholder='Reason to Approve or Reject'
              rows={6}
              className={styles.textarea}
              required={true}
              maxLength={250}
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
        </Row>
      </Form>

      <div className={styles.actions}>
        <Button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </Button>{' '}
        <Button htmlType='submit' onClick={() => createCaseForm.submit()}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCaseForm;
