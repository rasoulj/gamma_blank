import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPosts', options?.where, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_POSTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_getAllPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getAllPosts?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.post_getAllPosts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetExplorePosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['post_explore', options?.where, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_POST_EXPLORE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_explore?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.post_explore?.result?.items).flat(),
          totalCount: data?.pages?.[0]?.post_explore?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export const useGetSearchHistories = (options: any = {}) => {
  return useInfiniteQuery(
    ['searchHistory_getSearchHistories', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(SEARCH_HISTORY_GET_HISTORIES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.searchHistory_getSearchHistories?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.searchHistory_getSearchHistories?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.searchHistory_getSearchHistories?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useDeleteSearchHistoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_SEARCH_HISTORY, args);
  });
}

export const useGetAllUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['social_getUsers', options?.where, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.social_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.social_getUsers?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.social_getUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useDeleteAllSearchHistoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_ALL_SEARCH_HISTORIES, args);
  });
}

export function useCreateSearchHistoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_SEARCH_HISTORY, args);
  });
}

export const useGetAllPostsTags = (options: any = {}) => {
  return useInfiniteQuery(
    ['post_getAllTags', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_TAGS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_getAllTags?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getAllTags?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.post_getAllTags?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useFollowTagMutation = () => {
  return useMutation(args => graphqlFetcher(POST_FOLLOW_TAG, args));
};

export const useUnfollowTagMutation = () => {
  return useMutation(args => graphqlFetcher(POST_UNFOLLOW_TAG, args));
};
export function useIsFollowedPostQuery(input = {}, options?: any) {
  return useQuery(
    ['post_tagIsFollowed', input],
    () => graphqlFetcher(POST_TAG_IS_FOLLOW, input),
    options,
  );
}
const GET_POST_EXPLORE = gql`
  query post_explore(
    $skip: Int
    $take: Int
    $where: PostExploreDtoFilterInput
    $order: [PostExploreDtoSortInput!]
  ) {
    post_explore {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          post {
            id
            poster {
              id
              fullName
              photoUrl
            }
            isDraft
            category
            createdDate
            mediaGalleryUrl
            content
            mediaUrl
            commentCount
            postType
            thumbnail
            likesCount
            locations
          }
          isLikedByCurrentUser
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

const SEARCH_HISTORY_GET_HISTORIES = gql`
  query searchHistory_getSearchHistories(
    $take: Int
    $skip: Int
    $where: SearchHistoryFilterInput
    $order: [SearchHistorySortInput!]
  ) {
    searchHistory_getSearchHistories {
      result(where: $where, take: $take, skip: $skip, order: $order) {
        items {
          type
          value
          id
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

const DELETE_SEARCH_HISTORY = gql`
  mutation searchHistory_deleteSearchHistory($searchHistoryId: Int!) {
    searchHistory_deleteSearchHistory(searchHistoryId: $searchHistoryId) {
      status
    }
  }
`;

const GET_ALL_USERS = gql`
  query social_getUsers(
    $take: Int
    $skip: Int
    $where: UserDtoFilterInput
    $order: [UserDtoSortInput!]
  ) {
    social_getUsers {
      result(take: $take, skip: $skip, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
        items {
          user {
            id
            email
            photoUrl
            username
            fullName
          }
        }
      }
    }
  }
`;

const DELETE_ALL_SEARCH_HISTORIES = gql`
  mutation searchHistory_deleteSearchHistories($types: [String]) {
    searchHistory_deleteSearchHistories(types: $types) {
      code
    }
  }
`;

const CREATE_SEARCH_HISTORY = gql`
  mutation ($input: SearchHistoryInput) {
    searchHistory_createSearchHistory(input: $input) {
      status
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query social_getAllPosts(
    $skip: Int
    $take: Int
    $where: PostDtoFilterInput
    $order: [PostDtoSortInput!]
  ) {
    post_getAllPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isLikedByCurrentUser
          isInWishList
          post {
            id
            poster {
              id
              fullName
              photoUrl
            }
            isDraft
            category
            createdDate
            mediaGalleryUrl
            content
            mediaUrl
            commentCount
            postType
            thumbnail
            likesCount
            locations
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

const GET_ALL_TAGS = gql`
  query post_getAllTags(
    $skip: Int
    $take: Int
    $where: StringDtoFilterInput
    $order: [StringDtoSortInput!]
  ) {
    post_getAllTags {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          data
        }
      }
      status
    }
  }
`;

const POST_FOLLOW_TAG = gql`
  mutation post_followTag($tag: String) {
    post_followTag(tag: $tag) {
      status
    }
  }
`;
const POST_UNFOLLOW_TAG = gql`
  mutation post_unfollowTag($tag: String) {
    post_unfollowTag(tag: $tag) {
      code
      value
    }
  }
`;

const POST_TAG_IS_FOLLOW = gql`
  query post_tagIsFollowed($tag: String) {
    post_tagIsFollowed(tag: $tag) {
      code
      value
      description
    }
  }
`;
