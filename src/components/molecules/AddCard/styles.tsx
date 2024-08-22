import React from 'react';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import theme from '~/theme';
import {getColor} from '../../elemental/helper';

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderRadius: 15,

    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  ButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  PaymentPriceWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  FormItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  FormItemWrapperRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: '50%',
  },
  Header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: scale(20),
    marginBottom: scale(25),
    lineHeight: 25,
  },
  Title: {
    fontSize: 17,
    color: '#000000',
    marginVertical: 5,
  },
  StyledInput: {
    border: 1,
    borderColor: '#000',
    borderRadius: 100,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    width: '100%',
    fontSize: 17,
  },
  Price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  StyledButton: {
    borderRadius: 100,
    maxWidth: 320,
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  Gradient: {
    height: 2,
    flexGrow: 1,
  },
  TextInGradient: {
    color: '#828282',
    marginHorizontal: 10,
    fontSize: 14,
  },
  SuccessContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(100),
    paddingBottom: 30,
    // marginHorizontal: 20,
  },
  SuccessText: {
    fontWeight: '600',
    marginTop: 45,
    fontSize: 22,
  },
  SuccessSubText: {
    fontSize: 14,
    marginTop: 10,
  },
  payment_btn: {
    height: 49,
    marginHorizontal: 20,
    marginTop: scale(290),
  },
  FailedText: {
    fontWeight: '600',
    marginTop: 45,
    fontSize: 22,
  },
  statusFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    marginTop: 4,
    marginBottom: 4,
    color: theme?.colors?.text[400],
  },
  textResult: {
    marginTop: 4,
    marginBottom: 4,
    color: theme?.colors?.text[400],
    fontWeight: 'bold',
  },
  eyeIcon: {
    marginRight: 8,
  },
});

export default styles;
