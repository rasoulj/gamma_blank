import {isDark} from '~/utils/methods';
import RangeSlider from '../RangeSlider';
import {Center, Typography, getColor} from '~/components/elemental';
import {MultiSliderProps} from '@ptomasroos/react-native-multi-slider';

export default function Ranger({
  range = [165, 575],
  min = 0,
  max = 1000,
  name = 'Price',
  ...props
}: MultiSliderProps & {range: Array<number>; name: string}) {
  return (
    <RangeSlider
      range={range}
      min={min}
      max={max}
      name={name}
      unselectedStyle={{
        backgroundColor: isDark('background')
          ? getColor({color: 'gray.300'})
          : getColor({color: 'gray.300'}),
        height: 3,
      }}
      trackStyle={{
        width: 100,
      }}
      selectedStyle={{
        backgroundColor: getColor({color: 'primary.500'}),
        height: 3,
      }}
      customMarkerLeft={e => {
        return (
          <Center
            style={{
              width: 32,
              height: 32,
              backgroundColor: getColor({color: 'primary.500'}),
              borderRadius: 4,
            }}>
            <Typography
              color={
                isDark('primary')
                  ? getColor({color: 'gray.100'})
                  : getColor({color: 'gray.800'})
              }
              style={{
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              {e?.currentValue}
            </Typography>
          </Center>
        );
      }}
      customMarkerRight={e => {
        return (
          <Center
            style={{
              width: 32,
              height: 32,
              backgroundColor: getColor({color: 'primary.500'}),
              borderRadius: 4,
            }}>
            <Typography
              color={
                isDark('primary')
                  ? getColor({color: 'gray.100'})
                  : getColor({color: 'gray.800'})
              }
              style={{
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              {e.currentValue}
            </Typography>
          </Center>
        );
      }}
      {...props}
    />
  );
}
