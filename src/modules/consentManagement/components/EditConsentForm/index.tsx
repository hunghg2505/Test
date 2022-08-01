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
                      placeholder='Select application'
                      value={valueApplication}
                      onChange={(value) => setValueApplication(value)}
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
                        <Select.Option value={Number(item.id)} key={`${index}${item.id}`}>
                          {item.appName}
                        </Select.Option>
                      ))}
                    </Select>
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
                      placeholder='Select service'
                      onSearch={onSearchService}
                      onSelect={() => runService({ page: 1 })}
                      onBlur={() => runService({ page: 1 })}
                      filterOption={false}
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
                    disabledDate={(current) => {
                      return current && current.valueOf() <= Date.now();
                    }}
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
                    maxLength={6}
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Version' }),
                      },
                      {
                        max: 8,
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
