import { Form, Row } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React from 'react';
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

  const onFinishCreateApplication = () => {
    createApplicationForm.resetFields();
    refreshApplication();
  };

  const createApplicationReq = useCreateApplication(onFinishCreateApplication);

  const onFinish = (values: any) => {
    createApplicationReq.run({ ...values, company_id: Number(companyId) });
  };

  return (
    <div className={styles.formAddNew}>
      <Form form={createApplicationForm} onFinish={onFinish}>
        <h4>Add new Application</h4>
        <Row align='middle' justify='space-between' className={styles.divRow}>
          <InputForm className={styles.input} name='name' />
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
    loading,
    refreshApplication,
    onLoadMore,
    deleteApplication,
    updateApplication,
    deleteEndpoint,
    updateEndpoint,
  } = useApplications(companyId);

  return (
    <div className={styles.applicationWrap}>
      <h4>Applications</h4>

      {applications?.data?.map((application: any) => {
        return (
          <ApplicationItem
            key={`app-${application?.id}`}
            application={application}
            onLoadMore={onLoadMore}
            isLoadMore={applications?.isLoadMore}
            deleteApplication={deleteApplication}
            updateApplication={updateApplication}
            deleteEndpoint={deleteEndpoint}
            updateEndpoint={updateEndpoint}
          />
        );
      })}

      <AddNewApplications companyId={`${companyId}`} refreshApplication={refreshApplication} />
    </div>
  );
};

export const Applications = React.memo(ApplicationsMemo);
