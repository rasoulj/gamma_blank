import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';
export function useUpdateHighlight() {
  return useMutation((args: any) => {
    return graphqlFetcher(HIGHLIGHT_UPDATE_HIGHLIGHT, args);
  });
}
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
const HIGHLIGHT_UPDATE_HIGHLIGHT = gql`
  mutation updateHighlight($input: HighlightInput) {
    highlight_updateHighlight(input: $input) {
      status
    }
  }
`;
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
