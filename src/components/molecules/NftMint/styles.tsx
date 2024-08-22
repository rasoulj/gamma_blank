import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  ImageUploadWrapper: {
    maxWidth: 200,
    borderRadius: 10,
    marginTop: 30,
  },
  Title: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 15,
  },
  SubTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
    marginBottom: 15,
  },
  Description: {
    fontSize: 16,
    fontWeight: '300',
    color: '#8f8f8f',
  },
  InputTitle: {
    fontSize: 17,
    color: '#333333',
    marginBottom: 10,
  },
  InputDescription: {
    fontSize: 10,
    fontWeight: '300',
    color: '#121212',
    marginBottom: 10,
  },
  FormItemWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default styles;