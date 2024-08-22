import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
function LikeHeaderIcon({color, ...props}) {
  const c = getColor({color: color, theme});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.3}
      height={15.869}
      viewBox="0 0 17.3 15.869"
      {...props}>
      <G transform="translate(.65 .65)" fill="none">
        <Path d="M0 0H16V14H0z" />
        <Path
          data-name="Path 29923"
          d="M8 14.35l-1.16-1.032C2.72 9.666 0 7.257 0 4.3A4.309 4.309 0 014.4 0 4.836 4.836 0 018 1.634 4.836 4.836 0 0111.6 0 4.309 4.309 0 0116 4.3c0 2.956-2.72 5.365-6.84 9.024z"
          stroke={c}
          fill={props.isFavorite ? c : 'none'}
          strokeWidth={1.3}
        />
      </G>
    </Svg>
  );
}

export default LikeHeaderIcon;
