import {isDark, print} from '~/components/elemental';
import {gql} from 'graphql-request';
import {usePagination} from '../../elemental/hooks/usePagination';
import {useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '../../elemental';

export type UsersType = {
  match: {
    id: number;
    targetUserId: number;
    targetUser: {
      id: number;
      fullName: string;
    };
  };
  user: {
    id: number;
    age: number;
    fullName: string;
    photoUrl: string;
    userPhotos: {
      photoUrl: string;
      id: number;
    }[];
    about: string;
    introSeen: boolean;
    userInterests: {
      text: string;
      id: number;
    }[];
  };
};

export function useGetUsers(options) {
  const {data, isLoading, fetchNextPage} = usePagination({
    gql: GET_USERS,
    key: ['match_get_users', JSON.stringify(options)],
    options,
    queryName: 'match_getAllowedUsers',
  });

  const users: UsersType[] = data?.pages || [];

  return {
    users,
    isLoading,
    fetchNextPage,
  };
}

export function useGetPhotos(options) {
  const {
    data,
    isLoading,
    fetchNextPage: fetchNextPhotosPage,
  } = usePagination({
    gql: GET_PHOTOS,
    key: ['match_get_user_photos', options],
    options,
    queryName: 'user_getPhotos',
  });

  const photos = data?.pages || [];

  return {
    photos,
    isLoading,
    fetchNextPhotosPage,
  };
}

const SET_INTERESTS = gql`
  mutation match_updateUserInterests($interests: [String]) {
    match_updateUserInterests(interests: $interests) {
      code
      value
      description
    }
  }
`;

export function useCreateInterest() {
  return useMutation<
    unknown,
    unknown,
    {
      interests: string[];
    }
  >({
    mutationFn: async args => await graphqlFetcher(SET_INTERESTS, args),
  });
}

export function useGetInterest({enabled, ...options}) {
  print('options is', options);
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['match_get_users_interest', options],
    queryFn: async () => graphqlFetcher(GET_INTEREST, options),
    enabled,
  });

  const interests = data?.match_getUserInterests?.result?.items || [];

  return {
    interests,
    isLoading,
    refetch,
  };
}

const GET_INTEREST = gql`
  query match_getUserInterests($userId: Int) {
    match_getUserInterests(userId: $userId) {
      result {
        items {
          text
          id
        }
        totalCount
      }
      status
    }
  }
`;

const GET_PHOTOS = gql`
  query user_getPhotos($userId: Int) {
    user_getPhotos(userId: $userId) {
      result {
        items {
          photoUrl
          id
        }
        totalCount
      }
      status
    }
  }
`;

const GET_USERS = gql`
  query match_getAllowedUsers(
    $skip: Int
    $take: Int
    $where: MatchingAllowedUserDtoFilterInput
    $order: [MatchingAllowedUserDtoSortInput!]
  ) {
    match_getAllowedUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          match {
            id
            targetUserId
            targetUser {
              id
              fullName
            }
          }
          user {
            id
            fullName
            photoUrl
            userPhotos {
              photoUrl
              id
            }
            about
            introSeen
            userInterests {
              text
              id
            }
          }
        }
      }
      status
    }
  }
`;

// Mutations

const CREATE_MATCH = gql`
  mutation match_createMatch($input: MatchInput) {
    match_createMatch(input: $input) {
      result {
        requestedByUserId
        targetUserId
        matchStatus
        requestedByUser {
          fullName
          id
        }
        targetUser {
          fullName
          id
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

export function useCreateMatch() {
  return useMutation<
    unknown,
    unknown,
    {
      input: {
        id?: number;
        targetUserId: number;
        matchStatus?: 'WAITING' | 'ACCEPTED';
      };
    }
  >({
    mutationFn: async args => await graphqlFetcher(CREATE_MATCH, args),
  });
}

const BLOCK_USER = gql`
  mutation blockUser_block($input: BlockUserInput) {
    blockUser_block(input: $input) {
      result {
        userId
        blockedUserId
        user {
          fullName
          id
        }
        blockedUser {
          fullName
          id
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

export function useBlockUser() {
  return useMutation<
    unknown,
    unknown,
    {
      input: {
        blockedUserId: number;
      };
    }
  >({
    mutationFn: async args => await graphqlFetcher(BLOCK_USER, args),
  });
}

const GET_BLOCKED_USERS = gql`
  query blockUser_getBlockedUsers {
    blockUser_getBlockedUsers {
      result {
        items {
          id
        }
        totalCount
      }
      status
    }
  }
`;

export function useGetBlockedUsers(options) {
  const {data, isLoading, fetchNextPage} = usePagination({
    gql: GET_BLOCKED_USERS,
    key: ['blockUser_getBlockedUsers', options],
    options,
    queryName: 'blockUser_getBlockedUsers',
  });

  const blockedUsers = data?.pages || [];

  return {
    blockedUsers,
    isLoading,
    fetchNextPage,
  };
}

export const GET_MATCHES = gql`
  query match_getMatches($where: MatchFilterInput) {
    match_getMatches {
      result(where: $where) {
        items {
          id
          requestedByUserId
          requestedByUser {
            fullName
            id
            photoUrl
          }
          targetUser {
            id
            fullName
            photoUrl
          }
          matchStatus
          targetUserId
        }
        totalCount
      }
      status
    }
  }
`;

export function useGetMatches(options) {
  const {data, isLoading, fetchNextPage, hasNextPage} = usePagination({
    gql: GET_MATCHES,
    key: ['match_getMatches', options],
    options,
    queryName: 'match_getMatches',
  });

  const matches = data?.pages || [];

  return {
    matches,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}

const DELETE_MATCH = gql`
  mutation match_deleteMatch($entityId: Int!) {
    match_deleteMatch(entityId: $entityId) {
      code
      value
      description
    }
  }
`;

export function useUnmatch() {
  return useMutation<
    unknown,
    unknown,
    {
      entityId: number;
    }
  >({
    mutationFn: async args => await graphqlFetcher(DELETE_MATCH, args),
  });
}

const UPDATE_MATCH = gql`
  mutation match_updateMatch($input: MatchInput) {
    match_updateMatch(input: $input) {
      result {
        matchStatus
        id
        targetUserId
      }
      status
    }
  }
`;

export function useUpdateMatch() {
  return useMutation<
    unknown,
    unknown,
    {
      input: {
        id: number;
        matchStatus: 'ACCEPTED' | 'WAITING' | 'REJECTED';
        targetUserId?: number;
      };
    }
  >({
    mutationFn: async args => await graphqlFetcher(UPDATE_MATCH, args),
  });
}

export function useCreateUserSeen() {
  return useMutation<
    unknown,
    unknown,
    {
      targetUserId: number;
    }
  >({
    mutationFn: async args => await graphqlFetcher(MATCH_USER_SEEN, args),
  });
}

const MATCH_USER_SEEN = gql`
  mutation match_createUserSeen($targetUserId: Int!) {
    match_createUserSeen(targetUserId: $targetUserId) {
      result {
        id
        targetUserId
      }
    }
  }
`;
