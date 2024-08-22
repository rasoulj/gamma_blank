import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const NFacebookIcon = (props: SvgProps) => {
  const color = props.color || getColor({color: 'primary.400'}) || '#32e8b7';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11.516}
      height={20.2}
      {...props}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        d="m10.11 11.269.519-3.384H7.382v-2.2A1.692 1.692 0 0 1 9.29 3.86h1.476V.979A18 18 0 0 0 8.141.75c-2.67 0-4.418 1.621-4.418 4.555v2.58H.75v3.384h2.973v8.181h3.659v-8.181Z"
        data-name="Icon awesome-facebook-f"
      />
    </Svg>
  );
};
export default NFacebookIcon;
