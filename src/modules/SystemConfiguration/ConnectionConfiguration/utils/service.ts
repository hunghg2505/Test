import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

interface ICreateCompany {
  name: string;
}

const createCompanyService = async (body: ICreateCompany) => {
  return ApiUtils.post<ICreateCompany, ResponseBase<any>>(API_PATH.CREATE_COMPANY, body);
};

export const useCreateCompany = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateCompany) => {
      return createCompanyService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Company Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Create Company Error');
        onFinishSubmitForm();
      },
    },
  );
};
