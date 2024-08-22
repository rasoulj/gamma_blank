import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {model} from '~/data/model';

type DatingHomeStoreType = {
  intro: number;
  setIntro: (intro: number) => void;
};

type DatingHomePersist = (
  config: StateCreator<DatingHomeStoreType>,
  options: PersistOptions<DatingHomeStoreType>,
) => StateCreator<DatingHomeStoreType>;

const datingHomeStore = create<DatingHomeStoreType>(
  (persist as DatingHomePersist | any)(
    set => ({
      intro: 2,
      setIntro: (intro: number) => set({intro}),
    }),
    {
      name: `datingHome${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default datingHomeStore;
