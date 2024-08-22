import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

const GET_ALLOWED_USERS = gql`
  query match_getAllowedUsers(
    $skip: Int
    $take: Int
    $where: MatchingAllowedUserDtoFilterInput
    $order: [MatchingAllowedUserDtoSortInput!]
    $userId: Int!
    $maxDistance: Int
  ) {
    match_getAllowedUsers(userId: $userId, maxDistance: $maxDistance) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            id
            age
            gender
            height
            dateOfBirth
            email
            matchAnswers {
              question
              answer
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

export const useGetDatingUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALLOWED_USERS, {
        skip: pageParam * 2000,
        take: 2000,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.match_getAllowedUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.match_getAllowedUsers?.result?.items ?? [])
            .flat(),
          totalCount:
            data?.pages?.[0]?.match_getAllowedUsers?.result?.totalCount ?? 0,
        };
      },
      ...options,
    },
  );
};

const GET_ALL_USERS = gql`
  query user_getUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    user_getUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          age
          gender
          height
          dateOfBirth
          email
          matchAnswers {
            question
            answer
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

export const useGetAllUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['user_getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USERS, {
        skip: pageParam * 2000,
        take: 2000,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUsers?.result?.items ?? [])
            .flat(),
          totalCount: data?.pages?.[0]?.user_getUsers?.result?.totalCount ?? 0,
        };
      },
      ...options,
    },
  );
};

const GET_SIMILARITY_USERS = gql`
  query match_getSimilarUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    match_getSimilarUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          age
          gender
          height
          dateOfBirth
          email
          matchAnswers {
            question
            answer
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

export const useGetSimilarityUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['match_getSimilarUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SIMILARITY_USERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.match_getSimilarUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.match_getSimilarUsers?.result?.items ?? [])
            .flat(),
          totalCount:
            data?.pages?.[0]?.match_getSimilarUsers?.result?.totalCount ?? 0,
        };
      },
      ...options,
    },
  );
};
