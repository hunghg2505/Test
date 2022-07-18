import { useClickAway } from 'ahooks';
import { Checkbox, Col, Collapse, Form, Pagination, Row } from 'antd';

import IconSearch from 'assets/icons/icon-search';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useRef, useState, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { useConsent } from './service';
import SuggestConsents from './SuggestConsents';
import get from 'lodash/get';
import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';
import CreateCaseForm from '../CreateCaseForm';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import useConsentManagementPermission from 'hooks/useConsentManagementPermission';

const { Panel } = Collapse;

interface IItem {
  name: string;
  lastUpdated: string;
  version: string;
  status: string;
  description: string;
  list?: {
    title: string;
    description: string;
    value: string;
  }[];
}

export interface DataType {
  key: string;
  dataConsent: IItem;
  defaultValue: { [key: string]: string };
}

const SearchBox = ({
  onSearchConsent,
  suggestionConsents,
  onSuggestionConsentsDebounce,
  onLoadMoreSuggestionConsents,
  onResetSuggestionConsents,
  refDataHistory,
  refSearchConsent,
}: {
  onSearchConsent: (search: string, callback?: any) => void;
  suggestionConsents: any;
  onSuggestionConsentsDebounce: (value: string, callback: any) => void;
  onLoadMoreSuggestionConsents: (value: string) => void;
  onResetSuggestionConsents: () => void;
  refDataHistory: any;
  refSearchConsent: any;
}) => {
  const { t } = useTranslation();
  const refForm: any = useRef();
  const refListConsents: any = useRef();
  const [formSearchConsent] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const [consentsId, setConsentsId] = useState<string[]>([]);

  const { isHavePermissionCreateCase } = useDataSubjectManagementPermission();

  const [isOpenCreateCaseForm, setIsOpenCreateCaseForm] = useState(false);

  useImperativeHandle(refSearchConsent, () => {
    return {
      enableButtonCreateConsent: () => setDisable(true),
      disableButtonCreateConsent: () => setDisable(false),
      updateConsentsId: (consentsId: string[]) => {
        setConsentsId(consentsId);
      },
    };
  });

  const onFieldsChange = (values: any) => {
    const value = get(values, '[0].value', '');
    if (value?.length < 3) refListConsents.current.closeListUser();
    onSuggestionConsentsDebounce(value || '', () => {
      if (refListConsents.current?.openListUser) refListConsents.current.openListUser();
    });
  };

  const onFinish = (values: any) => {
    const value = get(values, 'search', '');
    onSearchConsent(value, () => {
      if (refListConsents.current?.closeListUser) {
        refListConsents.current.closeListUser();
        onResetSuggestionConsents();
      }
    });
  };

  useClickAway(() => {
    if (refListConsents.current?.closeListUser) {
      refListConsents.current.closeListUser();
      onResetSuggestionConsents();
    }
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
          disabled={disable}
        >
          {t('create_case')}
        </Button>
      )}
      <CreateCaseForm
        visible={isOpenCreateCaseForm}
        onClose={() => setIsOpenCreateCaseForm(false)}
        refDataHistory={refDataHistory}
        consents={consentsId}
      />
    </Row>
  );
};

const ConsentOption = ({ value, onChange, dataConsent, isHavePermissionSaveConsent }: any) => {
  const onChangeValues = (checkedValues: any) => {
    onChange(checkedValues);
  };

  if (!dataConsent?.length) {
    return null;
  }

  return (
    <Checkbox.Group
      onChange={onChangeValues}
      defaultValue={value}
      disabled={!isHavePermissionSaveConsent}
    >
      {dataConsent.map((item: any) => {
        return (
          <Checkbox key={item.value} value={item.value}>
            <h4>{item.title}</h4>
            <Row className={styles.consentInfo}>
              <Col>{item?.lastUpdated}</Col>
              <Col>{item?.version}</Col>
              <Col className={item?.status === 'Published' ? styles.active : ''}>
                {item?.status}
              </Col>
            </Row>
            <div>{item.description}</div>
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};

const ConsentsList = ({
  data,
  loading,
  onChange,
  onSaveConsent,
  loadingUpdateConsent,
  onCheckConsent,
}: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();

  const { isHavePermissionSaveConsent } = useDataSubjectManagementPermission();

  const initialValues = data?.data?.reduce(
    (acc: any, v: any) => ({ ...acc, [v?.key]: Object.keys(v?.defaultValue) }),
    {},
  );

  const onUpdateConsent = (value: any) => {
    onSaveConsent(value, initialValues);
  };

  const onFieldsChange = (values: any, allValues: any) => {
    const val = allValues?.reduce((acc: any, v: any) => {
      const name = get(v, 'name[0]');
      acc[`${name}`] = get(v, 'value');
      return acc;
    }, {});
    onCheckConsent(val, initialValues);
  };

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
        onFieldsChange={onFieldsChange}
      >
        {data?.data?.length === 0 ? (
          <p className={styles.noResultText}>{t('no_result_found')}</p>
        ) : (
          <div className={styles.listConsent}>
            <Collapse
              // accordion
              expandIcon={({ isActive }) => {
                return isActive ? ArrowUpCollapse : ArrowDownCollapse;
              }}
            >
              {data?.data?.map(({ dataConsent, key }: DataType) => {
                const content = (
                  <Panel
                    key={key}
                    header={
                      <div className={styles.panelHeader}>
                        <div className={styles.name}>{dataConsent.name}</div>
                        <div className={styles.description}>{dataConsent.description}</div>
                      </div>
                    }
                  >
                    <Form.Item className={styles.panelContent} name={`${key}`}>
                      <ConsentOption
                        dataConsent={dataConsent?.list}
                        isHavePermissionSaveConsent={isHavePermissionSaveConsent}
                      />
                    </Form.Item>
                  </Panel>
                );
                return content;
              })}
            </Collapse>
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

        {isHavePermissionSaveConsent && (
          <Button htmlType='submit' className={styles.btnSave} loading={loadingUpdateConsent}>
            {t('save')}
          </Button>
        )}
      </Form>
    </div>
  );
};

function Consents({ userId, refDataHistory }: { userId: number; refDataHistory: any }) {
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
    onCheckConsent,
  } = useConsent({ userId });

  const refSearchConsent: any = useRef();

  const onSearch = (search: string, callback?: any) => {
    onSearchConsent(search, callback);
  };

  const onSave = async (values: any, initialValues: any) => {
    try {
      await onSaveConsent(values, initialValues);
      if (refDataHistory.current?.refreshDataHistory) refDataHistory.current.refreshDataHistory();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const onCheckConsentSelected = (values: any, initialValues: any) => {
    const newConsent = onCheckConsent(values, initialValues);

    if (!newConsent?.insert?.length) {
      refSearchConsent?.current?.enableButtonCreateConsent();
      return;
    }
    if (newConsent?.insert?.length && refSearchConsent?.current?.enableButtonCreateConsent) {
      const consentsId = newConsent.insert.map((v: any) => v.consentId + '');

      refSearchConsent?.current?.disableButtonCreateConsent();
      refSearchConsent?.current?.updateConsentsId(consentsId);
    }
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
        refSearchConsent={refSearchConsent}
      />

      <ConsentsList
        data={data}
        loading={loading}
        onChange={onChange}
        onSaveConsent={onSave}
        loadingUpdateConsent={loadingUpdateConsent}
        onCheckConsent={onCheckConsentSelected}
      />
    </div>
  );
}

export default Consents;
