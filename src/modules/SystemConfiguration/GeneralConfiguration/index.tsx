import { Form, Row } from 'antd';
import IconArrowDown from 'assets/icons/icon-arrow-down';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React, { useState } from 'react';

import styles from './index.module.scss';
import { useGeneralConfig } from './service';

const FormFeatureItem = () => {
  const [listItem, setListItem] = useState([{ name: 'Erasure(Forget Me)' }]);

  const onAddNew = () => {
    console.log('a');
  };

  return (
    <div className={styles.content}>
      <Form onFinish={onAddNew}>
        <Row className={styles.formInput}>
          <InputForm name='name' label={'Add new'} />
          <Button htmlType='submit'>Add</Button>
        </Row>
      </Form>

      <div className={styles.list}>
        <h4>List</h4>
        {listItem?.map((it: any) => {
          return (
            <span key={it?.name} className={styles.item}>
              {it?.name}
              <span className={styles.btnClose}>X</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const FeatureItemContent = ({ feature }: any) => {
  const [show, setShow] = useState(false);
  const onVisible = () => {
    setShow(!show);
  };

  return (
    <>
      <Row justify='space-between' align='middle' className={styles.FeatureItemContent}>
        <span className={styles.featureName}>{feature?.name}</span>
        <span onClick={onVisible} className={styles.arrow}>
          <IconArrowDown />
        </span>
      </Row>
      {show && (
        <>
          <FormFeatureItem />
        </>
      )}
    </>
  );
};

const FeatureItem = ({ featureItem }: any) => {
  const [show, setShow] = useState(false);
  const onVisible = () => {
    setShow(!show);
  };

  return (
    <>
      <Row justify='space-between' align='middle' className={styles.FeatureItem}>
        <span className={styles.featureAppName}>{featureItem?.name}</span>
        <span onClick={onVisible} className={styles.arrow}>
          <IconArrowDown />
        </span>
      </Row>

      {show && (
        <>
          {featureItem?.list?.map((val: any) => {
            return <FeatureItemContent key={val?.id} feature={val} />;
          })}
        </>
      )}
    </>
  );
};

const GeneralConfiguration = () => {
  const { data } = useGeneralConfig();

  if (!data) return null;

  return (
    <div className={styles.wrap}>
      <h1>General Configuration</h1>
      <h3>Feature List</h3>
      {data?.featureList?.map((it: any) => {
        return <FeatureItem key={it?.id} featureItem={it} />;
      })}
    </div>
  );
};

export default GeneralConfiguration;
