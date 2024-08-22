import {graphqlFetcher, print} from '~/components/elemental';
import {useQuery, useMutation} from 'react-query';
import {gql} from 'graphql-request';

export function useGetSocialUser(input, options) {
  return useQuery<any, any>(
    ['social_getUser', input],
    () => graphqlFetcher(GET_SOCIAL_USER, input),
    {
      retry(failureCount, error) {
        return failureCount > 2 ? false : true;
      },
      ...options,
    },
  );
}

export const GET_SOCIAL_USER = `
  query social_getUser($otherId:Int!) {
    social_getUser(otherId: $otherId) {
      result {
        followersCount
        followedCount
        isFollowed
      }
      status
    }
  }
`;

export function useFollowUserMutate() {
  return useMutation<any, any, any, any>(args => {
    return graphqlFetcher(FOLLOW_USER, args);
  });
}

export function useUnfollowUserMutate() {
  return useMutation<any, any, any, any>(args => {
    return graphqlFetcher(UNFOLLOW_USER, args);
  });
}

export function useCreateViolationReport() {
  return useMutation((args: any) => {
    return graphqlFetcher(VIOLATION_REPORT, args);
  });
}
export function useCreateBlockUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(BLOCK_USER, args);
  });
}

export const BLOCK_USER = gql`
  mutation blockUser_block($input: BlockUserInput!) {
    blockUser_block(input: $input) {
      result {
        userId
        blockedUserId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const VIOLATION_REPORT = gql`
  mutation (
    $userId: Int
    $reason: String
    $defaultViolationId: Int
    $targetEntityId: Int
    $targetEntityName: String
  ) {
    violationReport_createViolationReport(
      input: {
        userId: $userId
        reason: $reason
        defaultViolationId: $defaultViolationId
        targetEntityId: $targetEntityId
        targetEntityName: $targetEntityName
      }
    ) {
      result {
        userId
        targetEntityId
        targetEntityName
        defaultViolationId
        reason
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
const FOLLOW_USER = `
mutation social_followUser( $followedId: Int! ){
  social_followUser(input: { followedId: $followedId }) {
    status
  }
}
`;

const UNFOLLOW_USER = `
mutation social_unfollow( $followedId: Int! ){
  social_unfollow(input: { followedId: $followedId }) {
    status
  }
}
`;

type PostCountUser = {
  result: number;
};

export type GetUserPostCountResponse = {
  post_getUserPostCount: {
    result: PostCountUser;
  };
};

export function useGetPostUserCount(args: any, options?: any) {
  return useQuery<any, any>(
    ['getUserPostCount'],
    () => {
      return graphqlFetcher(GET_USER_POST_COUNT, args);
    },
    options,
  );
}

const GET_USER_POST_COUNT = gql`
  query social_getUser($userId: Int) {
    post_getUserPostCount(userId: $userId) {
      result
      status
    }
  }
`;

const SET_REPORT = gql`
  mutation violationReport_createViolationReport(
    $input: ViolationReportInput!
  ) {
    violationReport_createViolationReport(input: $input) {
      status
    }
  }
`;

export function useSetReport() {
  return useMutation<
    unknown,
    unknown,
    {
      input: {
        userId: number;
        reason: string;
        targetEntityId: number;
        targetEntityName: string;
      };
    }
  >({
    mutationFn: async args => await graphqlFetcher(SET_REPORT, args),
  });
}
