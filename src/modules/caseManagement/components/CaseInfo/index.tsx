import { Col, Divider, Modal, Row } from 'antd';
import React, { useCallback } from 'react';

import Button from 'libraries/UI/Button';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import IconDelete from 'assets/icons/icon-delete';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './style.module.scss';
import useCaseManagementPermission from 'hooks/useCaseManagementPermission';
import { MyDocument } from '../CaseDetailPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatId } from 'utils/common.utils';

const { confirm } = Modal;

const ICON_EDIT = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path
      d='M3.5 21H21.5'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z'
      fill='#CF2A2B'
      stroke='white'
      strokeWidth={2}
      strokeLinejoin='round'
    />
  </svg>
);

const CaseInfo = ({ data, onClickEdit, deleteCaseRequest }: any) => {
  const { isHavePermissionEditCase, isHavePermissionDeleteCase, isHavePermissionExportPdf } =
    useCaseManagementPermission();

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to Delete the Case? This action can not be reversed',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      okButtonProps: {
        className: styles.btnDelete,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        deleteCaseRequest.run();
      },
    });
  }, []);

  return (
    <div className={styles.caseInfo}>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Data Subject Rights<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.action}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Related Department<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.department}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Assign to<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.assignTo}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Company name<span className={styles.asterisk}>*</span>
          </p>
          <p className={clsx(styles.value, styles.leftSpace)}>{data?.companyInfo?.nameEN}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={styles.info}>
          <p className={styles.label}>
            Description<span className={styles.asterisk}>*</span>
          </p>
          <p className={clsx(styles.value, styles.leftSpace)}>{data?.description}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Status<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.status}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Accepted Date <span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{dayjs(data?.acceptedDate).format('DD/MM/YY')}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Result <span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.responseStatus}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Reason <span className={styles.asterisk}>*</span>
          </p>
          <p className={clsx(styles.value, styles.leftSpace)}>{data?.reason}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>Date of Response</p>
          <p className={styles.value}>
            {data?.dateOfResponse ? dayjs(data?.dateOfResponse).format('DD/MM/YY') : 'N/A'}
          </p>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className={styles.flexend}>
        {(data?.status.toLowerCase() === 'rejected' || data?.status?.toLowerCase() === 'closed') &&
          isHavePermissionExportPdf && (
            <PDFDownloadLink
              document={
                <MyDocument
                  caseData={{
                    dataSubjectRight: data?.action,
                    description: data?.description,
                    status: data?.status,
                    reason: data?.reason,
                    result: data?.responseStatus,
                    companyInfo: data?.companyInfo,
                    responseDate: data?.dateOfResponse
                      ? dayjs(data?.dateOfResponse).format('DD/MM/YY')
                      : '',
                  }}
                />
              }
              fileName={`DSR-${data?.userProfile?.firstNameEn} ${
                data?.userProfile?.lastNameEn
              }-${formatId(data?.action, data?.id, data?.createdAt)}-${dayjs(Date.now()).format(
                'DDMMYYYYHHMMss',
              )}.pdf`}
              style={{
                backgroundColor: '#CF2A2B',
                border: 'white',
                display: 'flex',
                color: 'white',
                borderRadius: 100,
                padding: '8px 16px',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Export Pdf')}
            </PDFDownloadLink>
          )}
        {isHavePermissionEditCase && (
          <Button onClick={onClickEdit} icon={ICON_EDIT} className={styles.editBtn}>
            Edit
          </Button>
        )}
        {isHavePermissionDeleteCase && (
          <Button className={styles.deleteBtn} icon={<IconDelete />} onClick={() => showConfirm()}>
            Delete
          </Button>
        )}
      </Row>
    </div>
  );
};

export default CaseInfo;
