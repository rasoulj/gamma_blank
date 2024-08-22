import {ReactNode, useEffect} from 'react';
import {useObserver, Observer} from 'rosma';
import {TypographyProps} from '../types/typography.type';
import {useRoute} from '@react-navigation/native';

type UseHeaderProps = {
  icons?: ReactNode;
  logo?: ReactNode;
  component?: ReactNode;
  title?: TypographyProps;
  onBack?: () => void;
  hasTitle?: boolean;
  hasBack?: boolean;
  hidden?: boolean;
};

type HeaderState = Record<string, UseHeaderProps>;

const initialState: HeaderState = {};

export const HeaderObserver = new Observer<HeaderState>(initialState);

export default function useHeader({
  icons,
  logo,
  title,
  hasTitle,
  hasBack,
  onBack,
  component,
  hidden,
}: UseHeaderProps = {}) {
  const route = useRoute();

  useEffect(() => {
    if (!HeaderObserver.state[route.name]) {
      HeaderObserver.state[route.name] = {hasTitle: true, hasBack: true};
    }

    HeaderObserver.state[route.name].onBack = onBack;
  }, [onBack, route.name]);

  const strTitle = typeof title === 'object' && JSON.stringify(title);

  useEffect(() => {
    const state = HeaderObserver.state;

    if (!state[route.name]) state[route.name] = {hasTitle: true, hasBack: true};

    const screenState = state[route.name];
    const title: TypographyProps = strTitle ? JSON.parse(strTitle) : undefined;

    screenState.icons = icons;
    screenState.title = title;
    screenState.logo = logo;
    screenState.component = component;
    screenState.hidden = hidden;

    if (typeof hasTitle === 'boolean') screenState.hasTitle = hasTitle;
    if (typeof hasBack === 'boolean') screenState.hasBack = hasBack;

    HeaderObserver.set({...state});
  }, [icons, strTitle, hasTitle, hasBack, logo, component, route.name, hidden]);

  return useObserver<HeaderState>(HeaderObserver);
}
