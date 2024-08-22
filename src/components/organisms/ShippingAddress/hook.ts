import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

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

export const useGetStates = (options: any = {}) => {
  return useInfiniteQuery(
    ['getStates', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_STATES, {
        skip: pageParam * 200,
        take: 200,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.countryInfo_getStatesOfCountry?.result?.pageInfo
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
            ?.map(a => a?.countryInfo_getStatesOfCountry?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.countryInfo_getStatesOfCountry?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetCountries = (options: any = {}) => {
  return useInfiniteQuery(
    ['getCountries', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_COUNTRIES, {
        skip: pageParam * 240,
        take: 240,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (lastPage?.countryInfo_getCountries?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: (data: any) => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.countryInfo_getCountries?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.countryInfo_getCountries?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function useRemoveAddress() {
  return useMutation((args: any) => {
    return graphqlFetcher(REMOVE_ADDRESS, args);
  });
}

export function useUpdateShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPPING_CARDS, args);
  });
}

export function useValidateAddress() {
  return useMutation((args: any) => {
    return graphqlFetcher(VALIDATE_ADDRESS, args);
  });
}

const VALIDATE_ADDRESS = gql`
query ecommerce_validateAddress($input: ValidateAddressInput!){
  ecommerce_validateAddress(
    input: $input
  ) {
    code
    value
    description
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

export const REMOVE_ADDRESS = gql`
  mutation shippingAddress_deleteShippingAddress($entityId: Int!) {
    shippingAddress_deleteShippingAddress(entityId: $entityId) {
      code
      value
      description
    }
  }
`;

export const GET_COUNTRIES = gql`
  query countryInfo_getCountries(
    $skip: Int
    $take: Int
    $where: StringDtoFilterInput
    $order: [StringDtoSortInput!]
  ) {
    countryInfo_getCountries {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          data
        }
        totalCount
      }

      status
    }
  }
`;

export const GET_STATES = gql`
  query countryInfo_getStatesOfCountry(
    $skip: Int
    $take: Int
    $where: StringDtoFilterInput
    $order: [StringDtoSortInput!]
    $country: String
  ) {
    countryInfo_getStatesOfCountry(country: $country) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          data
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
export const UPDATE_PROFILE = gql`
  mutation user_updateUser($userId: Int!, $userInput: UserInput) {
    user_updateUser(userId: $userId, userInput: $userInput) {
      status
      result {
        state
        zipCode
        city
        phoneNumber
      }
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
          isDefault
          createdDate
          deliveryInstructions
          phoneNumber
          aptSuiteBuilding
          state
          street
          zipcode
          coordinate
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

export const REMOVE_ITEM_SHOPPING_CARD = gql`
  mutation ecommerce_removeFromShoppingCard($shoppingCardDetailId: Int!) {
    ecommerce_removeFromShoppingCard(
      shoppingCardDetailId: $shoppingCardDetailId
    ) {
      value
      code
    }
  }
`;
