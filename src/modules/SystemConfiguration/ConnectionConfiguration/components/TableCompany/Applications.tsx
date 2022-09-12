import ExclamationCircleOutlined from '@ant-design/icons/lib/icons/ExclamationCircleOutlined';
import { Form, Modal, Pagination, Row } from 'antd';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import InputForm from 'libraries/form/input/input-form';
import ButtonCustom from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApplication, useEditApplication } from '../../utils/services';
import { ApplicationItem } from './ApplicationItem';

import styles from './index.module.scss';
import { useApplications } from './services';

const { confirm } = Modal;

export const AddNewApplications = ({
  companyId,
  refreshApplication,
  children,
  isEdit,
  application,
}: {
  companyId: string;
  refreshApplication: () => void;
  children: any;
  isEdit?: boolean;
  application?: any;
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Cancel',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: isEdit
        ? 'Are you sure you want to Cancel Editing?'
        : 'Are you sure you want to cancel Application Creation?',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      centered: true,
      okButtonProps: {
        className: styles.btnDelete,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        setVisible(false);
        form.resetFields();
      },
    });
  }, []);

  const initialValues = {
    name: application?.name,
    roleMap: application?.roleMap,
  };

  const onCancel = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const valInit = Object.values(initialValues);
    const valForm = Object.values(form.getFieldsValue(true))?.filter((v) => v);

    if (JSON.stringify(valInit) === JSON.stringify(valForm)) {
      onVisible();
      form.resetFields();
      return;
    }
    showConfirm();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      form.setFieldsValue({
        name: application?.name || '',
        roleMap: application?.roleMap || '',
      });
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [visible, application]);

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinishCreateApplication = () => {
    form.resetFields();
    refreshApplication();
    onVisible();
  };

  const createApplicationReq = useCreateApplication(onFinishCreateApplication);
  const editApplicationReq = useEditApplication(onFinishCreateApplication);

  const onFinish = (values: any) => {
    if (isEdit) {
      editApplicationReq.run({ ...values, companyId: Number(companyId), id: application?.id });
      return;
    }
    createApplicationReq.run({ ...values, companyId: Number(companyId) });
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Modal visible={visible} onCancel={onVisible} footer={false} centered>
        <div className={styles.formAddNew}>
          <Form form={form} onFinish={onFinish} layout='vertical' initialValues={initialValues}>
            <h4>{isEdit ? 'Edit Application' : 'Add new Application'}</h4>

            <InputForm
              label='Application Name'
              className={styles.input}
              name='name'
              maxLength={55}
              required
              rules={[
                {
                  required: true,
                  message: t('messages.errors.blank', { field: 'Application Name' }),
                },
              ]}
            />
            <InputForm
              className={styles.input}
              label='User Role Map'
              name='roleMap'
              required
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.blank', { field: 'User Role Map' }),
                },
              ]}
            />

            <div className={styles.actions}>
              <ButtonCustom type='secondary' onClick={onCancel} className={styles.cancelBtn}>
                Cancel
              </ButtonCustom>
              <ButtonCustom htmlType='submit' className={styles.addBtn}>
                Submit
              </ButtonCustom>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const ApplicationsMemo = ({ companyId, companyName }: any) => {
  const { applications, refreshApplication, onChange, deleteApplication } =
    useApplications(companyId);
  const { isHavePermissionCreateSystem } = useSystemConfigPermission();

  return (
    <div className={styles.applicationWrap}>
      <h2>{companyName}</h2>

      <Row align='middle' justify='space-between' className={styles.header}>
        <p>Application List</p>

        {isHavePermissionCreateSystem && (
          <AddNewApplications companyId={`${companyId}`} refreshApplication={refreshApplication}>
            <ButtonCustom className={styles.createAppBtn}>Create Application</ButtonCustom>
          </AddNewApplications>
        )}
      </Row>

      {!!applications?.data?.length && (
        <Row className={styles.headerTable}>
          <p>Application Name</p>
          <p>User Role Map</p>
          <p>Action</p>
        </Row>
      )}

      {applications?.data?.map((application: any) => {
        return (
          <ApplicationItem
            key={`app-${application?.id}`}
            application={application}
            refreshApplication={refreshApplication}
            companyId={companyId}
            deleteApplication={deleteApplication}
          />
        );
      })}

      {!!applications?.data?.length && (
        <Row justify='end' className={styles.paginationApp}>
          <Pagination
            current={applications?.current}
            onChange={onChange}
            total={applications?.total}
            defaultPageSize={applications?.pageSize}
            itemRender={paginationItemRender}
            showSizeChanger={false}
          />
        </Row>
      )}
    </div>
  );
};

export const Applications = React.memo(ApplicationsMemo);
