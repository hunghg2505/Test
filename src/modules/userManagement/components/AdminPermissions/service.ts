import { useRequest } from 'ahooks';

const getUserPermissions = async () => {
  return {
    current: 1,
    list: [
      {
        key: '1',
        no: '1',
        roles: 'Roles 1',
        description: 'N/a',
        actions: 'A',
        listRoles: [
          {
            id: 1,
            permission: 'A',
            profile: '',
            dsm: '',
            case: '',
            consent: '',
          },
          {
            id: 2,
            permission: 'A',
            profile: '',
            dsm: '',
            case: '',
            consent: '',
          },
        ],
      },
      {
        key: '2',
        no: '2',
        roles: 'Roles 2',
        description: 'N/a',
        actions: 'B',
        listRoles: [
          {
            id: 1,
            permission: 'A',
            profile: '',
            dsm: '',
            case: '',
            consent: '',
          },
          {
            id: 2,
            permission: 'A',
            profile: '',
            dsm: '',
            case: '',
            consent: '',
          },
        ],
      },
    ],
  };
};

const useAdminPermissions = () => {
  const { data, loading } = useRequest(getUserPermissions);

  return {
    data,
    loading,
    onChange: () => {
      console.log('a');
    },
  };
};

export { useAdminPermissions };
