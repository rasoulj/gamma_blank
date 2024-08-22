import {graphqlFetcher} from '~/components/elemental';
import {gql} from 'graphql-request';
import {useInfiniteQuery, useQuery} from 'react-query';

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

export function useTracking(input = {}, options?: any) {
  return useQuery(
    ['ecommerce_tracking', input],
    () => graphqlFetcher(GET_TRACKING, input),
    options,
  );
}

const GET_TRACKING = gql`
  query ecommerce_tracking($shoppingCardSellerId: Int!) {
    ecommerce_tracking(shoppingCardSellerId: $shoppingCardSellerId) {
      result {
        trackingNumber
        actualDeliveryDate
        carrierDetailCode
        carrierStatusCode
        carrierStatusDescription
        estimatedDeliveryDate
        estimatedDeliveryDate
        shipDate
        events {
          carrierDetailCode
          carrierOccurredAt
          carrierStatusCode
          cityLocality
          companyName
          countryCode
          description
          eventCode
          latitude
          longitude
          occurredAt
          postalCode
          signer
          stateProvince
          statusCode
        }
        exceptionDescription
        shipDate
        statusCode
      }
      status
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
            orderDate
            createdDate
            deliveryFee
            deliveryType
            id
            cancelDescription
            shippingAddress {
              country
              city
              state
              street
              aptSuiteBuilding
            }
            user {
              fullName
              photoUrl
            }
            shoppingCardSellers {
              seller {
                fullName
                id
                photoUrl
              }
            }
            shippingMethod
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
