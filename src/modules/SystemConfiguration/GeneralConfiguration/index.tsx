import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import clsx from 'clsx';

import useSystemConfigPermission from 'hooks/useSystemConfigPermission';

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
  const { isHavePermissionCreateSystem, isHavePermissionDeleteSystem } =
    useSystemConfigPermission();

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
      content: 'Are you sure you want to delete this option?',
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
      {isHavePermissionCreateSystem && (
        <Form onFinish={onAddNew} form={addNewForm}>
          <p className={styles.textAddNew}>Add new Data Subject Rights</p>
          <Row className={styles.formInput}>
            <InputForm
              name='name'
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: 'Field name must be required.',
                },
              ]}
            />
            <Button htmlType='submit' type='secondary' className={styles.addBtn}>
              <svg
                width={27}
                height={26}
                viewBox='0 0 27 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.8 23.8327C19.7831 23.8327 24.6333 18.9824 24.6333 12.9993C24.6333 7.01626 19.7831 2.16602 13.8 2.16602C7.81692 2.16602 2.96667 7.01626 2.96667 12.9993C2.96667 18.9824 7.81692 23.8327 13.8 23.8327Z'
                  stroke='white'
                  strokeWidth={2}
                  strokeLinejoin='round'
                />
                <path
                  d='M13.8 8.66602V17.3327'
                  stroke='white'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9.46667 13H18.1333'
                  stroke='white'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
          </Row>
        </Form>
      )}

      <h4>Data Subject Rights List</h4>
      <div className={styles.list}>
        {listItem?.map((it: any) => {
          return (
            <span key={it?.name} className={styles.item}>
              {it?.name}
              {isHavePermissionDeleteSystem && (
                <span className={styles.btnClose} onClick={() => showConfirm(it?.id)}>
                  <svg
                    width={12}
                    height={12}
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M2 2L10 10'
                      stroke='#BDBDBD'
                      strokeWidth='1.3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2 10L10 2'
                      stroke='#BDBDBD'
                      strokeWidth='1.3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              )}
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
    <div className={clsx(styles.featureWrap, { [styles.featureWrapActive]: show })}>
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
    </div>
  );
};

const FeatureItem = ({ featureItem, refresh }: any) => {
  return (
    <div className={styles.FeatureItem}>
      <p className={styles.featureAppName}>{featureItem?.name}</p>

      {featureItem?.list?.map((val: any) => {
        return <FeatureItemContent key={val?.id} feature={val} refresh={refresh} />;
      })}
    </div>
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
