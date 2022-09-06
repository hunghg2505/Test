import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRequest, useMount } from 'ahooks';
import dayjs from 'dayjs';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';
import { formatIdSubjectHistory } from 'utils/common.utils';

export const getDataSubjectHistoryService = async (value: any): Promise<any> => {
  const PATH = !value?.onlyView ? API_PATH.SUBJECT_HISTORY : API_PATH.SUBJECT_HISTORY_ONLY_VIEW;

  const r: any = await ApiUtils.fetch(PATH, {
    businessProfileId: value?.userId,
    application: value?.application,
    limit: 10,
    page: value?.current || 1,
  });

  const current = r?.content?.metadata?.currentPage || 1;
  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: +r?.content?.metadata?.itemPage || 10,
    data:
      r?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.id}`,
        noId: formatIdSubjectHistory(current, idx, item.requestType, item.id, item.createdAt),
        requestDate: dayjs(item?.createdAt).format('MMM DD, YYYY'),
      })) || [],
  };
};

const forgotMeService = (id: any) => {
  return ApiUtils.remove(API_PATH.FORGET_ME(id));
};

export const useDataSubjectHistory = ({
  userId,
  application,
  onlyView = false,
}: {
  userId: string;
  application?: string;
  onlyView?: boolean;
}) => {
  const navigate = useNavigate();

  const { data, loading, run, refresh } = useRequest(
    async ({ current }) => getDataSubjectHistoryService({ userId, application, current, onlyView }),
    {
      manual: true,
    },
  );

  const subjectHistoryData = data?.data.map((item: any) => {
    return {
      ...item,
      dataRequest:
        typeof item?.dataRequest === 'string' ? item.dataRequest : item.dataRequest.consentName,
    };
  });

  useMount(() => {
    run({ current: 1 });
  });

  const reqForgotMe = useRequest(async () => forgotMeService(userId), {
    manual: true,
    onSuccess: () => {
      message.success('Delete profile successfully');
      navigate(-1);
    },
    onError: () => {
      message.error('Fail to delete profile');
    },
  });

  const onChangeCurrent = (current: number) => {
    run({
      current,
    });
  };

  return {
    data,
    loading,
    onChange: onChangeCurrent,
    reqForgotMe,
    subjectHistoryData,
    refresh,
  };
};
