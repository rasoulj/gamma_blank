import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const LikeIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G data-name="like" fill="none" stroke="#292d32" strokeWidth={1.5}>
      <Path d="m7.48 18.348 3.1 2.4a3.077 3.077 0 0 0 1.9.6h3.8a3 3 0 0 0 2.8-2.1l2.4-7.3a1.874 1.874 0 0 0-1.9-2.6h-4a1.009 1.009 0 0 1-1-1.2l.5-3.2a1.973 1.973 0 0 0-1.3-2.2 2 2 0 0 0-2.2.7l-4.1 6.1" />
      <Path
        data-name="Vector"
        d="M2.38 18.35v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default LikeIcon;
