import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';
function CupIcon(props) {
  const color =
    props.color ||
    getColor({color: theme?.components?.Icon?.color?.default, theme});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11.325}
      height={11.652}
      viewBox="0 0 11.325 11.652"
      {...props}>
      <G fill="#fff">
        <Path
          data-name="Path 1151"
          d="M8.745 17.295h-1.31A1.169 1.169 0 006.27 18.46v.146h-.583a.437.437 0 000 .874h6.991a.437.437 0 000-.874H12.1v-.146a1.169 1.169 0 00-1.165-1.165H9.619v-1.334a4.108 4.108 0 01-.874 0z"
          transform="translate(-2.279 -2) translate(-1.24 -5.828)"
        />
        <Path
          data-name="Path 1152"
          d="M11.717 7.616a2.85 2.85 0 00.99-.652 3.18 3.18 0 00.9-2.156 1.482 1.482 0 00-1.5-1.5h-.326A2.327 2.327 0 009.69 2h-3.5A2.327 2.327 0 004.1 3.311h-.323a1.482 1.482 0 00-1.5 1.5 3.18 3.18 0 00.9 2.156 2.85 2.85 0 00.99.652 4.075 4.075 0 007.55 0zM9.6 5.758l-.365.442a.438.438 0 00-.093.28l.035.571a.374.374 0 01-.553.4l-.53-.21a.536.536 0 00-.3 0l-.53.21a.374.374 0 01-.553-.4l.035-.571a.438.438 0 00-.093-.28l-.361-.443a.375.375 0 01.21-.652l.553-.14a.462.462 0 00.239-.181l.306-.477a.377.377 0 01.687 0l.309.478a.462.462 0 00.239.181l.553.14a.375.375 0 01.212.652z"
          transform="translate(-2.279 -2)"
        />
      </G>
    </Svg>
  );
}

export default CupIcon;
