import {gql} from 'graphql-request';
import {useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export function useUpdateUser() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_USER, args);
  });
}

export const UPDATE_USER = gql`
  mutation user_updateUser($userId: Int!, $userInput: UserInput) {
    user_updateUser(userId: $userId, userInput: $userInput) {
      result {
        fullName
        age
        id
        userType
        userRole
        lastSeen
        externalId
        email
        photoUrl
        favoriteCategories
        fullName
        phoneNumber
        about
        location
        age
        dateOfBirth
        streetAddress
        unitNumber
        city
        state
        introSeen
        zipCode
        isDeleted
        createdDate
        lastModifiedDate
        gender
      }
      status
    }
  }
`;

export const useGetProductCategories = key => {
  return useQuery([key], async () => {
    return graphqlFetcher(GET_PRODUCT_CATEGORY, key);
  });
};

const GET_PRODUCT_CATEGORY = gql`
  query getStaticConfig($key: String!) {
    staticConfig_getStaticConfig(key: $key) {
      status
      result {
        value
      }
    }
  }
`;
