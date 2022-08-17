import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { GENERAL_CASE_MANAGEMENT_LIST } from 'constants/common.constants';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH, GENERAL_CONFIG_BASE_URL } from 'utils/api/constant';

interface ICreateCase {
  action: string;
  department: string;
  assignTo: string;
  description: string;
  responseStatus: string;
  reason: string;
  status: string;
  userProfileId: string | number;
  comment?: string;
}

const createCaseService = async (body: ICreateCase) => {
  return ApiUtils.post<any, ResponseBase<any>>(API_PATH.CASE_MANAGEMENT_BASE_URL, body);
};

const getListUserService = async () => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_USER);

  return {
    data: response?.content?.map(({ sid, name }: any) => ({
      id: sid,
      name,
    })),
  };
};

export const useCreateCase = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateCase) => {
      return createCaseService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Case Success');
        onFinishSubmitForm();
        {
          /** No need now  */
        }
        // navigate(routePath.CaseManagement);
      },
      onError: () => {
        message.error('Create Case Error');
        onFinishSubmitForm();
      },
    },
  );
};

export const useGetListDataDropDropdown = () => {
  const { data: usersData, run: runUserService } = useRequest(async () => getListUserService(), {
    cacheKey: 'list-user',
  });

  useMount(() => {
    runUserService();
  });

  return {
    usersData,
  };
};

const getDataDropDownService = async () => {
  const response: any = await Promise.all(
    GENERAL_CASE_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_BASE_URL, { type }),
    ),
  );

  return {
    subjectRightData: response[0]?.content?.data,
    relatedDepartmentData: response[1]?.content?.data,
    statusData: response[2]?.content?.data,
    resultData: response[3]?.content?.data,
  };
};

export const useGetDataDropdown = () => {
  const { data } = useRequest(getDataDropDownService);

  return { data };
};
