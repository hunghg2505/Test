import clsx from 'clsx';
import ContainerLayout from 'libraries/layouts/container.layout';
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
        <div>Search</div>
        <h1 className={styles.heading}>Search Case</h1>
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
