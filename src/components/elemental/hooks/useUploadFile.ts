import {useMutation} from 'react-query';
import {uploadFile} from '~/utils/fileUploader';
export const useUploadFile = () => {
  return useMutation(
    async (param: any) => {
      return uploadFile(param);
    },
    {
      onSuccess: successData => {},
      onError: errorData => {},
    },
  );
};
export const useUploadFileWithPercent = () => {
  return useMutation(
    async (input: any) => {
      return uploadFile(input?.param, input?.onUploadProgress);
    },
    {
      onSuccess: successData => {},
      onError: errorData => {},
    },
  );
};
