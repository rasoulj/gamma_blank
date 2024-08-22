import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components';
export const useGetUsedLocations = (options: any = {}) => {
  return useInfiniteQuery(
    ['post_getUsedLocations', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_USED_LOCATIONS, {
        skip: pageParam * 10,
        take: 4,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_getUsedLocations?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getUsedLocations?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
const GET_USED_LOCATIONS = gql`
  query post_getUsedLocations {
    post_getUsedLocations {
      result {
        items {
          data
        }
      }
    }
  }
`;