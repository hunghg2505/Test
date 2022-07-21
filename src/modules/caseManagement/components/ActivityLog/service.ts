import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';
import { saveAs } from 'file-saver';

const getActivity = async (values: any) => {
  const res: any = await ApiUtils.fetch(API_PATH.GET_ACTIVITY, {
    caseId: values.caseId,
    limit: 4,
    page: values?.current || 1,
  });

  return {
    total: +res?.content?.metadata?.total || 0,
    current: +res?.content?.metadata?.currentPage || 1,
    pageSize: 4,
    data: res?.content?.data?.map((item: any) => {
      return {
        activityName: item?.title || '',
        activityDesc: item?.description || '',
        activityFrom: '',
        activityDate: dayjs(item?.logDate).format('MMM DD,YYYY HH:MM:ss'),
        linkFileDownload: item?.fileUrl,
        linkFileDownloadName: item?.fileUrl?.split('commen-file/')?.[1],
        commentDetail: item?.detailComment || '',
      };
    }),
  };
};

const useActivity = (caseId: number) => {
  const { data, loading, run, refresh } = useRequest(async ({ current }) =>
    getActivity({ caseId, current }),
  );

  const reqDownloadComment = useRequest(
    async (url: string, fileName: string) => {
      return ApiUtils.fetch(url, null, undefined, 'blob');
    },
    {
      manual: true,
      onSuccess: (r: any, params: any) => {
        const fileName = params[1];
        console.log({ r });
        saveAs(r, fileName);
      },
      onError: (err) => {
        console.log('err', err);
      },
    },
  );

  useMount(() => {
    run({ current: 1 });
  });

  const onChangeCurrent = (current: number) => {
    run({
      current,
    });
  };

  return {
    loading,
    data,
    onChange: onChangeCurrent,
    refresh,
    onDownloadComment: reqDownloadComment.run,
  };
};

export { useActivity };
