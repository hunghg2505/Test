import { useClickAway } from 'ahooks';
import { Col, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { STATUS_DROPDOWN_DATA } from 'constants/common.constants';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import React, { useRef } from 'react';
import styles from './index.module.scss';

const SearchCaseAdvance = ({ onSearchDataSubject, t }: any) => {
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = React.useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();

  useClickAway(() => {
    setIsShowSearch(false);
  }, refSearch);

  const onVisibleSearch = () => {
    setIsShowSearch(!isShowSearch);
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
            <Form
              onFinish={(values) => {
                let conditions: { [key: string]: any } = {};
                if (values?.status) {
                  conditions = {
                    ...conditions,
                    status: {
                      searchString: values?.status || '',
                      isEqualSearch: false,
                    },
                  };
                }
                if (values?.dsName) {
                  conditions = {
                    ...conditions,
                    dsName: {
                      searchString: values?.dsName || '',
                      isEqualSearch: false,
                    },
                  };
                }
                if (values?.caseId) {
                  conditions = {
                    ...conditions,
                    caseId: {
                      searchString: values?.caseId || '',
                      isEqualSearch: false,
                    },
                  };
                }
                if (values?.assignTo) {
                  conditions = {
                    ...conditions,
                    assignTo: {
                      searchString: values?.assignTo || '',
                      isEqualSearch: false,
                    },
                  };
                }

                onSearchDataSubject({
                  advanceSearch: { ...conditions },
                });
                setIsShowSearch(false);
              }}
              form={formSearch}
              layout='vertical'
            >
              <Row gutter={[0, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label='Case Status'
                    name='status'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Status' }),
                      },
                    ]}
                  >
                    <Select placeholder='Search Case Status'>
                      {STATUS_DROPDOWN_DATA.map((item, index) => (
                        <Select.Option value={item.value} key={`${index}${item.value}`}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <InputForm
                    label='DS Name'
                    name='dsName'
                    placeholder='Search DS Name'
                    maxLength={55}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 }),
                      },
                    ]}
                  />
                </Col>

                <Col xs={24}>
                  <InputForm
                    label='Case ID'
                    name='caseId'
                    placeholder='Search Case ID'
                    maxLength={55}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 }),
                      },
                    ]}
                  />
                </Col>
                <Col xs={24} className={styles.emailFiled}>
                  <InputForm
                    label='Assign To'
                    name='assignTo'
                    placeholder='Assign To'
                    maxLength={55}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 }),
                      },
                    ]}
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

export default SearchCaseAdvance;
