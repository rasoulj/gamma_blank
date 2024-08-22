import {Dimensions, StyleSheet} from 'react-native';
export const {width: deviceWidth, height: deviceHeight} =
  Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    padding: 5,
  },
  ContainerText:{fontSize: 25, fontWeight: '700', lineHeight: 30},
  containerDescription:{marginTop: 10, fontSize: 16, fontWeight: '400'},
  iAgreeText:{fontSize: 14, fontWeight: '500', marginLeft: 5},
  flex:{flex: 1},
  orContinue:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orContinueText:{marginHorizontal: 10},
  gradiantIcon:{transform: [{rotate: '180deg'}], margin: 0},
  loginText:{fontSize: 14, fontWeight: '500', marginLeft: -5},
  socialContainer:{
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    margin: 20,
  },
  HeaderText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  DescriptionText: {
    fontSize: 14,
    marginTop: 5,
  },
  AgreeText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 5,
  },
  FormWrapper: {
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  ExtraWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  CreateAccountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateAccount: {
    color: '#000',
    fontSize: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
