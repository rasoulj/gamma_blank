import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export function useUserUnBlockMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(BLOCK_USER_UNBLOCK, args);
  });
}
export const useGetBlockedUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['blockUser_getBlockedUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_BLOCKED_USERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.blockUser_getBlockedUsers?.result?.pageInfo?.hasNextPage
        ) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.blockUser_getBlockedUsers?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.blockUser_getBlockedUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
const GET_BLOCKED_USERS = gql`
  query blockUser_getBlockedUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    blockUser_getBlockedUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fullName
          username
          photoUrl
          id
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

const BLOCK_USER_UNBLOCK = gql`
  mutation unBlockUser_block($input: BlockUserInput) {
    blockUser_unblock(input: $input) {
      code
      value
    }
  }
`;
