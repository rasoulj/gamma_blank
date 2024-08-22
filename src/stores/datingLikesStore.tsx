import {create} from 'zustand';
import {
  DefaultFilter,
  FilterType,
} from '~/components/organisms/DatingHome/hooks/DatingHome.hook';

type LikesStoreType = {
  filter?: FilterType;
  applyedFilter?: FilterType;
  setFilter: (filters: FilterType) => void;
  clear: () => void;
  applyFilter: (filters: FilterType) => void;
};
const datingLikesStore = create<LikesStoreType>(set => ({
  filter: DefaultFilter,
  applyedFilter: DefaultFilter,
  setFilter: (filter: FilterType) => set(() => ({filter})),
  clear: () =>
    set(() => ({filter: DefaultFilter, applyedFilter: DefaultFilter})),
  applyFilter: (filter: FilterType) => set(() => ({applyedFilter: filter})),
}));

export default datingLikesStore;
