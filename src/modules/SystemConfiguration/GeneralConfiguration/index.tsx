import { Form, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import {
  useCreateGeneralCaseManagement,
  useDeleteGeneralCaseManagement,
  useGeneralConfig,
} from './service';

const FormFeatureItem = ({ listItem, featureId, refresh }: any) => {
  const { t } = useTranslation();

  const [addNewForm] = Form.useForm();

  const onFinishSubmitForm = () => {
    refresh();
    addNewForm.resetFields();
  };

  const createGeneralCaseManagementReq = useCreateGeneralCaseManagement(onFinishSubmitForm);
  const deleteGeneralCaseManagementReq = useDeleteGeneralCaseManagement(onFinishSubmitForm);

  const onAddNew = (values: any) => {
    createGeneralCaseManagementReq.run({ type: featureId, ...values });
  };
  return (
    <div className={styles.content}>
      <Form onFinish={onAddNew} form={addNewForm}>
        <Row className={styles.formInput}>
          <InputForm
            name='name'
            label={'Add new'}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: 'Name' }),
              },
            ]}
          />
          <Button htmlType='submit' className={styles.addBtn}>
            Add
          </Button>
        </Row>
      </Form>

      <div className={styles.list}>
        <h4>List</h4>
        {listItem?.map((it: any) => {
          return (
            <span key={it?.name} className={styles.item}>
              {it?.name}
              <span
                className={styles.btnClose}
                onClick={() => deleteGeneralCaseManagementReq.run(it?.id, { type: featureId })}
              >
                X
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const FeatureItemContent = ({ feature, refresh }: any) => {
  const [show, setShow] = useState(false);
  const onVisible = () => {
    setShow(!show);
  };

  return (
    <>
      <Row justify='space-between' align='middle' className={styles.FeatureItemContent}>
        <span className={styles.featureName}>{feature?.name}</span>
        <span onClick={onVisible} className={styles.arrow}>
          <IconArrowDown />
        </span>
      </Row>

      {show && (
        <>
          <FormFeatureItem listItem={feature?.listItem} featureId={feature?.id} refresh={refresh} />
        </>
      )}
    </>
  );
};

const FeatureItem = ({ featureItem, refresh }: any) => {
  const [show, setShow] = useState(false);
  const onVisible = () => {
    setShow(!show);
  };

  return (
    <>
      <Row justify='space-between' align='middle' className={styles.FeatureItem}>
        <span className={styles.featureAppName}>{featureItem?.name}</span>
        <span onClick={onVisible} className={styles.arrow}>
          <IconArrowDown />
        </span>
      </Row>

      {show && (
        <>
          {featureItem?.list?.map((val: any) => {
            return <FeatureItemContent key={val?.id} feature={val} refresh={refresh} />;
          })}
        </>
      )}
    </>
  );
};

const GeneralConfiguration = () => {
  const { data, refresh } = useGeneralConfig();

  if (!data) return null;

  return (
    <div className={styles.wrap}>
      <h1>General Configuration</h1>
      <h3>Feature List</h3>
      {data?.featureList?.map((it: any) => {
        return <FeatureItem key={it?.id} featureItem={it} refresh={refresh} />;
      })}
    </div>
  );
};

export default GeneralConfiguration;
