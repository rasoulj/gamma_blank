import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 16,
  },
  header: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  text: {
    lineHeight: 17,
    color: getColor({color: 'gray.800'}),
  },
});

export default styles;
