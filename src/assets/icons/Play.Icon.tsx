import * as React from "react";
import Svg, { Defs, G, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function PlayIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={105}
      height={105}
      viewBox="0 0 105 105"
      {...props}
    >
      <Defs></Defs>
      <G data-name="Group 20909">
        <G transform="translate(-163 -750) translate(163 750)" filter="url(#a)">
          <Circle
            data-name="Ellipse 95"
            cx={37.5}
            cy={37.5}
            r={37.5}
            transform="translate(14 14)"
            fill="#1de9b6"
          />
        </G>
        <Path
          d="M8 5.14v20.042l15.747-10.021z"
          transform="translate(-163 -750) translate(201.626 786.82)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default PlayIcon;
