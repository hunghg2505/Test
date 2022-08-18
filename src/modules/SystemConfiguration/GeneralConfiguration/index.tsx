import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { useCallback, useState } from 'react';

import styles from './index.module.scss';
import {
  useCreateGeneralCaseManagement,
  useCreateGeneralConsentManagement,
  useDeleteGeneralCaseManagement,
  useDeleteGeneralConsentManagement,
  useGeneralConfig,
} from './service';

const { confirm } = Modal;

const FormFeatureItem = ({ listItem, featureId, refresh, type }: any) => {
  const [addNewForm] = Form.useForm();

  const onFinishSubmitForm = () => {
    refresh();
    addNewForm.resetFields();
  };

  const createGeneralCaseManagementReq = useCreateGeneralCaseManagement(onFinishSubmitForm);
  const deleteGeneralCaseManagementReq = useDeleteGeneralCaseManagement(onFinishSubmitForm);
  const createGeneralConsentManagementReq = useCreateGeneralConsentManagement(onFinishSubmitForm);
  const deleteGeneralConsentManagementReq = useDeleteGeneralConsentManagement(onFinishSubmitForm);

  const onAddNew = (values: any) => {
    if (type === 'Consent-Management') {
      createGeneralConsentManagementReq.run({ ...values, type: featureId });
      return;
    }
    createGeneralCaseManagementReq.run({ type: featureId, ...values });
  };

  const showConfirm = useCallback((id: string | number) => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to Delete?',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      okButtonProps: {
        className: styles.deleteBtn,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        if (type === 'Case-Management') {
          deleteGeneralCaseManagementReq.run(id, { type: featureId });
        }
        if (type === 'Consent-Management') {
          deleteGeneralConsentManagementReq.run(id, { type: featureId });
        }
      },
    });
  }, []);
  return (
    <div className={styles.content}>
      <Form onFinish={onAddNew} form={addNewForm}>
        <Row className={styles.formInput}>
          <InputForm
            name='name'
            label={'Add new'}
            maxLength={55}
            rules={[
              {
                required: true,
                message: 'Field name must be required.',
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
              <span className={styles.btnClose} onClick={() => showConfirm(it?.id)}>
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
          <FormFeatureItem
            listItem={feature?.listItem}
            type={feature?.type}
            featureId={feature?.id}
            refresh={refresh}
          />
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
