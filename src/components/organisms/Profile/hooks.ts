import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
import {UN_FOLLOW_USER} from '../Notification/hooks';
import useAuthStore from '~/stores/authStore';

export function useMutePostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_MUTE_POST, args);
  });
}
export function useUnMutePostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_UNMUTE_POST, args);
  });
}
export function useMuteStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_MUTE_STORY, args);
  });
}
export function useUnMuteStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_UNMUTE_STORY, args);
  });
}
export function useRemoveFollowerFolloweeMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FOLLOWER_FOLLOWEE, args);
  });
}
export function useGetUserByIdQuery(
  variables: {entityId: number},
  options?: any,
) {
  return useQuery(
    ['user_getUsers', variables],
    () => graphqlFetcher(USER_GET_USER, variables),
    options,
  );
}
export function useGetUserFollowQuery(
  variables: {otherId: number},
  options?: any,
) {
  return useQuery(
    ['social_getUserFollowInfo', variables],
    () => graphqlFetcher(GET_USER_FOLLOW_INFO, variables),
    options,
  );
}
export function useIsMuteUserQuery(variables: {userId: number}, options?: any) {
  return useQuery(
    ['isMuted', variables],
    () => graphqlFetcher(IS_MUTE_USER, variables),
    options,
  );
}

export function useGetBlockedUserByIdQuery(
  variables: {userId: number},
  options?: any,
) {
  return useQuery(
    ['blockUser_getBlockedUsers', variables],
    () => graphqlFetcher(GET_BLOCKED_USER_BY_ID, variables),
    options,
  );
}
export const useGetPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPosts', options?.where, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_POSTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_getAllPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getAllPosts?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.post_getAllPosts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export const useGetHighlights = (options: any = {}) => {
  return useInfiniteQuery(
    ['getHighlights', options?.userId, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(HIGHLIGHT_GET_HIGHLIGHTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.highlight_getHighlights?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.highlight_getHighlights?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.highlight_getHighlights?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export function useDeleteHighlightMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(HIGHLIGHT_DELETE_HIGHLIGHT, args);
  });
}

export function useFollowUserMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(USER_FOLLOW_USER, args);
  });
}

