import {create} from 'zustand';
type ProfileStoreType = {
  profileConfigs?: {
    gender?: boolean;
    contactOption?: boolean;
    highlight?: boolean;
    about?: boolean;
    shareProfile?: boolean;
    showReels?: boolean;
    showPosts?: boolean;
  };
  setProfileConfigs: (profileConfigs: any) => void;
};
const profileStore = create<ProfileStoreType>(set => ({
  profileConfigs: {
    gender: true,
    contactOption: true,
    highlight: true,
    about: true,
    shareProfile: true,
    showReels: true,
    showPosts: true,
  },
  setProfileConfigs: (profileConfigs: any) => set(() => ({profileConfigs})),
}));

export default profileStore;
