import { useClickAway } from 'ahooks';
import { Col, Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from 'hooks/useFadeEffect';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const AdvancedSearch = () => {
  const [formSearch] = Form.useForm();
  const [isShowSearch, setIsShowSearch] = React.useState(false);
  const [_isTransitioning, shouldBeVisible, refFormModal] = useFadeEffect(isShowSearch);
  const refSearch: any = useRef();
  const { t } = useTranslation();

  useClickAway(() => {
    setIsShowSearch(false);
  }, refSearch);

  const onVisibleSearch = () => {
    setIsShowSearch(!isShowSearch);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div style={{ position: 'relative' }} ref={refSearch}>
      <Button
        onClick={onVisibleSearch}
        typeDisplay='ghost'
        className={styles.btnSearchAdvanced}
        icon={<IconCross />}
      >
        {t('advanced')}
      </Button>
      <div
        id='searchAdvanceOverlay'
        style={{
          position: 'absolute',
          top: '130%',
          right: 0,
          zIndex: 1,
        }}
      >
        {_isTransitioning && (
          <div
            className={styles.formSearchAdvanced}
            ref={refFormModal}
            style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}
          >
            <Form onFinish={onFinish} form={formSearch} layout='vertical'>
              <Row gutter={[0, 16]}></Row>

              <Button
                htmlType='submit'
                type='secondary'
                className={styles.btnSearchAdvancedDd}
                icon={<IconSearch />}
              >
                {t('Search')}
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
