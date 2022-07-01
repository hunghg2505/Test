import { useClickAway } from 'ahooks';
import { Col, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import React, { useRef } from 'react';
import styles from '../../index.module.scss';

const formatAdvancedSearchObject = (obj: any) => {
  const conditions: { [key: string]: any } = {};
  for (const key in obj) {
    if (key === 'application') {
      if (obj[key] === null) {
        delete obj[key];
      } else {
        conditions[key] = obj[key];
      }
    }
    if (obj[key] && key !== 'firstname') {
      conditions[key] = { searchString: obj[key], isEqualSearch: false };
    }
  }
  return conditions;
};

const SearchUsersAdvance = ({ onSearchDataSubject, t }: any) => {
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = React.useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();

  useClickAway((e: any) => {
    if (e?.target?.className === 'ant-select-item-option-content') return;
    setIsShowSearch(false);
  }, refSearch);

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
                const conditions = formatAdvancedSearchObject(values);
                onSearchDataSubject({
                  advanceSearch: {
                    firstname: values.firstname,
                    ...conditions,
                  },
                });

                setIsShowSearch(false);
              }}
              form={formSearch}
              layout='vertical'
            >
              <Row gutter={[0, 16]}>
                <Col xs={24}>
                  <InputForm
                    label='First Name'
                    name='firstname'
                    placeholder='First Name'
                    maxLength={55}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value &&
                            !getFieldValue('lastNameEn') &&
                            !getFieldValue('company') &&
                            !getFieldValue('email') &&
                            !getFieldValue('mobile') &&
                            !getFieldValue('application')
                          ) {
                            return Promise.reject(
                              t('messages.errors.require', { field: 'Firstname' }),
                            );
                          }

                          return Promise.resolve();
                        },
                      }),
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 }),
                      },
                    ]}
                    // onBlur={() => onBlur('firstname')}
                  />
                </Col>
                <Col xs={24}>
                  <InputForm
                    label='Last Name'
                    name='lastNameEn'
                    placeholder='Last Name'
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
                      ({ getFieldError, isFieldValidating }) => ({
                        validator() {
                          if (
                            isFieldValidating('lastNameEn') &&
                            getFieldError('firstname').includes(
                              t('messages.errors.require', { field: 'Firstname' }),
                            )
                          ) {
                            formSearch.setFields([
                              {
                                name: 'firstname',
                                errors: [],
                              },
                            ]);
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    // onBlur={() => onBlur('lastNameEn')}
                  />
                </Col>

                <Col xs={24}>
                  <InputForm
                    label='Company'
                    name='company'
                    placeholder='Company'
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
                      ({ getFieldError, isFieldValidating }) => ({
                        validator() {
                          if (
                            isFieldValidating('company') &&
                            getFieldError('firstname').includes(
                              t('messages.errors.require', { field: 'Firstname' }),
                            )
                          ) {
                            formSearch.setFields([
                              {
                                name: 'firstname',
                                errors: [],
                              },
                            ]);
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    // onBlur={() => onBlur('company')}
                  />
                </Col>
                <Col xs={24} className={styles.emailFiled}>
                  <InputForm
                    label='Email'
                    name='email'
                    placeholder='Email'
                    maxLength={30}
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 }),
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 }),
                      },
                      ({ getFieldError, isFieldValidating }) => ({
                        validator() {
                          if (
                            isFieldValidating('email') &&
                            getFieldError('firstname').includes(
                              t('messages.errors.require', { field: 'Firstname' }),
                            )
                          ) {
                            formSearch.setFields([
                              {
                                name: 'firstname',
                                errors: [],
                              },
                            ]);
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    // onBlur={() => onBlur('email')}
                  />
                </Col>

                <Col xs={24}>
                  <InputForm
                    label='Mobile number'
                    name='mobile'
                    placeholder='Mobile number'
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
                      ({ getFieldError, isFieldValidating }) => ({
                        validator() {
                          if (
                            isFieldValidating('mobile') &&
                            getFieldError('firstname').includes(
                              t('messages.errors.require', { field: 'Firstname' }),
                            )
                          ) {
                            formSearch.setFields([
                              {
                                name: 'firstname',
                                errors: [],
                              },
                            ]);
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    // onBlur={() => onBlur('mobile')}
                  />
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label='Application'
                    name='application'
                    rules={[
                      ({ getFieldError, isFieldValidating }) => ({
                        validator() {
                          if (
                            isFieldValidating('application') &&
                            getFieldError('firstname').includes(
                              t('messages.errors.require', { field: 'Firstname' }),
                            )
                          ) {
                            formSearch.setFields([
                              {
                                name: 'firstname',
                                errors: [],
                              },
                            ]);
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Select placeholder='Please Select'>
                      <Select.Option value={null}>Please Select</Select.Option>
                      <Select.Option value={0}>Lucy</Select.Option>
                      <Select.Option value={1}>Lucy1</Select.Option>
                    </Select>
                  </Form.Item>
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

export default SearchUsersAdvance;
