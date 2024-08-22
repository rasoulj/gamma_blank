import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserReply = create(
  persist(
    set => ({
      userReply: null,
      setUserReply: data => set({userReply: data}),
    }),
    {
      name: 'globalStorage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
