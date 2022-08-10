import { useRequest } from 'ahooks';

const getCompanies = async () => {
  return {
    list: [
      {
        id: 'c1',
        companyName: 'ABC',
        createdDate: '24/5/2022',
        applications: [
          {
            id: 'a1',
            applicationName: 'Application Name',
            applicationList: [
              {
                id: 'l1',
                name: 'API Endpoints',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l2',
                name: 'User profile detail',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l3',
                name: 'search user profile',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l4',
                name: 'handle opt-in/opt-out',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
            ],
          },
        ],
      },

      {
        id: 'c2',
        companyName: 'XYZ',
        createdDate: '24/5/2022',
        applications: [
          {
            id: 'a2',
            applicationName: 'Application Name',
            applicationList: [
              {
                id: 'l11',
                name: 'API Endpoints',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l22',
                name: 'User profile detail',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l33',
                name: 'search user profile',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
              {
                id: 'l44',
                name: 'handle opt-in/opt-out',
                info: {
                  linkUrl: 'https://',
                  method: '',
                  parameters: 'AA',
                  response: 'Response',
                  key: 'KEY',
                },
              },
            ],
          },
        ],
      },
    ],
  };
};

export const useCompanies = () => {
  const requestApplications = useRequest(getCompanies);

  return {
    companies: requestApplications?.data?.list,
    loading: requestApplications.loading,
  };
};
