import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetHighlights = (options: any = {}) => {
  return useInfiniteQuery(
    ['getHighlights', {...options}],
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
export const useGetHighlightStories = (options: any = {}) => {
  return useInfiniteQuery(
    ['getHighlightStories', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_HIGHLIGHT_STORIES, {
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
export const GET_HIGHLIGHT_STORIES = gql`
  query getHighlightStories(
    $where: HighlightDtoFilterInput
    $skip: Int
    $take: Int
    $order: [HighlightDtoSortInput!]
    $userId: Int!
  ) {
    highlight_getHighlights(userId: $userId) {
      result(where: $where, skip: $skip, take: $take, order: $order) {
        items {
          highlight {
            photoUrl
            name
            id
            highlightStories {
              storyId
              story {
                mediaUrl
                mediaType
                isMute
                id
                user {
                  photoUrl
                  fullName
                  id
                }
                createdDate
                likesCount
              }
            }
            user {
              fullName
              id
              username
            }
            createdDate
          }
        }
      }
    }
  }
`;
