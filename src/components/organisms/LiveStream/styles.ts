import React from 'react';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../elemental';

const styles = StyleSheet.create({
  publisherStyle: {
    width: '100%',
    height: '40%',
  },
  pagerView: {flex: 1},
  button: {
    width: '30%',
    justifyContent: 'center',
    borderRadius: 12,
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  text: {
    fontSize: verticalScale(13),
  },
});

export default styles;
