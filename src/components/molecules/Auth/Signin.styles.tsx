import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
export const {width: deviceWidth, height: deviceHeight} =
  Dimensions.get('window');

const styles = StyleSheet.create({
  socialIcons: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    margin: 20,
  },
  Container: {
    padding: 5,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  HeaderText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  DescriptionText: {
    fontSize: 14,
  },
  FormWrapper: {
    marginVertical: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  ExtraWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  CreateAccountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateAccount: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: -5,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {fontSize: 25, fontWeight: '700', lineHeight: 30},
  screenDesc: {marginTop: 10, fontSize: 16, fontWeight: '400'},
  rowLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnHeight: {height: 49},
  guestMode: {marginTop: 16, fontWeight: '500', fontSize: 14},
  socialView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientIcon: {transform: [{rotate: '180deg'}], margin: 0},
  signup: {fontSize: 14, fontWeight: '500'},
});

export default styles;
