import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/utils/helper/theme.methods';
import theme from '~/theme';

function ArrowUpSolid(props) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#006194';

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.68 13.974l-3.21-3.21-1.96-1.967a2.131 2.131 0 00-3.01 0l-5.18 5.177a1.08 1.08 0 00.76 1.84h11.84a1.077 1.077 0 00.76-1.84z"
        fill={getColor({theme, color})}
      />
    </Svg>
  );
}

export default ArrowUpSolid;
