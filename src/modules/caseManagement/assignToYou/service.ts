import { API_PATH } from 'utils/api/constant';
import { useRequest, useMount } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { useKeycloak } from '@react-keycloak/web';
import { formatIdSubjectHistory } from 'utils/common.utils';
import dayjs from 'dayjs';

const getListAssignToYou = async (values: any, username: string) => {
  const response: any = await ApiUtils.post(API_PATH.GET_LIST_CASE_MANAGEMENT, {
    userId: 1,
    limit: 10,
    page: values?.page || 1,
    searchString: username,
    assignTo: username,
  });

  const current = response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.id}`,
        noId: formatIdSubjectHistory(current, idx, item.action, item.id, item.createdAt),
        description: item?.description,
        assignTo: item?.assignTo,
        caseStatus: item?.status,
        createdDate: dayjs(item?.createdAt).format('MMM DD, YYYY'),
      })) || [],
  };
};

const useAssignToYou = () => {
  const { keycloak } = useKeycloak();

  const { data, loading, run } = useRequest(
    async (values) => {
      if (keycloak?.tokenParsed?.preferred_username) {
        getListAssignToYou(values, keycloak?.tokenParsed?.preferred_username);
      }

      return {
        data: [],
      };
    },
    {
      manual: true,
      refreshDeps: [keycloak?.tokenParsed?.preferred_username],
    },
  );

  useMount(() => {
    run(getListAssignToYou);
  });

  const onChange = (page: number) => {
    run({
      page,
    });
  };

  return {
    data,
    loading,
    onChange,
  };
};

export { useAssignToYou };
