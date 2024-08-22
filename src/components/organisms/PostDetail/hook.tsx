import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';
import {Keyboard} from 'react-native';
import useAuthStore from '~/stores/authStore';

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

export const useGetPostComments = ({postId, where, order, enabled}) => {
  return useInfiniteQuery(
    ['getPostComments', postId, where, order, enabled],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_POST_COMMENTS, {
        skip: pageParam * 10,
        take: 10,
        postId,
        where,
        order,
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
      enabled,
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
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  return useMutation(
    (args: any) => {
      return graphqlFetcher(CREATE_COMMENT, {commentInput: args?.commentInput});
    },
    {
      onMutate: async item => {
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];

        Keyboard.dismiss();
        const previousPost = queryClient.getQueryData(key);
        const data: any = previousPost;
        const object = JSON.parse(JSON.stringify(data ? data : null));
        await queryClient.cancelQueries(key);

        if (!data) return;

        let oldDataPages = [...data.pages];
        let firstPageData = oldDataPages?.[0];
        let temp = Object.assign({}, firstPageData);
        let items = firstPageData?.postComment_getPostComments?.result?.items;
        if (!item?.commentInput?.parentId) {
          items?.unshift({
            id: item?.id,
            parentId: item?.commentInput?.parentId,
            user,
            text: item?.commentInput?.text,
            isLiked: false,
            likeCount: 0,
            createdDate: new Date().toISOString(),
            notPosted: true,
          });
          temp.postComment_getPostComments.result.items = items;
          oldDataPages[0] = temp;
          const commentsDataChecked = oldDataPages;
          data.pages = commentsDataChecked;
        } else {
          data?.pages?.forEach(page => {
            const comments = page?.postComment_getPostComments?.result?.items;
            for (let index = 0; index < comments?.length; index++) {
              let comment = comments[index];
              if (comment?.id === item?.commentInput?.parentId) {
                if (comment?.children) {
                  comment.children.unshift({
                    id: item?.id,
                    parentId: item?.commentInput?.parentId,
                    user,
                    text: item?.commentInput?.text,
                    isLiked: false,
                    likeCount: 0,
                    createdDate: new Date().toISOString(),
                    notPosted: true,
                  });
                } else {
                  comment.children = [
                    {
                      id: item?.id,
                      parentId: item?.commentInput?.parentId,
                      user,
                      text: item?.commentInput?.text,
                      isLiked: false,
                      likeCount: 0,
                      createdDate: new Date().toISOString(),
                      notPosted: true,
                    },
                  ];
                }
                comments[index] = comment;
                break;
              }
            }
            return page;
          });
        }

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousPost: object, key};
      },
      onError: (err, newTodo, {key, previousPost}) => {
        queryClient.setQueryData(key, previousPost);
      },
      onSettled: (data, error, variables) => {
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];
        queryClient.refetchQueries(key);
      },
    },
  );
}

export function useCreateLikeCommentPost() {
  const queryClient = useQueryClient();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(CREATE_COMMENT_LIKE, args?.input);
    },
    {
      onMutate: async item => {
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];
        const previousPost = queryClient.getQueryData(key);

        const data: any = previousPost;
        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const comments = page?.postComment_getPostComments?.result?.items;

          comments?.forEach((comment: any) => {
            if (comment?.id === item?.input?.commentId) {
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
      onSettled: (data, error, variables) => {
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];
        queryClient.refetchQueries(key);
      },
    },
  );
}

export function useRemoveLikeCommentPost() {
  const queryClient = useQueryClient();

  return useMutation(
    (args: any) => {
      return graphqlFetcher(REMOVE_COMMENT_LIKE, args?.input);
    },
    {
      onMutate: async item => {
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];
        const previousPost = queryClient.getQueryData(key);

        const data: any = previousPost;
        const object = JSON.parse(JSON.stringify(data ? data : null));

        if (!data) return;
        data?.pages?.forEach(page => {
          const comments = page?.postComment_getPostComments?.result?.items;
          comments?.forEach((comment: any) => {
            if (comment?.id === item?.input?.commentId) {
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
        const previousComment = queryClient.getQueriesData('getPostComments');
        const key = previousComment?.[0]?.[0];
        queryClient.invalidateQueries(key);
      },
    },
  );
}

export function useRemoveComment() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_COMMENT, args);
  });
}
export function useSeenPostMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_SEEN, args);
  });
}

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
          postId
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
      result {
        id
      }
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

const POST_SEEN = gql`
  mutation post_seen($postId: Int!) {
    post_seen(postId: $postId) {
      code
      value
    }
  }
`;
