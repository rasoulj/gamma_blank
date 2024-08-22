import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

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
        if (lastPage?.ecommerce_getWishLists?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getWishLists?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getWishLists?.result?.totalCount,
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

export function useRemoveReview() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_REVIEW, args);
  });
}

export function useRemoveRate() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_RATE, args);
  });
}

export function useCreateViolationReport() {
  return useMutation((args: any) => {
    return graphqlFetcher(VIOLATION_REPORT, args);
  });
}

export function useCreateLikeReview() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_LIKE_REVIEW, args);
  });
}

export function useRemoveLikeReview() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_LIKE_REVIEW, args);
  });
}

export function useAddToWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_WISH_LIST, args);
  });
}

export function useRemoveFromWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FROM_WISH_LIST, args);
  });
}

export function useAddWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_WISH_LIST, args);
  });
}

export function useRemoveFromAllWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_FORM_ALL_WISHLIST, args);
  });
}

const REMOVE_FORM_ALL_WISHLIST = gql`
  mutation wishList_removeFromAllWishLists(
    $entityIdList: [Int!]!
    $entityName: String!
  ) {
    wishList_removeFromAllWishLists(
      entityIdList: $entityIdList
      entityName: $entityName
    ) {
      code
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
      }
      status
    }
  }
`;
const GET_WISHLISTS = gql`
  query ecommerce_getWishLists(
    $skip: Int
    $take: Int
    $where: ECommerceWishListFilterInput
    $order: [ECommerceWishListSortInput!]
  ) {
    ecommerce_getWishLists {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          createdDate
          id
          wishListProducts {
            product {
              productImages {
                imageUrl
              }
            }
          }
          name
          userId
        }
        totalCount
      }

      status
    }
  }
`;
const REMOVE_FROM_WISH_LIST = gql`
  mutation ecommerce_removeFromWishList($wishListId: Int!, $productId: Int!) {
    ecommerce_removeFromWishList(
      wishListId: $wishListId
      productId: $productId
    ) {
      code
      value
      description
    }
  }
`;

const ADD_TO_WISH_LIST = gql`
  mutation ecommerce_addToWishList($wishListId: Int!, $productId: Int!) {
    ecommerce_addToWishList(wishListId: $wishListId, productId: $productId) {
      result {
        productId
        wishListId
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const CREATE_LIKE_REVIEW = gql`
  mutation ecommerceRateReview_likeReview($reviewId: Int!) {
    ecommerceRateReview_likeReview(reviewId: $reviewId) {
      result {
        reviewId
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

const REMOVE_LIKE_REVIEW = gql`
  mutation ecommerceRateReview_removeLikeReview($reviewId: Int!) {
    ecommerceRateReview_removeLikeReview(reviewId: $reviewId) {
      code
      value
      description
    }
  }
`;

export const useGetRatingRate = (options: any = {}) => {
  return useInfiniteQuery(
    ['getProductRatings', options],
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
        totalCount
        average
        rateByUser
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
      value
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
  mutation ecommerceRate_rate($input: ProductRateInput!) {
    ecommerceRate_rate(input: $input) {
      result {
        userId
        rate
        review
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
  mutation ($input: ProductRateInput!) {
    ecommerceRateReview_removeRate(input: $input) {
      code
      value
      description
    }
  }
`;

export const REMOVE_REVIEW = gql`
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
            quality
            likesCount
            attachments
            title
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

export const VIOLATION_REPORT = gql`
  mutation (
    $data: String
    $userId: Int
    $reason: String
    $defaultViolationId: Int
    $targetEntityId: Int
    $targetEntityName: String
  ) {
    violationReport_createViolationReport(
      input: {
        data: $data
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

export const useGetShoppingCardHistory = (options: any = {}) => {
  return useInfiniteQuery(
    ['getShoppingCardHistory', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SHOPPING_CARD_HISTORY, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerce_getShoppingCardHistory?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getShoppingCardHistory?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getShoppingCardHistory?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetProducts = (options: any = {}) => {
  return useInfiniteQuery(
    ['getProducts', options],
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

export const useGetPaginatedProducts = (options: any = {}, pageParam) => {
  return useQuery(
    ['getProducts', options, pageParam],
    async () => {
      return graphqlFetcher(GET_ALL_PRODUCT, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      select: (data: any) => {
        return {
          ...data,
          pageParam: data?.pages?.length, // Store the current pageParam
        };
      },
      ...options,
    },
  );
};

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
          soldOut
          promotion {
            discount
            id
            userId
          }
          product {
            tag
            weight
            width
            height
            length
            productVideos {
              id
              videoUrl
            }
            alternates {
              id
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
            handlingPrice
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

export function useUpdateProduct() {
  return useMutation((args: any) => {
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

export function useCreateProduct() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PRODUCT, args);
  });
}

export function useDeletePromotion() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_PROMOTION, args);
  });
}

const DELETE_PROMOTION = gql`
  mutation ecommerce_deletePromotion($promotionId: Int!) {
    ecommerce_deletePromotion(promotionId: $promotionId) {
      code
      value
      description
    }
  }
`;

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

export const useGetProductCategories = ({key}) => {
  return useQuery([key], async () => {
    return graphqlFetcher(GET_PRODUCT_CATEGORY, {key});
  });
};

const GET_PRODUCT_CATEGORY = gql`
  query getStaticConfig($key: String!) {
    staticConfig_getStaticConfig(key: $key) {
      status
      result {
        value
      }
    }
  }
`;

export const useGetPromotion = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPromotion', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_PROMOTIONS, {
        skip: pageParam * 100,
        take: 100,
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
          photoUrl
          id
          startDate
          endDate
          promotionProducts {
            productId
          }
        }
        totalCount
      }

      status
    }
  }
`;

export function useCreateStaticConfig() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_STATIC_CONFIG, args);
  });
}

const CREATE_STATIC_CONFIG = gql`
  mutation staticConfig_createStaticConfig($input: StaticConfigInput) {
    staticConfig_createStaticConfig(input: $input) {
      result {
        key
        value
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useUpdateStaticConfig() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_STATIC_CONFIG, args);
  });
}

const UPDATE_STATIC_CONFIG = gql`
  mutation staticConfig_updateStaticConfig($input: StaticConfigInput) {
    staticConfig_updateStaticConfig(input: $input) {
      result {
        key
        value
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useRemoveStaticConfig() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_STATIC_CONFIG, args);
  });
}

export function useCreateReturnRequest() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_RETURN_REQUEST, args);
  });
}

