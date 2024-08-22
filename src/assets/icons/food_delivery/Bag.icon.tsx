import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
function BagIcon(props) {
  return (
    <Svg
      data-name="vuesax/bold/briefcase"
      xmlns="http://www.w3.org/2000/svg"
      width={15.363}
      height={15.363}
      viewBox="0 0 15.363 15.363"
      {...props}>
      <Path
        d="M12.218 3.335a3.577 3.577 0 00-2.772-.9h-.153v-.028c0-1.076 0-2.407-2.407-2.407h-.973C3.506 0 3.506 1.338 3.506 2.407v.032h-.154a3.567 3.567 0 00-2.772.9 2.911 2.911 0 00-.551 2.3l.006.045.065.672s.461.307.691.435c.09.058.186.109.282.16a10.988 10.988 0 003.521 1.2c.058.6.32 1.306 1.722 1.306s1.677-.7 1.722-1.319a10.772 10.772 0 003.706-1.331c.038-.019.064-.038.1-.058a8.906 8.906 0 00.871-.576l.026-.23.032-.3c.006-.038.006-.07.013-.115a2.837 2.837 0 00-.568-2.193zM7.1 7.72c0 .679 0 .781-.787.781s-.787-.122-.787-.775V6.92H7.1zM4.421 2.432v-.025c0-1.088 0-1.491 1.491-1.491h.973c1.491 0 1.491.41 1.491 1.491v.032H4.421z"
        transform="translate(1.282 1.133)"
        fill={getColor({color: props.color, theme})}
      />
      <Path
        data-name="Vector"
        d="M12.38 0l-.28 3.1c-.134 1.28-.659 2.586-3.476 2.586H3.745C.928 5.689.4 4.383.269 3.109L0 .152A25.378 25.378 0 003.585 1.56 2.412 2.412 0 006.1 2.994a2.434 2.434 0 002.516-1.453A24.54 24.54 0 0012.38 0z"
        transform="translate(1.498 8.541)"
        fill={getColor({color: props.color, theme})}
      />
    </Svg>
  );
}

export default BagIcon;
