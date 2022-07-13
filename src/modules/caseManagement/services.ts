import ApiUtils from 'utils/api/api.utils';
import { useMount, useRequest } from 'ahooks';
import { API_PATH } from 'utils/api/constant';
import { ResponseBase } from 'utils/api/api.types';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface IUserInfo {
  id?: string;
  imageUrl?: string;
  email?: string;
  address: string;

  firstNameEn?: string;
  lastNameEn?: string;
  firstNameTh?: string;
  lastNameTh?: string;
  dateOfBirth?: string;
  mobile?: string;
  cardId?: string;
  nationality?: string;
  passportNo?: string;
  laserCode?: string;
}
interface IDetialCase {
  id: number;
  action: string;
  department: string;
  assignTo: string;
  description: string;
  responseStatus: string;
  acceptedDate: string;
  reason?: string;
  status?: string;
  dateOfResponse?: string;
  comment?: string;
  userProfile?: IUserInfo;
}

const getDetailCaseService = async (caseId: string | undefined): Promise<IDetialCase> => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_DETAIL_CASE, { caseId });

  return {
    id: response?.content?.data?.id,
    action: response?.content?.data?.action,
    department: response?.content?.data?.department,
    assignTo: response?.content?.data?.assignTo,
    description: response?.content?.data?.description,
    responseStatus: response?.content?.data?.responseStatus,
    reason: response?.content?.data?.reason,
    status: response?.content?.data?.status,
    dateOfResponse: response?.content?.data?.dateOfResponse,
    comment: response?.content?.data?.comment,
    acceptedDate: response?.content?.data?.acceptedDate,
    userProfile: response?.content?.data?.__userProfile__,
  };
};

export const useCaseDetail = (caseId: string | undefined) => {
  const { data, loading } = useRequest(async () => getDetailCaseService(caseId));
  return { data, loading };
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
