import { routePath } from 'routing/path.routing';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRequest, useMount } from 'ahooks';
import moment from 'moment';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

export const getDataSubjectHistoryService = async (value: any): Promise<any> => {
  const r: any = await ApiUtils.fetch(API_PATH.SUBJECT_HISTORY, {
    userId: value?.userId,
    limit: 10,
    page: value?.current || 1
  });

  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: +r?.content?.metadata?.itemPage || 10,
    data:
      r?.content?.data?.map((item: any) => ({
        ...item,
        key: `${item?.id}`,
        noId: `${item?.id}`,
        requestDate: moment(item?.requestDate).format('MMM DD, YYYY')
      })) || []
  };
};

const forgotMeService = (id: any) => {
  return ApiUtils.remove(API_PATH.FORGET_ME(id));
};

export const useDataSubjectHistory = ({
  userId,
  subjectId
}: {
  userId: string;
  subjectId: string;
}) => {
  const navigate = useNavigate();

  const { data, loading, run } = useRequest(
    async ({ current }) => getDataSubjectHistoryService({ userId, current }),
    {
      manual: true
    }
  );

  useMount(() => {
    run({ current: 1 });
  });

  const reqForgotMe = useRequest(async () => forgotMeService(userId), {
    manual: true,
    onSuccess: (r) => {
      message.success('Delete profile successfully');
      navigate(-1);
    },
    onError: (e) => {
      message.error('Fail to delete profile');
      console.log('forgot me error', e);
    }
  });

  const onChangeCurrent = (current: number) => {
    run({
      current
    });
  };

  return {
    data,
    loading,
    onChange: onChangeCurrent,
    reqForgotMe
  };
};
