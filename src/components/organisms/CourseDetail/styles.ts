import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {deviceWidth} from '~/utils/methods';

const styles = StyleSheet.create({
  img: {
    width: 41,
    height: 41,
    borderRadius: 100,
  },

  date: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
  },

  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    backgroundColor: getColor({color: 'background.500'}),
  },

  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8,
  },

  certificate: {
    width: '100%',
    height: 167,
    borderRadius: 5,
  },

  certificateButton: {
    position: 'absolute',
    right: '3%',
    top: '6%',
    width: 32,
    height: 32,
    backgroundColor: getColor({color: 'gray.50'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  certificateButton2: {
    position: 'absolute',
    right: '3%',
    top: '17%',
    width: 32,
    height: 32,
    backgroundColor: getColor({color: 'gray.50'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {fontSize: 14, fontWeight: '400', lineHeight: 19, marginBottom: 8},

  TabStyle: {paddingBottom: 100, paddingHorizontal: 20},

  btn: {height: 36},

  button: {
    alignSelf: 'center',
    bottom: 5,
    width: '90%',
  },

  tabContainer: {
    shadowOpacity: 0,
    elevation: 0,
    paddingHorizontal: 20,
  },

  tabLabel: {
    marginStart: 0,
    fontSize: 14,
    fontWeight: '500',
    width: deviceWidth / 4,
    textAlign: 'center',
  },

  tabContent: {
    marginBottom: 8,
    width: deviceWidth - 40,
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 1,
  },

  indicator: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 1,
  },

  margin: {marginHorizontal: 4},

  rotate: {transform: [{rotate: '90deg'}]},

  mr: {marginRight: 8},
});

export default styles;
