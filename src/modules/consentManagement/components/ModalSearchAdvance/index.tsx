import { useClickAway } from 'ahooks';
import { Col, Divider, Form, Pagination, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { STATUS_CONSENT_DROPDOWN_DATA } from 'constants/common.constants';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import Select from 'libraries/UI/Select';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetListApplication, useGetListService } from '../CreateConsentForm/service';

import styles from './index.module.scss';

const ModalSearchAdvance = ({ children, onSearchConsent }: any) => {
  const { t } = useTranslation();
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();
  const [valueApplication, setValueApplication] = useState<string>();
  const [valueService, setValueService] = useState<string>();

  useClickAway((e: any) => {
    if (e?.target?.className === 'ant-select-item-option-content') return;
    setIsShowSearch(false);
  }, refSearch);

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
                  <Form.Item
                    label='Application'
                    name='application_id'
                    // required
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t('messages.errors.require', { field: 'Application' }),
                    //   },
                    // ]}
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
                        <Select.Option value={Number(item.id)} key={`${index}${item.id}`}>
                          {item.appName}
                        </Select.Option>
                      ))}
                    </Select>
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
                  <Form.Item
                    label='Service'
                    name='serviceId'
                    // required
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t('messages.errors.require', { field: 'Service' }),
                    //   },
                    // ]}
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
