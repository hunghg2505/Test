import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { Col, DatePicker, Divider, Form, Pagination, Row } from 'antd';
import Select from 'libraries/UI/Select';
import { useTranslation } from 'react-i18next';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import ConsentInfo from '../ConsentInfo';
import { useParams } from 'react-router-dom';
import {
  useConsentDetail,
  useGetListApplication,
  useGetListService,
  useUpdateConsent,
} from './service';
import moment from 'moment';
import Loading from 'libraries/components/loading';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import { RegexUtils } from 'utils/regex-helper';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { FormItemApplication, FormItemService } from '../CreateConsentForm';

export default function EditConsentForm() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(true);
  const [valueApplication, setValueApplication] = useState<string>();
  const [valueService, setValueService] = useState<string>();
  const [expireOn, setExpireOn] = useState<null | moment.Moment>(null);
  const [editConsentForm] = Form.useForm();

  const onFinishSubmitForm = () => {
    setIsEdit(true);
    refresh();
  };

  const { data, loading, refresh } = useConsentDetail(`${id}`);
  const updateConsentRequest = useUpdateConsent(`${id}`, onFinishSubmitForm);
  const {
    data: dataListApplication,
    loading: loadingListAppication,
    onChangePage,
    onSearchApplicationDebounce,
    run,
  } = useGetListApplication();
  const {
    data: dataService,
    onChangePage: onChangePageService,
    onSearchServiceDebounce,
    run: runService,
  } = useGetListService();

  useEffect(() => {
    if (!loading) {
      if (data?.expireOn) {
        setExpireOn(moment(data?.expireOn));
      }
    }
  }, [data]);

  const onFinish = (values: any) => {
    updateConsentRequest.run({ ...values, expireOn });
  };

  const onSearchApplication = (value: string) => {
    if (value && value?.length > 0) {
      onSearchApplicationDebounce({ name: value });
    } else {
      setTimeout(() => {
        run({ page: 1 });
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

  const disabledDate = (current: any) => {
    const customDate = moment().format('YYYY-MM-DD');
    return current && current < moment(customDate, 'YYYY-MM-DD');
  };

  return (
    <>
      <h2 className={styles.title}>Consent Detail</h2>
      {!isEdit ? (
        <div className={styles.form}>
          {loading ? (
            <Loading />
          ) : (
            <Form
              layout='vertical'
              form={editConsentForm}
              disabled={isEdit}
              initialValues={{
                name: data?.name,
                applicationId: Number(data?.application?.id),
                productId: data?.productId,
                productName: data?.productName,
                serviceId: Number(data?.service?.id),
                status: data?.status,
                version: data?.version,
                content: data?.content,
                title: data?.title,
                id: data?.consentId,
              }}
              onFinish={onFinish}
            >
              <Row gutter={[15, 24]}>
                <Col xs={12}>
                  <InputForm
                    label='Consent Name'
                    name='name'
                    placeholder='Consent name'
                    required
                    maxLength={55}
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Consent Name' }),
                      },
                    ]}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm label='Consent ID' name='id' disabled required />
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
                    placeholder='Product ID'
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
                  <InputForm
                    label='Product Name'
                    name='productName'
                    placeholder='Product name'
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
                    disabledDate={disabledDate}
                    superPrevIcon={null}
                    prevIcon={null}
                    dropdownClassName={styles.datePickerDropdown}
                    allowClear={false}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label='Title'
                    name='title'
                    placeholder='Title'
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
                    placeholder='Version no'
                    maxLength={8}
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
          )}

          <div className={styles.actions}>
            <>
              <Button
                onClick={() => {
                  setIsEdit(true);
                  editConsentForm.resetFields();
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{' '}
              <Button htmlType='submit' onClick={() => editConsentForm.submit()}>
                Submit
              </Button>
            </>
          </div>
        </div>
      ) : (
        <ConsentInfo onClickEdit={() => setIsEdit(false)} data={data} />
      )}
    </>
  );
}
