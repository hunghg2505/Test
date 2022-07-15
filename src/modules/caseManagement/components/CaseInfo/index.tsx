import React, { useCallback } from 'react';
import { Row, Col, Divider, Modal } from 'antd';
import styles from './style.module.scss';
import dayjs from 'dayjs';
import Button from 'libraries/UI/Button';
import IconDelete from 'assets/icons/icon-delete';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to delete this Case?',
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
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Data Subject Right</p>
          <p className={styles.value}>{data?.action}</p>
        </Col>
        <Col xs={8}></Col>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Related Department</p>
          <p className={styles.value}>{data?.department}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Assign to</p>
          <p className={styles.value}>{data?.assignTo}</p>
        </Col>
        <Col xs={8}></Col>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Description</p>
          <p className={styles.value}>{data?.description}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Status</p>
          <p className={styles.value}>{data?.status}</p>
        </Col>
        <Col xs={8}></Col>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Accepted Date</p>
          <p className={styles.value}>{dayjs(data?.acceptedDate).format('DD/MM/YY')}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Result</p>
          <p className={styles.value}>{data?.responseStatus}</p>
        </Col>
        <Col xs={8}></Col>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Reason</p>
          <p className={styles.value}>{data?.reason}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={8} className={styles.info}>
          <p className={styles.label}>Date of reponse</p>
          <p className={styles.value}>{dayjs(data?.dateOfResponse).format('DD/MM/YY')}</p>
        </Col>
        <Col xs={8}></Col>
      </Row>
      <Row>
        <Button onClick={onClickEdit} icon={ICON_EDIT} className={styles.editBtn}>
          Edit
        </Button>
        <Button className={styles.deleteBtn} icon={<IconDelete />} onClick={() => showConfirm()}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

export default CaseInfo;
