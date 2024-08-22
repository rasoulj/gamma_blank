import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/utils/helper/theme.methods';
import theme from '~/theme';

function ArrowDownSolid(props) {
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
        d="M17.92 8.18H6.08a1.077 1.077 0 00-.76 1.84l5.182 5.18a2.131 2.131 0 003.01 0l1.97-1.97 3.21-3.21a1.082 1.082 0 00-.771-1.84z"
        fill={getColor({theme, color})}
      />
    </Svg>
  );
}

export default ArrowDownSolid;
