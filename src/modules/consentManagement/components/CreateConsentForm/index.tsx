import React, { useCallback, useRef, useState } from 'react';

import styles from './index.module.scss';
import { Col, DatePicker, Form, Row, Modal, Divider, Pagination } from 'antd';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { useCreateConsent, useGetListApplication, useGetListService } from './service';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import ExclamationCircleOutlined from '@ant-design/icons/lib/icons/ExclamationCircleOutlined';
import { RegexUtils } from 'utils/regex-helper';
import { paginationItemRender } from 'libraries/UI/Pagination';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const { confirm } = Modal;

const CreateConsentForm = ({ visible, onClose }: IProps) => {
  const { t } = useTranslation();

  const [createConsentForm] = Form.useForm();

  const [expireOn, setExpireOn] = useState(null);
  const [valueApplication, setValueApplication] = useState<string>();
  const [valueService, setValueService] = useState<string>();

  const onFinishSubmitForm = () => {
    onClose();
    createConsentForm.resetFields();
    setExpireOn(null);
  };

  const createConsentRequest = useCreateConsent(onFinishSubmitForm);
  const {
    data: dataApplication,
    onChangePage: onChangePageApplication,
    onSearchApplicationDebounce,
    run: runApplicationService,
  } = useGetListApplication();
  const {
    data: dataService,
    onChangePage: onChangePageService,
    onSearchServiceDebounce,
    run: runService,
  } = useGetListService();

  const onFinish = (values: any) => {
    createConsentRequest.run({
      ...values,
      expireOn,
    });
    setExpireOn(null);
  };

  const onSearchApplication = (value: string) => {
    if (value && value?.length > 0) {
      onSearchApplicationDebounce({ name: value });
    } else {
      setTimeout(() => {
        runApplicationService({ page: 1 });
      }, 351);
    }
  };

  const onSearchService = (value: string) => {
    if (value && value?.length > 0) {
      onSearchServiceDebounce({ name: value });
    } else {
      setTimeout(() => {
        runService({ page: 1 });
      }, 351);
    }
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
                  message: t('messages.errors.require', { field: 'Data Subject Rights' }),
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
              <Select
                value={valueApplication}
                placeholder='Select application'
                onChange={(value) => setValueApplication(value)}
                showSearch
                onSearch={onSearchApplication}
                onSelect={() => runApplicationService({ page: 1 })}
                onBlur={() => runApplicationService({ page: 1 })}
                filterOption={false}
                dropdownRender={(menu: any) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Pagination
                      className={styles.pagination}
                      current={dataApplication?.current}
                      onChange={onChangePageApplication}
                      total={dataApplication?.total}
                      defaultPageSize={dataApplication?.pageSize}
                      itemRender={paginationItemRender}
                      showSizeChanger={false}
                    />
                  </>
                )}
              >
                {dataApplication?.data?.map((item: any, index: number) => (
                  <Select.Option value={Number(item.appId)} key={`${index}${item.appId}`}>
                    {item.appName}
                  </Select.Option>
                ))}
              </Select>
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
              <Select
                value={valueService}
                onChange={(value) => setValueService(value)}
                showSearch
                onSearch={onSearchService}
                onSelect={() => runService({ page: 1 })}
                onBlur={() => runService({ page: 1 })}
                filterOption={false}
                placeholder='Select service'
                dropdownRender={(menu: any) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Pagination
                      className={styles.pagination}
                      current={dataService?.current}
                      onChange={onChangePageService}
                      total={dataService?.total}
                      defaultPageSize={dataService?.pageSize}
                      itemRender={paginationItemRender}
                      showSizeChanger={false}
                    />
                  </>
                )}
              >
                {dataService?.data?.map((item: any, index: number) => (
                  <Select.Option value={Number(item?.id)} key={`${index}${item?.appId}`}>
                    {item?.name}
                  </Select.Option>
                ))}
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
              <Select placeholder='Select status'>
                {STATUS_CONSENT_DROPDOWN_DATA.map((item, index) => (
                  <Select.Option value={item.value} key={`${index}${item.value}`}>
                    {item.value}
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
              maxLength={6}
              placeholder='Version no'
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Version' }),
                },
                {
                  max: 6,
                  message: t('messages.errors.max', { max: 6 }),
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
