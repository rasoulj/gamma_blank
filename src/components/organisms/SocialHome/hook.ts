import {gql} from 'graphql-request';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import useAuthStore from '~/stores/authStore';
import dayjs from 'dayjs';

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

export const useGetFollowingPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['post_getUserAndFollowingPosts', options?.where, options?.order],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_FOLLOWING_POSTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.post_getUserAndFollowingPosts?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getUserAndFollowingPosts?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.post_getUserAndFollowingPosts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetPostComments = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPostComments', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_POST_COMMENTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.postComment_getPostComments?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.postComment_getPostComments?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.postComment_getPostComments?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useCreateLikePost() {
  const queryClient = useQueryClient();
  const {socialType} = useSocialTypesConfig();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(CREATE_POST_LIKE, args);
    },
    {
      onMutate: async item => {
        const postListContext = updatePostList();

        return {postListContext};

        function updatePostList() {
          try {
            let keysArray = [];
            let dataArray = [];
            if (socialType === 'text') {
              const previousPost = queryClient.getQueriesData('post_explore');
              const key = previousPost?.[0]?.[0];
              keysArray.push(key);
              const data: any = queryClient.getQueryData(key);
              const object = JSON.parse(JSON.stringify(data));
              dataArray.push(object);
              if (!data) return;

              data?.pages?.forEach(page => {
                const posts = page?.post_explore?.result?.items;
                posts?.forEach(post => {
                  if (post?.post?.id === item?.entityId) {
                    post.post.likesCount = post?.post?.likesCount + 1;
                    post.post.isLiked = true;
                    post.isLikedByCurrentUser = true;
                  }
                });

                return page;
              });

              queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
            }

            const previousFollowingPost = queryClient.getQueriesData(
              'post_getUserAndFollowingPosts',
            );
            const followingKey = previousFollowingPost?.[0]?.[0];
            keysArray.push(followingKey);
            const followingData: any = queryClient.getQueryData(followingKey);
            const object = JSON.parse(JSON.stringify(followingData));
            dataArray.push(object);
            if (!followingData) return;

            followingData?.pages?.forEach(page => {
              const posts = page?.post_getUserAndFollowingPosts?.result?.items;
              posts?.forEach(post => {
                if (post?.post?.id === item?.entityId) {
                  post.post.likesCount = post?.post?.likesCount + 1;
                  post.post.isLiked = true;
                  post.isLikedByCurrentUser = true;
                }
              });

              return page;
            });

            queryClient.setQueryData(
              followingKey,
              JSON.parse(JSON.stringify(followingData)),
            );

            const previousPost = queryClient.getQueriesData('getPosts');
            if (previousPost?.[0]?.length > 0)
              for (let i = 0; i < previousPost?.[0]?.length; i++) {
                const key = previousPost?.[i]?.[0];
                keysArray.push(key);
                const data: any = queryClient.getQueryData(key);
                const object = JSON.parse(JSON.stringify(data));
                dataArray.push(object);
                if (!data) return;

                data?.pages?.forEach(page => {
                  const posts = page?.post_getAllPosts?.result?.items;
                  posts?.forEach(post => {
                    if (post?.post?.id === item?.entityId) {
                      post.post.likesCount = post?.post?.likesCount + 1;
                      post.post.isLiked = true;
                      post.isLikedByCurrentUser = true;
                    }
                  });

                  return page;
                });

                queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
              }
            return {dataArray, keysArray};
          } catch {}
        }
      },
      onError: (err, newTodo, {postDetailsContext, postListContext}) => {
        if (postDetailsContext) {
          const {key, data} = postDetailsContext;

          queryClient.setQueryData(key, data);
        }

        if (postListContext) {
          const {dataArray, keysArray} = postListContext;
          keysArray.forEach((key, index) =>
            queryClient.setQueryData(key, dataArray?.[index]),
          );
        }
      },
      onSettled: () => {
        queryClient.refetchQueries('getPosts');
      },
    },
  );
}

