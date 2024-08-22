import create from 'zustand';
import {IState} from '~/components/Wrapper';
import uniqBy from 'lodash/uniqBy';
type State = {
  layouts: IState[];
  height: number;
  setHeight: (height: number) => void;
  setLayouts: (layout: IState) => void;
  setScreenShot: (screenShot: string, routeName: string) => void;
  chatKey: any;
  setChatKey: (chatKey: any) => void;
};

const useStore = create<State>((set, get) => ({
  layouts: [],
  height: 0,
  chatKey: {},
  setChatKey: key => set(state => ({...state, chatKey: key})),
  setHeight: (height: number) =>
    set(state => {
      console.log('height', height);
      return {...state, height};
    }),
  setScreenShot: (screenShot: string, routeName: string) =>
    set((state: any) => {
      const target = state.layouts.find((l: any) => l.name === routeName);

      if (target) {
        const targetIndex = state.layouts.indexOf(target);
        target.screenShot = screenShot;
        state.layouts[targetIndex] = target;
        const {
          metadata: {_id, components},
          ...rest
        } = state.layouts[0];
        const u = uniqBy(components, '_id');
        const layout = {
          ...rest,
          metadata: {
            _id,
            components: u,
          },
        };
        console.log(JSON.stringify(layout, null, 2));
        return {
          ...state,
          layouts: state.layouts,
        };
      }
    }),
  setLayouts: (layout: any) => {
    set(state => {
      const target = state.layouts.find((l: any) => l.name === layout.name);

      if (target) {
        const targetIndex = state.layouts.indexOf(target);
        target.metadata.components = uniqBy(
          [...target.metadata.components, ...layout.metadata.components],
          '_id',
        );
        state.layouts[targetIndex] = target;

        return {
          ...state,
          layouts: state.layouts,
        };
      } else {
        return {
          ...state,
          layouts: [...state.layouts, layout],
        };
      }
    });
  },
}));

export default useStore;
