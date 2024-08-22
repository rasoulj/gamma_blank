import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ColorfulStar(props) {
  return (
    <Svg
      data-name="Group 25"
      xmlns="http://www.w3.org/2000/svg"
      width={70}
      height={70}
      viewBox="0 0 28.672 28.672"
      {...props}>
      <Path data-name="Rectangle 10" fill="none" d="M0 0H28.672V28.672H0z" />
      <Path
        data-name="Path 316"
        d="M40.51 24.9a1.8 1.8 0 00-1.6-1.243l-6.521-.457-2.421-6.064A1.794 1.794 0 0028.3 16a1.793 1.793 0 00-1.669 1.138l-2.457 6.1-6.489.419a1.8 1.8 0 00-1.6 1.243 1.818 1.818 0 00.567 1.975l4.992 4.2-1.485 5.812a2 2 0 00.771 2.133 1.967 1.967 0 002.2.068l5.15-3.246c.007-.005.014-.009.029 0l5.541 3.493a1.781 1.781 0 002-.061 1.815 1.815 0 00.7-1.933l-1.578-6.349 4.97-4.116a1.818 1.818 0 00.568-1.976z"
        transform="translate(-13.979 -13.931)"
        fill="#fff"
      />
    </Svg>
  );
}

export default ColorfulStar;
