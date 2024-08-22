import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {model} from '~/data/model';

type PaymentStoreType = {
  payment: Array<any>;
  setPayment: (payment: Array<any>) => void;
};

type PaymentPersist = (
  config: StateCreator<PaymentStoreType>,
  options: PersistOptions<PaymentStoreType>,
) => StateCreator<PaymentStoreType>;

const usePaymentStore = create<PaymentStoreType>(
  (persist as PaymentPersist | any)(
    set => ({
      payment: [],
      setPayment: (payment: Array<any>) => set({payment}),
    }),
    {
      name: `payment-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default usePaymentStore;
