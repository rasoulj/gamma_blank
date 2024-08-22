import {gql} from 'graphql-request';
import {useMutation, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetCurrentUser = () => {
  return useQuery(['getCurrentUser'], async () => {
    return graphqlFetcher(GET_USER);
  });
};

export function useUpdateProfile() {
  return useMutation((args: any) => {
    return graphqlFetcher(UPDATE_PROFILE, args);
  });
}

export const GET_USER = gql`
  query user_getCurrentUser {
    user_getCurrentUser {
      result {
        fullName
        phoneNumber
        about
        email
        id
        photoUrl
        age
        location
        userType
        socialLinks
        userRole
        gender
        displayGender
        username
        displayContactInfo
      }
      status
    }
  }
`;

export const UPDATE_PROFILE = gql`
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
        username
        phoneNumber
        displayGender
        displayContactInfo
        about
        location
        profession
        yearsOfExperience
        socialLinks
        age
        dateOfBirth
        streetAddress
        unitNumber
        city
        state
        zipCode
        id
        isDeleted
        createdDate
        lastModifiedDate
        gender
      }
      status
    }
  }
`;
