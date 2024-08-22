import {gql} from 'graphql-request';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export function usePaymentCreatePaymentMethod() {
  return useMutation((args: any) => {
    return graphqlFetcher(CREATE_PAYMENT_METHOD, args);
  });
}

const CREATE_PAYMENT_METHOD = gql`
  mutation paymentStripe_createPaymentMethod($input: PaymentMethodInput) {
    paymentStripe_createPaymentMethod(input: $input) {
      result {
        userPaymentAccountId
        stripePaymentMethodId
        cardNumber
        cvc
        expMonth
        expYear
        cardName
        zipCode
        saveForFuturePurchases
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
