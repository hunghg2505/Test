import { useCallback, useState } from 'react';

import ExclamationCircleOutlined from '@ant-design/icons/lib/icons/ExclamationCircleOutlined';
import { Col, DatePicker, Divider, Form, Modal, Row } from 'antd';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import InputForm from 'libraries/form/input/input-form';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { RegexUtils } from 'utils/regex-helper';
import styles from './index.module.scss';
import { useCreateConsent, useGetListApplication, useGetListService } from './service';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onReloadConsentData?: any;
}

const { confirm } = Modal;

export const CustomSelectDropdown = ({
  value,
  onChange,
  data,
  onLoadMore,
  onSearchDebounce,
}: any) => {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      placeholder='Select application'
      showSearch
      onSearch={onSearchDebounce}
      onSelect={onChange}
      filterOption={false}
      dropdownRender={(menu: any) => (
        <>
          {menu}

          {data?.isLoadMore && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <div onClick={onLoadMore} className={styles.btnLoadmore}>
                {t('load_more')}
              </div>
            </>
          )}
        </>
      )}
    >
      {data?.data?.map((item: any, index: number) => (
        <Select.Option value={Number(item.id)} key={`${index}${item.id}`}>
          {item.appName}
        </Select.Option>
      ))}
    </Select>
  );
};

export const FormItemApplication = (props: any) => {
  const {
    data,
    onLoadMore,
    onSearchApplicationDebounce: onSearchDebounce,
  } = useGetListApplication();

  return (
    <CustomSelectDropdown
      {...props}
      data={data}
      onLoadMore={onLoadMore}
      onSearchDebounce={onSearchDebounce}
    />
  );
};

export const FormItemService = (props: any) => {
  const { data, onLoadMore, onSearchServiceDebounce: onSearchDebounce } = useGetListService();

  return (
    <CustomSelectDropdown
      {...props}
      data={data}
      onLoadMore={onLoadMore}
      onSearchDebounce={onSearchDebounce}
    />
  );
};

const CreateConsentForm = ({ visible, onClose, onReloadConsentData }: IProps) => {
  const { t } = useTranslation();
  const [createConsentForm] = Form.useForm();
  const [expireOn, setExpireOn] = useState(null);

  const onFinishSubmitForm = () => {
    onClose();
    createConsentForm.resetFields();
    setExpireOn(null);
    onReloadConsentData();
  };

  const createConsentRequest = useCreateConsent(onFinishSubmitForm);

  const onFinish = (values: any) => {
    createConsentRequest.run({
      ...values,
      expireOn,
    });
    setExpireOn(null);
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Cancel',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to cancel Consent Creation?',
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
        createConsentForm.resetFields();
        setExpireOn(null);
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
        createConsentForm.resetFields();
      }}
    >
      <Form layout='vertical' form={createConsentForm} onFinish={onFinish}>
        <Row gutter={[15, 24]}>
          <Col xs={12}>
            <InputForm
              label='Consent Name'
              name='name'
              required
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Consent Name' }),
                },
              ]}
              placeholder='Consent name'
            />
          </Col>
          <Col xs={12}>
            <Form.Item
              label='Application'
              name='applicationId'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Application' }),
                },
              ]}
            >
              <FormItemApplication />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <InputForm
              label='Product ID'
              name='productId'
              placeholder='Product ID'
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
              placeholder='Product name'
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
              label='Service'
              name='serviceId'
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Service' }),
                },
              ]}
            >
              <FormItemService />
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
              <Select placeholder='Select status'>
                {STATUS_CONSENT_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.label}
                  </Select.Option>
                ))}
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
              onChange={(date: any) => setExpireOn(date)}
              value={expireOn}
              placeholder='dd/mm/yyyy'
              disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))}
              superPrevIcon={null}
              prevIcon={null}
              dropdownClassName={styles.datePickerDropdown}
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
              placeholder='Title'
            />
          </Col>
          <Col xs={12}>
            <InputForm
              label='Version'
              name='version'
              required
              maxLength={8}
              placeholder='Version no'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Version' }),
                },
                {
                  max: 8,
                  message: t('messages.errors.max', { max: 8 }),
                },

                {
                  pattern: new RegExp(RegexUtils.RegexConstants.REGEX_VERSION),
                  message: `${t('messages.errors.invalid_version')}`,
                },
              ]}
            />
          </Col>
          <Col xs={24}>
            <InputTextAreaForm
              name='content'
              label='Content'
              placeholder='Consent content'
              rows={6}
              className={styles.textarea}
              classNameFormInput={styles.errorMessage}
              maxLength={500}
              required
              showCount={true}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Content' }),
                },
              ]}
            />
          </Col>
        </Row>
      </Form>

      <div className={styles.actions}>
        <Button
          className={styles.cancelBtn}
          onClick={() => {
            if (
              Object.keys(createConsentForm.getFieldsValue(true)).length === 0 ||
              Object.values(createConsentForm.getFieldsValue(true)).every(
                (item: any) => item.length === 0,
              )
            ) {
              onClose();
              createConsentForm.resetFields();
              setExpireOn(null);
              return;
            }
            showConfirm();
          }}
        >
          Cancel
        </Button>
        <Button htmlType='submit' onClick={() => createConsentForm.submit()}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default CreateConsentForm;
