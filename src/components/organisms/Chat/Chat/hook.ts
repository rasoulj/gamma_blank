import {gql} from 'graphql-request';
import {Query, useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher} from '../../../atoms/Provider/AuthProvider';

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ['getUser', id],
    queryFn: async () => await graphqlFetcher(GET_USER, {otherId: id}),
  });
};
export const useGetPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPosts', options],
    ({pageParam = options}) => graphqlFetcher(GET_ALL_POSTS, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return {
          ...options,
          skip: pages.length * 1,
        };
      },
    },
  );
};

export const useGetChatMessage = ({
  where,
  order,
  isCommon = false,
  isRandom = false,
  options = {},
}: {
  where?: any;
  order?: any;
  isCommon?: boolean;
  isRandom?: boolean;
  options?: any;
}) => {
  return useInfiniteQuery<any>(
    ['chat_messages', where, order, isCommon, isRandom],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_CHAT_MESSAGES, {
        skip: pageParam * 12,
        take: 12,
        where,
        order,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: any[]) => {
        if (lastPage?.message_getMessages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.message_getMessages?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

const GET_CHAT_MESSAGES = gql`
  query message_getMessages(
    $skip: Int
    $take: Int
    $where: MessageFilterInput
    $order: [MessageSortInput!]
  ) {
    message_getMessages {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          createdAt
          conversationId
          text
          senderId
          sender {
            fullName
          }
          mediaType
          mediaUrl
          parentId
          mediaEntityId
          parent {
            id
            createdAt
            conversationId
            text
            senderId
            mediaType
            mediaUrl
            parentId
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
const GET_ALL_POSTS = gql`
  query social_getAllPosts(
    $skip: Int
    $take: Int
    $where: PostDtoFilterInput
    $order: [PostDtoSortInput!]
  ) {
    post_getAllPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          post {
            id
            poster {
              id
              fullName
              photoUrl
            }
            content
            mediaUrl
            thumbnail
            mediaGalleryUrl
            postType
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
export const GET_USER = gql`
  query social_getUser($otherId: Int!) {
    social_getUser(otherId: $otherId) {
      result {
        user {
          id
          fullName
          isPrivateAccount
          photoUrl
          username
        }
      }
      status
    }
  }
`;
