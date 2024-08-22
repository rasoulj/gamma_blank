import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetPostWishLists = (options: any = {}) => {
  return useInfiniteQuery(
    ['post_getWishLists', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(POST_GET_WISHLISTS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.post_getAllPosts?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map((a: any) => a?.post_getAllPosts?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount: data?.pages?.[0]?.post_getAllPosts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useRemovePostFromWishlistMutation() {
  return useMutation(args => {
    return graphqlFetcher(REMOVE_FROM_WISHLIST, args);
  });
}
export function useDeleteWishlistMutation() {
  return useMutation(args => {
    return graphqlFetcher(POST_DELETE_WISHLIST, args);
  });
}
export function useAddToWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(POST_Add_TO_WISH_LIST, args);
  });
}
export function useRemoveFromAllWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_ALL_WISHLISTS, args);
  });
}

const POST_GET_WISHLISTS = gql`
  query getWishListPosts(
    $skip: Int
    $take: Int
    $where: PostDtoFilterInput
    $order: [PostDtoSortInput!]
  ) {
    post_getAllPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isInWishList
          post {
            id
            mediaGalleryUrl
            content
            mediaUrl
            thumbnail
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

const REMOVE_FROM_WISHLIST = gql`
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

const POST_DELETE_WISHLIST = gql`
  mutation post_deleteWishList($wishListId: Int!) {
    post_deleteWishList(wishListId: $wishListId) {
      code
      value
      description
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

const REMOVE_FROM_ALL_WISHLISTS = gql`
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
