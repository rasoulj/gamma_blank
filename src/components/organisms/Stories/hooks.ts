import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {useQueryClient} from 'react-query';
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
export function useMuteStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_MUTE_STORY, args);
  });
}
export function useMutePostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_MUTE_POST, args);
  });
}
export const useGetLastStories = (options: any = {}, enabled = true) => {
  return useInfiniteQuery(
    ['story_getLastStoriesOfUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(STORY_GET_LAST_STORIES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.story_getLastStoriesOfUsers?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.story_getLastStoriesOfUsers?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.story_getLastStoriesOfUsers?.result?.totalCount,
        };
      },
      ...options,
      enabled: !!enabled,
    },
  );
};
export function useStorySeenMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_SEEN, args);
  });
}

export function useStoryLikeStoryMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (args: any) => {
      return graphqlFetcher(STORY_LIKE, args);
    },
    {
      onMutate: async item => {
        const previousStory = queryClient.getQueriesData('getStories');

        const key = previousStory?.[0]?.[0];

        const data: any = queryClient.getQueryData(key);
        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const storiesDto = page?.story_getStories?.result?.items;

          storiesDto?.forEach((storyDto: any) => {
            if (storyDto?.story?.id === item?.storyId) {
              storyDto.story.likesCount = storyDto?.story?.likesCount + 1;
              storyDto.isLikedByCurrentUser = true;
            }
          });

          return page;
        });

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousStory: object, key};
      },
      onError: (err, newTodo, {key, previousStory}) => {
        queryClient.setQueryData(key, previousStory);
      },
      onSettled: () => {
        // queryClient.refetchQueries(['getPostComments', {postId}]);
      },
    },
  );
}

export function useStoryRemoveLikeMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (args: any) => {
      return graphqlFetcher(STORY_REMOVE_LIKE, args);
    },
    {
      onMutate: async item => {
        const previousStory = queryClient.getQueriesData('getStories');

        const key = previousStory?.[0]?.[0];

        const data: any = queryClient.getQueryData(key);
        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const storiesDto = page?.story_getStories?.result?.items;

          storiesDto?.forEach((storyDto: any) => {
            if (storyDto?.story?.id === item?.storyId) {
              storyDto.story.likesCount =
                storyDto?.story?.likesCount > 0
                  ? storyDto?.story?.likesCount - 1
                  : 0;
              storyDto.isLikedByCurrentUser = false;
            }
          });

          return page;
        });

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousStory: object, key};
      },
      onError: (err, newTodo, {key, previousStory}) => {
        queryClient.setQueryData(key, previousStory);
      },
      onSettled: () => {
        // queryClient.refetchQueries(['getPostComments', {postId}]);
      },
    },
  );
}

export function useDeleteStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_DELETE_STORY, args);
  });
}

export function useGetStorySeensQuery({storyId}) {
  return useQuery(['getStorySeens', storyId], () => {
    return graphqlFetcher(STORY_GET_SEENS, {storyId});
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

export function useRemoveFromHighlight() {
  return useMutation((args: any) => {
    return graphqlFetcher(HIGHLIGHT_REMOVE_FROM_HIGHLIGHT, args);
  });
}
export function useAddToHighlightMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(HIGHLIGHT_ADD_TO_HIGHLIGHTS, args);
  });
}
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
            likesCount
          }
          isLikedByCurrentUser
        }
        totalCount
      }
      status
    }
  }
`;
const STORY_MUTE_STORY = gql`
  mutation story_muteStory($targetUserId: Int!) {
    story_muteStory(targetUserId: $targetUserId) {
      code
      value
      description
    }
  }
`;
const POST_MUTE_POST = gql`
  mutation post_mutePost($targetUserId: Int!) {
    post_mutePost(targetUserId: $targetUserId) {
      code
      value
      description
    }
  }
`;
const STORY_GET_LAST_STORIES = gql`
  query story_getLastStoriesOfUsers(
    $skip: Int
    $take: Int
    $where: LastStoriesDtoFilterInput
    $order: [LastStoriesDtoSortInput!]
  ) {
    story_getLastStoriesOfUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            photoUrl
            id
            fullName
          }
          storiesSeen
          firstNotSeenIndex
          hasNotSeen
        }
        totalCount
      }
      status
    }
  }
`;
const STORY_SEEN = gql`
  mutation storySeen($storyId: Int!) {
    story_Seen(storyId: $storyId) {
      status
    }
  }
`;
const STORY_LIKE = gql`
  mutation likeStory($storyId: Int!) {
    story_like(storyId: $storyId) {
      status
      result {
        storyId
      }
    }
  }
`;
const STORY_REMOVE_LIKE = gql`
  mutation story_removeLike($storyId: Int!) {
    story_removeLike(storyId: $storyId) {
      code
      value
    }
  }
`;
const STORY_DELETE_STORY = gql`
  mutation story_deleteStory($storyId: Int!) {
    story_deleteStory(storyId: $storyId) {
      code
      value
      description
    }
  }
`;
const STORY_GET_SEENS = gql`
  query getStorySeens($storyId: Int!) {
    story_getStories {
      result(
        skip: 0
        take: 1
        where: {story: {id: {eq: $storyId}}}
        order: [{story: {createdDate: DESC}}]
      ) {
        items {
          story {
            seens {
              user {
                username
                fullName
                id
                photoUrl
              }
            }
          }
        }
        totalCount
      }
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
export const HIGHLIGHT_REMOVE_FROM_HIGHLIGHT = gql`
  mutation removeFromHighlight($storyId: Int!, $highlightId: Int!) {
    highlight_removeFromHighlight(
      storyId: $storyId
      highlightId: $highlightId
    ) {
      code
      value
    }
  }
`;
export const HIGHLIGHT_ADD_TO_HIGHLIGHTS = gql`
  mutation highlight_addToHighlight($highlightId: Int!, $storyId: Int!) {
    highlight_addToHighlight(highlightId: $highlightId, storyId: $storyId) {
      code
      value
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
