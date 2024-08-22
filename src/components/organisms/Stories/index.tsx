import {useRoute} from '@react-navigation/native';
import React from 'react';
import OtherStories from './OtherStories';
import MyStories from './MyStories';
import useAuthStore from '~/stores/authStore';

const Stories = () => {
  const {params} = useRoute();
  const user = useAuthStore(state => state.user);
  const ownerId = params?.userId;
  const isMine = ownerId
    ? ownerId === user?.id
    : params?.isMine
    ? params?.isMine
    : false;

  return <>{isMine ? <MyStories /> : <OtherStories />}</>;
};

export default Stories;
