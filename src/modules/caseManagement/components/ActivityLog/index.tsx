import React from 'react';
import { Collapse } from 'antd';
import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';

import styles from './index.module.scss';

const { Panel } = Collapse;

interface IActivity {
  activityName: string;
  activityDesc: string;
  activityFrom: string;
  activityDate: string;
  commentDetail?: string;
}

const ActivityList = () => {
  return (
    <div className={styles.activityList}>
      <Collapse
        expandIcon={({ isActive }) => {
          return isActive ? ArrowUpCollapse : ArrowDownCollapse;
        }}
      >
        {MOCK_DATA.map((activity: IActivity, key) => {
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

function ActivityLog() {
  return (
    <div className={styles.activityLog}>
      <h2>ActivityLog</h2>
      <ActivityList />
    </div>
  );
}

const MOCK_DATA = [
  {
    activityName: 'New Case',
    activityDesc: '[userName] has created a new case',
    activityFrom: 'System.sys',
    activityDate: 'May 14,2022 hh:mm:ss',
  },
  {
    activityName: 'Status Update',
    activityDesc: '[userName] has created a new case',
    activityFrom: 'System.sys',
    activityDate: 'May 14,2022 hh:mm:ss',
  },
  {
    activityName: 'Comment',
    activityDesc: '[userName] has created a new case',
    activityFrom: 'System.sys',
    activityDate: 'May 14,2022 hh:mm:ss',
    commentDetail: `- Q: I have read and assessed the User Story, and there are some changes regarding
    the format of the User Story. As I see here, you have listed all the fields and
    field types, detailed values in drop-down, Do I still need to create detailed
    business rules for each field? Or I will follow the format you have created for
    easier understanding from both teams.`,
  },
  {
    activityName: 'Assigned to [userName]',
    activityDesc: '[userName] has created a new case',
    activityFrom: 'System.sys',
    activityDate: 'May 14,2022 hh:mm:ss',
  },
];

export default ActivityLog;
