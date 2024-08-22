import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/components/elemental';
export default function FilterIcon({color, ...props}: any) {
  const c = getColor({
    color: props.color || theme?.Icon?.color?.default || 'gray.400',
  });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.002}
      height={18.002}
      viewBox="0 0 16.002 18.002"
      {...props}>
      <Path
        data-name="Path 29942"
        d="M14 12v7.88a.959.959 0 01-.29.83 1 1 0 01-1.41 0l-2.01-2.01a.989.989 0 01-.29-.83V12h-.03L4.21 4.62a1 1 0 01.17-1.4A1.042 1.042 0 015 3h14a1.042 1.042 0 01.62.22 1 1 0 01.17 1.4L14.03 12z"
        transform="translate(-3.999 -3)"
        fill={c}
      />
    </Svg>
  );
}
