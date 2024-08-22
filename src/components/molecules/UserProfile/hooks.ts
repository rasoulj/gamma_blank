import {gql} from 'graphql-request';
import {useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetCurrentUser = gql => {
  return useQuery(['getCurrentUser'], async () => {
    return graphqlFetcher(gql || GET_CURRENT_USER);
  });
};

export const GET_CURRENT_USER = gql`
  query user_getCurrentUser {
    user_getCurrentUser {
      result {
        address
        externalId
        email
        photoUrl
        fullName
        phoneNumber
        about
        location
        age
        dateOfBirth
        id
        userType
        userRole
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
