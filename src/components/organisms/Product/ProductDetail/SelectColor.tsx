import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Typography from '../../../atoms/Typography';
import {HStack} from 'native-base';
import {getColor} from '../../../elemental/helper';

const SelectColor = ({data, color, setColor}) => {
  return (
    <View>
      <HStack>
        {data?.map(item => {
          return (
            <TouchableOpacity
              onPress={() => setColor(item)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 100,
                padding: 3,
                borderWidth: color === item ? 2 : 0,
                borderColor: getColor({color: 'primary.400'}),
                marginRight: 8,
              }}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: item.split('- ')[1],
                  borderRadius: 100,
                  borderWidth: 0.5,
                  borderColor: getColor({color: 'background.600'}),
                }}
              />
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
};

export default SelectColor;

const styles = StyleSheet.create({});
