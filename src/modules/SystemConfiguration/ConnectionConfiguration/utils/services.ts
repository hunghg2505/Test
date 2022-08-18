import { useRequest } from 'ahooks';
import { message } from 'antd';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH, COMPANY_SERVICE_BASE_URL } from 'utils/api/constant';

// Create, Update, Delete Company
interface ICreateCompany {
  name: string;
}

interface IEditCompany {
  id: number;
  name?: string;
}
interface IDeleteCompany {
  id: number;
}

const createCompanyService = async (body: ICreateCompany) => {
  return ApiUtils.post<ICreateCompany, ResponseBase<any>>(COMPANY_SERVICE_BASE_URL, body);
};

const editCompanyService = async (body: IEditCompany) => {
  return ApiUtils.put<IEditCompany, ResponseBase<any>>(COMPANY_SERVICE_BASE_URL, body);
};

const deleteCompanyService = async (body: IDeleteCompany) => {
  return ApiUtils.remove<IDeleteCompany, ResponseBase<any>>(COMPANY_SERVICE_BASE_URL, body);
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
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Create Company Error',
        );
        onFinishSubmitForm();
      },
    },
  );
};

export const useEditCompany = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: IEditCompany) => {
      return editCompanyService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Edit Company Success');
        onFinishSubmitForm();
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Edit Company Error',
        );
        onFinishSubmitForm(true);
      },
    },
  );
};

export const useDeleteCompany = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: IDeleteCompany) => {
      return deleteCompanyService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Delete Company Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Delete Company Error');
        onFinishSubmitForm();
      },
    },
  );
};

// Create, Update, Delete Application

interface ICreateApplication {
  companyId: number;
  name: string;
}

const createApplicationService = async (body: ICreateApplication) => {
  return ApiUtils.post<ICreateApplication, ResponseBase<any>>(API_PATH.CREATE_APPLICATION, body);
};

export const useCreateApplication = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateApplication) => {
      return createApplicationService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Application Success');
        onFinishSubmitForm();
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Create Application Error',
        );
      },
    },
  );
};
