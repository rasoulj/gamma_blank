import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {model} from '~/data/model';

type UploadFilesStoreType = {
  attachedFiles: Array<any>;
  setAttachedFiles: (attachedFiles: Array<any>) => void;
};

type UploadFilesPersist = (
  config: StateCreator<UploadFilesStoreType>,
  options: PersistOptions<UploadFilesStoreType>,
) => StateCreator<UploadFilesStoreType>;

const useUploadFilesStore = create<UploadFilesStoreType>(
  (persist as UploadFilesPersist | any)(
    set => ({
      attachedFiles: [],
      setAttachedFiles: (attachedFiles: Array<any>) => set({attachedFiles}),
    }),
    {
      name: `uploadfile-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUploadFilesStore;
