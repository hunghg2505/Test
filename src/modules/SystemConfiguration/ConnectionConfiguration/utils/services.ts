import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { COMPANY_SERVICE_BASE_URL } from 'utils/api/constant';

interface ICreateCompany {
  name: string;
}

const createCompanyService = async (body: ICreateCompany) => {
  return ApiUtils.post<ICreateCompany, ResponseBase<any>>(COMPANY_SERVICE_BASE_URL, body);
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
