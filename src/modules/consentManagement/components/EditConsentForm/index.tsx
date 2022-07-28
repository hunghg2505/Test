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
import { useConsentDetail, useGetListApplication, useUpdateConsent } from './service';
import moment from 'moment';
import Loading from 'libraries/components/loading';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import { RegexUtils } from 'utils/regex-helper';
import { paginationItemRender } from 'libraries/UI/Pagination';

export default function EditConsentForm() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(true);
  const [value, setValue] = useState<string>();
  const [expireOn, setExpireOn] = useState<null | moment.Moment>(null);
  const [editConsentForm] = Form.useForm();

  const onFinishSubmitForm = () => {
    setIsEdit(true);
  };

  const { data, loading } = useConsentDetail(`${id}`);
  const updateConsentRequest = useUpdateConsent(`${id}`, onFinishSubmitForm);
  const {
    data: dataListApplication,
    loading: loadingListAppication,
    onChangePage,
    onSearchApplicationDebounce,
    run,
  } = useGetListApplication();

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
                applicationId: Number(data?.application?.appId),
                productId: data?.productId,
                productName: data?.productName,
                serviceId: Number(data?.service?.id),
                status: data?.status,
                version: data?.version,
                content: data?.content,
                title: data?.title,
              }}
              onFinish={onFinish}
            >
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
                      value={value}
                      onChange={(value) => setValue(value)}
                      showSearch
                      onSearch={onSearchApplication}
                      filterOption={false}
                      onSelect={() => run({ page: 1 })}
                      onBlur={() => run({ page: 1 })}
                      dropdownRender={(menu: any) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Pagination
                            className={styles.pagination}
                            current={dataListApplication?.current}
                            onChange={onChangePage}
                            total={dataListApplication?.total}
                            defaultPageSize={dataListApplication?.pageSize}
                            itemRender={paginationItemRender}
                            showSizeChanger={false}
                          />
                        </>
                      )}
                    >
                      {dataListApplication?.data?.map((item: any, index: number) => (
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
                    name='serviceId'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Services' }),
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value={1}>Test service 1</Select.Option>
                      <Select.Option value={2}>Test service 2</Select.Option>
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
                    rows={6}
                    className={styles.textarea}
                    maxLength={500}
                    required
                    showCount={true}
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Version' }),
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
