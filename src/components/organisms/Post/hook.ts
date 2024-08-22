import {gql} from 'graphql-request';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {graphqlFetcher, useDrawer} from '~/components/elemental';
import React from 'react';

export const useGetPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPosts', options],
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

  return useMutation(
    (args: any) => {
      return graphqlFetcher(CREATE_POST_LIKE, args);
    },
    {
      onMutate: async item => {
        const postDetailsContext = updatePostDetails();
        const postListContext = updatePostList();

        return {postDetailsContext, postListContext};

        function updatePostDetails() {
          try {
            const key = ['getPosts', {where: {id: {eq: item.entityId}}}];
            const previousPost = queryClient.getQueriesData(key);
            const newPost = JSON.parse(JSON.stringify(previousPost));
            const post =
              newPost[0][1].pages[0].post_getAllPosts.result.items[0];

            newPost[0][1].pages[0].post_getAllPosts.result.items[0] = {
              ...post,
              likesCount: (post.likesCount || 0) + 1,
              isLiked: true,
            };

            queryClient.setQueryData(key, newPost[0][1]);

            return {data: previousPost, key};
          } catch {}
        }

        function updatePostList() {
          try {
            const previousPost = queryClient.getQueriesData('getPosts');
            const key = previousPost?.[1]?.[0];
            const data: any = queryClient.getQueryData(key);
            const object = JSON.parse(JSON.stringify(data));

            if (!data) return;

            data?.pages?.forEach(page => {
              const posts = page?.post_getAllPosts?.result?.items;
              posts?.forEach(post => {
                if (post?.id === item?.entityId) {
                  post.likesCount = post?.likesCount + 1;
                  post.isLiked = true;
                }
              });

              return page;
            });

            queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));

            return {data: object, key};
          } catch {}
        }
      },
      onError: (err, newTodo, {postDetailsContext, postListContext}) => {
        if (postDetailsContext) {
          const {key, data} = postDetailsContext;

          queryClient.setQueryData(key, data);
        }

        if (postListContext) {
          const {key, data} = postListContext;

          queryClient.setQueryData(key, data);
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

  return useMutation(
    (args: any) => {
      return graphqlFetcher(REMOVE_POST_LIKE, args);
    },
    {
      onMutate: async item => {
        const postDetailsContext = updatePostDetails();
        const postListContext = updatePostList();

        return {postDetailsContext, postListContext};

        function updatePostDetails() {
          try {
            const key = ['getPosts', {where: {id: {eq: item.entityId}}}];
            const previousPost = queryClient.getQueriesData(key);
            const newPost = JSON.parse(JSON.stringify(previousPost));
            const post =
              newPost[0][1].pages[0].post_getAllPosts.result.items[0];
            const count = post.likesCount || 0;

            newPost[0][1].pages[0].post_getAllPosts.result.items[0] = {
              ...post,
              likesCount: count > 0 ? count - 1 : 0,
              isLiked: false,
            };

            queryClient.setQueryData(key, newPost[0][1]);

            return {data: previousPost, key};
          } catch {}
        }

        function updatePostList() {
          try {
            const previousPost = queryClient.getQueriesData('getPosts');
            const key = previousPost?.[1]?.[0];
            const data: any = queryClient.getQueryData(key);
            const object = JSON.parse(JSON.stringify(data));

            if (!data) return;

            data?.pages?.forEach(page => {
              const posts = page?.post_getAllPosts?.result?.items;
              posts?.forEach(post => {
                if (post?.id === item?.entityId) {
                  post.likesCount = post?.likesCount - 1;
                  post.isLiked = false;
                }
              });

              return page;
            });

            queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));

            return {data: object, key};
          } catch {}
        }
      },
      onError: (err, newTodo, {postDetailsContext, postListContext}) => {
        if (postDetailsContext) {
          const {key, data} = postDetailsContext;

          queryClient.setQueryData(key, data);
        }

        if (postListContext) {
          const {key, data} = postListContext;

          queryClient.setQueryData(key, data);
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
  query social_getAllPosts(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
  ) {
    post_getAllPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          poster {
            id
            fullName
            photoUrl
          }
          category
          createdDate
          content
          mediaUrl
          commentCount
          postTags {
            id
            title
          }
          likesCount
          isLiked
          comments {
            likeCount
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
  $data
  $userId: Int
  $reason: String
  $defaultViolationId: Int
  $targetEntityId: Int
  $targetEntityName: String
) {
  violationReport_createViolationReport(
    input: {
      data:$data
      userId: $userId
      reason: $reason
      defaultViolationId: $defaultViolationId
      targetEntityId: $targetEntityId
      targetEntityName: $targetEntityName
    }
  ) {
    result {
      data
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
