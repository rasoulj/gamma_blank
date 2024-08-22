import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';
import auth from '@react-native-firebase/auth';
import {print} from '~/utils/methods';
import {model} from '~/data/model';

type LiveStreamStoreType = {
  sessionId: string;
  apiKey: string;
  token: string;
  status: string;
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  haveCall: {
    showModal: boolean;
    creator: any;
    sessionId: String;
    vonageSessionId: String;
  };
  refreshNumber?: number;
  setSessionId: (sessionId: string) => void;
  setApiKey: (apiKey: string) => void;
  setToken: (token: string) => void;
  setStatus: (isMicEnabled: string) => void;
  setIsMicEnabled: (isMicEnabled: boolean) => void;
  setIsCameraEnabled: (isCameraEnabled: boolean) => void;
  setHaveCall: (haveCall: any) => void;
  setRefreshNumber: () => void;
};

type LiveStreamPersist = (
  config: StateCreator<LiveStreamStoreType>,
  options: PersistOptions<LiveStreamStoreType>,
) => StateCreator<LiveStreamStoreType>;

const useLiveStreamStore = create<LiveStreamStoreType>(
  (persist as LiveStreamPersist | any)(
    set => ({
      sessionId: '',
      apiKey: '',
      token: '',
      status: 'wait',
      isMicEnabled: true,
      isCameraEnabled: true,
      refreshNumber: 0,
      haveCall: {
        showModal: false,
        creator: '',
        sessionId: '',
        vonageSessionId: '',
      },
      setSessionId: (sessionId: string) => set({sessionId}),
      setApiKey: (apiKey: string) => set({apiKey}),
      setToken: (token: string) => set({token}),
      setStatus: (status: string) => set({status}),
      setIsMicEnabled: (isMicEnabled: boolean) => set({isMicEnabled}),
      setIsCameraEnabled: (isCameraEnabled: boolean) => set({isCameraEnabled}),
      setHaveCall: haveCall => set({haveCall}),
      setRefreshNumber: () => set({refreshNumber: Math.random()}),
    }),
    {
      name: `LiveStream-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useLiveStreamStore;
