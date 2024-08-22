import React from 'react';
import ActionSheet from '../ActionSheet';
import {Drawer} from 'native-base';
import {
  RelativeLayout,
  useDrawer,
  Screen,
  Button,
} from '~/components/elemental';
import {capitalize} from '~/utils/capitalize';
import {ViewStyle} from 'react-native';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';

type DrawerKitProps = {
  position: 'left' | 'right' | 'bottom';
  children: any;
  name?: string;
  swipeEnabled?: boolean;
  style: ViewStyle;
};

export default function DrawerKit({
  position,
  children,
  swipeEnabled,
  ...props
}: DrawerKitProps) {
  const id = props['data-id'];
  const {isOpen, setIsOpen} = useDrawer(capitalize(id));
  const backgroundColor = getColor({
    color: theme?.components?.Select?.colorScheme?.default,
  });
  if (position === 'bottom') {
    return (
      <ActionSheet isOpen={isOpen} onClose={() => setIsOpen(false)} {...props}>
        <ActionSheet.Content
          _dragIndicator={{
            width: 70,
            height: 1.5,
            borderRadius: 50,
            backgroundColor: '#e3e3e3',
          }}
          style={{
            backgroundColor,
          }}>
          {children}
        </ActionSheet.Content>
      </ActionSheet>
    );
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement={position}
      onClose={() => setIsOpen(false)}
      {...props}>
      <Screen>
        <RelativeLayout
          style={[props.style, {position: 'relative', height: '100%'}]}>
          {children}
        </RelativeLayout>
      </Screen>
    </Drawer>
  );
}
