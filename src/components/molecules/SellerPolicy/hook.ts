import {gql} from 'graphql-request';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export function useOnBoardUserInStripe() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_STRIPE, args);
  });
}

const UPDATE_STRIPE = gql`
  mutation paymentStripe_onboardUserInStripeConnect(
    $refreshUrl: String
    $returnUrl: String
  ) {
    paymentStripe_onboardUserInStripeConnect(
      refreshUrl: $refreshUrl
      returnUrl: $returnUrl
    ) {
      result {
        url
        completed
        errors {
          reason
        }
      }
      status
    }
  }
`;
