import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  HeaderText: {
    fontWeight: 'bold',
    color: '#333333',
  },
  DescriptionText: {
    color: '#333333',
  },
  FormWrapper: {
    marginVertical: 50,
  },
  content: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 60,
  },
  title: {fontSize: 25, fontWeight: '700'},
});

export default styles;
