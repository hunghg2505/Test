import { useClickAway } from 'ahooks';
import { Col, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormItemApplication, FormItemService } from '../CreateConsentForm';

import styles from './index.module.scss';

const ModalSearchAdvance = ({ onSearchConsent }: any) => {
  const { t } = useTranslation();
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();

  useClickAway((e: any) => {
    if (e?.target?.className === 'ant-select-item-option-content') return;
    setIsShowSearch(false);
  }, refSearch);

  const onFinish = (values: any) => {
    onSearchConsent({
      advanceSearch: {
        name: values?.consent_name || '',
        productId: values?.product_id || '',
        productName: values?.product_name || '',
        status: values?.status || '',
        version: values?.version || '',
        service: values?.serviceId,
      },
    });
  };

  const onVisibleSearch = () => {
    setIsShowSearch(!isShowSearch);
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
              <Row gutter={[0, 16]}>
                <Col xs={24}>
                  <InputForm
                    label='Consent Name'
                    name='consent_name'
                    placeholder='Consent Name'
                    maxLength={55}
                  />
                </Col>
                <Col xs={24}>
                  <Form.Item label='Application' name='application_id'>
                    <FormItemApplication />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <InputForm
                    label='Product ID'
                    name='product_id'
                    placeholder='Product ID'
                    maxLength={55}
                  />
                </Col>
                <Col xs={24}>
                  <InputForm
                    label='Product Name'
                    name='product_name'
                    placeholder='Product Name'
                    maxLength={55}
                  />
                </Col>

                <Col xs={24}>
                  <Form.Item label='Service' name='serviceId'>
                    <FormItemService />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label='Status' name='status'>
                    <Select placeholder='Select status'>
                      {STATUS_CONSENT_DROPDOWN_DATA.map((item, index) => (
                        <Select.Option value={item.value} key={`${index}${item.value}`}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <InputForm label='Version' name='version' placeholder='Version' maxLength={55} />
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
