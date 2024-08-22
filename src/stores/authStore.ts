import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';
import auth from '@react-native-firebase/auth';
import {print} from '~/utils/methods';
import {model} from '~/data/model';

type AuthStoreType = {
  token: any;
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
  isUserLoggedIn: boolean;
  isModalUserLoggedInVisible: boolean;
  unreadNotification: boolean;
  isOnboardingVisited: boolean;
  isIntroVisited: boolean;
  rememberMe: boolean;
  rememberData: {phoneNumber: string; email: string; password: string};
  setIsLoadingLogin: (isLoadingLogin: boolean) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  setIsModalUserLoggedInVisible: (isModalUserLoggedInVisible: boolean) => void;
  setUnreadNotification: (unreadNotification: boolean) => void;
  setToken: (token: any) => void;
  setUser: (user: any) => void;
  logout: () => void;
  setIsOnboardingVisited: (isOnboardingVisited: boolean) => void;
  setIsIntroVisited: (isIntroVisited: boolean) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setRememberData: (rememberData: any) => void;
};

type AuthPersist = (
  config: StateCreator<AuthStoreType>,
  options: PersistOptions<AuthStoreType>,
) => StateCreator<AuthStoreType>;

const useAuthStore = create<AuthStoreType>(
  (persist as AuthPersist | any)(
    set => ({
      token: undefined,
      isUserLoggedIn: false,
      user: null,
      unreadNotification: false,
      isModalUserLoggedInVisible: false,
      isOnboardingVisited: false,
      isIntroVisited: false,
      rememberMe: true,
      rememberData: null,
      setUser: user => set({user}),
      setIsUserLoggedIn: (isUserLoggedIn: boolean) => set({isUserLoggedIn}),
      setIsModalUserLoggedInVisible: (isModalUserLoggedInVisible: boolean) =>
        set({isModalUserLoggedInVisible}),
      setUnreadNotification: (unreadNotification: boolean) =>
        set({unreadNotification}),
      setToken: (token: any) => set({token}),
      setIsOnboardingVisited: (isOnboardingVisited: boolean) =>
        set({isOnboardingVisited}),
      setIsIntroVisited: (isIntroVisited: boolean) => set({isIntroVisited}),
      setRememberMe: (rememberMe: boolean) => set({rememberMe}),
      setRememberData: (rememberData: any) => set({rememberData}),
      logout: async () => {
        try {
          set({token: null, user: null, isUserLoggedIn: false});

          await auth().signOut();
        } catch (e) {
          print(e);
        }
      },
    }),
    {
      name: `auth-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
