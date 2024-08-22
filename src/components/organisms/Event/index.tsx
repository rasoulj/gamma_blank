import React, {useState} from 'react';
import EventDetails from './EventDetails';
import EventLists from './EventLists';

const EventList = ({onPress}: {onPress?: (id: string) => void}) => {
  return <EventLists {...{onPress}} />;
};

export default EventList;
