import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components';

export function useUpdateShoppingCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPPING_CARDS, args);
  });
}

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

export function useSetShippingCost() {
  return useMutation((args: any) => {
    return graphqlFetcher(SET_SIPPING_COST, args);
  });
}

const SET_SIPPING_COST = gql`
  mutation ecommerce_setShippingCost(
    $shoppingCardSellerId: Int!
    $cost: Decimal!
    $rateId: String!
    $rateInfo: String!
  ) {
    ecommerce_setShippingCost(
      shoppingCardSellerId: $shoppingCardSellerId
      cost: $cost
      rateId: $rateId
      rateInfo: $rateInfo
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
          status: data?.pages?.[0]?.ecommerce_getShippingCost?.status,
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
          totalCost
        }
        totalCount
      }

      status
    }
  }
`;
