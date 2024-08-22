import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export type HasNextPage = {
  hasNextPage?: boolean;
};

export type PageInfo = {
  pageInfo?: HasNextPage;
  items?: any;
};

export type Result = {
  result?: PageInfo;
};

export type LastPage = {
  [key: string]: Result;
};

export function usePagination({gql, key, options, queryName}) {
  return useInfiniteQuery(
    key,
    async ({pageParam = 0}) => {
      return graphqlFetcher(gql, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: LastPage, allPages: []) => {
        if (lastPage[queryName]?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: LastPage) => a[queryName]?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount: data?.pages?.[0][queryName]?.result?.totalCount,
        };
      },
      ...options,
    },
  );
}
