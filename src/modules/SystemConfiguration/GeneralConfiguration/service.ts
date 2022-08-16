import { useRequest } from 'ahooks';
import { message } from 'antd';
import { GENERAL_CASE_MANAGEMENT_LIST } from 'constants/common.constants';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { GENERAL_CONFIG_BASE_URL, API_PATH } from 'utils/api/constant';

const getListGeneralCaseManagementService = async () => {
  const response: any = await Promise.all(
    GENERAL_CASE_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_BASE_URL, { type }),
    ),
  );

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
