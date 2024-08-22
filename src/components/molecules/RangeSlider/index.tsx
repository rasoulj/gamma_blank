import React, {useEffect, useState} from 'react';
import MultiSlider, {
  MultiSliderProps,
} from '@ptomasroos/react-native-multi-slider';
import {useController, useForm} from 'react-hook-form';
import {View, Typography, getColor, print} from '~/components/elemental';
export default function RangeSlider({
  min = 0,
  max = 100,
  range = [20, 60],
  enableLabel = false,
  name = 'Range',
  ...props
}: MultiSliderProps & {range: Array<number>; name: string}) {
  const [width, setWidth] = useState(200);
  const {style = {}} = props;
  const {field} = useController({name});
  const onValueChange = values => {
    field.onChange(values);
  };

  return (
    <View style={style} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      <MultiSlider
        values={range}
        onValuesChange={onValueChange}
        min={min}
        max={max}
        isMarkersSeparated
        enabledTwo
        enabledOne
        enableLabel={enableLabel}
        sliderLength={width}
        {...props}
      />
    </View>
  );
}
