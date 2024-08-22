import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/components/elemental';
function ShareIcon({color = undefined, ...props}) {
  const c = getColor({
    color: color || theme?.components?.Icon?.color?.default || 'gray.400',
  });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.336}
      height={12.78}
      viewBox="0 0 15.336 12.78"
      {...props}>
      <Path
        data-name="Path 29949"
        d="M12.372 5v3.408C6.408 9.26 3.852 13.52 3 17.78c2.13-2.982 5.112-4.345 9.372-4.345v3.493l5.964-5.964L12.372 5m1.7 4.115l1.849 1.849-1.849 1.849v-1.082h-1.7a15.21 15.21 0 00-4.822.809 8.4 8.4 0 015.061-2.428l1.465-.23z"
        transform="translate(-3 -5)"
        fill={c}
      />
    </Svg>
  );
}

export default ShareIcon;
