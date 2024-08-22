import {gql} from 'graphql-request';
import {graphqlFetcher, useMutation} from '~/components/elemental';

export function useUpdateUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_USER, args);
  });
}

const UPDATE_USER = gql`
  mutation user_updateUser($userId: Int, $userInput: UserInput) {
    user_updateUser(userId: $userId, userInput: $userInput) {
      result {
        email
        userRole
        userType
        externalId
        city
        state
        zipCode
        gender
        lastSeen
        userType
        id
        isDeleted
        createdDate
        lastModifiedDate
        isPrivateAccount
      }
      status
    }
  }
`;

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
