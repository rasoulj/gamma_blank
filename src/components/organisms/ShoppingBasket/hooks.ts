import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetShoppingCards = (options: any = {}) => {
  return useInfiniteQuery(
    ['getShoppingCards'],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SHOPPING_CARDS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerce_getShoppingCards?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
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
  mutation ecommerce_removeFromAllWishLists($productId: Int!) {
    ecommerce_removeFromAllWishLists(productId: $productId) {
      code
      value
      description
    }
  }
`;

export function useGetTax() {
  return useMutation((args: any) => {
    return graphqlFetcher(ECOMMERCE_TAX, args);
  });
}

const ECOMMERCE_TAX = gql`
  mutation {
    ecommerce_setTax {
      result {
        userId
        tax
        purchasePrice
        totalDiscount
        subTotal
        deliveryFee
        deliveryType
        orderStatus
        taxPercent
        shippingMethod
        cancelDescription
        email
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export function useRemoveItemFromShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_ITEM_FORM_SHOPPING, args);
  });
}

const REMOVE_ITEM_FORM_SHOPPING = gql`
  mutation ecommerce_removeFromShoppingCard($shoppingCardDetailId: Int!) {
    ecommerce_removeFromShoppingCard(
      shoppingCardDetailId: $shoppingCardDetailId
    ) {
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

export function useGetShoppingCard(shoppingCardId) {
  return useQuery(['getShoppingCard'], () => {
    return graphqlFetcher(GET_SHOPPING_CARD_DETAILS, shoppingCardId);
  });
}

export const useGetOrderAddress = (options: any = {}) => {
  return useInfiniteQuery(
    ['getOrderAddress', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SHOPPING_ADDERSS, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.shippingAddress_getShippingAddresses?.result?.pageInfo
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
            ?.map(a => a?.shippingAddress_getShippingAddresses?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.shippingAddress_getShippingAddresses?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};
export function useAddToShoppingCard() {
  return useMutation(args => {
    return graphqlFetcher(ADD_TO_SHOPPING_CARD, args);
  });
}

export function useRemoveItemShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_ITEM_SHOPPING_CARD, args);
  });
}

export function useCreateShopingAddress() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_SHOPING_ADDRESS, args);
  });
}

export function useEditShopingAddress() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPING_ADDRESS, args);
  });
}

export function useUpdateProfile() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_PROFILE, args);
  });
}

export function useAddToWishList() {
  return useMutation((args: any) => {
    return graphqlFetcher(ADD_TO_WISH_LIST, args);
  });
}

export function useClearShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(CLEAR_SHOPPING_CARD, args);
  });
}

export function usePurcheseCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(SET_PURCHESE_CARD, args);
  });
}

export function useUpdateShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPPING_CARDS, args);
  });
}

export function useSetShippingCost() {
  return useMutation((args: any) => {
    return graphqlFetcher(SET_SIPPING_COST, args);
  });
}

export function useSetPayWithIntent() {
  return useMutation((args: any) => {
    return graphqlFetcher(SET_PAY_WITH_INTENT, args);
  });
}

const SET_PAY_WITH_INTENT = gql`
  mutation paymentStripe_payWithIntent(
    $amount: Decimal!
    $amountForApsy: Decimal!
  ) {
    paymentStripe_payWithIntent(
      amount: $amount
      amountForApsy: $amountForApsy
    ) {
      result {
        publishableKey
        clientSecret
        apsyPublishableKey
        apsyClientSecret
      }
    }
  }
`;

const SET_SIPPING_COST = gql`
  mutation ecommerce_setShippingCost(
    $shoppingCardSellerId: Int!
    $cost: Decimal!
    $rateId: String!
  ) {
    ecommerce_setShippingCost(
      shoppingCardSellerId: $shoppingCardSellerId
      cost: $cost
      rateId: $rateId
    ) {
      result {
        shoppingCardId

        shippingCost
        shipEngineRateId
        shipEngineLabelId
        shipEngineLabelUrl
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const UPDATE_SHOPPING_CARDS = gql`
  mutation ecommerce_updateShoppingCard($input: ShoppingCardUpdateInput!) {
    ecommerce_updateShoppingCard(input: $input) {
      result {
        userId
        tax
        purchasePrice
        totalDiscount
        subTotal
        deliveryFee
        deliveryType
        orderStatus
        taxPercent
        shippingMethod
        cancelDescription
        email
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

const CLEAR_SHOPPING_CARD = gql`
  mutation ecommerce_clearShoppingCard {
    ecommerce_clearShoppingCard {
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

export const UPDATE_PROFILE = gql`
  mutation user_updateUser($userId: Int!, $userInput: UserInput) {
    user_updateUser(userId: $userId, userInput: $userInput) {
      status
    }
  }
`;

export const GET_SHOPPING_ADDERSS = gql`
  query shippingAddress_getShippingAddresses(
    $skip: Int
    $take: Int
    $where: ShippingAddressFilterInput
    $order: [ShippingAddressSortInput!]
  ) {
    shippingAddress_getShippingAddresses {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          addressName
          city
          country
          createdDate
          floor
          number
          street
          zipcode
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
export const CREATE_SHOPING_ADDRESS = gql`
  mutation shippingAddress_createShippingAddress($input: ShippingAddressInput) {
    shippingAddress_createShippingAddress(input: $input) {
      result {
        userId
        addressName
        country
        city
        street
        number
        floor
        zipcode
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
export const UPDATE_SHOPING_ADDRESS = gql`
  mutation shippingAddress_updateShippingAddress($input: ShippingAddressInput) {
    shippingAddress_updateShippingAddress(input: $input) {
      result {
        userId
        addressName
        country
        city
        street
        number
        floor
        zipcode
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
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
          shippingAddress {
            zipcode
            city
            coordinate
            aptSuiteBuilding
            addressName
            phoneNumber
            country
            state
            street
          }
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
          orderDate
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
export const GET_SHOPPING_CARD_DETAILS = gql`
  query ecommerce_getShoppingCard($shoppingCardId: Int!) {
    ecommerce_getShoppingCard(shoppingCardId: $shoppingCardId) {
      result {
        shoppingCardSellers {
          shoppingCardDetails {
            productId
            isInWishList
          }
        }
      }
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

export const REMOVE_ITEM_SHOPPING_CARD = gql`
  mutation ecommerce_removeItemFromShoppingCard($shoppingCardDetailId: Int!) {
    ecommerce_removeItemFromShoppingCard(
      shoppingCardDetailId: $shoppingCardDetailId
    ) {
      code
      value
      description
    }
  }
`;

const SET_PURCHESE_CARD = gql`
  mutation ecommerce_purchaseCard($shoppingCardId: Int!) {
    ecommerce_purchaseCard(shoppingCardId: $shoppingCardId) {
      result {
        userId
        id
        isDeleted
        shippingMethod
        paymentMethod
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
export const useGetShippingCost = (options: any = {}) => {
  return useInfiniteQuery(
    ['getOrderAddress', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_SHIPPING_COST, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.ecommerce_getShippingCost?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.ecommerce_getShippingCost?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.ecommerce_getShippingCost?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

const GET_SHIPPING_COST = gql`
  query ecommerce_getShippingCost(
    $skip: Int
    $take: Int
    $where: ShipEngineRateDtoDefFilterInput
    $order: [ShipEngineRateDtoDefSortInput!]
    $shoppingCardSellerId: Int!
  ) {
    ecommerce_getShippingCost(shoppingCardSellerId: $shoppingCardSellerId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          rateId
          serviceType
          deliveryDays

          shippingAmount {
            amount
            currency
          }
          taxAmount {
            amount
            currency
          }
          totalCost
        }
        totalCount
      }

      status
    }
  }
`;
