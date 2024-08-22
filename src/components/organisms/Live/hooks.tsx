import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export function useRemoveVonageSessionMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(VONAGE_REMOVE_SESSION, args);
  });
}

export function useUpdateVonageSessionMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(VONAGE_UPDATE_SESSION, args);
  });
}
export function useVonageCreateSessionToken() {
  return useMutation((args: any) => {
    return graphqlFetcher(VONAGE_CREATE_SESSION_TOKEN, args);
  });
}
export function useCreateNotificationMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_NOTIFICATION, args);
  });
}
export const useGetFollowersId = (options: any = {}) => {
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
      getNextPageParam: (lastPage: any, allPages: []) => {
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
            ?.map((a: any) => a?.social_getUserFollowerFollowees?.result?.items)
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
export function useGetCurrentUser() {
  return useQuery<any, any>(
    ['current_user_live'],
    () => graphqlFetcher(GET_CURRENT_USER),
    {
      onSuccess: data => {
        console.log(JSON.stringify({data}));
      },
    },
  );
}

const VONAGE_REMOVE_SESSION = gql`
  mutation vonage_removeSession($entityId: Int!) {
    vonage_removeSession(entityId: $entityId) {
      code
    }
  }
`;

const VONAGE_UPDATE_SESSION = gql`
  mutation vonage_updateSession($input: VonageSessionInput) {
    vonage_updateSession(input: $input) {
      status
    }
  }
`;

const VONAGE_CREATE_SESSION_TOKEN = gql`
  mutation vonage_createTokenForSession($vonageSessionId: Int!) {
    vonage_createTokenForSession(vonageSessionId: $vonageSessionId) {
      result {
        sessionId
        apiKey
        token
      }
      status
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation notification_createNotification($input: [NotificationInput]) {
    notification_createNotification(input: $input) {
      code
      value
    }
  }
`;
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
          user {
            id
          }
        }
      }
    }
  }
`;
const GET_CURRENT_USER = gql`
  query current_user_live {
    user_getCurrentUser {
      result {
        id
        lastSeen
      }
    }
  }
`;
