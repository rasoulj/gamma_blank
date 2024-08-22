import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
import {getColor} from '~/utils/helper/theme.methods';
import theme from '~/theme';
function CancelIcon(props) {
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.Icon?.color?.default ||
    '#c70f0f';
  return (
    <Svg
      data-name="Component 203 \u2013 2"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <G fill="none" strokeWidth={1}>
        <G
          data-name="Ellipse 6"
          stroke={getColor({color, theme})}
          transform="translate(0 2.699) translate(0 -2.699)">
          <Circle cx={9} cy={9} r={9} />
          <Circle cx={9} cy={9} r={8.5} />
        </G>
        <Path
          data-name="Path 32583"
          stroke={getColor({color, theme})}
          d="M12.807 2.4L5.264 9.68"
          transform="translate(0 2.699) translate(-.166 .263)"
        />
        <Path
          data-name="Path 32584"
          stroke={getColor({color, theme})}
          d="M5.264 2.4l7.8 6.891"
          transform="translate(0 2.699) translate(-.166 .263)"
        />
      </G>
    </Svg>
  );
}

export default CancelIcon;
