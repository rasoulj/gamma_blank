import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image, Layer, Typography, getColor} from '~/components/elemental';

const PromotionListItem = ({item}) => {
  return (
    <Image
      source={{
        uri: item?.photoUrl,
      }}
      style={{
        width: '100%',
        height: 190,
        marginTop: 16,
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      }}>
      <Layer
        style={{
          width: '100%',
          backgroundColor: getColor({color: 'gray.800'}),
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          opacity: 0.8,
        }}>
        <Typography color={'gray.50'} style={{fontSize: 14, fontWeight: '500'}}>
          {item?.title}
        </Typography>
        <Typography color={'gray.50'} style={{fontSize: 16, fontWeight: '500'}}>
          <Typography
            color={'gray.50'}
            style={{fontSize: 16, fontWeight: '700'}}>
            {item?.discount}%{' '}
          </Typography>
          {item?.title}
        </Typography>
      </Layer>
    </Image>
  );
};

export default PromotionListItem;

const styles = StyleSheet.create({});
