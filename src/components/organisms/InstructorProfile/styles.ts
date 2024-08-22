import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {deviceWidth} from '~/utils/methods';

const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 110,
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
    width: 303,
    height: 166,
    borderRadius: 5,
    marginRight: 8,
  },

  padding: {paddingHorizontal: 20},

  btn: {height: 36},

  rotation: {transform: [{rotate: '90deg'}]},

  indicator: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 1,
  },

  tabContent: {
    marginBottom: 8,
    width: deviceWidth - 40,
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 1,
  },

  tabLabel: {
    marginStart: 0,
    fontSize: 14,
    fontWeight: '500',
    width: deviceWidth / 4,
    textAlign: 'center',
  },

  tabContainer: {
    shadowOpacity: 0,
    elevation: 0,
    paddingHorizontal: 20,
  },

  TabStyle: {paddingBottom: 100, paddingHorizontal: 20},

  mr: {marginHorizontal: 4},

  title: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default styles;
