import {isDark} from '~/components/elemental';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';
import auth from '@react-native-firebase/auth';
import {print} from '~/utils/methods';
import {model} from '~/data/model';

type MatchAcceptedStoreType = {
  matchingFilter: {
    gender: 'Male' | 'Female';
    age: {
      start: 0;
      end: 50;
    };
    distance: 0;
  };
  matchAccepted: {
    matchingAccepted: {
      id: number;
      matchStatus: 'ACCEPTED' | 'WAITING';
      requestedByUserId: number;
      requestedByUser: {
        photoUrl: string;
        fullName: string;
        id: number;
        email: string;
      };
      targetUser: {
        photoUrl: string;
        fullName: string;
        id: number;
        email: string;
      };
    };
  };
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  setMatchAccepted: (data: MatchAcceptedStoreType['matchAccepted']) => void;
  setMatchFilter: (data: MatchAcceptedStoreType['matchingFilter']) => void;
};

type MatchAcceptedPersist = (
  config: StateCreator<MatchAcceptedStoreType>,
  options: PersistOptions<MatchAcceptedStoreType>,
) => StateCreator<MatchAcceptedStoreType>;

const useMatchAcceptedStore = create<MatchAcceptedStoreType>(
  (persist as MatchAcceptedPersist | any)(
    set => ({
      matchAccepted: {},
      matchingFilter: {
        gender: 'MALE',
        age: {
          start: 0,
          end: 50,
        },
        distance: 0,
      },
      isOpen: false,
      setIsOpen: v => set({isOpen: v}),
      setMatchAccepted: data => set({matchAccepted: data}),
      setMatchFilter: (matchingFilter: any) => {
        set({matchingFilter});
      },
    }),
    {
      name: `match-accepted-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useMatchAcceptedStore;
