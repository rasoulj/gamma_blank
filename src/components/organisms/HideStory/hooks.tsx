import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetFollowers = (options: any = {}) => {
  return useInfiniteQuery(
    ['user_getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_USERS, {
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
      select: (data: any) => {
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

export function useHideStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(HIDE_STORY, args);
  });
}

export function useUnHideStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(UNHIDE_STORY, args);
  });
}

const GET_ALL_FOLLOWERS = gql`
  query getFollowers(
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
            username
          }
        }
      }
    }
  }
`;

const GET_USERS = gql`
  query user_getUsers($userId: Int!) {
    user_getUsers {
      result(where: {id: {eq: $userId}}) {
        totalCount
        pageInfo {
          hasNextPage
        }
        items {
          followers {
            hideStory
            follower {
              fullName
              id
              username
              photoUrl
            }
          }
        }
      }
    }
  }
`;

const HIDE_STORY = gql`
  mutation social_hideStory($followerId: Int!) {
    social_hideStory(followerId: $followerId) {
      code
      value
    }
  }
`;

const UNHIDE_STORY = gql`
  mutation social_nhideStory($followerId: Int!) {
    social_unhideStory(targetUserId: $followerId) {
      code
      value
    }
  }
`;
