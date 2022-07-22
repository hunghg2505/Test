import { Col, DatePicker, Divider, Form, Row } from 'antd';
import {
  DATA_SUBJECT_RIGHT_DROPDOWN_DATA,
  RESULT_DROPDOWN_DATA,
  STATUS_DROPDOWN_DATA,
} from 'constants/common.constants';
import { useEditCase, useGetListDataDropDropdown } from 'modules/caseManagement/services';
import { useEffect, useRef, useState } from 'react';

import Loading from 'libraries/components/loading';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';
import Button from 'libraries/UI/Button';
import Select from 'libraries/UI/Select';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CaseInfo from '../CaseInfo';
import styles from './index.module.scss';

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
  const { actionsData, departmentsData, usersData } = useGetListDataDropDropdown();

  const [isEdit, setIsEdit] = useState(true);
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
      <h2 className={styles.title}>Case Details</h2>
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
                    <Select placeholder='Select a Right'>
                      {DATA_SUBJECT_RIGHT_DROPDOWN_DATA.map((item, index) => (
                        <Select.Option value={item.value} key={`${index}${item.value}`}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <Select placeholder='Select a Department'>
                      <Select.Option value={'Department 1'}>Department 1</Select.Option>
                      <Select.Option value={'Department 2'}>Department 2</Select.Option>
                    </Select>
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
                    <Select placeholder='Assign to'>
                      {usersData?.data?.map((item: any) => (
                        <Select.Option value={item.value} key={`${item.sid}`}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <Select placeholder='List of Status'>
                      {STATUS_DROPDOWN_DATA.map((item, index) => (
                        <Select.Option value={item.value} key={`${index}${item.value}`}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
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
                  <Form.Item label='Result' name='responseStatus'>
                    <Select placeholder='Select Result'>
                      {RESULT_DROPDOWN_DATA.map((item, index) => (
                        <Select.Option value={item.value} key={`${index}${item.value}`}>
                          {item.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <InputTextAreaForm
                    name='reason'
                    label='Reason'
                    placeholder='Reason for Completed or Reject'
                    rows={6}
                    className={styles.textarea}
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
