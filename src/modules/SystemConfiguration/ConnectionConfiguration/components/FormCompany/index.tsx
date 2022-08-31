import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Form, Modal, Row } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { useCallback, useState } from 'react';
import { RegexUtils } from 'utils/regex-helper';
import { useCreateCompany, useEditCompany } from '../../utils/services';
import styles from './index.module.scss';

interface IProps {
  initialValues?: {
    id?: any;
    nameEN?: string;
    nameTH?: string;
    email?: string;
    addressEN?: string;
    addressTH?: string;
  };
  onReloadCompanyData: any;
  children: any;
}

const { confirm } = Modal;

const FormCompany = ({ children, onReloadCompanyData, initialValues = {} }: IProps) => {
  const [createCompanyForm] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinishSubmitForm = () => {
    onVisible();
    createCompanyForm.resetFields();
    onReloadCompanyData();
  };

  const createCompanyFormRequest = useCreateCompany(onFinishSubmitForm);
  const editCompanyFormRequest = useEditCompany();

  const onFinish = async (values: any) => {
    if (initialValues?.id) {
      await editCompanyFormRequest.runAsync({
        id: Number(initialValues.id),
        ...values,
      });
      onReloadCompanyData();
      onVisible();
      return;
    }

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
      centered: true,
      okButtonProps: {
        className: styles.btnDelete,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        setVisible(false);
        createCompanyForm.resetFields();
      },
    });
  }, []);

  const onCancel = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const valInit = Object.values(initialValues);
    const valForm = Object.values(createCompanyForm.getFieldsValue(true))?.filter((v) => v);

    if (JSON.stringify(valInit) === JSON.stringify(valForm)) {
      onVisible();
      createCompanyForm.resetFields();
      return;
    }
    showConfirm();
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>

      <Modal
        footer={null}
        visible={visible}
        className={styles.form}
        width={700}
        onCancel={() => {
          onVisible();
          createCompanyForm.resetFields();
        }}
        centered={true}
      >
        <Form
          layout='vertical'
          form={createCompanyForm}
          onFinish={onFinish}
          className={styles.form}
          initialValues={initialValues}
        >
          <Row gutter={[15, 24]}>
            <Col xs={24}>
              <InputForm
                label='Company Name EN'
                name='nameEN'
                required
                maxLength={55}
                rules={[
                  {
                    required: true,
                    message: 'Company Name EN can not be blank.',
                  },
                ]}
                placeholder='Company Name EN'
              />
            </Col>

            <Col xs={24}>
              <InputForm
                label='Company Name TH'
                name='nameTH'
                required
                maxLength={55}
                rules={[
                  {
                    required: true,
                    message: 'Company Name TH can not be blank.',
                  },
                ]}
                placeholder='Company Name TH'
              />
            </Col>

            <Col xs={24}>
              <InputForm
                label={'DPO Email Address'}
                name='email'
                required
                maxLength={55}
                rules={[
                  {
                    validator: async (_, value) => {
                      try {
                        const email = `${value}`?.trim();
                        if (!email) return Promise.reject('Email can not be blank.');

                        const isEmail = RegexUtils.isEmail(email);

                        if (!isEmail)
                          return Promise.reject(
                            'Please input correct email format dpo@ascenbit.com',
                          );

                        return Promise.resolve();
                      } catch (error) {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
                placeholder='dpo@ascenbit.com'
              />
            </Col>

            <Col xs={24}>
              <InputForm
                label='Company Address EN'
                name='addressEN'
                maxLength={255}
                placeholder='Company Address EN'
              />
            </Col>

            <Col xs={24}>
              <InputForm
                label='Company Address TH'
                name='addressTH'
                maxLength={255}
                placeholder='Company Address TH'
              />
            </Col>
          </Row>
        </Form>

        <div className={styles.actions}>
          <Button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </Button>{' '}
          <Button
            htmlType='submit'
            onClick={() => createCompanyForm.submit()}
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormCompany;
