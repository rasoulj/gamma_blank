import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {model} from '~/data/model';

type ShoppingBashetListItem = {
  productId: number;
  alternateId: number;
  quantity: number;
  product: any;
};
type ShoppingBasketStoreType = {
  shoppingBasketList: Array<ShoppingBashetListItem>;
  setShoppingBasketList: (
    shoppingBasketList: Array<ShoppingBashetListItem>,
  ) => void;
};

type ShoppingBasketPersist = (
  config: StateCreator<ShoppingBasketStoreType>,
  options: PersistOptions<ShoppingBasketStoreType>,
) => StateCreator<ShoppingBasketStoreType>;

const useShoppingBasketStore = create<ShoppingBasketStoreType>(
  (persist as ShoppingBasketPersist | any)(
    set => ({
      shoppingBasketList: [],
      setShoppingBasketList: (
        shoppingBasketList: Array<ShoppingBashetListItem>,
      ) => set({shoppingBasketList}),
    }),
    {
      name: `shopping-basket-storage-${model?.name}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useShoppingBasketStore;
