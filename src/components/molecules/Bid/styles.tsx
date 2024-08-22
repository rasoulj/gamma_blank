import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    padding: 25,
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  AvatarWrapper: {
    width: 96,
    height: 96,
    overflow: 'hidden',
    borderRadius: 100,
  },
  Avatar: {
    width: '100%',
    height: '100%',
  },
  CurrentPrice: {
    marginVertical: 30,
    fontSize: 17,
    color: '#333333',
  },
  MinPrice: {
    marginTop: 32,
    fontSize: 12,
    color: '#7f8181',
  },
  Currency: {
    fontSize: 24,
    color: '#2c2f2f',
  },
  BidWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default styles;
