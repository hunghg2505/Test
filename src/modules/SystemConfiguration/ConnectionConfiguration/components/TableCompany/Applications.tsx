import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Pagination, Row } from 'antd';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import InputForm from 'libraries/form/input/input-form';
import { paginationItemRender } from 'libraries/UI/Pagination';
import ButtonCustom from 'libraries/UI/Button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApplication } from '../../utils/services';
import { ApplicationItem } from './ApplicationItem';

import styles from './index.module.scss';
import { useApplications } from './services';

const AddNewApplications = ({
  companyId,
  refreshApplication,
  children,
}: {
  companyId: string;
  refreshApplication: () => void;
  children: any;
}) => {
  const [createApplicationForm] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinishCreateApplication = () => {
    createApplicationForm.resetFields();
    refreshApplication();
    onVisible();
  };

  const createApplicationReq = useCreateApplication(onFinishCreateApplication);

  const onFinish = (values: any) => {
    createApplicationReq.run({ ...values, companyId: Number(companyId) });
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Modal visible={visible} onCancel={onVisible} footer={false}>
        <div className={styles.formAddNew}>
          <Form form={createApplicationForm} onFinish={onFinish} layout='vertical'>
            <h4>Add new Application</h4>
            <Row justify='space-between' className={styles.divRow}>
              <InputForm
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
              <Button htmlType='submit' className={styles.addBtn} icon={<PlusCircleOutlined />} />
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const ApplicationsMemo = ({ companyId }: any) => {
  const { applications, refreshApplication, deleteApplication, updateApplication, onChange } =
    useApplications(companyId);
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
          <p>Application</p>
          <p>Action</p>
        </Row>
      )}

      {applications?.data?.map((application: any) => {
        return (
          <ApplicationItem
            key={`app-${application?.id}`}
            application={application}
            deleteApplication={deleteApplication}
            updateApplication={updateApplication}
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
