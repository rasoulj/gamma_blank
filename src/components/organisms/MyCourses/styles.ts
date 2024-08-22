import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {deviceWidth} from '~/utils/methods';

const styles = StyleSheet.create({
  tabContainer: {
    shadowOpacity: 0,
    elevation: 0,
    width: deviceWidth - 40,
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

  startBtn: {
    height: 36,
    marginVertical: 24,
  },

  btnText: {
    lineHeight: 16,
  },

  title: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
    textAlign: 'center',
  },

  tabStyle: {paddingBottom: 100, paddingRight: 40},
});

export default styles;
