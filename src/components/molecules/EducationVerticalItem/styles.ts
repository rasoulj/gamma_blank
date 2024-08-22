import {StyleSheet} from 'react-native';
import {getColor} from '~/components/elemental';

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    marginVertical: 8,
    color: getColor({color: 'gray.800'}),
    marginBottom: 8,
    flex: 1,
  },
  heartButton: {
    right: '4%',
    top: '2%',
    width: 30,
    height: 30,
    backgroundColor: getColor({color: 'gray.50'}),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 5,
  },
});

export default styles;
