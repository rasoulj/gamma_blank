import {create} from 'zustand';
import {removeEmpty} from '~/utils/helper';
interface IState {
  toggleFilter: boolean;
  setToggleFilter: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Object;
  setFilters: (obj: IState['filters']) => void;
  categories: Array<{id: number; name: string}>;
  setCategories: (categories: any) => void;
  selectedCategoryId: number;
  setSelectedCategoryId: (id) => void;
  entity: string;
  setEntity: (entity: string) => void;
  keys: Array<any>;
  setKeys: (keys: any) => void;
  city_state: Array<Object>;
  setCityState: (data: any) => void;
}

const useStates = create<IState, []>((set, get) => {
  return {
    toggleFilter: false,
    setToggleFilter: value => {
      set({toggleFilter: value});
    },
    searchQuery: '',
    setSearchQuery: query => {
      set({searchQuery: query});
    },
    filters: {},
    setFilters: obj => set({filters: removeEmpty({...obj})}),
    categories: [],
    setCategories: data =>
      set({categories: [...new Set([...get().categories, ...data])]}),
    setSelectedCategoryId: id => set({selectedCategoryId: id}),
    selectedCategoryId: 0,
    entity: 'User',
    setEntity: ent => set({entity: ent}),
    keys: [],
    setKeys: keys => set({keys}),
    city_state: [],
    setCityState: data => set({city_state: data}),
  };
});

const useTrackedStates = useStates;

export default useTrackedStates;
