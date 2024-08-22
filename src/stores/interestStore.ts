import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {model} from '~/data/model';

type InterestStoreType = {
  selectedCategorys: Array<string>;
  setSelectedCategorys: (selectedCategorys: Array<string>) => void;
};

type InterestPersist = (
  config: StateCreator<InterestStoreType>,
  options: PersistOptions<InterestStoreType>,
) => StateCreator<InterestStoreType>;

const useIterestStore = create<InterestStoreType>(
  (persist as InterestPersist | any)(
    set => ({
      selectedCategorys: [],
      setSelectedCategorys: (selectedCategorys: Array<string>) =>
        set({selectedCategorys}),
    }),
    {
      name: `iterest-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useIterestStore;
