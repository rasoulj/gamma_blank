import {StyleSheet} from 'react-native';
import {getColor} from '~/components/elemental';

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 5,
    width: 136,
    marginHorizontal: 4,
    marginVertical: 1,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'center',
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 100,
    marginTop: 6,
    alignSelf: 'center',
  },
});

export default styles;
