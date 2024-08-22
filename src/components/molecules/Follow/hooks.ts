import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
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

export const useGetFollowers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFollowers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_FOLLOWERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: LastPage, allPages: []) => {
        if (
          lastPage?.social_getUserFollowerFollowees?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(
              (a: LastPage) =>
                a?.social_getUserFollowerFollowees?.result?.items,
            )
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.social_getUserFollowerFollowees?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_FOLLOWERS = gql`
  query social_getUserFollowerFollowees(
    $userId: Int!
    $skip: Int
    $take: Int
    $where: FollowerFolloweeDtoFilterInput
    $order: [FollowerFolloweeDtoSortInput!]
  ) {
    social_getUserFollowerFollowees(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isFollower
          followedByCurrentUser
          followerOfCurrentUser
          user {
            fullName
            id
            photoUrl
          }
        }
      }
    }
  }
`;

//remove followers

const useRemoveFollowers = (userId?) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, {followerId: number}>({
    mutationFn: async args => {
      return await graphqlFetcher(REMOVE_FOLLOWER, args);
    },
    onSuccess: (data: any, variables) => {
      if (data?.social_removeFollower?.status?.value === 'Success') {
        const key = ['getFollowers', {userId}];

        const allData: any = queryClient.getQueryData(key);
        const removedItem =
          allData?.pages[0]?.social_getUserFollowerFollowees?.result.items?.filter(
            i => i?.user?.id !== variables.followerId,
          );
        allData.pages[0].social_getUserFollowerFollowees.result.items =
          removedItem;
        queryClient.setQueryData(key, JSON.parse(JSON.stringify(allData)));
      }
    },
  });
};

const REMOVE_FOLLOWER = gql`
  mutation social_removeFollower($followerId: Int!) {
    social_removeFollower(followerId: $followerId) {
      status
    }
  }
`;

//follow users

const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, {input: {followedId: number}}>({
    mutationFn: async args => await graphqlFetcher(FOLLOW_USER, args),
    onSuccess: (data: any) => {
      if (data?.social_followUser?.status?.value === 'Success') {
        queryClient.invalidateQueries(['getFollowers']);
      }
    },
  });
};

const FOLLOW_USER = gql`
  mutation social_followUser($input: FollowerInput) {
    social_followUser(input: $input) {
      status
      result {
        id
        followerId
      }
    }
  }
`;

//unfollow users

const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, {input: {followedId: number}}>({
    mutationFn: async args => {
      return await graphqlFetcher(UNFOLLOW_USER, args);
    },
    onSuccess: (data: any) => {
      if (data?.social_unfollow?.status?.value === 'Success') {
        queryClient.invalidateQueries(['getFollowers']);
      }
    },
  });
};

const UNFOLLOW_USER = gql`
  mutation social_unfollow($input: FollowerInput) {
    social_unfollow(input: $input) {
      status
    }
  }
`;

export {useRemoveFollowers, useFollowUser, useUnfollowUser};
