import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const MetricIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      data-name="status-up"
      fill="none"
      stroke="#292d32"
      strokeLinecap="round"
      strokeWidth={1.5}>
      <Path d="M6.88 18.15v-2.07" />
      <Path
        data-name="Vector"
        d="M12 18.15v-4.14M17.12 18.15v-6.22M17.12 5.85l-.46.54a18.882 18.882 0 0 1-9.78 6.04"
      />
      <Path
        data-name="Vector"
        d="M14.19 5.85h2.93v2.92"
        strokeLinejoin="round"
      />
      <Path
        data-name="Vector"
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default MetricIcon;
