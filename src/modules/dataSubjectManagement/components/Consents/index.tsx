/* eslint-disable @typescript-eslint/no-unused-vars */
import { useClickAway } from 'ahooks';
import { Checkbox, Col, Form, message, Pagination, Row } from 'antd';

import IconSearch from 'assets/icons/icon-search';
import clsx from 'clsx';
import useCaseManagementPermission from 'hooks/useCaseManagementPermission';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateCaseForm from '../CreateCaseForm';
import styles from './index.module.scss';
import { useConsent, useGenerateLink } from './service';
import SuggestConsents from './SuggestConsents';

export interface DataType {
  id: number;
  name: string;
  lastUpdated: string;
  version: string;
  status: string;
  description: string;
  selected: boolean;
  value: string;
  title: string;
}

const SearchBox = ({
  onSearchConsent,
  suggestionConsents,
  onSuggestionConsentsDebounce,
  onLoadMoreSuggestionConsents,
  onResetSuggestionConsents,
  refDataHistory,
}: {
  onSearchConsent: (search: string, callback?: any) => void;
  suggestionConsents: any;
  onSuggestionConsentsDebounce: (value: string, callback: any) => void;
  onLoadMoreSuggestionConsents: (value: string) => void;
  onResetSuggestionConsents: () => void;
  refDataHistory: any;
}) => {
  const { t } = useTranslation();
  const refForm: any = useRef();
  const refListConsents: any = useRef();
  const [formSearchConsent] = Form.useForm();

  const { isHavePermissionCreateCase } = useCaseManagementPermission();

  const [isOpenCreateCaseForm, setIsOpenCreateCaseForm] = useState(false);

  const onFieldsChange = (values: any) => {
    const value = get(values, '[0].value', '');
    if (value?.length < 3) refListConsents.current.closeListUser();
    onSuggestionConsentsDebounce(value || '', () => {
      if (refListConsents.current?.openListUser) refListConsents.current.openListUser();
    });
  };
  const onFinishSubmitForm = () => {
    if (refListConsents.current?.closeListUser) {
      refListConsents.current.closeListUser();
      onResetSuggestionConsents();
    }
  };

  const onFinish = (values: any) => {
    const value = get(values, 'search', '');
    onSearchConsent(value, onFinishSubmitForm);
  };

  useClickAway(() => {
    onFinishSubmitForm();
  }, refForm);

  return (
    <Row className={styles.consentsSearch} align='middle'>
      <h3>{t('consent')}</h3>

      <Form onFinish={onFinish} onFieldsChange={onFieldsChange} form={formSearchConsent}>
        <div
          ref={refForm}
          style={{
            position: 'relative',
            maxWidth: 680,
            marginLeft: 'auto',
          }}
        >
          <Row align='middle' className={styles.searchBox}>
            <Row align='middle' className={styles.searchContent}>
              <IconSearch />
              <Form.Item
                name='search'
                className={styles.formSearchItem}
                rules={[
                  {
                    min: 3,
                    message: t('messages.errors.min', { min: 3 }),
                  },
                  {
                    max: 55,
                    message: t('messages.errors.max_search_firstname', { max: 55 }),
                  },
                ]}
              >
                <Input placeholder='Search' maxLength={55} />
              </Form.Item>
            </Row>
            <Button
              htmlType='submit'
              size='middle'
              className={styles.btnSearch}
              icon={<IconSearch />}
              type='secondary'
            >
              {t('search')}
            </Button>
            <SuggestConsents
              ref={refListConsents}
              onSearchConsent={(val: string) => {
                formSearchConsent.setFieldsValue({
                  search: val,
                });
                onSearchConsent(val);
              }}
              suggestionConsents={suggestionConsents}
              onLoadMoreSuggestionConsents={onLoadMoreSuggestionConsents}
              onResetSuggestionConsents={onResetSuggestionConsents}
            />
          </Row>
        </div>
      </Form>

      {isHavePermissionCreateCase && (
        <Button
          size='middle'
          className={styles.btnCreateCase}
          typeDisplay='ghost'
          onClick={() => setIsOpenCreateCaseForm(true)}
        >
          {t('create_case')}
        </Button>
      )}
      <CreateCaseForm
        visible={isOpenCreateCaseForm}
        onClose={() => setIsOpenCreateCaseForm(false)}
        refDataHistory={refDataHistory}
      />
    </Row>
  );
};

