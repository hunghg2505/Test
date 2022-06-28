import { Form, Row } from 'antd';
import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import clsx from 'clsx';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import { useTranslation } from 'react-i18next';
import CaseManagementTable from '../components/CaseManagementTable';

import styles from './index.module.scss';
import { useSearchCase } from './service';

function SearchCase() {
  const { t } = useTranslation();
  const { data, loading, onChange } = useSearchCase();

  return (
    <ContainerLayout title='Assign To You'>
      <div className={styles.wrap}>
        <Row justify='center' align='middle' className={styles.searchCaseHeader}>
          <Form>
            <div className={styles.formSearchWrap}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='username'
                  placeholder='Search Case'
                  className={styles.inputSearch}
                  classNameFormInput={styles.inputSearchForm}
                  maxLength={55}
                  rules={[
                    {
                      required: true,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                    {
                      min: 3,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                    {
                      max: 55,
                      message: t('messages.errors.max_search_firstname', { max: 55 }),
                    },
                  ]}
                />

                <Button
                  htmlType='submit'
                  className={styles.btnSearch}
                  type='secondary'
                  icon={<IconSearch />}
                >
                  {t('Search')}
                </Button>
              </Row>
            </div>
          </Form>

          <Button typeDisplay='ghost' className={styles.btnSearchAdvanced} icon={<IconCross />}>
            {t('advanced')}
          </Button>
        </Row>

        <div
          className={clsx(styles.searchCaseContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length,
          })}
        >
          <CaseManagementTable data={data} loading={loading} onChange={onChange} />
        </div>
      </div>
    </ContainerLayout>
  );
}

export default SearchCase;
