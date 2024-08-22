import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Linking} from 'react-native';

const PERSISTANCE_KEY = 'NAVIGATION_STATE';

export default function useNavigationPersist() {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();

  const onStateChange = state => {
    AsyncStorage.setItem(PERSISTANCE_KEY, JSON.stringify(state));
  };

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTANCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  return {
    onStateChange,
    initialState,
    isReady,
  };
}
