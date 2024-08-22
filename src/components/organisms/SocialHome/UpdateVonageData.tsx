import {useEffect, useState} from 'react';
import {useGetVonageSessionWithInterval} from './hook';

const useUpdateVonageData = ({enabled = true}: {enabled?: boolean}) => {
  const [vonageData, setVonageData] = useState([]);

  const {data: vonageSessions, isLoading} = useGetVonageSessionWithInterval({
    order: [{createdDate: 'DESC'}],
    enabled,
  });

  useEffect(() => {
    if (vonageSessions && !isLoading)
      setVonageData(
        vonageSessions?.totalCount > 0 ? vonageSessions?.pages : [],
      );
  }, [vonageSessions]);

  return {vonageSessions: vonageData, isLoading};
};

export default useUpdateVonageData;
