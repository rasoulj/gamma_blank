import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export interface IncludeItemProps {
  title: string;
}

const IncludeItem = ({ title }: IncludeItemProps) => {  
  return (
    <View style={styles.IncludeContainer}>
      <Icon name="check-decagram" size={20} color="#1DE9B6" />      
      <Text style={styles.IncludeLabel}>{title}</Text>
    </View>
  );
};

export default IncludeItem;