export function useRemoveLikePost() {
  const queryClient = useQueryClient();
  const {socialType} = useSocialTypesConfig();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(REMOVE_POST_LIKE, args);
    },
    {
      onMutate: async item => {
        const postListContext = updatePostList();

        return {postListContext};

        function updatePostList() {
          try {
            let keysArray = [];
            let dataArray = [];
            if (socialType === 'text') {
              const previousPost = queryClient.getQueriesData('post_explore');
              const key = previousPost?.[0]?.[0];
              keysArray.push(key);
              const data: any = queryClient.getQueryData(key);
              const object = JSON.parse(JSON.stringify(data));
              dataArray.push(object);
              if (!data) return;

              data?.pages?.forEach(page => {
                const posts = page?.post_explore?.result?.items;
                posts?.forEach(post => {
                  if (post?.post?.id === item?.entityId) {
                    post.post.likesCount = post?.post?.likesCount - 1;
                    post.post.isLiked = false;
                    post.isLikedByCurrentUser = false;
                  }
                });

                return page;
              });

              queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
            }

            const previousFollowingPost = queryClient.getQueriesData(
              'post_getUserAndFollowingPosts',
            );
            const followingKey = previousFollowingPost?.[0]?.[0];
            keysArray.push(followingKey);
            const followingData: any = queryClient.getQueryData(followingKey);
            const followingObject = JSON.parse(JSON.stringify(followingData));
            dataArray.push(followingObject);
            if (!followingData) return;

            followingData?.pages?.forEach(page => {
              const posts = page?.post_getUserAndFollowingPosts?.result?.items;
              posts?.forEach(post => {
                if (post?.post?.id === item?.entityId) {
                  post.post.likesCount = post?.post?.likesCount - 1;
                  post.post.isLiked = false;
                  post.isLikedByCurrentUser = false;
                }
              });

              return page;
            });

            queryClient.setQueryData(
              followingKey,
              JSON.parse(JSON.stringify(followingData)),
            );

            const previousPost = queryClient.getQueriesData('getPosts');
            if (previousPost?.[0]?.length > 0)
              for (let i = 0; i < previousPost?.[0]?.length; i++) {
                const key = previousPost?.[i]?.[0];
                const data: any = queryClient.getQueryData(key);
                const object = JSON.parse(JSON.stringify(data));
                keysArray.push(key);
                dataArray.push(object);
                if (!data) return;

                data?.pages?.forEach(page => {
                  const posts = page?.post_getAllPosts?.result?.items;
                  posts?.forEach(post => {
                    if (post?.post?.id === item?.entityId) {
                      post.post.likesCount = post?.post?.likesCount - 1;
                      post.post.isLiked = false;
                      post.isLikedByCurrentUser = false;
                    }
                  });

                  return page;
                });

                queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
              }

            return {dataArray, keysArray};
          } catch {}
        }
      },
      onError: (err, newTodo, {postDetailsContext, postListContext}) => {
        if (postDetailsContext) {
          const {key, data} = postDetailsContext;

          queryClient.setQueryData(key, data);
        }

        if (postListContext) {
          const {dataArray, keysArray} = postListContext;
          keysArray.forEach((key, index) =>
            queryClient.setQueryData(key, dataArray?.[index]),
          );
        }
      },
      onSettled: () => {
        queryClient.refetchQueries('getPosts');
      },
    },
  );
}

export function useCreateCommentPost() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_COMMENT, args);
  });
}

export function useCreateLikeCommentPost(postId) {
  const queryClient = useQueryClient();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(CREATE_COMMENT_LIKE, args);
    },
    {
      onMutate: async item => {
        const previousPost = queryClient.getQueryData([
          'getPostComments',
          {
            postId,
            where: {
              parentId: {
                eq: null,
              },
            },
          },
        ]);

        const key: any = previousPost;

        const data: any = queryClient.getQueryData(key);

        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const comments = page?.postComment_getPostComments?.result?.items;

          comments?.forEach((comment: any) => {
            if (comment?.id === item?.commentId) {
              comment.likesCount = comment?.likesCount + 1;
              comment.isLiked = true;
            }
          });

          return page;
        });

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousPost: object, key};
      },
      onError: (err, newTodo, {key, previousPost}) => {
        queryClient.setQueryData(key, previousPost);
      },
      onSettled: () => {
        queryClient.refetchQueries(['getPostComments', {postId}]);
      },
    },
  );
}

export function useRemoveLikeCommentPost(postId) {
  const queryClient = useQueryClient();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(REMOVE_COMMENT_LIKE, args);
    },
    {
      onMutate: async item => {
        const previousPost = queryClient.getQueryData([
          'getPostComments',
          {
            postId,
            where: {
              parentId: {
                eq: null,
              },
            },
          },
        ]);

        const key: any = previousPost;

        const data: any = queryClient.getQueryData(key);

        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const comments = page?.postComment_getPostComments?.result?.items;
          comments?.forEach((comment: any) => {
            if (comment?.id === item?.commentId) {
              comment.likesCount = comment?.likesCount - 1;
              comment.isLiked = false;
            }
          });

          return page;
        });

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousPost: object, key};
      },
      onError: (err, newTodo, {key, previousPost}) => {
        queryClient.setQueryData(key, previousPost);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['getPostComments', {postId}]);
      },
    },
  );
}

export function useDeletePost() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_POST, args);
  });
}