export function useRemoveFollowerMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(USER_REMOVE_FOLLOWER, args);
  });
}
export function useUnfollowMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(UN_FOLLOW_USER, args);
  });
}
export function useUserBlockMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(BLOCK_USER_BLOCK, args);
  });
}
export function useUserUnBlockMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(BLOCK_USER_UNBLOCK, args);
  });
}
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
      getNextPageParam: (lastPage, allPages: []) => {
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
            ?.map(a => a?.social_getUserFollowerFollowees?.result?.items)
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

export const useIsAccountPrivate = ({userId}) => {
  const myId = useAuthStore(state => state.user.id);

  const {data: followData, isLoading: followLoading} = useGetUserFollowQuery({
    otherId: userId,
  });
  const currentFollowData = followData?.social_getUser?.result;
  const isAccountLocked =
    !currentFollowData?.isFollowed && currentFollowData?.user?.isPrivateAccount;

  if (myId === userId) return {isPrivate: false, isLoading: false};
  return {isLoading: followLoading, isPrivate: isAccountLocked};
};

const USER_GET_USER = gql`
  query user_getUsers($entityId: Int!) {
    user_getUsers {
      result(where: {id: {eq: $entityId}}, take: 1, skip: 0) {
        items {
          postCount
          followerCount
          followeeCount
          email
          photoUrl
          fullName
          phoneNumber
          about
          gender
          id
          username
          reelsCount
          displayGender
          displayContactInfo
        }
      }
      status
    }
  }
`;
export const GET_ALL_POSTS = gql`
  query social_getAllPosts(
    $skip: Int
    $take: Int
    $where: PostDtoFilterInput
    $order: [PostDtoSortInput!]
  ) {
    post_getAllPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isLikedByCurrentUser
          post {
            id
            postType
            thumbnail
            poster {
              id
              fullName
              photoUrl
            }
            isDraft
            category
            createdDate
            mediaGalleryUrl
            content
            mediaUrl
            commentCount
            postTags {
              id
              title
            }
            likesCount
            comments {
              likeCount
              text
              id
              user {
                fullName
              }
            }
          }
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
const HIGHLIGHT_GET_HIGHLIGHTS = gql`
  query getHighlights(
    $where: HighlightDtoFilterInput
    $skip: Int
    $take: Int
    $order: [HighlightDtoSortInput!]
    $userId: Int!
    $storyId: Int
  ) {
    highlight_getHighlights(userId: $userId, storyId: $storyId) {
      result(where: $where, skip: $skip, take: $take, order: $order) {
        items {
          highlight {
            photoUrl
            name
            id
            user {
              fullName
              id
              username
            }
            createdDate
          }
          containsThisStory
        }
      }
    }
  }
`;
const REELS_GET_REELS = gql`
  query getReels(
    $where: ReelsFilterInput
    $skip: Int
    $take: Int
    $order: [ReelsSortInput!]
  ) {
    reels_getReels {
      result(where: $where, skip: $skip, take: $take, order: $order) {
        items {
          reels {
            userId
            mediaUrl
            caption
            locations
            isDraft
            thumbnail
            user {
              username
              fullName
              photoUrl
              id
            }
            likesCount
            id
          }
        }
      }
    }
  }
`;
const HIGHLIGHT_DELETE_HIGHLIGHT = gql`
  mutation deleteHighlight($highlightId: Int!) {
    highlight_deleteHighlight(highlightId: $highlightId) {
      code
      value
    }
  }
`;

const GET_USER_FOLLOW_INFO = gql`
  query social_getUserFollowInfo($otherId: Int!) {
    social_getUser(otherId: $otherId) {
      result {
        isFollowed
        isFollower
        requestSent
        requestReceived
        user {
          isPrivateAccount
        }
      }
      status
    }
  }
`;
const USER_FOLLOW_USER = gql`
  mutation social_followUser($input: FollowerInput) {
    social_followUser(input: $input) {
      status
    }
  }
`;

const USER_REMOVE_FOLLOWER = gql`
  mutation social_removeFollower($followerId: Int!) {
    social_removeFollower(followerId: $followerId) {
      status
    }
  }
`;

const USER_UNFOLLOW_UER = gql`
  mutation social_unfollow($input: FollowerInput) {
    social_unfollow(input: $input) {
      status
    }
  }
`;

const GET_BLOCKED_USER_BY_ID = gql`
  query blockUser_getBlockedUsers($userId: Int!) {
    blockUser_getBlockedUsers {
      result(where: {id: {eq: $userId}}) {
        totalCount
        items {
          id
        }
      }
    }
  }
`;

const BLOCK_USER_BLOCK = gql`
  mutation blockUser_block($input: BlockUserInput) {
    blockUser_block(input: $input) {
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
            isPrivateAccount
          }
        }
      }
    }
  }
`;

const IS_MUTE_USER = gql`
  query isMuted($userId: Int!) {
    post_getMutePost {
      result(where: {targetUserId: {eq: $userId}}) {
        totalCount
      }
      status
    }
    story_getMuteStory {
      result(where: {targetUserId: {eq: $userId}}) {
        totalCount
      }
      status
    }
  }
`;

const POST_MUTE_POST = gql`
  mutation post_mutePost($targetUserId: Int!) {
    post_mutePost(targetUserId: $targetUserId) {
      code
      value
      description
    }
  }
`;
const POST_UNMUTE_POST = gql`
  mutation post_unmutePost($targetUserId: Int!) {
    post_unmutePost(targetUserId: $targetUserId) {
      code
      value
      description
    }
  }
`;

const STORY_MUTE_STORY = gql`
  mutation story_muteStory($targetUserId: Int!) {
    story_muteStory(targetUserId: $targetUserId) {
      code
      value
      description
    }
  }
`;

const STORY_UNMUTE_STORY = gql`
  mutation story_unmuteStory($targetUserId: Int!) {
    story_unmuteStory(targetUserId: $targetUserId) {
      code
      value
    }
  }
`;

const REMOVE_FOLLOWER_FOLLOWEE = gql`
  mutation social_removeFollowerAndFollowee($targetUserId: Int!) {
    social_removeFollowerAndFollowee(targetUserId: $targetUserId) {
      code
      value
    }
  }
`;
