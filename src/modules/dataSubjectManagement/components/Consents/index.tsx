import { useClickAway } from 'ahooks';
import { Checkbox, Collapse, Form, Pagination, Row } from 'antd';

import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';
import IconSearch from 'assets/icons/icon-search';
import useCaseManagementPermission from 'hooks/useCaseManagementPermission';
import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import Button from 'libraries/UI/Button';
import Input from 'libraries/UI/Input';
import { paginationItemRender } from 'libraries/UI/Pagination';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateCaseForm from '../CreateCaseForm';
import styles from './index.module.scss';
import { useConsent } from './service';
import SuggestConsents from './SuggestConsents';

const { Panel } = Collapse;

export interface DataType {
  key: string;
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
  defaultValue: { [key: string]: string };
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
            {/* <Row className={styles.consentInfo}>
              <Col>{item?.lastUpdated}</Col>
              <Col>{item?.version}</Col>
              <Col className={item?.status === 'Published' ? styles.active : ''}>
                {item?.status}
              </Col>
            </Row> */}
            <div>{item.description}</div>
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};

const ConsentsList = ({ data, loading, onChange, onSaveConsent, loadingUpdateConsent }: any) => {
  const { t } = useTranslation();
  const [formConsent] = Form.useForm();

  const { isHavePermissionSaveConsent } = useDataSubjectManagementPermission();

  const initialValues = data?.data?.reduce((acc: any, v: any) => {
    acc[v?.name] = [];
    v?.list?.forEach((it: any) => {
      if (it?.selected) acc[v?.name].push(it?.value);
    });

    return acc;
  }, {});

  const onUpdateConsent = (value: any) => {
    onSaveConsent(value);
  };

  const onFieldsChange = (values: any, allValues: any) => {
    const val = allValues?.reduce((acc: any, v: any) => {
      const name = get(v, 'name[0]');
      acc[`${name}`] = get(v, 'value');
      return acc;
    }, {});
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
              {data?.data?.map((it: DataType) => {
                const content = (
                  <Panel
                    key={it?.key}
                    header={
                      <div className={styles.panelHeader}>
                        <div className={styles.name}>{it?.name}</div>
                        <Row align='middle'>
                          <div className={styles.lastUpdated}>{it?.lastUpdated}</div>
                          <div className={styles.version}>{it?.version}</div>
                          <div
                            className={`${styles.status} ${
                              it?.status === 'Accepted' ? styles.active : ''
                            }`}
                          >
                            {it?.status}
                          </div>
                        </Row>
                        <div className={styles.description}>{it?.description}</div>
                      </div>
                    }
                  >
                    <Form.Item className={styles.panelContent} name={`${it?.key}`}>
                      <ConsentOption
                        dataConsent={it?.list}
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
  } = useConsent({ userId });

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
      />
    </div>
  );
}

export default Consents;
