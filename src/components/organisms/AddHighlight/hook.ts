import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetStories = (options: any = {}) => {
  return useInfiniteQuery(
    ['getStories', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(STORY_GET_STORIES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.story_getStories?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.story_getStories?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.story_getStories?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export const useCreateHighlightMutation = () => {
  return useMutation((args: any) => {
    return graphqlFetcher(HIGHLIT_CREATE_HIGHLIGHT, args);
  });
};
const STORY_GET_STORIES = gql`
  query getStories(
    $skip: Int
    $take: Int
    $where: StoryDtoFilterInput
    $order: [StoryDtoSortInput!]
  ) {
    story_getStories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          story {
            id
            isDraft
            mediaUrl
            mediaType
            thumbnail
            user {
              photoUrl
              id
              fullName
            }
            createdDate
          }
          isLikedByCurrentUser
        }
        totalCount
      }
      status
    }
  }
`;
const HIGHLIT_CREATE_HIGHLIGHT = gql`
  mutation highlight_createHighlight($input: HighlightInput) {
    highlight_createHighlight(input: $input) {
      status
    }
  }
`;
