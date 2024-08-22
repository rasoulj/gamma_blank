import {gql} from 'graphql-request';
import {graphqlFetcher} from '~/components/elemental';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {useEffect, useRef} from 'react';
import useAuth from '../../elemental/hooks/useAuth';
import {subscribe} from '~/utils/subscription';
import useLiveStreamStore from '~/stores/LiveStreamStore';

export const useGetCurrentUser = () => {
  return useQuery(['getCurrentUser'], async () => {
    return graphqlFetcher(GET_USER);
  });
};

export const useGetUsersOfSession = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsersOfSession', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_USERS_OF_SESSION, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.vonage_getUsersOfSession?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.vonage_getUsersOfSession?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.vonage_getUsersOfSession?.result?.totalCount,
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

export const useGetVonageMessages = (
  options: any = {},
  vonageSessionId: number,
) => {
  return useInfiniteQuery(
    ['getVonageMessages', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_VONAGE_SESSION_MESSAGE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
        vonageSessionId,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.vonage_getMessagesOfSession?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.vonage_getMessagesOfSession?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.vonage_getMessagesOfSession?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

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
          phoneNumber
          bio
          address
          photoUrl
          email
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

const GET_USERS_OF_SESSION = gql`
  query vonage_getUsersOfSession(
    $skip: Int
    $take: Int
    $where: VonageSessionUserFilterInput
    $order: [VonageSessionUserSortInput!]
    $vonageSessionId: Int!
  ) {
    vonage_getUsersOfSession(vonageSessionId: $vonageSessionId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          user {
            fullName
            phoneNumber
            bio
            address
            photoUrl
            email
            id
          }
          vonageSessionId
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
  query user_getCurrentUser {
    user_getCurrentUser {
      result {
        id
      }
      status
    }
  }
`;

export const VONAGE_CREATE_MESSAGE = gql`
  mutation vonage_createMessage($input: VonageMessageInput) {
    vonage_createMessage(input: $input) {
      status
    }
  }
`;

const GET_VONAGE_SESSION_MESSAGE = gql`
  query vonage_getMessagesOfSession(
    $skip: Int
    $take: Int
    $where: VonageMessageFilterInput
    $order: [VonageMessageSortInput!]
    $vonageSessionId: Int!
  ) {
    vonage_getMessagesOfSession(vonageSessionId: $vonageSessionId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          senderId
          sender {
            fullName
            photoUrl
            externalId
            email
          }
          text
          attachment
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
export function useVonageCreateSessionUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(VONAGE_CREATE_SESSION_USER, args);
  });
}

export const useAllSessions = (options: any = {}) => {
  return useInfiniteQuery(
    ['getAllSessions', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_SESSIONS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.vonage_getAllSessions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.vonage_getAllSessions?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.vonage_getAllSessions?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

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

export const VONAGE_CREATE_SESSION_USER = gql`
  mutation vonage_createSessionUser($input: [VonageSessionUserInput]) {
    vonage_createSessionUser(input: $input) {
      result {
        userId
        user {
          fullName
          id
          photoUrl
        }
        vonageSessionId
        vonageSession {
          sessionId
          sessionType
          creator {
            fullName
            id
            photoUrl
          }
        }
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const GET_ALL_SESSIONS = gql`
  query vonage_getAllSessions(
    $skip: Int
    $take: Int
    $where: VonageSessionFilterInput
    $order: [VonageSessionSortInput!]
  ) {
    vonage_getAllSessions {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          sessionId
          sessionType
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

export function AcceptVideoCallSubscription() {
  const {user} = useAuth();
  const {setApiKey, setSessionId, setToken, setStatus, setHaveCall} =
    useLiveStreamStore();
  const userId = user?.id;

  const ref = useRef(0);

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(SUB_ACCEPT_VIDEO_CALL, {userId}, listener);

    function listener(e) {
      try {
        const data = JSON.parse(e.data);

        if (['ka', 'connection_ack'].includes(data.type)) return; //keep alive!

        const Data = data?.payload?.data?.videoCallAcceptedOrRejected;
        console.log('====================================');
        console.log(Data);
        console.log('====================================');
        setApiKey(Data?.apiKey);
        setSessionId(Data?.sessionId);
        setToken(Data?.token);
        if (Data?.token) {
          setStatus('main');
        } else {
          setStatus('rejected');
        }
      } catch (e) {
        console.log(e);
      }
    }

    return () => unsbscribe();
  }, [userId]);

  return null;
}

const SUB_ACCEPT_VIDEO_CALL = gql`
  subscription videoCallAcceptedOrRejected($userId: Int!) {
    videoCallAcceptedOrRejected(userId: $userId) {
      sessionId
      apiKey
      token
    }
  }
`;

export function useCreateVideoCall() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_VIDEO_CALL, args);
  });
}

const CREATE_VIDEO_CALL = gql`
  mutation vonage_createVideoCall($userId: Int!) {
    vonage_createVideoCall(userId: $userId) {
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
