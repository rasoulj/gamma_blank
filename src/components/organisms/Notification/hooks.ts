import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetNotifications = (options: any = {}) => {
  return useInfiniteQuery(
    ['getNotifications', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_NOTIFICATIONS, {
        skip: pageParam * 10,
        take: 10,
        order: [{createdDate: 'DESC'}],
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.notification_getNotifications?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.notification_getNotifications?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.notification_getNotifications?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsers', options],
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
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.user_getUsers?.result?.items).flat(),
          totalCount: data?.pages?.[0]?.user_getUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetUser = (id: number, enabled = true) => {
  return useQuery(
    {
      queryKey: ['getUser', id, enabled],
      queryFn: async () => await graphqlFetcher(GET_USER, {otherId: id}),
    },
    {enabled: !!enabled},
  );
};
export const useGetUserMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(GET_USER, args);
  });
};

export function useSeenNotification() {
  return useMutation((args: any) => {
    return graphqlFetcher(SEEN_NOTIFICATION, args);
  });
}

export const useFollowUserMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(FOLLOW_USER, args);
  });
};
export const useUnFollowUserMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(UN_FOLLOW_USER, args);
  });
};
export const useAcceptUserMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(SOCIAL_ACCEPT_FOLLOW, args);
  });
};
export function useRemoveFollowerMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(USER_REMOVE_FOLLOWER, args);
  });
}
const GET_USERS = gql`
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
          isDeleted
          createdDate
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

export const UN_FOLLOW_USER = gql`
  mutation social_unfollow($input: FollowerInput) {
    social_unfollow(input: $input) {
      status
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation social_followUser($input: FollowerInput) {
    social_followUser(input: $input) {
      status
    }
  }
`;

export const NOTIFICATION_SET_READ = gql`
  mutation notification_setRead($notificationId: Int!) {
    notification_setRead(notificationId: $notificationId) {
      status
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query notification_getNotifications(
    $skip: Int
    $take: Int
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
  ) {
    notification_getNotifications {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          notificationType
          relatedEntityId
          relatedEntity
          relatedUser {
            id
            fullName
            photoUrl
          }
          isRead
          id
          isDeleted
          createdDate
          lastModifiedDate
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

export const GET_USER = gql`
  query social_getUser($otherId: Int!) {
    social_getUser(otherId: $otherId) {
      result {
        user {
          id
          fullName
          isPrivateAccount
        }
        followersCount
        followedCount
        isFollowed
        isFollower
        requestSent
        requestReceived
      }
      status
    }
  }
`;

export const SEEN_NOTIFICATION = gql`
  mutation notification_setRead($notificationId: Int!) {
    notification_setRead(notificationId: $notificationId) {
      result {
        userId
        notificationType
        relatedEntityId
        relatedEntity
        relatedUserId
        isRead
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const SOCIAL_ACCEPT_FOLLOW = gql`
  mutation social_acceptFollow($followerId: Int!) {
    social_acceptFollow(followerId: $followerId) {
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
