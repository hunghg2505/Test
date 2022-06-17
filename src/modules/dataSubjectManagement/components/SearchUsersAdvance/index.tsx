import { Col, Form, Row } from 'antd';
import IconSearch from 'assets/icons/icon-search';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import styles from '../../index.module.scss';

const SearchUsersAdvance = ({ onSearchDataSubject, t }: any) => {
  return (
    <div className={styles.formSearchAdvanced}>
      <Form
        onFinish={(values) => {
          onSearchDataSubject({
            advanceSearch: values
          });
        }}
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
            />
          </Col>
          <Col xs={24}>
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
                }
              ]}
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
