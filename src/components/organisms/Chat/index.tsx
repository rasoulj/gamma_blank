import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Chat from './Chat';
import ChatList from './ChatList';
import Contact from './Contact';
import {useRoute} from '@react-navigation/native';
import useHeader from '~/components/elemental/hooks/use_header';

const Messages = () => {
  const route: any = useRoute();
  const [routeName, setRouteName] = useState('ChatList' || 'Chat' || 'Contact');

  useEffect(() => {
    if (route?.params?.isProfile) {
      setRouteName('Chat');
    } else if (route?.params?.route === 'contact') {
      setRouteName('Contact');
    } else {
      setRouteName('ChatList');
    }
  }, [route]);
  switch (routeName) {
    case 'Chat':
      return <Chat item={route?.params?.item} />;
    case 'Contact':
      return <Contact item={route?.params?.item} />;
    default:
      return <ChatList item={route?.params?.item} />;
  }
};

export default Messages;

const styles = StyleSheet.create({});
