import React from 'react';
import { Collapse } from 'antd';
import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';

import styles from './index.module.scss';
import { useActivity } from './service';

const { Panel } = Collapse;

interface IActivity {
  activityName: string;
  activityDesc: string;
  activityFrom: string;
  activityDate: string;
  commentDetail?: string;
}

const ActivityList = ({ data }: any) => {
  console.log('data', data);

  return (
    <div className={styles.activityList}>
      <Collapse
        expandIcon={({ isActive }) => {
          return isActive ? ArrowUpCollapse : ArrowDownCollapse;
        }}
      >
        {data.map((activity: IActivity, key: number) => {
          const commentItem = (
            <Panel
              key={key}
              header={
                <div className={styles.panelHeader}>
                  <h2 className={styles.name}>{activity.activityName}</h2>
                  <p className={styles.desc}>{activity.activityDesc}</p>
                  <p className={styles.fromDate}>
                    {activity.activityFrom}. {activity.activityDate}
                  </p>
                </div>
              }
            >
              <div className={styles.detail}>
                <h2 className={styles.detailHeader}>Comment detail</h2>
                <div className={styles.detailContent}>{activity.commentDetail}</div>
                <p className={styles.attachedText}>Attached File</p>
                <a href='#' download className={styles.downloadLink}>
                  filename.png
                </a>
              </div>
            </Panel>
          );
          const otherItem = (
            <div className={styles.activity} key={key}>
              <h2 className={styles.name}>{activity.activityName}</h2>
              <p className={styles.desc}>{activity.activityDesc}</p>
              <p className={styles.fromDate}>
                {activity.activityFrom}. {activity.activityDate}
              </p>
            </div>
          );
          return activity.activityName === 'Comment' ? commentItem : otherItem;
        })}
      </Collapse>
    </div>
  );
};

function ActivityLog({ caseId }: { caseId: number }) {
  const { loading, data } = useActivity(caseId);

  return (
    <div className={styles.activityLog}>
      <h2>ActivityLog</h2>
      {!loading && data ? <ActivityList data={data} /> : null}
    </div>
  );
}

export default ActivityLog;
