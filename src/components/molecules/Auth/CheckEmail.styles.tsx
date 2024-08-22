import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
  },
  HeaderText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 27,
  },
  DescriptionText: {
    fontSize: 14,
    color: '#333333',
    marginTop: 10,
  },
  FormWrapper: {
    marginVertical: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  ImageStyle: {
    marginLeft: -100,
    marginVertical: 20,
  },
  btnTitle: {position: 'absolute', bottom: 1, alignSelf: 'center'},
  loginBTN: {
    height: 49,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: '15%',
    width: '100%',
  },
});

export default styles;
