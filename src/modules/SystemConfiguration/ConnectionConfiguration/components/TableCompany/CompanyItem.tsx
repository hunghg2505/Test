import { Col, Form, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteCompany, useEditCompany } from '../../utils/services';
import { Applications } from './Applications';

import styles from './index.module.scss';

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
    editCompanyReq.run({
      ...values,
      id: Number(company.id),
    });
  };

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
              initialValues={{
                name: company?.name,
              }}
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
              />
              <span className={styles.btnSave} onClick={() => editCompanyForm.submit()}>
                Save
              </span>
            </Form>
          )}

          <span onClick={onVisible} className={styles.arrow}>
            <IconArrowDown />
          </span>
        </Col>
        <Col className={styles.companyCreatedDate}>{company?.createdDate}</Col>
        <Col className={styles.companyAction}>
          <span
            className={styles.btnDelete}
            onClick={() => deleteCompanyReq.run({ id: company.id })}
          >
            Delete
          </span>
          <span
            className={styles.btnEdit}
            onClick={() => {
              setIsEdit(!isEdit);
              editCompanyForm.resetFields();
            }}
          >
            {!isEdit ? 'Edit' : 'Cancel'}
          </span>
        </Col>
      </Row>

      {visible && <Applications companyId={company?.id} />}
    </div>
  );
};

export const CompanyItem = React.memo(CompanyItemMemo);
