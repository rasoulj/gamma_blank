import {gql} from 'graphql-request';
import {useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUsers?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount: data?.pages?.[0]?.user_getUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_USERS = gql`
  query user_getUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    user_getUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fullName
          photoUrl
          id
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;
