import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useCreateStoryMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_CREATE_STORY, args);
  });
};

export function useVonageCreateSession() {
  return useMutation((args: any) => {
    return graphqlFetcher(VONAGE_CREATE_SESSION, args);
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

export function useCreateVonageUserMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_VONAGE_USER, args);
  });
}

export function useUpdateStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_STORY, args);
  });
}

const STORY_CREATE_STORY = gql`
  mutation storyCreateStory($input: StoryInput) {
    story_createStory(input: $input) {
      status
    }
  }
`;

export const VONAGE_CREATE_SESSION = gql`
  mutation vonage_createSession($input: VonageSessionInput) {
    vonage_createSession(input: $input) {
      result {
        creatorId
        sessionId
        date
        sessionType
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const VONAGE_CREATE_SESSION_TOKEN = gql`
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

export const CREATE_VONAGE_USER = gql`
  mutation vonage_createSessionUser($input: [VonageSessionUserInput]) {
    vonage_createSessionUser(input: $input) {
      status
    }
  }
`;

const UPDATE_STORY = gql`
  mutation story_updateStory($input: StoryInput) {
    story_updateStory(input: $input) {
      status
    }
  }
`;
