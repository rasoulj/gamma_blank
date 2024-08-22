import * as React from 'react';
import Svg, {Defs, G, Rect, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function CircleFilter(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={81}
      height={81}
      viewBox="0 0 81 81"
      {...props}>
      <Defs></Defs>
      <G data-name="Component 146">
        <G data-name="Group 27">
          <G
            transform="translate(25.5 24.5) translate(-25.5 -24.5)"
            filter="url(#a)"
            data-name="Group 24">
            <Rect
              data-name="Rectangle 4"
              width={30}
              height={30}
              rx={15}
              transform="translate(25.5 24.5)"
              fill="rgba(51,51,51,0.45)"
            />
          </G>
        </G>
        <Path
          d="M17.145 3H5.76a1.881 1.881 0 00-1.532 2.971l3.883 5.452a3.761 3.761 0 01.7 2.182v3.809a2.511 2.511 0 005.022 0v-3.753a3.761 3.761 0 01.758-2.264l4.059-5.385A1.881 1.881 0 0017.145 3z"
          transform="translate(25.5 24.5) translate(3.547 3.538)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default CircleFilter;
