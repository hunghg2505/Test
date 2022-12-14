import { useKeycloak } from '@react-keycloak/web';
import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import useCaseManagementPermission from 'hooks/useCaseManagementPermission';
import { useNavigate } from 'react-router-dom';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

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
  userProfile?: any;
  fileUrl?: string;
  redirect?: boolean;
  companyInfo?: any;
  businessProfileId?: string;
  idNo?: string;
  application?: string;
  createdAt?: string;
}

interface IEditCase {
  caseId: number;
  editCaseParam: {
    action?: string;
    department?: string;
    assignTo?: string;
    description?: string;
    responseStatus?: string;
    acceptedDate?: string;
    reason?: string;
    status?: string;
    dateOfResponse?: string;
    comment?: string;
    attachFileUrl?: string;
    fileUrl?: string;
    companyId?: string;
  };
}

const getDetailCaseService = async (caseId: string | undefined): Promise<IDetialCase> => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_DETAIL_CASE, {
    caseId,
    page: 1,
    limit: 1,
  });

  const r: any = await ApiUtils.fetch(API_PATH.USER_PROFILE_DETAIL, {
    businessProfileId: response?.content?.data?.businessProfileId,
    idNo: response?.content?.data?.idNo,
  });

  const userProfile = {
    id: r?.content?.id,
    imageUrl: '',
    firstNameEn: r?.content?.firstNameEn || '',
    lastNameEn: r?.content?.lastNameEn || '',
    firstNameTh: r?.content?.firstNameTh || '',
    lastNameTh: r?.content?.lastNameTh || '',
    email: r?.content?.email || '',
    address: 'Test Address',
    dateOfBirth: r?.content?.dateOfBirth || '',
    nationality: r?.content?.nationality || '',
    cardId: r?.content?.idType === 'thai-id' ? r?.content?.idNo : '',
    passportNo: r?.content?.idType === 'passport' ? r?.content?.idNo : '',
    laserCode: r?.content?.thaiIdLaserNo || '',
    mobile: r?.content?.mobileNo || '',
    application: r?.content?.application,
  };

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
    fileUrl: response?.content?.data?.fileUrl,
    businessProfileId: response?.content?.data?.businessProfileId,
    idNo: response?.content?.data?.idNo,
    application: response?.content?.data?.application,
    userProfile,
    companyInfo: response?.content?.data?.__companyInfo__,
    redirect: false,
    createdAt: response?.content?.data?.createdAt,
  };
};

const deleteCaseService = async (caseId: string | undefined) => {
  return ApiUtils.remove(API_PATH.DELETE_CASE, { caseId });
};

export const useCaseDetail = (caseId: string | undefined) => {
  const { keycloak } = useKeycloak();
  const { isHavePermissionViewSearchCase, isHavePermissionViewAssignToCase } =
    useCaseManagementPermission();

  const { data, loading, refresh } = useRequest(async () => {
    const r = await getDetailCaseService(caseId);

    if (r && r?.assignTo !== keycloak?.tokenParsed?.name && !isHavePermissionViewSearchCase) {
      return {
        ...r,
        redirect: true,
        userProfile: null,
      };
    }

    if (r && r?.assignTo === keycloak?.tokenParsed?.name && !isHavePermissionViewAssignToCase) {
      return {
        ...r,
        redirect: true,
        userProfile: null,
      };
    }
    return r;
  });

  const navigate = useNavigate();

  const deleteCaseRequest = useRequest(async () => deleteCaseService(caseId), {
    manual: true,
    onSuccess: () => {
      message.success('Delete case successfully');
      navigate(-1);
    },
    onError: () => {
      message.error('Fail to delete case');
    },
  });

  return { data, loading, refresh, deleteCaseRequest };
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

const getListUserService = async () => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_USER);

  return {
    data: response?.content?.map(({ sid, name }: any) => ({
      id: sid,
      label: `${name}`,
      name,
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

  const { data: usersData, run: runUserService } = useRequest(async () => getListUserService(), {
    cacheKey: 'list-user',
  });

  useMount(() => {
    runActionService();

    runUserService();
  });

  return {
    actionsData,
    usersData,
  };
};

const editCaseService = async (body: IEditCase) => {
  return ApiUtils.post<any, ResponseBase<any>>(API_PATH.EDIT_CASE, body);
};

const serviceUploadFileComment = async (filesData: any) => {
  const fileData = filesData[0];
  if (fileData?.url) return { content: { fileUrl: fileData.url, type: 'no_update' } };
  delete fileData.uid;
  const formData = new FormData();
  formData.append('attachFile', fileData, fileData.name);

  return ApiUtils.postForm(API_PATH.UPLOAD_FILE, formData, {
    isAuth: true,
    'content-type': 'multipart/form-data',
  });
};

export const updateFileComment = () => {
  return useRequest(serviceUploadFileComment, { manual: true });
};

export const useEditCase = (onFinishSubmitForm: any) => {
  return useRequest(
    async (data: IEditCase, fileComment?: any) => {
      let attachFileUrl = null;
      if (fileComment?.length) {
        const r: any = await serviceUploadFileComment(fileComment);
        attachFileUrl = r?.content?.fileUrl;
      }

      data = { ...data, editCaseParam: { ...data.editCaseParam, attachFileUrl } };

      return editCaseService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Edit Case Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Edit Case Error');
        onFinishSubmitForm();
      },
    },
  );
};
