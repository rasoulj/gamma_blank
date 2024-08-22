import { useMutation } from "react-query";
import { graphqlFetcher } from "../../atoms/Provider/AuthProvider";

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