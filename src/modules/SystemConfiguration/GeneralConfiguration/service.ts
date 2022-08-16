import { useRequest } from 'ahooks';
import { message } from 'antd';
import { GENERAL_CASE_MANAGEMENT_LIST, GENERAL_CONFIG_TYPE } from 'constants/common.constants';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { GENERAL_CONFIG_BASE_URL, API_PATH } from 'utils/api/constant';

// const getTitleGeneralCaseManagement = (type: string) => {
//   let title;
//   switch (type) {
//     case GENERAL_CONFIG_TYPE.SUBJECT_RIGHT:
//       title = 'Create Case - Data Subject Rights';
//       break;
//     case GENERAL_CONFIG_TYPE.CASE_STATUS:
//       title = 'Create Case - Status';
//       break;
//     case GENERAL_CONFIG_TYPE.RELATED_DEPARTMENT:
//       title = 'Create Case - Related Department';
//       break;
//     case GENERAL_CONFIG_TYPE.CASE_RESULT:
//       title = 'Create Case - Result';
//       break;
//     default:
//       title = '';
//       break;
//   }

//   return title;
// };

const getListGeneralCaseManagementService = async () => {
  const response: any = await Promise.all(
    GENERAL_CASE_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_BASE_URL, { type }),
    ),
  );

  const productRes: any = await ApiUtils.fetch(API_PATH.GET_PRODUCT_LIST);

  return {
    featureList: [
      {
        id: 1,
        name: 'Case Management',
        list: [
          {
            id: 'SUBJECT_RIGHT',
            name: 'Create Case - Data Subject Rights',
            listItem: response[0]?.content?.data,
          },
          {
            id: 'RELATED_DEPARTMENT',
            name: 'Create Case - Related Department',
            listItem: response[1]?.content?.data,
          },
          { id: 'CASE_STATUS', name: 'Create Case - Status', listItem: response[2]?.content?.data },
          { id: 'CASE_RESULT', name: 'Create Case - Result', listItem: response[3]?.content?.data },
        ],
      },
      {
        id: 2,
        name: 'Consent Management',
        list: [
          {
            id: 'PRODUCT',
            name: 'Create Consent - Product',
            listItem: productRes?.content?.data,
          },
        ],
      },
    ],
  };
};

export const useGeneralConfig = () => {
  const { data, run, loading, refresh } = useRequest(getListGeneralCaseManagementService);

  return { data, run, loading, refresh };
};

interface ICreateGeneralCaseManagement {
  name: string;
  type: string;
}

const createGeneralCaseManagement = async (body: ICreateGeneralCaseManagement) => {
  return ApiUtils.post<ICreateGeneralCaseManagement, ResponseBase<any>>(
    GENERAL_CONFIG_BASE_URL,
    body,
  );
};

export const useCreateGeneralCaseManagement = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateGeneralCaseManagement) => {
      return createGeneralCaseManagement(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Success');
        onFinishSubmitForm();
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent ? `${error?.content?.messageContent}` : 'Create  Error',
        );
        onFinishSubmitForm();
      },
    },
  );
};

const deleteGeneralCaseManagementService = async (id: string | number, body: { type: string }) => {
  return ApiUtils.remove<any, ResponseBase<any>>(API_PATH.DELETE_GENERAL_CASE_MANAGEMENT(id), body);
};

export const useDeleteGeneralCaseManagement = (onFinishSubmitForm: any) => {
  return useRequest(
    async (id: string | number, body: any) => {
      return deleteGeneralCaseManagementService(id, body);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Delete Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Delete Error');
        onFinishSubmitForm();
      },
    },
  );
};

interface ICreateProduct {
  name: string;
}

const createProduct = async (body: ICreateProduct) => {
  return ApiUtils.post<ICreateProduct, ResponseBase<any>>(API_PATH.CREATE_PRODUCT, body);
};

export const useCreateProduct = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateProduct) => {
      return createProduct(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Success');
        onFinishSubmitForm();
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent ? `${error?.content?.messageContent}` : 'Create  Error',
        );
        onFinishSubmitForm();
      },
    },
  );
};