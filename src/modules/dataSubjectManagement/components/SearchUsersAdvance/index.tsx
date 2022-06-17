import { useClickAway } from 'ahooks';
import { Col, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { useFadeEffect } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import React, { useRef } from 'react';
import { RegexUtils } from 'utils/regex-helper';
import styles from '../../index.module.scss';

const _popoverStyles = {
  opacity: 0,
  transitionDuration: '300ms',
  transitionProperty: 'opacity',
  transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)'
};

const _popoverVisibleStyles = {
  opacity: 1,
  transitionDuration: '300ms',
  transitionTimingFunction: 'cubic-bezier(0, 0, 1, 1)'
};

const SearchUsersAdvance = ({ onSearchDataSubject, t }: any) => {
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

  const onBlur = (name: string, msg?: string) => {
    const username = formSearch.getFieldValue(name);

    if (!username) {
      const msgErr = msg || t('messages.errors.min', { min: 3 });
      formSearch.setFields([
        {
          name,
          errors: [msgErr]
        }
      ]);
    }
  };
  return (
    <div style={{ position: 'relative' }} ref={refSearch}>
      <Button
        typeDisplay="ghost"
        className={styles.btnSearchAdvanced}
        icon={<IconCross />}
        onClick={onVisibleSearch}>
        {t('advanced')}
      </Button>
      <div
        id="searchAdvanceOverlay"
        style={{
          position: 'absolute',
          top: '100%',
          right: 0
        }}>
        {_isTransitioning && (
          <div
            className={styles.formSearchAdvanced}
            ref={refFormModal}
            style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}>
            <Form
              onFinish={(values) => {
                onSearchDataSubject({
                  advanceSearch: values
                });
              }}
              form={formSearch}
              layout="vertical">
              <Row gutter={[0, 16]}>
                <Col xs={24}>
                  <InputForm
                    label="First Name"
                    name="firstname"
                    placeholder="First Name"
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 })
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 })
                      },
                      {
                        required: true,
                        message: t('messages.errors.min', { min: 3 })
                      }
                    ]}
                    onBlur={() => onBlur('firstname')}
                  />
                </Col>
                <Col xs={24}>
                  <InputForm
                    label="Last Name"
                    name="lastNameEn"
                    placeholder="Last Name"
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 })
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 })
                      }
                    ]}
                    onBlur={() => onBlur('lastNameEn')}
                  />
                </Col>

                <Col xs={24}>
                  <InputForm
                    label="Company"
                    name="company"
                    placeholder="Company"
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 })
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 })
                      }
                    ]}
                    onBlur={() => onBlur('company')}
                  />
                </Col>
                <Col xs={24} className={styles.emailFiled}>
                  <InputForm
                    label="Email"
                    name="email"
                    placeholder="Email"
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 })
                      },
                      {
                        max: 55,
                        message: t('messages.errors.max', { max: 55 })
                      },
                      {
                        pattern: new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL),
                        message: `${t('messages.errors.email_invalid')}`
                      }
                    ]}
                    onBlur={() => onBlur('email')}
                  />
                </Col>

                <Col xs={24}>
                  <InputForm
                    label="Mobile number"
                    name="mobile"
                    placeholder="Mobile number"
                    rules={[
                      {
                        min: 3,
                        message: t('messages.errors.min', { min: 3 })
                      }
                    ]}
                    onBlur={() => onBlur('mobile')}
                  />
                </Col>
                <Col xs={24}>
                  <Form.Item label="Application" name="application">
                    <Select placeholder="Please Select">
                      <Select.Option value="lucy">Lucy</Select.Option>
                      <Select.Option value="lucy1">Lucy1</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Button
                htmlType="submit"
                type="secondary"
                className={styles.btnSearchAdvancedDd}
                icon={<IconSearch />}>
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
