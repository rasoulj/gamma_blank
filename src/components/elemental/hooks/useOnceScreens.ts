import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigate} from '~/components/elemental';
export default function useOnceScreens({
  navigation,
  route,
  redirectTo,
  params = {},
}) {
  const {navigateWithName} = useNavigate();
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const storedScreens = await AsyncStorage.getItem('usedScreens');
        const screens = JSON.parse(storedScreens) || [];
        console.log(screens, screens?.includes(route.name));
        if (screens && screens?.includes(route.name)) {
          navigateWithName(redirectTo, params);
        } else {
          await AsyncStorage.setItem(
            'usedScreens',
            JSON.stringify([...screens, route.name]),
          );
        }
      })();
    }, [route.name]),
  );
}
