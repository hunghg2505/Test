// import { useRequest, useUpdateEffect } from 'ahooks';
// import { getConsentService } from 'modules/dataSubjectManagement/components/Consents/service';

// const useConsentList = ({ userId }: { userId: number }) => {
//   const { data, loading, run, runAsync } = useRequest(getConsentService, {
//     manual: true,
//   });

//   const onChange = (current: number) => {
//     run({ search: data.keyword, page: current, userId });
//   };

//   const onSearchConsent = async (search: string, callback?: any) => {
//     await runAsync({ search, page: 1, userId });

//     if (callback) callback();
//   };

//   useUpdateEffect(() => {
//     run({ page: 1, userId });
//   }, [userId]);

//   return {
//     data,
//     loading,
//     onChange,
//     onSearchConsent,
//   };
// };

export {};
