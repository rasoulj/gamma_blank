import {useRoute} from '@react-navigation/native';
import React from 'react';
import LivePublisher from './LivePublisher';
import LiveUser from './LiveUser';

const Live = () => {
  const params = useRoute().params;
  let liveType = params?.type ?? 'viewer';

  if (liveType === 'publisher') return <LivePublisher />;
  return <LiveUser />;
};

export default Live;
