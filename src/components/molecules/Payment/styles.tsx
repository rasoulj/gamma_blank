import {Platform, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import theme from '~/theme';
import {getColor} from '../../elemental/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  shadowContainer: {
    width: '96%',
    padding: 16,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: '#0002',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    elevation: 5,
    marginTop: 16,
    alignSelf: 'center',
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

  formItemWrapper: {
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

  styledInput: {
    border: 1,
    borderColor: '#000',
    backgroundColor: getColor({color: 'background.500'}),
    width: '100%',
    fontSize: 17,
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

  SuccessContainer: {
    flex: 1,
    marginTop: 16,
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
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
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

  status: {fontSize: 14, fontWeight: '400', marginLeft: 8},

  payBtn: {height: 49, marginTop: 10, bottom: 5},

  row: {flexDirection: 'row'},

  flexGrow: {flexGrow: 1},

  flex: {flexGrow: 1, marginLeft: 16},

  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },

  infoText: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 8,
  },

  thankYouText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 16,
  },

  boldText: {
    fontWeight: '700',
  },

  successContainer: {flex: 1},

  paymentButton: {
    bottom: 10,
    width: '100%',
  },

  cardContainer: {
    justifyContent: 'space-between',
  },

  cardField: {
    height: Platform.OS === 'android' ? 300 : 180,
    width: '100%',
    marginTop: 50,
    alignSelf: 'center',
  },

  cardName: {flexGrow: 3, marginLeft: 16},

  zipCode: {flexGrow: 1, marginLeft: 16},

  flex3: {flexGrow: 3},
});

export default styles;
