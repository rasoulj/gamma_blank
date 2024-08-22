import {create} from 'zustand';
type UploaderStoreType = {
  createPostData?: any;
  createStoryData?: any;
  isProcessing: boolean;
  processStatus?: {text?: any; processValue?: number};
  setCreateFormData?: (createPostData: any) => void;
  setCreateStoryData?: (createStoryData: any) => void;
  setProcessStatus?: (processStatus: {
    text?: any;
    processValue?: number;
  }) => void;
  setIsProcessing?: (value: boolean) => void;
};
const uploaderStore = create<UploaderStoreType>(set => ({
  createPostData: undefined,
  processStatus: undefined,
  createStoryData: undefined,
  isProcessing: false,
  setCreateFormData: (createPostData: any) => set(() => ({createPostData})),
  setCreateStoryData: (createStoryData: any) => set(() => ({createStoryData})),
  setProcessStatus: processStatus => set(() => ({processStatus})),
  setIsProcessing: (value: boolean) => set(() => ({isProcessing: value})),
}));

export default uploaderStore;
