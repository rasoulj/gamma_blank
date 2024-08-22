import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function MedalSolidIconSet(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#FAFAFA">
        <Path d="M18.748 8.5a6.629 6.629 0 01-6.75 6.5 6.629 6.629 0 01-6.75-6.5 6.629 6.629 0 016.75-6.5 6.629 6.629 0 016.75 6.5zM15.788 15.61a.493.493 0 01.71.446v4.85c0 .9-.63 1.34-1.41.97l-2.68-1.266c-.264-.1-.556-.1-.82 0l-2.68 1.27c-.78.36-1.41-.08-1.41-.98l.02-4.844a.5.5 0 01.71-.446 8.344 8.344 0 003.77.89 8.458 8.458 0 003.79-.89z" />
      </G>
    </Svg>
  );
}

export default MedalSolidIconSet;