export const ConsentsList = ({
  data,
  loading,
  onChange,
  onSaveConsent,
  loadingUpdateConsent,
  userId,
  onlyView = false,
  application,
}: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();
  const [, copy] = useCopyToClipboard();
  const { isHavePermissionSaveConsent, isHavePermissionCreateLink } =
    useDataSubjectManagementPermission();

  const requestGenerateLink = useGenerateLink(userId, application);

  const initialValues = data?.data?.reduce((acc: any, v: any) => {
    return {
      ...acc,
      [v?.id]: v?.selected,
    };
  }, {});

  const onUpdateConsent = (value: any) => {
    if (onSaveConsent) onSaveConsent(value);
  };

  const onCopyLink = async () => {
    try {
      await copy(requestGenerateLink?.data || '');
      message.success('Public Link Copied');
    } catch (err) {
      console.log('err', err);
    }
  };

  let disable = !isHavePermissionSaveConsent;
  if (onlyView) disable = true;

  if (loading) return null;

  return data?.data?.length === 0 ? (
    <p className={styles.noResultText}>{t('no_result_found')}</p>
  ) : (
    <div className={styles.consentWrap}>
      <Form
        className={styles.formConsent}
        onFinish={onUpdateConsent}
        form={formConsent}
        initialValues={initialValues}
      >
        {data?.data?.length === 0 ? (
          <p className={styles.noResultText}>{t('no_result_found')}</p>
        ) : (
          <div className={styles.listConsent}>
            {data?.data?.map((it: DataType) => {
              return (
                <Row
                  key={it?.id}
                  className={styles.consentItem}
                  align='middle'
                  justify='space-between'
                >
                  <Col flex='1'>
                    <p className={styles.name}>{it?.title}</p>
                    <Row className={styles.consentInfo} align='middle'>
                      <p>{it?.lastUpdated}</p>

                      <p>{it?.version}</p>

                      <p
                        className={clsx(styles.status, {
                          [styles.statusActive]: it?.status === 'Published',
                        })}
                      >
                        {it?.status}
                      </p>
                    </Row>
                    <p className={styles.description}>{it?.description}</p>
                  </Col>
                  <Col>
                    <Form.Item
                      className={styles.panelContent}
                      name={`${it?.id}`}
                      valuePropName='checked'
                    >
                      <Checkbox disabled={disable} />
                    </Form.Item>
                  </Col>
                </Row>
              );
            })}

            <Row justify='space-between'>
              <Pagination
                className={styles.pagination}
                current={data?.current}
                onChange={onChange}
                total={data?.total}
                defaultPageSize={data?.pageSize}
                itemRender={paginationItemRender}
                showSizeChanger={false}
              />
            </Row>
          </div>
        )}

        {!onlyView && (
          <Row align='middle' justify='start'>
            {isHavePermissionSaveConsent && (
              <Button htmlType='submit' className={styles.btnSave} loading={loadingUpdateConsent}>
                {t('save')}
              </Button>
            )}
            {isHavePermissionCreateLink && (
              <Button
                className={styles.btnGenerateLink}
                onClick={requestGenerateLink.run}
                loading={requestGenerateLink.loading}
              >
                {t('generate_link')}
              </Button>
            )}
          </Row>
        )}
      </Form>

      {requestGenerateLink?.data && (
        <div className={styles.textLink} onClick={onCopyLink}>
          {requestGenerateLink?.data}
        </div>
      )}
    </div>
  );
};

function Consents({
  userId,
  applicationName,
  refDataHistory,
}: {
  userId: string;
  applicationName: any;
  refDataHistory: any;
}) {
  const {
    data,
    loading,
    onChange,
    onSearchConsent,
    onSaveConsent,
    loadingUpdateConsent,
    suggestionConsents,
    onSuggestionConsentsDebounce,
    onLoadMoreSuggestionConsents,
    onResetSuggestionConsents,
  } = useConsent({ userId, applicationName });

  if (!applicationName) {
    return null;
  }

  const onSearch = (search: string, callback?: any) => {
    onSearchConsent(search, callback);
  };

  const onSave = async (values: any) => {
    try {
      await onSaveConsent(values);
      if (refDataHistory.current?.refreshDataHistory) refDataHistory.current.refreshDataHistory();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <div className={styles.consentsWrap}>
      <SearchBox
        onSearchConsent={onSearch}
        suggestionConsents={suggestionConsents}
        onSuggestionConsentsDebounce={onSuggestionConsentsDebounce}
        onLoadMoreSuggestionConsents={onLoadMoreSuggestionConsents}
        onResetSuggestionConsents={onResetSuggestionConsents}
        refDataHistory={refDataHistory}
      />

      <ConsentsList
        data={data}
        loading={loading}
        onChange={onChange}
        onSaveConsent={onSave}
        loadingUpdateConsent={loadingUpdateConsent}
        userId={userId}
        application={applicationName}
      />
    </div>
  );
}

export default Consents;
