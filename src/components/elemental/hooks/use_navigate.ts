import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {model} from '~/data/model';

const hasProfile = model.screens.some(screen =>
  screen.metaData.components.some(component => component === 'Profile'),
);

export default function useNavigate() {
  const navigation = useNavigation<any>();
  const allRoutes = useNavigationState(({routeNames}) => routeNames);
  const route = useRoute();

  const screenIndex = model.screens.findIndex(
    screen => screen.name === route.name,
  );

  return {navigateWithName, next, navigation, navigateWithId};

  function next(order?: string[]) {
    if (Array.isArray(order)) {
      let targetScreen;

      for (let name of order) {
        targetScreen = model.screens.find(({metaData}) =>
          metaData.components.some(componentName =>
            isSame(name, componentName),
          ),
        );

        if (targetScreen) return navigateWithName(targetScreen?.name);
      }
    }

    navigateWithName(model.screens[screenIndex + 1]?.name);
  }

  function navigateWithId(id: number, params?: any) {
    const targetScreen = model.screens.find(screen => screen._id === id);
    if (!targetScreen) {
      return;
    }

    const path = allRoutes.find(routeName => targetScreen?.name === routeName);
    if (!path) {
      return;
    }

    navigation.navigate({name: path, params});
  }

  function navigateWithName(
    name: string,
    params?: any,
    {push = false}: {push?: boolean} = {},
  ) {
    const targetScreen = model.screens.find(({metaData}) =>
      metaData.components.some(componentName => isSame(name, componentName)),
    );

    if (
      !hasProfile &&
      typeof name === 'string' &&
      name.toLowerCase() === 'profile'
    ) {
      name = 'settings';
    }

    const arr = [];

    allRoutes.forEach(routeName => {
      if (targetScreen?.name === routeName) {
        arr.push(routeName);
      } else if (
        new RegExp(name.replace(/\s/g, '').replace(/\W/g, ''), 'i').test(
          routeName,
        )
      ) {
        arr.push(routeName);
      }
    });

    arr.sort((a, b) => a.length - b.length);

    const path = arr[0];

    if (path) {
      if (push) {
        navigation.push(path, params);
      } else {
        navigation.navigate({name: path, params});
      }
    }
  }
}

export function isSame(arg1, arg2) {
  return new RegExp(arg1?.replace(/\s/g, '')?.replace(/\W/g, ''), 'i').test(
    arg2?.replace(/\s/g, '')?.replace(/\W/g, ''),
  );
}
