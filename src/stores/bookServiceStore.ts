import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';
import auth from '@react-native-firebase/auth';
import {print} from '~/utils/methods';
import {model} from '~/data/model';

type AuthStoreType = {
  user: {
    id: number;
    fullName: string;
    email: string;
    createdAt: Date;
    photoUrl: string;
    bio: string;
    phoneNumber: string;
    userRole: string;
    userType: 'USER' | 'OWNER' | null;
    updatePassword: boolean;
  } | null;

  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

type AuthPersist = (
  config: StateCreator<AuthStoreType>,
  options: PersistOptions<AuthStoreType>,
) => StateCreator<AuthStoreType>;

const useAuthStore = create<AuthStoreType>(
  (persist as AuthPersist | any)(
    set => ({
      user: null,

      setUser: user => set({user}),
    }),
    {
      name: `auth-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
