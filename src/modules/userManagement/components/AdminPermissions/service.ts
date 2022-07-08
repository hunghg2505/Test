import { useRequest } from 'ahooks';

const getUserPermissions = async () => {
  return {
    current: 1,
    list: [
      {
        key: '1',
        no: '1',
        firstName: 'Hung',
        lastName: 'Hung',
        roleName: 'Admin',
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
        firstName: 'Hung',
        lastName: 'Hung',
        roleName: 'Admin',
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
