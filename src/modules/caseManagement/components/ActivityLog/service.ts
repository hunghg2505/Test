import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const getActivity = async (caseId: number) => {
  const res: any = await ApiUtils.fetch(API_PATH.GET_ACTIVITY, {
    caseId,
  });

  return res?.content?.data?.map((item: any) => {
    return {
      activityName: item?.title || '',
      activityDesc: item?.description || '',
      activityFrom: '',
      activityDate: dayjs(item?.updatedAt).format('MMM DD,YYYY HH:MM:ss'),

      commentDetail: item?.detailComment || '',
    };
  });

  // // console.log('data', da);

  // const MOCK_DATA = [
  //   {
  //     activityName: 'New Case',
  //     activityDesc: '[userName] has created a new case',
  //     activityFrom: 'System.sys',
  //     activityDate: 'May 14,2022 hh:mm:ss',
  //   },
  //   {
  //     activityName: 'Status Update',
  //     activityDesc: '[userName] has created a new case',
  //     activityFrom: 'System.sys',
  //     activityDate: 'May 14,2022 hh:mm:ss',
  //   },
  //   {
  //     activityName: 'Comment',
  //     activityDesc: '[userName] has created a new case',
  //     activityFrom: 'System.sys',
  //     activityDate: 'May 14,2022 hh:mm:ss',
  //     commentDetail: `- Q: I have read and assessed the User Story, and there are some changes regarding
  //     the format of the User Story. As I see here, you have listed all the fields and
  //     field types, detailed values in drop-down, Do I still need to create detailed
  //     business rules for each field? Or I will follow the format you have created for
  //     easier understanding from both teams.`,
  //   },
  //   {
  //     activityName: 'Assigned to [userName]',
  //     activityDesc: '[userName] has created a new case',
  //     activityFrom: 'System.sys',
  //     activityDate: 'May 14,2022 hh:mm:ss',
  //   },
  // ];

  // return MOCK_DATA;
};

const useActivity = (caseId: number) => {
  const { data, loading } = useRequest(async () => getActivity(caseId));

  return {
    loading,
    data: data,
  };
};

export { useActivity };
