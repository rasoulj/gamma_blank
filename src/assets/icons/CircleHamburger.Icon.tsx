import * as React from 'react';
import Svg, {Defs, G, Rect} from 'react-native-svg';
function CircleHamburger(props) {
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
        <G
          data-name="Group 20684"
          transform="translate(25.5 24.5) translate(6 7.5)"
          fill="#fff">
          <Rect data-name="Rectangle 1089" width={18} height={3} rx={1.5} />
          <Rect
            data-name="Rectangle 1090"
            width={18}
            height={3}
            rx={1.5}
            transform="translate(0 6)"
          />
          <Rect
            data-name="Rectangle 1091"
            width={18}
            height={3}
            rx={1.5}
            transform="translate(0 12)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default CircleHamburger;
