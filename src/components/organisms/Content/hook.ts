import {gql} from 'graphql-request';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {graphqlFetcher, useDrawer} from '~/components/elemental';
import React from 'react';

export const useGetProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getContentProducts', options],
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

export const useGetPaidProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPaidProducts', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_Paid_PRODUCT, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerce_getPaidProducts?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getPaidProducts?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getPaidProducts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_Paid_PRODUCT = gql`
  query ecommerce_getPaidProducts(
    $skip: Int
    $take: Int
    $where: ProductFilterInput
    $order: [ProductSortInput!]
  ) {
    ecommerce_getPaidProducts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          price
          pages
          user {
            fullName
            photoUrl
            id
            email
          }
          productType
          description
          userId
          productImages {
            imageUrl
          }
          category
          soldOut
          discount
          id
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

export function useCreateProduct() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PRODUCT, args);
  });
}

const CREATE_PRODUCT = gql`
  mutation ecommerce_createProduct($input: ProductInput!) {
    ecommerce_createProduct(input: $input) {
      result {
        title
        price
        description
        discount
        availableQuantity
        soldOut
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

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

export const VIOLATION_REPORT = gql`
  mutation ($input: ViolationReportInput!) {
    violationReport_createViolationReport(input: $input) {
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
`;

export const useGetProductDetail = args => {
  return useQuery(['getProductDetail', args], async () => {
    return graphqlFetcher(GET_PRODUCT_DETAIL, args);
  });
};

export function useAddToShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_SHOPPING_CARD, args);
  });
}

export function useRemoveProduct() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_PRODUCT, args);
  });
}

export function useAddToFavorite() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_FAVORITE, args);
  });
}

export function useRemoveFavorite() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FAVORITE, args);
  });
}

export const useGetFavorites = (options: any = {}) => {
  return useInfiniteQuery(
    ['getFavorites', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_FAVORITES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.favorite_getFavorites?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.favorite_getFavorites?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.favorite_getFavorites?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useRatingRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(RATING_RATE, args);
  });
}

export function useRemoveRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_RATE, args);
  });
}

export const useGetRatingRate = (options: any = {}) => {
  return useInfiniteQuery(
    ['getRatingContent', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_RATINGS_RATE, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerceRateReview_getReviews?.result?.pageInfo
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
            ?.map(a => a?.ecommerceRateReview_getReviews?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerceRateReview_getReviews?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetTotalRate = args => {
  return useQuery(['getTotalRate', args], async () => {
    return graphqlFetcher(GET_TOTAL_RATE, args);
  });
};

const GET_TOTAL_RATE = gql`
  query rating_getTotalRate($targetEntityName: String!, $targetEntityId: Int!) {
    rating_getTotalRate(
      targetEntityName: $targetEntityName
      targetEntityId: $targetEntityId
    ) {
      result {
        average
      }
      status
    }
  }
`;

const GET_FAVORITES = gql`
  query favorite_getFavorites(
    $skip: Int
    $take: Int
    $where: FavoriteFilterInput
    $order: [FavoriteSortInput!]
  ) {
    favorite_getFavorites {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          entityId
          entity {
            id
            title
          }
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
export const REMOVE_FAVORITE = gql`
  mutation ecommerceFavorite_removeFavorite($productId: Int!) {
    ecommerceFavorite_removeFavorite(productId: $productId) {
      code
      value
      description
    }
  }
`;

export const ADD_TO_FAVORITE = gql`
  mutation ecommerceFavorite_createFavorite($productId: Int!) {
    ecommerceFavorite_createFavorite(productId: $productId) {
      result {
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

export const GET_PRODUCT_DETAIL = gql`
  query ecommerce_getProduct($productId: Int!) {
    ecommerce_getProduct(productId: $productId) {
      result {
        title
        userId
        price
        description
        discount
        category
        pages
        contentDuration
        user {
          fullName
          photoUrl
          id
        }
        availableQuantity
        soldOut
        productImages {
          imageUrl
        }
        productFeatures {
          id
          title
          description
        }
        shoppingCardDetails {
          finalPrice
          priceSum
          quantity
        }
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const ADD_TO_SHOPPING_CARD = gql`
  mutation ecommerce_addToShoppingCard($input: [ShoppingCardInput!]!) {
    ecommerce_addToShoppingCard(input: $input) {
      code
      description
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation ecommerce_removeProduct($productId: Int!) {
    ecommerce_removeProduct(productId: $productId) {
      code
      value
      description
    }
  }
`;

export const RATING_RATE = gql`
  mutation ecommerceRateReview_createRateAndReview($input: ProductRateInput!) {
    ecommerceRateReview_createRateAndReview(input: $input) {
      result {
        userId
        rate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const REMOVE_RATE = gql`
  mutation ecommerceRateReview_removeReview($reviewId: Int!) {
    ecommerceRateReview_removeReview(reviewId: $reviewId) {
      result {
        review
        userId
        productId
        likesCount
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const GET_RATINGS_RATE = gql`
  query ecommerceRateReview_getReviews(
    $skip: Int
    $take: Int
    $where: ProductReviewDtoFilterInput
    $order: [ProductReviewDtoSortInput!]
  ) {
    ecommerceRateReview_getReviews {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          review {
            id
            review
            createdDate
            user {
              id
              fullName
              photoUrl
            }
          }
          isLikedByCurrentUser
          rateByReviewCreator
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

export function useUpdateProduct() {
  return useMutation((args: any) => {
    console.log('args', args);

    return graphqlFetcher(UPDATE_PRODUCT, args);
  });
}

const UPDATE_PRODUCT = gql`
  mutation ecommerce_updateProduct($input: ProductInput!) {
    ecommerce_updateProduct(input: $input) {
      result {
        title
        price
        description
        discount
        availableQuantity
        soldOut
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const useGetCreators = (options: any = {}) => {
  return useInfiniteQuery(
    ['getCreators', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_ALL_CREATORS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerce_getProductCreators?.result?.pageInfo?.hasNextPage
        ) {
          return allPages?.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getProductCreators?.result?.items)
            .flat()
            .filter(Boolean),
          totalCount:
            data?.pages?.[0]?.ecommerce_getProductCreators?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_ALL_CREATORS = gql`
  query ecommerce_getProductCreators(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    ecommerce_getProductCreators {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fullName
          id
          email
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
