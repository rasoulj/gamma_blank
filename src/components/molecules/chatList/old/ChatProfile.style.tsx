import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 71,
    width: '100%',
    justifyContent: 'space-between',
  },
  Wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvatarWrapper: {
    marginRight: 16,
    width: 54,
    height: 54,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    borderRadius: 100,
  },
  AvatarImage: {
    width: 54,
    height: 54,
  },
  NameWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  Username: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  LastActiveTime: {
    fontSize: 14,
    fontWeight: 'normal',
    alignSelf: 'flex-end',
  },
  Description: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  Active: {
    marginRight: 4,
    width: 4,
    height: 4,
    borderRadius: 100,
    verticalAlign: 'middle',
  },
});

export default styles;
