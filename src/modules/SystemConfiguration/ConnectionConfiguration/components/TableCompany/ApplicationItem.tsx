import {
  CheckOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useMount } from 'ahooks';
import { Col, Form, Modal, Row } from 'antd';
import IconDelete from 'assets/icons/icon-delete';
import IconEdit from 'assets/icons/icon-edit';
import clsx from 'clsx';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import InputForm from 'libraries/form/input/input-form';
import React, { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter, getColorStroke } from 'utils/common.utils';

import styles from './index.module.scss';
import ModalAddEndpoint from './ModalAddEndPoint';
import ModalEditEndpoint from './ModalEditEndpoint';
import { useEndpoint } from './services';

const { confirm } = Modal;

const EndPointItem = ({ endpoint, deleteEndpoint, updateEndpoint }: any) => {
  const { isHavePermissionEditSystem, isHavePermissionDeleteSystem } = useSystemConfigPermission();
  const [showInfo, setShowInfo] = useState(false);

  const onShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: `Are you sure you want to delete endpoint ${endpoint?.name}?`,
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
        deleteEndpoint(endpoint?.id)();
      },
    });
  }, []);

  return (
    <>
      <div
        className={clsx(styles.endpointItem, { [styles[`${endpoint?.method}EndpointItem`]]: true })}
      >
        <div className={styles.appInfo}>
          <Row className={styles.appInfoName} align='middle' justify='space-between'>
            <div
              className={styles.apiOverview}
              style={{
                color: getColorStroke(endpoint?.method),
              }}
            >
              <div
                className={clsx(styles.method, {
                  [styles[endpoint?.method]]: true,
                })}
              >
                {capitalizeFirstLetter(endpoint?.method)}
              </div>
              {endpoint?.name}
            </div>
            <div className={styles.endpointActions}>
              {isHavePermissionDeleteSystem && (
                <span className={styles.btnDelete} onClick={showConfirm}>
                  <IconDelete colorStroke={getColorStroke(endpoint?.method)} />
                </span>
              )}
              {isHavePermissionEditSystem && (
                <ModalEditEndpoint endpoint={endpoint} updateEndpoint={updateEndpoint}>
                  <IconEdit colorStroke='#828282' colorFill='white' />
                </ModalEditEndpoint>
              )}

              <span className={styles.arrow} onClick={onShowInfo} style={{ marginLeft: 30 }}>
                {showInfo ? <UpOutlined /> : <DownOutlined />}
              </span>
            </div>
          </Row>
        </div>
      </div>
      {showInfo && (
        <div className={styles.infoWrap}>
          <div>
            <div className={styles.label}>Link URL</div>
            <div className={styles.content}>{endpoint?.url}</div>
          </div>

          <div>
            <div className={styles.label}>Method</div>
            <div className={styles.content}>{endpoint?.method?.toUpperCase()}</div>
          </div>

          <div>
            <div className={styles.label}>Parameters</div>
            <div className={styles.content}>{endpoint?.request}</div>
          </div>

          <div>
            <div className={styles.label}>Response</div>
            <div className={styles.content}>{endpoint?.response}</div>
          </div>

          <div>
            <div className={styles.label}>Key</div>
            <div className={styles.content}>{endpoint?.key}</div>
          </div>
        </div>
      )}
    </>
  );
};

const EndpointList = ({
  endpoints,
  isLoadMore,
  onLoadMore,
  deleteEndpoint,
  updateEndpoint,
  onFirstLoad,
}: any) => {
  useMount(() => {
    onFirstLoad();
  });

  return (
    <div className={styles.applicationWrap}>
      <h4>API Endpoints</h4>

      {endpoints?.map((endpoint: any) => {
        return (
          <EndPointItem
            key={`endpoint-${endpoint?.id}`}
            endpoint={endpoint}
            deleteEndpoint={deleteEndpoint}
            updateEndpoint={updateEndpoint}
          />
        );
      })}
      {isLoadMore && (
        <div className={styles.btnLoadMore} onClick={onLoadMore}>
          Load More
        </div>
      )}
    </div>
  );
};

const FormEdit = ({ onFinish, application, editApplicationForm, t }: any) => {
  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      initialValues={{
        app_name: application?.name,
      }}
      form={editApplicationForm}
      className={styles.editForm}
    >
      <InputForm
        name='app_name'
        maxLength={55}
        rules={[
          {
            required: true,
            message: t('messages.errors.require', { field: 'Application Name' }),
          },
        ]}
        autoFocus={true}
      />
    </Form>
  );
};

export const ApplicationItemMemo = ({ application, deleteApplication, updateApplication }: any) => {
  const [showApp, setShowApp] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editApplicationForm] = Form.useForm();

  const { t } = useTranslation();

  const { isHavePermissionCreateSystem, isHavePermissionEditSystem, isHavePermissionDeleteSystem } =
    useSystemConfigPermission();
  const {
    endpoints,
    isLoadMore,
    onLoadMore,
    deleteEndpoint,
    updateEndpoint,
    addEndpoint,
    onFirstLoad,
  } = useEndpoint(application?.id);

  const onShowApp = () => {
    setShowApp(!showApp);
  };

  const onFinish = (values: any) => {
    if (values?.app_name?.trim() === application?.name) {
      return;
    }

    updateApplication(application?.id, values?.app_name, editApplicationForm.resetFields);
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: `Are you sure you want to Delete Application ${application?.name}`,
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
        deleteApplication(application?.id)();
      },
    });
  }, []);

  return (
    <div>
      <div className={styles.table}>
        <Row align='middle' justify='space-between'>
          <Col>
            {!isEdit ? (
              <span className={styles.appName}>{application?.name}</span>
            ) : (
              <FormEdit
                onFinish={onFinish}
                application={application}
                editApplicationForm={editApplicationForm}
                t={t}
              />
            )}
          </Col>
          {!isEdit ? (
            <div className={styles.applicationAction}>
              {isHavePermissionDeleteSystem && (
                <span className={styles.btnDelete} onClick={showConfirm}>
                  <IconDelete />
                </span>
              )}

              {isHavePermissionEditSystem && (
                <span
                  className={styles.btnEdit}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <IconEdit colorStroke='#828282' colorFill='white' />
                </span>
              )}

              {isHavePermissionCreateSystem && (
                <ModalAddEndpoint appId={application?.id} addEndpoint={addEndpoint}>
                  <span className={styles.btnAddApi}>Add API</span>
                </ModalAddEndpoint>
              )}
              <span onClick={onShowApp} className={styles.arrow}>
                {showApp ? <UpOutlined /> : <DownOutlined />}
              </span>
            </div>
          ) : (
            <>
              <span
                className={styles.btnDelete}
                onClick={() => {
                  editApplicationForm.resetFields();
                  setIsEdit(false);
                }}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                }}
              >
                X
              </span>
              <span
                className={styles.btnEdit}
                onClick={() => {
                  if (
                    editApplicationForm
                      .getFieldsError()
                      .filter((item: any) => item?.errors?.length !== 0).length === 0
                  ) {
                    setIsEdit(false);
                    editApplicationForm.submit();
                  }
                }}
              >
                <CheckOutlined />
              </span>
            </>
          )}
        </Row>

        {showApp && (
          <EndpointList
            endpoints={endpoints}
            isLoadMore={isLoadMore}
            onLoadMore={onLoadMore}
            deleteEndpoint={deleteEndpoint}
            updateEndpoint={updateEndpoint}
            onFirstLoad={onFirstLoad}
          />
        )}
      </div>
    </div>
  );
};

export const ApplicationItem = React.memo(forwardRef(ApplicationItemMemo));
