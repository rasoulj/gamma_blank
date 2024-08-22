import React from 'react';
import {NativeBaseProvider} from 'native-base';
import AuthProvider from './AuthProvider';
import theme from '~/theme';
import DrawerProvider from './DrawerProvider';
import {APIOptions} from '~/types/api';

type ElementalProviderProps = {
  children: any;
  firebase?: any;
  api?: APIOptions;
  appName?: string;
  gqlLogin?: string;
};

export default function ElementalProvider({
  children,
  ...rest
}: ElementalProviderProps) {
  return (
    <AuthProvider {...rest}>
      <NativeBaseProvider theme={theme}>
        <DrawerProvider>{children}</DrawerProvider>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
