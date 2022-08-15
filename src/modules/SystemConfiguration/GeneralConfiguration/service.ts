import { useRequest } from 'ahooks';

export const useGeneralConfig = () => {
  return useRequest(async () => {
    return {
      featureList: [
        {
          id: 1,
          name: 'Case Management',
          list: [
            {
              name: 'Create Case - Data Subject Rights',
              id: 3,
            },
            {
              name: 'Create Case - Related Department',
              id: 4,
            },
            {
              name: 'Create Case - Status',
              id: 5,
            },
            {
              name: 'Create Case - Result',
              id: 6,
            },
          ],
        },
        {
          id: 2,
          name: 'Consent Management',
          list: [
            {
              name: 'Create Case - Data Subject Rights',
              id: 7,
            },
            {
              name: 'Create Case - Related Department',
              id: 8,
            },
            {
              name: 'Create Case - Status',
              id: 9,
            },
            {
              name: 'Create Case - Result',
              id: 32,
            },
          ],
        },
      ],
    };
  });
};
