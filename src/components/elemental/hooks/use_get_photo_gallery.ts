import {useQuery, useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

type UserPhotoGallery = {
  photoUrl: string;
  id: number;
};

export function useGetPhotoGallery(input = {}, options = {}) {
  return useQuery(
    ['user_getPhotos', input],
    () =>
      graphqlFetcher<
        {
          user_getPhotos: {
            result: {items: Array<UserPhotoGallery>};
          };
        },
        {}
      >(GET_PHOTO_GALLERY, input),
    options,
  );
}

export const GET_PHOTO_GALLERY = `
query user_getPhotos($take:Int!,$where:UserPhotoGalleryFilterInput, $order:[UserPhotoGallerySortInput!],$skip:Int){
  user_getPhotos {
    result(take: $take,where:$where,order: $order,skip: $skip) {
      items {
        photoUrl
        id
      }
    }
  }
}
`;

export function useRemoveUserPhotoGallery() {
  return useMutation(args => {
    return graphqlFetcher(USER_REMOVE_PHOTO, args);
  });
}

export const USER_REMOVE_PHOTO = `
mutation user_removePhoto($photoGalleryId:Int!){
  user_removePhoto(photoGalleryId: $photoGalleryId) {
    code
    value
    description
  }
}
`;

export function useUploadUserGallery() {
  return useMutation<unknown, unknown, {photo: string}>(args => {
    return graphqlFetcher(USER_UPLOAD_PHOTOS, args);
  });
}

export const USER_UPLOAD_PHOTOS = `
mutation user_addPhoto($photo:String!){
  user_addPhoto(photo: $photo) {
    status
  }
}
`;