export const useGetUsers = (options: any = {}) => {
  return useInfiniteQuery(
    ['getUsers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_USERS, {
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

export function useUpdatePost() {
  return useMutation((args: any) => {
    return graphqlFetcher(EDIT_POST, args);
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

export function useRemoveComment() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_COMMENT, args);
  });
}

export const useGetBlockedUsers = () => {
  return useQuery('getBlockedUsers', () => {
    return graphqlFetcher(GET_BLOCKED_USERS);
  });
};
export function useMutePostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_MUTE_POST, args);
  });
}
export function useUnMutePostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_UNMUTE_POST, args);
  });
}
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
export const useGetLastStories = (options: any = {}) => {
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
    },
  );
};
export function useMuteStoryMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(STORY_MUTE_STORY, args);
  });
}
export function useGetMyStoryCounter(variables, options?: any) {
  return useQuery(
    ['story_getMyLastStoriesOfUsers', variables],
    () => graphqlFetcher(STORY_GET_MY_LAST_STORIES, variables),
    options,
  );
}
export const useGetFollowersId = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFollowers', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_FOLLOWERS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.social_getUserFollowerFollowees?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.social_getUserFollowerFollowees?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.social_getUserFollowerFollowees?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};
export function useCreateWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_CREATE_WISH_LIST, args);
  });
}
export function useAddToWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_Add_TO_WISH_LIST, args);
  });
}
export function useRemoveFromAllWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_ALL_WISH_LIST, args);
  });
}
export function useRemoveFromWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_WISH_LIST, args);
  });
}
export const useGetPostWishLists = (options: any = {}) => {
  return useInfiniteQuery(
    ['wishList_getWishLists', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_WISHLISTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.wishList_getWishLists?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.wishList_getWishLists?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.wishList_getWishLists?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetVonageSession = (options: any = {}) => {
  return useInfiniteQuery(
    ['vonage_getAllSessions', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(VONAGE_GET_ALL_SESSIONS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.vonage_getAllSessions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.vonage_getAllSessions?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.vonage_getAllSessions?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetVonageSessionWithInterval = (options: any = {}) => {
  const user = useAuthStore(state => state.user);

  return useInfiniteQuery(
    ['vonage_getAllSessions', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(VONAGE_GET_ALL_SESSIONS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
        where: {
          and: [
            {isFinished: {eq: false}},
            {createdDate: {lte: new Date().toISOString()}},
            {
              or: [
                {
                  lastModifiedDate: {
                    gte: dayjs(new Date()).subtract(2, 'minute').toISOString(),
                  },
                },
                {
                  createdDate: {
                    gte: dayjs(new Date()).subtract(1, 'minute').toISOString(),
                  },
                },
              ],
            },
            {sessionType: {eq: 'LIVE'}},
            {creatorId: {neq: user?.id}},
          ],
        },
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.vonage_getAllSessions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.vonage_getAllSessions?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.vonage_getAllSessions?.result?.totalCount,
        };
      },
      ...options,
      refetchInterval: 2 * 60 * 1000,
    },
  );
};

export const useGetLiveStoriesUser = input => {
  return useInfiniteQuery(
    ['story_getLiveStories', {...input}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(STORY_GET_LIVE_STORIES, {
        skip: pageParam * 10,
        take: 30,
        ...input,
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
      ...input,
    },
  );
};

export function useUpdateWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_WISHLIST, args);
  });
}

const GET_BLOCKED_USERS = gql`
  query blockUser_getBlockedUsers {
    blockUser_getBlockedUsers {
      result {
        items {
          id
          # blockedUser {
          #   id
          #   fullName
          # }
        }
      }
      status
    }
  }
`;
export const GET_ALL_POSTS = gql`
  query getPosts(
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

export const GET_ALL_FOLLOWING_POSTS = gql`
  query post_getUserAndFollowingPosts(
    $skip: Int
    $take: Int
    $where: PostDtoFilterInput
    $order: [PostDtoSortInput!]
  ) {
    post_getUserAndFollowingPosts {
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

export const GET_POST_COMMENTS = gql`
  query postComment_getPostComments(
    $skip: Int
    $take: Int
    $where: CommentFilterInput
    $order: [CommentSortInput!]
    $postId: Int!
  ) {
    postComment_getPostComments(postId: $postId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          parentId
          children {
            id
            parentId
            text
            user {
              id
              fullName
              photoUrl
            }
            isLiked
            likeCount
            createdDate
          }
          user {
            id
            fullName
            photoUrl
          }
          text
          isLiked
          likeCount
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

export const CREATE_POST_LIKE = gql`
  mutation postCommentLike_likePost($entityId: Int!) {
    postCommentLike_likePost(entityId: $entityId) {
      status
    }
  }
`;

export const REMOVE_POST_LIKE = gql`
  mutation postCommentLike_removeLikePost($entityId: Int!) {
    postCommentLike_removeLikePost(entityId: $entityId) {
      code
      value
      description
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation postComment_createComment($commentInput: CommentInput) {
    postComment_createComment(commentInput: $commentInput) {
      status
    }
  }
`;

export const CREATE_COMMENT_LIKE = gql`
  mutation postCommentLike_likeComment($commentId: Int!) {
    postCommentLike_likeComment(commentId: $commentId) {
      code
      value
      description
    }
  }
`;

export const REMOVE_COMMENT_LIKE = gql`
  mutation postCommentLike_removeLikeComment($commentId: Int!) {
    postCommentLike_removeLikeComment(commentId: $commentId) {
      code
      value
      description
    }
  }
`;

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
          fullName
          photoUrl
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

export const DELETE_POST = gql`
  mutation post_deletePost($entityId: Int!) {
    post_deletePost(entityId: $entityId) {
      code
      value
      description
    }
  }
`;

export const EDIT_POST = gql`
  mutation post_updatePost($input: PostInput) {
    post_updatePost(input: $input) {
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

const REMOVE_COMMENT = gql`
  mutation postComment_removeComment($commentId: Int!) {
    postComment_removeComment(commentId: $commentId) {
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
const POST_UNMUTE_POST = gql`
  mutation post_unmutePost($targetUserId: Int!) {
    post_unmutePost(targetUserId: $targetUserId) {
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
const STORY_GET_MY_LAST_STORIES = gql`
  query story_getMyLastStoriesOfUsers($where: StoryDtoFilterInput) {
    story_getStories {
      result(
        where: $where
        order: [{isSeenByCurrentUser: ASC}]
        skip: 0
        take: 1
      ) {
        totalCount
        items {
          isSeenByCurrentUser
        }
      }
      status
    }
  }
`;
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
            mediaType
            mediaUrl
            id
            isDraft
            user {
              photoUrl
              id
              fullName
            }
            createdDate
          }
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
export const GET_ALL_FOLLOWERS = gql`
  query social_getUserFollowerFollowees(
    $userId: Int!
    $skip: Int
    $take: Int
    $where: FollowerFolloweeDtoFilterInput
    $order: [FollowerFolloweeDtoSortInput!]
  ) {
    social_getUserFollowerFollowees(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            id
          }
        }
      }
    }
  }
`;
export const POST_CREATE_WISH_LIST = gql`
  mutation wishList_createWishList($input: WishListInput!) {
    wishList_createWishList(input: $input) {
      result {
        id
        name
      }
      status
    }
  }
`;
export const POST_Add_TO_WISH_LIST = gql`
  mutation wishList_addToWishList($wishListId: Int!, $entityIdList: [Int!]!) {
    wishList_addToWishList(
      wishListId: $wishListId
      entityIdList: $entityIdList
    ) {
      code
      value
    }
  }
`;
export const REMOVE_FROM_ALL_WISH_LIST = gql`
  mutation wishList_removeFromAllWishLists(
    $entityIdList: [Int!]!
    $entityName: String!
  ) {
    wishList_removeFromAllWishLists(
      entityIdList: $entityIdList
      entityName: $entityName
    ) {
      code
      value
      description
    }
  }
`;
export const GET_WISHLISTS = gql`
  query wishList_getWishLists(
    $take: Int
    $skip: Int
    $where: WishListFilterInput
    $entityName: String!
    $order: [WishListSortInput!]
  ) {
    wishList_getWishLists(entityName: $entityName) {
      result(order: $order, take: $take, skip: $skip, where: $where) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          wishListEntities {
            entityId
          }
        }
      }
    }
  }
`;
export const REMOVE_FROM_WISH_LIST = gql`
  mutation wishList_removeFromWishList(
    $wishListId: Int!
    $entityIdList: [Int!]!
  ) {
    wishList_removeFromWishList(
      wishListId: $wishListId
      entityIdList: $entityIdList
    ) {
      code
      value
      description
    }
  }
`;

export const VONAGE_GET_ALL_SESSIONS = gql`
  query vonage_getAllSessions(
    $skip: Int
    $take: Int
    $order: [VonageSessionSortInput!]
    $where: VonageSessionFilterInput
  ) {
    vonage_getAllSessions {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          creatorId
          sessionId
          isFinished
          createdDate
          id
          creator {
            fullName
            photoUrl
            id
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

const STORY_GET_LIVE_STORIES = gql`
  query story_getLiveStories($skip: Int, $take: Int) {
    story_getLastStoriesOfUsers {
      result(skip: $skip, take: $take) {
        items {
          user {
            id
          }
        }
      }
      status
    }
  }
`;

const UPDATE_WISHLIST = gql`
  mutation wishList_updateWishList($input: WishListInput!) {
    wishList_updateWishList(input: $input) {
      status
    }
  }
`;
