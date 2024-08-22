import {create} from 'zustand';

type AppointmentStoreType = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  visibleNotNow: boolean;
  relatedEntity: any;
  relatedUser?: any;
  setRelatedEntity?: (value) => void;
  setRelatedUser?: (value) => void;
  setVisibleNotNow?: (value) => void;
};

const useAppointmentStore = create<AppointmentStoreType>(set => ({
  isOpen: false,
  setIsOpen: v => set({isOpen: v}),
  relatedEntity: undefined,
  setRelatedEntity: v => set({relatedEntity: v}),
  relatedUser: undefined,
  setRelatedUser: v => set({relatedUser: v}),
  visibleNotNow: false,
  setVisibleNotNow(value) {
    set({visibleNotNow: value});
  },
}));

export default useAppointmentStore;
