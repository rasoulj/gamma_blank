import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getColor} from '../../elemental/helper';

const CustomSwitch = ({
  switchValue,
  onValueChange,
}: {
  switchValue?: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  const [value, setValue] = useState(false);
  const onPressHandler = () => {
    setValue(!value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onValueChange(!value);
  };

  useEffect(() => {
    setValue(switchValue);
  }, []);

  return (
    <View
      style={{
        width: 40,
        height: 14,
        backgroundColor: value ? getColor({color: 'primary.100'}) : '#999',
        borderRadius: 100,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => onPressHandler()}
        style={{
          width: 20,
          height: 20,
          backgroundColor: value ? getColor({color: 'primary.400'}) : '#666',
          borderRadius: 100,
          alignSelf: value ? 'flex-end' : 'flex-start',
          shadowColor: '#444',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.9,
          shadowRadius: 3,
        }}
      />
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});
