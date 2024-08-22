import {useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export type User = {
  fullName: string;
  phoneNumber: string;
  about: string;
  location: string;
  photoUrl: string;
  id: number;
  createdDate: string;
  age: number;
};

export function useGetCurrentUser(id) {
  return useQuery<any, any>(['current_user', id], () =>
    graphqlFetcher(id ? GET_USER : GET_CURRENT_USER, {...(id && {id})}),
  );
}

export const GET_CURRENT_USER = `
  query user_getCurrentUser {
    user_getCurrentUser {
      result {
        isPrivateAccount
        userType
        userRole
        lastSeen
        gender
        externalId
        email
        photoUrl
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
        zipCode
        id
        isDeleted
        createdDate
        lastModifiedDate
        username
        displayGender
        displayContactInfo
      }
      status
    }
  }
`;

export const GET_USER = `
query user_getUsers($id:Int) {
    user_getUsers {
      result(where:{id:{eq:$id}}) {
       items {
          fullName
        phoneNumber
        about
        location
        photoUrl
        id
        createdDate
       gender
       }
      }
      status
    }
  }
`;
