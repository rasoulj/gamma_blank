import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/utils/helper/theme.methods';
import theme from '~/theme';

function VideoSolidIconSet(props) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#0A8080';
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21.648 6.17a2.25 2.25 0 00-2.44.37l-1.47 1.04c-.11-3.11-1.46-4.33-4.74-4.33h-6c-3.42 0-4.75 1.33-4.75 4.75v8a4.415 4.415 0 004.75 4.75h6c3.28 0 4.63-1.22 4.74-4.33l1.47 1.04a2.751 2.751 0 001.59.58c.296 0 .588-.072.85-.21a2.257 2.257 0 001.1-2.21V8.38a2.257 2.257 0 00-1.1-2.21zm-10.15 5.21a1.88 1.88 0 110-3.761 1.88 1.88 0 010 3.761z"
        fill={getColor({theme, color})}
      />
    </Svg>
  );
}

export default VideoSolidIconSet;
