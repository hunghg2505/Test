import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Form, Row, Modal } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteCompany, useEditCompany } from '../../utils/services';
import { Applications } from './Applications';

import styles from './index.module.scss';

const { confirm } = Modal;

const CompanyItemMemo = ({ company, refresh }: any) => {
  const { t } = useTranslation();
  const [editCompanyForm] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onFinishDeleteCompany = () => {
    setVisible(false);
    refresh();
  };

  const onFinishEditCompany = () => {
    setVisible(false);
    refresh();
    setIsEdit(false);
  };

  const deleteCompanyReq = useDeleteCompany(onFinishDeleteCompany);
  const editCompanyReq = useEditCompany(onFinishEditCompany);

  const onVisible = () => {
    setVisible(!visible);
  };

  const onFinish = (values: any) => {
    if (values?.name?.trim() === company?.name) {
      return;
    }
    editCompanyReq.run({
      ...values,
      id: Number(company.id),
    });
  };

  const showConfirm = useCallback(() => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to Delete Company',
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
        deleteCompanyReq.run({ id: company.id });
      },
    });
  }, []);

  return (
    <div>
      <Row className={styles.body}>
        <Col className={styles.companyName}>
          {!isEdit ? (
            <span>{company?.name}</span>
          ) : (
            <Form
              onFinish={onFinish}
              layout='vertical'
              // initialValues={{
              //   name: company?.name,
              // }}
              form={editCompanyForm}
              className={styles.editForm}
            >
              <InputForm
                name='name'
                maxLength={55}
                rules={[
                  {
                    required: true,
                    message: t('messages.errors.require', { field: 'Company Name' }),
                  },
                ]}
                initialValue={company?.name}
              />
            </Form>
          )}

          <span onClick={onVisible} className={styles.arrow}>
            <IconArrowDown />
          </span>
        </Col>
        <Col className={styles.companyCreatedDate}>{company?.createdDate}</Col>
        <Col className={styles.companyAction}>
          {!isEdit ? (
            <>
              <span className={styles.btnDelete} onClick={() => showConfirm()}>
                Delete
              </span>
              <span
                className={styles.btnEdit}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                {!isEdit ? 'Edit' : 'Cancel'}
              </span>
            </>
          ) : (
            <>
              <span
                className={styles.btnDelete}
                onClick={() => {
                  editCompanyForm.resetFields();
                  setIsEdit(false);
                }}
              >
                X
              </span>
              <span
                className={styles.btnEdit}
                onClick={() => {
                  if (
                    editCompanyForm
                      .getFieldsError()
                      .filter((item: any) => item?.errors?.length !== 0).length === 0
                  ) {
                    setIsEdit(false);
                    editCompanyForm.submit();
                  }
                }}
              >
                <CheckOutlined />
              </span>
            </>
          )}
        </Col>
      </Row>

      {visible && <Applications companyId={company?.id} />}
    </div>
  );
};

export const CompanyItem = React.memo(CompanyItemMemo);