const CREATE_RETURN_REQUEST = gql`
  mutation ecommerce_createReturnRequest($input: [ReturnRequestInput!]!) {
    ecommerce_createReturnRequest(input: $input) {
      result {
        items {
          code
          description
          value
        }
      }
      status
    }
  }
`;

const REMOVE_STATIC_CONFIG = gql`
  mutation staticConfig_deleteStaticConfig($key: String) {
    staticConfig_deleteStaticConfig(key: $key) {
      code
      value
      description
    }
  }
`;

export const GET_SHOPPING_CARD_HISTORY = gql`
  query ecommerce_getShoppingCardHistory(
    $skip: Int
    $take: Int
    $where: ShoppingCardHistoryFilterInput
    $order: [ShoppingCardHistorySortInput!]
    $shoppingCardId: Int!
  ) {
    ecommerce_getShoppingCardHistory(shoppingCardId: $shoppingCardId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdDate
          id
          lastModifiedDate
          orderStatus
          shoppingCard {
            createdDate
            deliveryFee
            deliveryType
            id
          }
          shoppingCardId
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

export const useGetShoppingCards = (options: any = {}) => {
  return useInfiniteQuery(
    ['getShoppingCards', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SHOPPING_CARDS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (
          lastPage?.ecommerce_getShoppingCards?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getShoppingCards?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getShoppingCards?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const GET_SHOPPING_CARDS = gql`
  query ecommerce_getShoppingCards(
    $skip: Int
    $take: Int
    $where: ShoppingCardFilterInput
    $order: [ShoppingCardSortInput!]
  ) {
    ecommerce_getShoppingCards {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          id
          tax
          taxPercent
          paymentMethod
          user {
            fullName
            phoneNumber
            about
            photoUrl
            externalId
            email
            id
            isDeleted
            createdDate
            lastModifiedDate
            location
            streetAddress
            city
            state
            zipCode
          }
          totalDiscount
          tax
          subTotal
          deliveryFee
          purchasePrice
          deliveryType
          orderStatus
          shoppingCardSellers {
            id
            shipEngineRateInfo
            shipEngineRateId
            seller {
              id
              fullName
              email
            }
            shoppingCardDetails {
              id
              priceSum
              alternateId
              alternate {
                attributes
                id
              }
              quantity
              productId
              finalPrice
              product {
                title
                discount
                price
                id
                createdDate
                productFeatures {
                  title
                }
                productImages {
                  imageUrl
                }
                alternates {
                  attributes
                  outOfStock
                  quantity
                }
                attributes {
                  name
                  values
                }
              }
            }

            shoppingCardId
            shoppingCard {
              shippingMethod
              userId
              tax
              taxPercent
              purchasePrice
              deliveryType
              orderStatus
              id
              isDeleted
              createdDate
              lastModifiedDate
              deliveryFee
              subTotal
            }
            id
            isDeleted
            createdDate
            lastModifiedDate
          }
          id
          isDeleted
          createdDate
          lastModifiedDate
          deliveryFee
          handlingPrice
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
