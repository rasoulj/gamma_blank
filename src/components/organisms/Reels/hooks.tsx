import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetReels = (options: any = {}) => {
  return useInfiniteQuery(
    ['getReels', {...options}],
    async ({pageParam = 0}) => {
      return graphqlFetcher(REELS_GET_REELS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.reels_getReels?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.reels_getReels?.result?.items).flat(),
          totalCount: data?.pages?.[0]?.reels_getReels?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

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

export const useGetPostComments = ({postId, where, order}) => {
  return useInfiniteQuery(
    ['getPostComments', postId, where, order],
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
    },
  );
};

const REELS_GET_REELS = gql`
  query getReels(
    $where: ReelsDtoFilterInput
    $skip: Int
    $take: Int
    $order: [ReelsDtoSortInput!]
  ) {
    reels_getReels {
      result(where: $where, skip: $skip, take: $take, order: $order) {
        items {
          isLikedByCurrentUser
          isInWishList
          reels {
            userId
            mediaUrl
            caption
            locations
            isDraft
            thumbnail
            user {
              username
              fullName
              photoUrl
              id
            }
            likesCount
            shareCount
            reviewCount
            createdDate
            id
          }
        }
      }
    }
  }
`;

const GET_POST_COMMENTS = gql`
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

const GET_ALL_POSTS = gql`
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
