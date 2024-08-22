import {gql} from 'graphql-request';
import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export function usePaymentSetCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(PAYMENT_SETCARD, args);
  });
}

export function usePaymentCreatePaymentMethod() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PAYMENT_METHOD, args);
  });
}

export function usePaymentUpdatePaymentMethod() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_PAYMENT_METHOD, args);
  });
}

export function usePaymentDeletePaymentMethod() {
  return useMutation((args: any) => {
    return graphqlFetcher(DELETE_PAYMENT_METHOD, args);
  });
}

export const useGetPublishedKey = () => {
  return useQuery({
    queryKey: ['published_key'],
    queryFn: async () => await graphqlFetcher(GET_PUBLISHED_KEY),
  });
};

export const useGetApsyPublishedKey = () => {
  return useQuery({
    queryKey: ['apsy_published_key'],
    queryFn: async () => await graphqlFetcher(GET_PUBLISHED_APSY_KEY),
  });
};

export const useGetPaymantMethods = (options: any = {}) => {
  return useInfiniteQuery(
    ['getPaymentMethods', options],
    async ({pageParam = 0}) => {
      return graphqlFetcher(GET_PAYMENT_METHODES, {
        skip: pageParam * 10,
        take: 10,
        ...options,
      });
    },
    {
      getNextPageParam: (lastPage: any, allPages: []) => {
        if (
          lastPage?.paymentStripe_getPaymentMethods?.result?.pageInfo
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
            ?.map(a => a?.paymentStripe_getPaymentMethods?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.paymentStripe_getPaymentMethods?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export function usePurcheseCard() {
  return useMutation((args: any) => {
    return graphqlFetcher(SET_PURCHESE_CARD, args);
  });
}

export function useUpdateShoppingCardStatus() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_SHOPPING_CARD, args);
  });
}

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

const SET_PURCHESE_CARD = gql`
  mutation ecommerce_purchaseCard($shoppingCardId: Int!) {
    ecommerce_purchaseCard(shoppingCardId: $shoppingCardId) {
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
const GET_PAYMENT_METHODES = gql`
  query paymentStripe_getPaymentMethods(
    $skip: Int
    $take: Int
    $where: StripePaymentMethodFilterInput
    $order: [StripePaymentMethodSortInput!]
  ) {
    paymentStripe_getPaymentMethods {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          apsyPaymentMethodId
          cardName
          expMonth
          expYear
          id
          saveForFuturePurchases
          zipCode
          brand
          last4
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        totalCount
      }

      status
    }
  }
`;

const DELETE_PAYMENT_METHOD = gql`
  mutation paymentStripe_deletePaymentMethod($paymentMethodId: String) {
    paymentStripe_deletePaymentMethod(paymentMethodId: $paymentMethodId) {
      code
      value
      description
    }
  }
`;

const UPDATE_PAYMENT_METHOD = gql`
  mutation paymentStripe_updatePaymentMethod($input: PaymentMethodInput) {
    paymentStripe_updatePaymentMethod(input: $input) {
      code
      description
      value
    }
  }
`;

const CREATE_PAYMENT_METHOD = gql`
  mutation paymentStripe_createPaymentMethod($input: PaymentMethodInput) {
    paymentStripe_createPaymentMethod(input: $input) {
      code
      value
      description
    }
  }
`;

const PAYMENT_SETCARD = gql`
  mutation paymentStripe_setCard($input: UserCardInput) {
    paymentStripe_setCard(input: $input) {
      result {
        stripeCardId
        userPaymentAccountId
        cardNumber
      }
      status
    }
  }
`;

const GET_PUBLISHED_KEY = gql`
  query {
    paymentStripe_getPublishableKey
  }
`;

const GET_PUBLISHED_APSY_KEY = gql`
  query {
    paymentStripe_getApsyPublishableKey
  }
`;
