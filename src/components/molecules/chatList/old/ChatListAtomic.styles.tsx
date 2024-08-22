import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  ButtonText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyledButton: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default styles;
