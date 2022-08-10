import { useClickAway } from 'ahooks';
import { Col, DatePicker, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const AdvancedSearch = ({ onSearchCompany }: any) => {
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = React.useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const [createdStartDate, setCreatedStartDate] = useState<any>(null);
  const [createdEndDate, setCreatedEndDate] = useState<any>(null);
  const refSearch: any = useRef();
  const { t } = useTranslation();

  useClickAway(() => {
    setIsShowSearch(false);
  }, refSearch);

  const onVisibleSearch = () => {
    setIsShowSearch(!isShowSearch);
  };

  const onFinish = (values: any) => {
    const createdAt =
      createdStartDate || createdEndDate
        ? {
            startDate: createdStartDate ? moment(createdStartDate).toISOString() : null,
            endDate: createdEndDate ? moment(createdEndDate).toISOString() : null,
          }
        : undefined;
    onSearchCompany({
      advanceSearch: { createdAt },
    });
    setIsShowSearch(false);
  };

  const disabledStartedDate = (current: any) => (date: any) => {
    const customDate = moment(date).format('YYYY-MM-DD');
    return current && date && current > moment(customDate, 'YYYY-MM-DD').add(1, 'd');
  };
  const disabledEndedDate = (current: any) => (date: any) => {
    const customDate = moment(date).format('YYYY-MM-DD');
    return current && date && current < moment(customDate, 'YYYY-MM-DD');
  };

  return (
    <div style={{ position: 'relative' }} ref={refSearch}>
      <Button
        onClick={onVisibleSearch}
        typeDisplay='ghost'
        className={styles.btnSearchAdvanced}
        icon={<IconCross />}
      >
        {t('advanced')}
      </Button>
      <div
        id='searchAdvanceOverlay'
        style={{
          position: 'absolute',
          top: '130%',
          right: 0,
          zIndex: 1,
        }}
      >
        {_isTransitioning && (
          <div
            className={styles.formSearchAdvanced}
            ref={refFormModal}
            style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}
          >
            <Form onFinish={onFinish} form={formSearch} layout='vertical'>
              <Row gutter={[0, 16]} justify='space-between'>
                <Col xs={24}>
                  <p className={styles.datePickerLabel}>Created Date</p>
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

export default AdvancedSearch;
