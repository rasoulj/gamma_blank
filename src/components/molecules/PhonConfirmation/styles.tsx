import React from 'react';
import {StyleSheet} from 'react-native';
import {verticalScale} from '../../elemental';

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f1f1f',
  },

  ButtonCountry: {
    position: 'relative',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: verticalScale(40),
  },
  textInput: {
    marginLeft: 10,
    height: '100%',
    width: '85%',
    color: 'black',
  },
  Submit: {
    backgroundColor: '#1DE9B6',
    height: verticalScale(40),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeFieldRoot: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
