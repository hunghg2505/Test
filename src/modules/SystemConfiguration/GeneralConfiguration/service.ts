import { useRequest } from 'ahooks';
import { message } from 'antd';
import {
  GENERAL_CASE_MANAGEMENT_LIST,
  GENERAL_CONSENT_MANAGEMENT_LIST,
} from 'constants/common.constants';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import {
  GENERAL_CONFIG_BASE_URL,
  API_PATH,
  GENERAL_CONFIG_CONSENT_BASE_URL,
} from 'utils/api/constant';

const getListGeneralCaseManagementService = async () => {
  const response: any = await Promise.all(
    GENERAL_CASE_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_BASE_URL, { type }),
    ),
  );

  const responseConsent: any = await Promise.all(
    GENERAL_CONSENT_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_CONSENT_BASE_URL, { type }),
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
            type: 'Case-Management',
          },
          {
            id: 'RELATED_DEPARTMENT',
            name: 'Create Case - Related Department',
            listItem: response[1]?.content?.data,
            type: 'Case-Management',
          },
          {
            id: 'CASE_STATUS',
            name: 'Create Case - Status',
            listItem: response[2]?.content?.data,
            type: 'Case-Management',
          },
          {
            id: 'CASE_RESULT',
            name: 'Create Case - Result',
            listItem: response[3]?.content?.data,
            type: 'Case-Management',
          },
        ],
      },
      {
        id: 2,
        name: 'Consent Management',
        list: [
          {
            id: 'CONSENT_PRODUCT',
            name: 'Create Consent - Product',
            listItem: responseConsent[0]?.content?.data,
            type: 'Consent-Management',
          },
          {
            id: 'CONSENT_SERVICE',
            name: 'Create Consent - Service',
            listItem: responseConsent[1]?.content?.data,
            type: 'Consent-Management',
          },
          {
            id: 'CONSENT_STATUS',
            name: 'Create Consent - Status',
            listItem: responseConsent[2]?.content?.data,
            type: 'Consent-Management',
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

// Consent
interface ICreateGeneralConsentManagement {
  name: string;
  type: string;
}

const createGeneralConsentManagement = async (body: ICreateGeneralConsentManagement) => {
  return ApiUtils.post<ICreateGeneralConsentManagement, ResponseBase<any>>(
    GENERAL_CONFIG_CONSENT_BASE_URL,
    body,
  );
};

export const useCreateGeneralConsentManagement = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: ICreateGeneralConsentManagement) => {
      return createGeneralConsentManagement(data);
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

const deleteGeneralConsentManagementService = async (
  id: string | number,
  body: { type: string },
) => {
  return ApiUtils.remove<any, ResponseBase<any>>(
    API_PATH.DELETE_GENERAL_CONSENT_MANAGEMENT(id),
    body,
  );
};

export const useDeleteGeneralConsentManagement = (onFinishSubmitForm: any) => {
  return useRequest(
    async (id: string | number, body: any) => {
      return deleteGeneralConsentManagementService(id, body);
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
