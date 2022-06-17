import { Col, Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import { RegexUtils } from 'utils/regex-helper';
import styles from '../../index.module.scss';

const SearchUsersAdvance = ({ onSearchDataSubject, t }: any) => {
  const [formSearch] = Form.useForm();

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
    <div className={styles.formSearchAdvanced}>
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
  );
};

export default SearchUsersAdvance;
