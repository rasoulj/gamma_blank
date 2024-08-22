import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components';

export const useGetWishLists = (options: any = {}) => {
  return useInfiniteQuery(
    ['getWishLists', options],
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
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.wishList_getWishLists?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.wishList_getWishLists?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useAddWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_WISH_LIST, args);
  });
}

export function useUpdateWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_WISH_LIST, args);
  });
}

export function useRemoveWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_WISH_LIST, args);
  });
}

export function useRemoveFromWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_WISH_LIST, args);
  });
}

export function useAddToWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_WISH_LIST, args);
  });
}

export const useGetProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getWishListProducts', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_PRODUCT, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.ecommerce_getProducts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getProducts?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getProducts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetWishlistPosts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getWishListPosts', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_WISHLIST_POSTS, {
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
export function useRemoveFromAllWishlistMutation() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_ALL_WISH_LIST, args);
  });
}

export const GET_ALL_PRODUCT = gql`
  query ecommerce_getProducts(
    $skip: Int
    $take: Int
    $where: ProductDtoFilterInput
    $order: [ProductDtoSortInput!]
  ) {
    ecommerce_getProducts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isInWishList
          finalPrice

          promotion {
            discount
            id
          }
          product {
            alternates {
              attributes
              outOfStock
              quantity
            }
            attributes {
              name
              values
            }
            legalDisclaimer
            objectUrl
            objectType
            weight
            productType
            brand
            quality
            ratePercent_1
            ratePercent_2
            ratePercent_3
            ratePercent_4
            ratePercent_5
            subcategory
            productFeatures {
              title
              description
              id
            }
            title
            rateAverage
            rateCount
            price
            pages
            productType
            description
            userId
            user {
              fullName
              photoUrl
              id
            }
            price

            productImages {
              imageUrl
              id
            }
            category
            soldOut
            discount
            id
            createdDate
          }
          isFavorite
          isPurchased
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
const GET_WISHLIST_POSTS = gql`
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
const UPDATE_WISH_LIST = gql`
  mutation wishList_updateWishList($input: WishListInput!) {
    wishList_updateWishList(input: $input) {
      result {
        name
        userId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const REMOVE_FROM_WISH_LIST = gql`
  mutation wishList_removeFromWishList(
    $entityIdList: [Int!]!
    $wishListId: Int!
  ) {
    wishList_removeFromWishList(
      entityIdList: $entityIdList
      wishListId: $wishListId
    ) {
      code
      description
    }
  }
`;
export const ADD_TO_WISH_LIST = gql`
  mutation wishList_addToWishList($entityIdList: [Int!]!, $wishListId: Int!) {
    wishList_addToWishList(
      entityIdList: $entityIdList
      wishListId: $wishListId
    ) {
      code
      description
    }
  }
`;

const REMOVE_WISH_LIST = gql`
  mutation wishList_deleteWishList($wishListId: Int!) {
    wishList_deleteWishList(wishListId: $wishListId) {
      code
      value
      description
    }
  }
`;

const ADD_WISH_LIST = gql`
  mutation wishList_createWishList($input: WishListInput!) {
    wishList_createWishList(input: $input) {
      result {
        name
        userId
        id
        isDeleted
        createdDate
        lastModifiedDate
        entityName
      }
      status
    }
  }
`;

const GET_WISHLISTS = gql`
  query getWishLists(
    $skip: Int
    $take: Int
    $where: WishListDtoFilterInput
    $order: [WishListDtoSortInput!]
    $entityName: String!
    $entityId: Int
  ) {
    wishList_getWishLists(entityName: $entityName, entityId: $entityId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          isInWishList
          wishList {
            createdDate
            id
            entityName
            name
            userId
          }
        }
        totalCount
      }

      status
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
