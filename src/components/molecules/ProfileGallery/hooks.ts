import {gql} from 'graphql-request';
import {useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetCurrentUser = () => {
  return useQuery(['getCurrentUser'], async () => {
    return graphqlFetcher(GET_USER);
  });
};

export const GET_USER = gql`
  query user_getCurrentUser {
    user_getCurrentUser {
      result {
        userGallery {
          photoUrl
          id
          isDeleted
        }
      }
      status
    }
  }
`;

export const USER_ADD_PHOTO = gql`
  mutation user_addPhoto($photo: String) {
    user_addPhoto(photo: $photo) {
      status
    }
  }
`;

export const USER_REMOVE_PHOTO = gql`
  mutation user_removePhoto($photoGalleryId: Int!) {
    user_removePhoto(photoGalleryId: $photoGalleryId) {
      code
      value
    }
  }
`;
