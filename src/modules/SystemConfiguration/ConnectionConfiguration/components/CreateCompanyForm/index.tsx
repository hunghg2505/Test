import { useCallback } from 'react';
import { Col, Form, Row, Modal } from 'antd';
import Button from 'libraries/UI/Button';
import InputForm from 'libraries/form/input/input-form';
import styles from './index.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCreateCompany } from '../../utils/service';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const { confirm } = Modal;

const CreateCompanyForm = ({ visible, onClose }: IProps) => {
  const { t } = useTranslation();
  const [createCompanyForm] = Form.useForm();

  const onFinishSubmitForm = () => {
    onClose();
    createCompanyForm.resetFields();
  };

  const createCompanyFormRequest = useCreateCompany(onFinishSubmitForm);

  const onFinish = (values: any) => {
    createCompanyFormRequest.run({
      ...values,
    });
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Cancel',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to cancel Company Creation?',
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
        createCompanyForm.resetFields();
      },
    });
  }, []);

  return (
    <Modal
      footer={null}
      visible={visible}
      className={styles.form}
      width={700}
      onCancel={() => {
        onClose();
        createCompanyForm.resetFields();
      }}
    >
      <Form layout='vertical' form={createCompanyForm} onFinish={onFinish}>
        <Row gutter={[15, 24]}>
          <Col xs={24}>
            <InputForm
              label='Company Name'
              name='name'
              required
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Company Name' }),
                },
              ]}
              placeholder='Company Name'
            />
          </Col>
        </Row>
      </Form>

      <div className={styles.actions}>
        <Button
          className={styles.cancelBtn}
          onClick={() => {
            if (
              Object.keys(createCompanyForm.getFieldsValue(true)).length === 0 ||
              Object.values(createCompanyForm.getFieldsValue(true)).every(
                (item: any) => item.length === 0,
              )
            ) {
              onClose();
              createCompanyForm.resetFields();

              return;
            }
            showConfirm();
          }}
        >
          Cancel
        </Button>{' '}
        <Button htmlType='submit' onClick={() => createCompanyForm.submit()}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCompanyForm;
