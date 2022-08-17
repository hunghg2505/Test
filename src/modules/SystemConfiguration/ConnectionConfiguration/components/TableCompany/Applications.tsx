import { Form, Pagination, Row } from 'antd';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApplication } from '../../utils/services';
import { ApplicationItem } from './ApplicationItem';

import styles from './index.module.scss';
import { useApplications } from './services';

const AddNewApplications = ({
  companyId,
  refreshApplication,
}: {
  companyId: string;
  refreshApplication: () => void;
}) => {
  const [createApplicationForm] = Form.useForm();
  const { t } = useTranslation();

  const onFinishCreateApplication = () => {
    createApplicationForm.resetFields();
    refreshApplication();
  };

  const createApplicationReq = useCreateApplication(onFinishCreateApplication);

  const onFinish = (values: any) => {
    createApplicationReq.run({ ...values, companyId: Number(companyId) });
  };

  return (
    <div className={styles.formAddNew}>
      <Form form={createApplicationForm} onFinish={onFinish}>
        <h4>Add new Application</h4>
        <Row align='middle' justify='space-between' className={styles.divRow}>
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
          <Button htmlType='submit' className={styles.addBtn}>
            Add
          </Button>
        </Row>
      </Form>
    </div>
  );
};

const ApplicationsMemo = ({ companyId }: any) => {
  const {
    applications,
    refreshApplication,
    deleteApplication,
    updateApplication,
    deleteEndpoint,
    updateEndpoint,
    addEndpoint,
    onChange,
  } = useApplications(companyId);
  const { isHavePermissionCreateSystem } = useSystemConfigPermission();

  return (
    <div className={styles.applicationWrap}>
      <h4>Applications</h4>

      {applications?.data?.map((application: any) => {
        return (
          <ApplicationItem
            key={`app-${application?.id}`}
            application={application}
            deleteApplication={deleteApplication}
            updateApplication={updateApplication}
            deleteEndpoint={deleteEndpoint}
            updateEndpoint={updateEndpoint}
            addEndpoint={addEndpoint}
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

      {isHavePermissionCreateSystem && (
        <AddNewApplications companyId={`${companyId}`} refreshApplication={refreshApplication} />
      )}
    </div>
  );
};

export const Applications = React.memo(ApplicationsMemo);
