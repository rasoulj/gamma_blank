import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export function useSupportEmail() {
  return useMutation((args: any) => {
    return graphqlFetcher(EMAIL_SUPPORT, args);
  });
}

export const EMAIL_SUPPORT = gql`
  mutation email_sendEmail(
    $toEmailAddress: String!
    $subject: String!
    $plainTextContent: String
  ) {
    email_sendEmail(
      emailInput: {
        toEmailAddress: $toEmailAddress
        subject: $subject
        plainTextContent: $plainTextContent
      }
    ) {
      status
    }
  }
`;

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
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
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
          userType
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
