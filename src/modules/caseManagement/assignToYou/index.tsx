import clsx from 'clsx';
import ContainerLayout from 'libraries/layouts/container.layout';
import { useTranslation } from 'react-i18next';
import CaseManagementTable from '../components/CaseManagementTable';

import styles from './index.module.scss';
import { useAssignToYou } from './service';

function AssignToYou() {
  const { t } = useTranslation();
  const { data, loading, onChange } = useAssignToYou();

  return (
    <ContainerLayout title='Assign To You'>
      <div className={styles.wrap}>
        <h1 className={styles.heading}>Case Assigned to you</h1>
        <div
          className={clsx(styles.assignToYouContent, {
            [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length,
          })}
        >
          <CaseManagementTable data={data} loading={loading} onChange={onChange} />
        </div>
      </div>
    </ContainerLayout>
  );
}

export default AssignToYou;
