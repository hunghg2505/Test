import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import React, { useCallback, useState } from 'react';

import styles from './index.module.scss';
import ModalAddEndpoint from './ModalAddEndPoint';
import ModalEditApplication from './ModalEditApplication';
import ModalEditEndpoint from './ModalEditEndpoint';

const { confirm } = Modal;

const EndPointItem = ({ endpoint, deleteEndpoint, updateEndpoint }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  const onShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to Delete Endpoint',
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
    <div className={styles.appInfo}>
      <Row className={styles.appInfoName} align='middle' justify='space-between'>
        <div>{endpoint?.name}</div>
        <div>
          {showInfo && (
            <>
              <span className={styles.btnDelete} onClick={showConfirm}>
                Delete
              </span>
              <ModalEditEndpoint endpoint={endpoint} updateEndpoint={updateEndpoint}>
                <span className={styles.btnEdit}>Edit</span>
              </ModalEditEndpoint>
            </>
          )}
          <span className={styles.arrow} onClick={onShowInfo}>
            <IconArrowDown />
          </span>
        </div>
      </Row>
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
    </div>
  );
};

export const ApplicationItemMemo = ({
  application,
  onLoadMore,
  isLoadMore,
  deleteApplication,
  updateApplication,
  deleteEndpoint,
  updateEndpoint,
  addEndpoint,
}: any) => {
  const [showApp, setShowApp] = useState(false);

  const onShowApp = () => {
    setShowApp(!showApp);
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to Delete Application',
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
          <div className={styles.appName}>{application?.name}</div>
          <div>
            <span className={styles.btnDelete} onClick={showConfirm}>
              Delete
            </span>

            <ModalEditApplication
              appId={application?.id}
              updateApplication={updateApplication}
              appName={application?.name}
            >
              <span className={styles.btnEdit}>Edit</span>
            </ModalEditApplication>
            <ModalAddEndpoint appId={application?.id} addEndpoint={addEndpoint}>
              <span className={styles.btnEdit}>Add Endpoint</span>
            </ModalAddEndpoint>
            <span onClick={onShowApp} className={styles.arrow}>
              <IconArrowDown />
            </span>
          </div>
        </Row>

        {showApp && (
          <div>
            {application?.endpoints?.map((endpoint: any) => {
              return (
                <EndPointItem
                  key={`endpoint-${endpoint?.id}`}
                  endpoint={endpoint}
                  deleteEndpoint={deleteEndpoint}
                  updateEndpoint={updateEndpoint}
                />
              );
            })}
            {/* {isLoadMore && (
              <div className={styles.btnLoadMore} onClick={onLoadMore}>
                Load More
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export const ApplicationItem = React.memo(ApplicationItemMemo);
