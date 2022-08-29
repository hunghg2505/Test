import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Pagination, Row } from 'antd';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import InputForm from 'libraries/form/input/input-form';
import { paginationItemRender } from 'libraries/UI/Pagination';
import ButtonCustom from 'libraries/UI/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApplication, useEditApplication } from '../../utils/services';
import { ApplicationItem } from './ApplicationItem';

import styles from './index.module.scss';
import { useApplications } from './services';

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      form.setFieldsValue({
        name: application?.name || '',
        rolemap: application?.rolemap || '',
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
          <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            initialValues={{
              name: application?.name,
              rolemap: application?.rolemap,
            }}
          >
            <h4>{isEdit ? 'Edit Application' : 'Add new Application'}</h4>

            <InputForm
              label='Application name'
              className={styles.input}
              name='name'
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Application name' }),
                },
              ]}
            />
            <InputForm
              className={styles.input}
              label='Role map'
              name='rolemap'
              maxLength={55}
              rules={[
                {
                  required: true,
                  message: t('messages.errors.require', { field: 'Role map' }),
                },
              ]}
            />
            <ButtonCustom htmlType='submit' className={styles.addBtn}>
              <PlusCircleOutlined />
            </ButtonCustom>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const ApplicationsMemo = ({ companyId }: any) => {
  const { applications, refreshApplication, onChange } = useApplications(companyId);
  const { isHavePermissionCreateSystem } = useSystemConfigPermission();

  return (
    <div className={styles.applicationWrap}>
      <h4>Company Name</h4>

      <Row align='middle' justify='space-between' className={styles.header}>
        <p>Application List</p>

        {isHavePermissionCreateSystem && (
          <AddNewApplications companyId={`${companyId}`} refreshApplication={refreshApplication}>
            <ButtonCustom>Create Application</ButtonCustom>
          </AddNewApplications>
        )}
      </Row>

      {!!applications?.data?.length && (
        <Row align='middle' justify='space-between' className={styles.headerTable}>
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
