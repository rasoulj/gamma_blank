import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';
function DeactivateIcon(props) {
  const color =
    props.color ||
    getColor({color: theme?.components?.Icon?.color?.default, theme});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14.354}
      height={15.309}
      viewBox="0 0 14.354 15.309"
      {...props}>
      <Path
        data-name="Coffee"
        d="M6.823 2.75A.715.715 0 006.151 2a.715.715 0 00-.673.75v2.071a.715.715 0 00.673.75.715.715 0 00.673-.75zM3 7.583a.715.715 0 01.673-.75H14.2a3 3 0 012.228 1.029 3.8 3.8 0 010 4.967 3 3 0 01-2.175 1.028 3.721 3.721 0 01-.922 2.424 3 3 0 01-2.228 1.029H6.151a3 3 0 01-2.228-1.029A3.726 3.726 0 013 13.8zm11.257 4.773V8.334a1.721 1.721 0 011.223.588 2.178 2.178 0 010 2.845 1.722 1.722 0 01-1.223.589zM8.628 2a.715.715 0 01.673.75v2.071a.677.677 0 11-1.346 0V2.75A.715.715 0 018.628 2zm3.151.75a.677.677 0 10-1.346 0v2.071a.677.677 0 101.346 0z"
        transform="translate(-3 -2)"
        fill={color || '#1de9b6'}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default DeactivateIcon;
