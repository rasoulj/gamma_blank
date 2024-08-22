import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import AddShippingAddress from './AddShippingAddress';
import EditShippingAddress from './EditShippingAddress';
import ListShippingAddress from './ListShippingAddress';

const ShippingAddress = () => {
  const route: any = useRoute();
  const [routeName, setRouteName] = useState('list' || 'add' || 'edit');

  useEffect(() => {
    if (route?.params?.route === 'add') {
      setRouteName('add');
    } else if (route?.params?.route === 'edit') {
      setRouteName('edit');
    } else {
      setRouteName('list');
    }
  }, [route]);
  switch (routeName) {
    case 'add':
      return <AddShippingAddress />;
    case 'edit':
      return <EditShippingAddress item={route?.params?.item} />;
    default:
      return <ListShippingAddress item={route?.params?.item} />;
  }
};

export default ShippingAddress;

const styles = StyleSheet.create({});
