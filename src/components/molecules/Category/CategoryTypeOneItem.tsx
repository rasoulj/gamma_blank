import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Typography from '../../atoms/Typography';
import Image from '../../atoms/Image';
import UndrawImg from './undraw_image.svg';
import {getColor} from '../../elemental/helper';
import Layer from '../../atoms/Layer';

const CategoryTypeOneItem = ({item}: {item: any}) => {
  return (
    <Layer
      style={{
        width: '46%',
        backgroundColor: getColor({color: 'background.400'}),
        shadowColor: '#222',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal: 7,
        marginTop:3,
        borderRadius: 15,
        alignItems: 'center',
      }}>
      <Layer
        style={{
          width: '90%',
          height: 136,
          marginHorizontal: 16,
          marginVertical: 16,
          backgroundColor: '#EBEBEB',
          borderRadius: 11,
          borderWidth: 1,
          borderColor: '#0001',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item?.photoUrl ? (
          <Image
            source={{uri: item?.photoUrl}}
            style={{
              width: "100%",
              height: "100%",
              alignSelf: 'center',
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        ) : (
          <UndrawImg width={100} height={100} />
        )}
      </Layer>
      <Typography style={{fontSize: 13, fontWeight: '500', marginBottom: 10, }}>
        {item?.name}
      </Typography>
    </Layer>
  );
};

export default CategoryTypeOneItem;

const styles = StyleSheet.create({});
