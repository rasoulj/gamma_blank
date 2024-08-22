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
        fullName
        gender
        favoriteCategories
        lastSeen
        userType
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
