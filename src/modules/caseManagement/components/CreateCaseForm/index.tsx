import { Col, DatePicker, Divider, Form, Row } from 'antd';
import { useEditCase, useGetListDataDropDropdown } from 'modules/caseManagement/services';
import { useEffect, useRef, useState } from 'react';

import Loading from 'libraries/components/loading';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Button from 'libraries/UI/Button';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CaseInfo from '../CaseInfo';
import styles from './index.module.scss';
import { useGetDataDropdown } from 'modules/dataSubjectManagement/components/CreateCaseForm/service';
import {
  CustomSelectDropdown,
  FormItemCompany,
} from 'modules/dataSubjectManagement/components/CreateCaseForm';

const CreateCaseForm = ({
  data,
  loading,
  refActivityLog,
  refreshDataCaseDetail,
  deleteCaseRequest,
}: any) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [editCaseForm] = Form.useForm();
  const refFiles: any = useRef();
  const { usersData } = useGetListDataDropDropdown();
  const { data: dataDropdown } = useGetDataDropdown();

  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [acceptedDate, setAcceptedDate] = useState<null | moment.Moment>(null);
  const [dateOfResponse, setDateOfResponse] = useState<null | moment.Moment>(null);

  const onFinishSubmitForm = () => {
    setIsEdit(true);
    if (refActivityLog.current.refreshDataActivityLog) {
      refActivityLog.current.refreshDataActivityLog();
    }
    refreshDataCaseDetail();
  };

  const editCaseRequest = useEditCase(onFinishSubmitForm);

  const onFinish = (values: any) => {
    let fileComment;
    if (refFiles?.current?.getFileData) {
      fileComment = refFiles.current.getFileData();
    }

    editCaseRequest.run(
      {
        caseId: Number(id),
        editCaseParam: {
          ...values,
          acceptedDate,
          dateOfResponse,
        },
      },
      fileComment,
    );
  };

  useEffect(() => {
    if (!loading) {
      if (data?.acceptedDate) {
        setAcceptedDate(moment(data?.acceptedDate));
      }
      if (data?.dateOfResponse) {
        setDateOfResponse(moment(data?.dateOfResponse));
      }
    }
  }, [data]);

  return (
    <>
      <h2 className={styles.title}>Case Detail</h2>
      {!isEdit ? (
        <div className={styles.form}>
          {loading ? (
            <Loading />
          ) : (
            <Form
              layout='vertical'
              form={editCaseForm}
              disabled={isEdit}
              initialValues={{
                action: data?.action,
                department: data?.department,
                assignTo: data?.assignTo,
                description: data?.description,
                status: data?.status,
                responseStatus: data?.responseStatus,
                reason: data?.reason,
                comment: data?.comment,
                companyId: data?.companyInfo?.id,
              }}
              onFinish={onFinish}
            >
              <Row gutter={[15, 24]}>
                <Col xs={12}>
                  <Form.Item
                    label='Data Subject Rights'
                    name='action'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Data Subject Rights' }),
                      },
                    ]}
                  >
                    <CustomSelectDropdown
                      data={dataDropdown?.subjectRightData}
                      placeholder='Select a Right'
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    label='Related Department'
                    name='department'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Department' }),
                      },
                    ]}
                  >
                    <CustomSelectDropdown
                      data={dataDropdown?.relatedDepartmentData}
                      placeholder='Select a Department'
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    label='Assign to'
                    name='assignTo'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Assign' }),
                      },
                    ]}
                  >
                    <CustomSelectDropdown data={usersData?.data} placeholder='Assign to' />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    label='Company Name'
                    name='companyId'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Company' }),
                      },
                    ]}
                  >
                    <FormItemCompany />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <InputTextAreaForm
                    name='description'
                    label='Description'
                    placeholder='Details of Execution'
                    rows={6}
                    className={styles.textarea}
                    required
                    maxLength={250}
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Description' }),
                      },
                    ]}
                  />
                </Col>

                <Col xs={12}>
                  <Form.Item
                    label='Status'
                    name='status'
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Status' }),
                      },
                    ]}
                  >
                    <CustomSelectDropdown
                      data={dataDropdown?.statusData}
                      placeholder='List of Status'
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <p className={styles.datePickerLabel}>
                    Accepted Date <span style={{ color: 'red' }}>*</span>
                  </p>
                  <DatePicker
                    getPopupContainer={(trigger: any) => trigger.parentElement}
                    format='DD/MM/YYYY'
                    onChange={(date: any) => setAcceptedDate(date)}
                    allowClear={false}
                    value={acceptedDate}
                  />
                </Col>
                <Divider />
                <Col xs={12}>
                  <Form.Item
                    label='Result'
                    name='responseStatus'
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Result' }),
                      },
                    ]}
                    required
                  >
                    <CustomSelectDropdown
                      data={data?.resultData}
                      placeholder='Select Result'
                      allowClear={true}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <InputTextAreaForm
                    name='reason'
                    label='Reason'
                    placeholder='Reason for Completed or Reject'
                    rows={6}
                    className={styles.textarea}
                    required
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: 'Reason' }),
                      },
                    ]}
                    maxLength={250}
                  />
                </Col>
                <Col xs={12}>
                  <p className={styles.datePickerLabel}>Date of Response</p>
                  <DatePicker
                    getPopupContainer={(trigger: any) => trigger.parentElement}
                    format='DD/MM/YYYY'
                    onChange={(date: any) => setDateOfResponse(date)}
                    value={dateOfResponse}
                  />
                </Col>
                {!isEdit && (
                  <Col xs={24}>
                    <InputTextAreaForm
                      name='comment'
                      label='Update comment'
                      placeholder='Comment ...'
                      rows={6}
                      uploadFile
                      refFiles={refFiles}
                      defaultFileUrl={data?.fileUrl}
                    />
                  </Col>
                )}
              </Row>
            </Form>
          )}

          <div className={styles.actions}>
            <>
              <Button
                onClick={() => {
                  setIsEdit(true);
                  editCaseForm.resetFields();
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{' '}
              <Button htmlType='submit' onClick={() => editCaseForm.submit()}>
                Submit
              </Button>
            </>
          </div>
        </div>
      ) : (
        <CaseInfo
          data={data}
          onClickEdit={() => setIsEdit(false)}
          deleteCaseRequest={deleteCaseRequest}
        />
      )}
    </>
  );
};

export default CreateCaseForm;
