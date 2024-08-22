import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function GallerySolidIconSet(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#0A8080">
        <Path d="M3.08 19.01l-.02.02a6.187 6.187 0 01-.51-2c.065.685.244 1.355.53 1.98zM11.881 8a2.38 2.38 0 11-4.76 0 2.38 2.38 0 014.76 0z" />
        <Path d="M16.692 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.38c-.022.976.169 1.945.56 2.84.86 1.9 2.7 2.97 5.25 2.97h8.38c3.64 0 5.81-2.17 5.81-5.81V7.81c0-3.64-2.17-5.81-5.81-5.81zm4.18 10.5a2.229 2.229 0 00-2.82 0l-4.16 3.57a2.229 2.229 0 01-2.82 0l-.34-.28a2.221 2.221 0 00-2.64-.14l-3.74 2.51a5.333 5.333 0 01-.35-1.97V7.81c0-2.82 1.49-4.31 4.31-4.31h8.38c2.82 0 4.31 1.49 4.31 4.31v4.8l-.13-.11z" />
      </G>
    </Svg>
  );
}

export default GallerySolidIconSet;
