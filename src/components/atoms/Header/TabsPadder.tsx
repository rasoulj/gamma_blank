import React from 'react';
import {HStack} from '~/components';

import {Platform, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 74 : StatusBarManager.HEIGHT;

export function TabsPadder() {
  return (
    <HStack
      bg="#fff"
      position="absolute"
      top={-60}
      h={STATUSBAR_HEIGHT}
      w="100%"
      zIndex={9000}
    />
  );
}
