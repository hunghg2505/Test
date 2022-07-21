import React, { forwardRef, useImperativeHandle } from 'react';
import { Collapse, Pagination, Row } from 'antd';
import ArrowDownCollapse from 'assets/icons/icon-arrow-down-collapse';
import ArrowUpCollapse from 'assets/icons/icon-arrow-up-collapse';

import styles from './index.module.scss';
import { useActivity } from './service';
import { paginationItemRender } from 'libraries/UI/Pagination';

const { Panel } = Collapse;

interface IActivity {
  activityName: string;
  activityDesc: string;
  activityFrom: string;
  activityDate: string;
  commentDetail?: string;
  linkFileDownload?: string;
  linkFileDownloadName?: string;
}

const ActivityList = ({ data, onDownloadComment }: any) => {
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
                  <p className={styles.fromDate}>Date: {activity.activityDate}</p>
                </div>
              }
              className={styles.commentPanel}
            >
              <div className={styles.detail}>
                <h2 className={styles.detailHeader}>Comment detail</h2>
                {activity.commentDetail && (
                  <div className={styles.detailContent}>{activity.commentDetail}</div>
                )}

                {activity?.linkFileDownload && (
                  <>
                    <p className={styles.attachedText}>Attached File</p>
                    <p
                      onClick={() =>
                        onDownloadComment(
                          activity?.linkFileDownload,
                          activity?.linkFileDownloadName,
                        )
                      }
                      className={styles.downloadLink}
                    >
                      {activity?.linkFileDownloadName}
                    </p>
                  </>
                )}
              </div>
            </Panel>
          );
          const otherItem = (
            <div className={styles.activity} key={key}>
              <h2 className={styles.name}>{activity.activityName}</h2>
              <p className={styles.desc}>{activity.activityDesc}</p>
              <p className={styles.fromDate}>
                <p className={styles.fromDate}>Date: {activity.activityDate}</p>
              </p>
            </div>
          );
          return activity.activityName === 'Comment' ? commentItem : otherItem;
        })}
      </Collapse>
    </div>
  );
};

function ActivityLog({ caseId }: { caseId: number }, ref: any) {
  const { loading, data, onChange, refresh, onDownloadComment } = useActivity(caseId);

  useImperativeHandle(ref, () => {
    return {
      refreshDataActivityLog: refresh,
    };
  });

  return (
    <div className={styles.activityLog}>
      <h2>Activity Log</h2>
      {!loading && data ? (
        <>
          <ActivityList data={data?.data} onDownloadComment={onDownloadComment} />{' '}
          <Row justify='end'>
            <Pagination
              current={data?.current}
              onChange={onChange}
              total={data?.total}
              defaultPageSize={data?.pageSize}
              itemRender={paginationItemRender}
              showSizeChanger={false}
            />
          </Row>
        </>
      ) : null}
    </div>
  );
}

export default forwardRef(ActivityLog);
