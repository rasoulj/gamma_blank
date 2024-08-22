import {StyleSheet} from 'react-native';
import {getColor} from '~/components/elemental';

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    width: 156,
    marginHorizontal: 4,
    marginVertical: 1,
    padding: 8,
    marginBottom: 10,
  },
  heartButton: {
    position: 'absolute',
    right: '4%',
    top: '2%',
    width: 32,
    height: 32,
    backgroundColor: getColor({color: 'gray.50'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginVertical: 10,
  },
  img: {
    width: 140,
    height: 114,
    borderRadius: 5,
  },
});

export default styles;
