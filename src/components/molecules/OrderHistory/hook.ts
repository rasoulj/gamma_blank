import {graphqlFetcher} from '~/components/elemental';
import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';

export const useGetShoppingCards = (options: any = {}) => {
  return useInfiniteQuery(
    ['getShoppingCardsOrderHistory', options],
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

export function useUpdateShoppingCardStatus() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPPING_CARD, args);
  });
}

export function useBookAgain() {
  return useMutation((args: any) => {
    return graphqlFetcher(BOOK_AGAIN, args);
  });
}

const BOOK_AGAIN = gql`
  mutation ecommerce_bookAgain($shoppingCardId: Int!) {
    ecommerce_bookAgain(shoppingCardId: $shoppingCardId) {
      code
      value
      description
    }
  }
`;

const UPDATE_SHOPPING_CARD = gql`
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
        address
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
          orderDate 
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
