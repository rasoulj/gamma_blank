import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ChatList from './ChatList';
import DirectMessage from './DirectMessage';
import Contact from './Contact';
import {useRoute} from '@react-navigation/native';

function App() {
  const route = useRoute();

  const {isProfile, item} = route?.params || {};

  const [currentScreen, setCurrentScreen] = useState({
    name: 'ChatList',
    params: {},
  });

  useEffect(() => {
    if (isProfile) {
      setCurrentScreen({
        name: 'DirectMessage',
        params: {item},
      });
    }
  }, [route]);

  const renderScreen = () => {
    switch (currentScreen.name) {
      case 'ChatList':
        return <ChatList navigation={{navigate: setCurrentScreen}} />;

      case 'DirectMessage':
        return (
          <DirectMessage
            navigation={{
              navigate: setCurrentScreen,
              params: currentScreen.params,
              goBack: () => setCurrentScreen({name: 'ChatList', params: {}}),
            }}
          />
        );

      case 'Contact':
        return (
          <Contact
            navigation={{
              navigate: setCurrentScreen,
              goBack: () => setCurrentScreen({name: 'ChatList', params: {}}),
            }}
          />
        );

      default:
        return null;
    }
  };

  return <View style={{flex: 1}}>{renderScreen()}</View>;
}

export default App;
