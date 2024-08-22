import {create} from 'zustand';
type HomeStoreType = {
  postQuery?: any;
  storyStatus: number;
  mutePosts?: boolean;
  createPostData?: any;
  setPostQuery: (postQuery: any) => void;
  setStoryStatus: () => void;
  setMutePosts: (value: boolean) => void;
  setCreateFormData?: (createPostData: any) => void;
};
const postStore = create<HomeStoreType>(set => ({
  postQuery: undefined,
  storyStatus: 0,
  mutePosts: false,
  createPostData: undefined,
  setPostQuery: (postQuery: any) => set(() => ({postQuery})),
  setStoryStatus: () => set(() => ({storyStatus: Math.random()})),
  setMutePosts: mutePosts => set(() => ({mutePosts})),
  setCreateFormData: (createPostData: any) => set(() => ({createPostData})),
}));

export default postStore;
