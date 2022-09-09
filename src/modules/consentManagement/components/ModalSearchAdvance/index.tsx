import { useClickAway } from 'ahooks';
import { Col, DatePicker, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { CustomSelectDropdown } from 'modules/dataSubjectManagement/components/CreateCaseForm';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormItemApplication } from '../CreateConsentForm';

import styles from './index.module.scss';
import { useGetListStatusConsent } from './service';

const ModalSearchAdvance = ({ onSearchConsent }: any) => {
  const { t } = useTranslation();
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [createdStartDate, setCreatedStartDate] = useState<any>(null);
  const [createdEndDate, setCreatedEndDate] = useState<any>(null);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();
  const { data } = useGetListStatusConsent();

  useClickAway((e: any) => {
    if (e?.target?.className === 'ant-select-item-option-content') return;
    setIsShowSearch(false);
  }, refSearch);

  const formatDateParam = () => {
    const activationDate =
      createdStartDate || createdEndDate
        ? {
            startDate: createdStartDate ? moment(createdStartDate).toISOString() : null,
            endDate: createdEndDate ? moment(createdEndDate).toISOString() : null,
          }
        : undefined;

    return { activationDate };
  };

  const onFinish = (values: any) => {
    const { activationDate } = formatDateParam();
    onSearchConsent({
      appName: values?.application_name || '',
      advanceSearch: {
        name: values?.consent_name || undefined,
        id: values?.consent_id || undefined,
        appId: values?.application_id || undefined,
        status: values?.status || undefined,
        version: values?.version || undefined,
        activationDate,
      },
    });
    setIsShowSearch(false);
  };

  const onVisibleSearch = () => {
    setIsShowSearch(!isShowSearch);
  };

  const disabledStartedDate = (current: any) => (date: any) => {
    const customDate = moment(date).format('YYYY-MM-DD');
    return current && date && current > moment(customDate, 'YYYY-MM-DD').add(1, 'd');
  };
  const disabledEndedDate = (current: any) => (date: any) => {
    const customDate = moment(date).format('YYYY-MM-DD');
    return current && date && current < moment(customDate, 'YYYY-MM-DD');
  };

  const onClearValue = () => {
    formSearch.resetFields(['application_name']);
  };

  const onClearSearch = () => {
    formSearch.resetFields(['status']);
  };

  return (
    <div style={{ position: 'relative' }} ref={refSearch}>
      <Button
        typeDisplay='ghost'
        className={styles.btnSearchAdvanced}
        icon={<IconCross />}
        onClick={onVisibleSearch}
      >
        {t('advanced')}
      </Button>

      <div
        id='searchAdvanceOverlay'
        style={{
          position: 'absolute',
          top: '160%',
          right: '-15px',
          zIndex: 3,
        }}
      >
        {_isTransitioning && (
          <div
            className={styles.formSearchAdvanced}
            ref={refFormModal}
            style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}
          >
            <Form form={formSearch} layout='vertical' onFinish={onFinish}>
              <Row gutter={[0, 16]} justify='space-between'>
                <Col xs={11}>
                  <InputForm
                    label='Application ID'
                    name='application_id'
                    placeholder='Application ID'
                    maxLength={55}
                  />
                </Col>
                <Col xs={11}>
                  <Form.Item label='Application Name' name='application_name'>
                    <FormItemApplication
                      onClearValue={onClearValue}
                      isInModalAdvancedSearch={true}
                    />
                  </Form.Item>
                </Col>

                <Col xs={11}>
                  <InputForm
                    label='Consent ID'
                    name='consent_id'
                    placeholder='Consent ID'
                    maxLength={55}
                  />
                </Col>
                <Col xs={11}>
                  <InputForm
                    label='Consent Name'
                    name='consent_name'
                    placeholder='Consent Name'
                    maxLength={55}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                    ]}
                  />
                </Col>

                <Col xs={11}>
                  <Form.Item label='Status' name='status'>
                    <CustomSelectDropdown
                      data={data}
                      allowClear
                      onClearValue={onClearSearch}
                      placeholder='Select Status'
                    />
                  </Form.Item>
                </Col>

                <Col xs={11}>
                  <InputForm
                    label='Version'
                    name='version'
                    placeholder='Version no'
                    maxLength={8}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                    ]}
                  />
                </Col>
                <Col xs={24}>
                  <p className={styles.datePickerLabel}>Activation Date</p>
                </Col>
                <Col xs={11}>
                  <p className={styles.datePickerLabel}>From</p>
                  <DatePicker
                    getPopupContainer={(trigger: any) => trigger.parentElement}
                    format='DD/MM/YYYY'
                    style={{ width: '100%' }}
                    size='large'
                    onChange={(date: any) => setCreatedStartDate(date)}
                    value={createdStartDate}
                    placeholder='dd/mm/yyyy'
                    disabledDate={(current) => disabledStartedDate(current)(createdEndDate)}
                  />
                </Col>
                <Col xs={11}>
                  <p className={styles.datePickerLabel}>To</p>
                  <DatePicker
                    getPopupContainer={(trigger: any) => trigger.parentElement}
                    format='DD/MM/YYYY'
                    style={{ width: '100%' }}
                    size='large'
                    onChange={(date: any) => setCreatedEndDate(date)}
                    value={createdEndDate}
                    placeholder='dd/mm/yyyy'
                    disabledDate={(current) => disabledEndedDate(current)(createdStartDate)}
                  />
                </Col>
              </Row>

              <Button
                htmlType='submit'
                type='secondary'
                className={styles.btnSearchAdvancedDd}
                icon={<IconSearch />}
              >
                {t('Search')}
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalSearchAdvance;
