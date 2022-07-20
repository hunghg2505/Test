import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

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

const getListActionService = async () => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_ACTION);

  return {
    data: response?.content?.data?.map(({ id, name }: any) => ({
      value: name,
      label: name,
      id,
    })),
  };
};

const getListRelateDepartmentService = async () => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_DEPARTMENT);

  return {
    data: response?.content?.data?.map(({ id, name }: any) => ({
      value: name,
      label: name,
      id,
    })),
  };
};

const getListUserService = async () => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_USER);

  return {
    data: response?.content?.map(({ sid, name }: any) => ({
      sid,
      label: `${name}`,
      value: `${name}`,
    })),
  };
};

export const useCreateCase = (onFinishSubmitForm: any) => {
  const navigate = useNavigate();

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
  const { data: actionsData, run: runActionService } = useRequest(
    async () => getListActionService(),
    {
      cacheKey: 'list-action',
    },
  );
  const { data: departmentsData, run: runDepartmentService } = useRequest(
    async () => getListRelateDepartmentService(),
    {
      cacheKey: 'list-department',
    },
  );
  const { data: usersData, run: runUserService } = useRequest(async () => getListUserService(), {
    cacheKey: 'list-user',
  });

  useMount(() => {
    runActionService();
    runDepartmentService();
    runUserService();
  });

  return {
    actionsData,
    departmentsData,
    usersData,
  };
};
