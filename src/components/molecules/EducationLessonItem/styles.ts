import {StyleSheet} from 'react-native';
import {getColor} from '~/components/elemental';

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    color: getColor({color: 'gray.800'}),
    flex: 1,
  },
  text: {fontSize: 12},
});

export default styles;
