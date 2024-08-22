import {gql} from 'graphql-request';
import {useInfiniteQuery} from 'react-query';
import {graphqlFetcher, useMutation} from '~/components';

export function useAddToPromotion() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_PROMOTION, args);
  });
}

export function useRemoveFromPromotion() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_PROMOTION, args);
  });
}

export function useCreatePromotion() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PROMOTION, args);
  });
}

export function useUpdatePromotion() {
  return useMutation((args: any) => {
    return graphqlFetcher(EDIT_PROMOTION, args);
  });
}

const EDIT_PROMOTION = gql`
  mutation ecommerce_updatePromotion($input: PromotionInput!) {
    ecommerce_updatePromotion(input: $input) {
      result {
        title
        photoUrl
        discount
        startDate
        endDate

        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const CREATE_PROMOTION = gql`
  mutation ecommerce_createPromotion($input: PromotionInput!) {
    ecommerce_createPromotion(input: $input) {
      result {
        title
        photoUrl
        discount
        startDate
        endDate
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
const REMOVE_FROM_PROMOTION = gql`
  mutation ecommerce_removeFromPromotion($promotionId: Int!, $productId: Int!) {
    ecommerce_removeFromPromotion(
      promotionId: $promotionId
      productId: $productId
    ) {
      code
      value
      description
    }
  }
`;

const ADD_TO_PROMOTION = gql`
  mutation ecommerce_addToPromotion($promotionId: Int!, $productId: Int!) {
    ecommerce_addToPromotion(promotionId: $promotionId, productId: $productId) {
      status
    }
  }
`;

export const useGetProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPromotionProducts', options],
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

export const useGetPromotion = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPromotion', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_PROMOTIONS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.ecommerce_getPromotions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getPromotions?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getPromotions?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
export const GET_PROMOTIONS = gql`
query ecommerce_getPromotions(
  $skip: Int
  $take: Int
  $where: PromotionFilterInput
  $order: [PromotionSortInput!]
) {
  ecommerce_getPromotions {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        userId
        createdDate
        discount
        title
        promotionProducts{
          id
        }
        photoUrl
        id
        startDate
        endDate
      }
      totalCount
    }

    status
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
  }
`;
