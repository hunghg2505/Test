import { routePath } from '../../../../routing/path.routing';
import ApiUtils from 'utils/api/api.utils';
import { useRequest } from 'ahooks';
import { API_PATH } from 'utils/api/constant';
import { ResponseBase } from 'utils/api/api.types';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

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
  return ApiUtils.post<any, ResponseBase<any>>(API_PATH.CREATE_CASE, body);
};

export const useCreateCase = () => {
  const navigate = useNavigate();

  return useRequest(
    async (data: ICreateCase) => {
      return createCaseService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Case Success');

        {
          /** No need now  */
        }
        // navigate(routePath.CaseManagement);
      },
      onError: () => {
        message.error('Create Case Error');
      },
    },
  );
};
