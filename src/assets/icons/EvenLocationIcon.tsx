import { getColor } from "~/components/elemental/helper";
// import {SVGAttributes} from 'react';
// import {useAppSelector} from 'src/redux/store/store';
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import theme from "~/theme";
import { isDark } from "~/utils/methods";

export default function EventLocationIcon(props: any) {
  //   const theme = useAppSelector(({reducer}) => reducer.theme);
  // @ts-ignore
  const color =
    props?.color || isDark("background") ? "gray.300" : "gray.500" || "#006194";

  return (
    <Svg
      id="location"
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      {...props}
    >
      <G id="location-2" data-name="location">
        <Path
          id="Vector"
          d="M4.42,2.21A2.21,2.21,0,1,1,2.21,0,2.21,2.21,0,0,1,4.42,2.21Z"
          transform="translate(6.29 5.093)"
          fill="none"
          stroke={getColor({ color, theme })}
          stroke-width="1"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.172,4.6c1.4-6.134,10.483-6.127,11.872.007.815,3.6-1.424,6.644-3.386,8.528a3.679,3.679,0,0,1-5.107,0C1.6,11.248-.643,8.2.172,4.6Z"
          transform="translate(2.392 1.417)"
          fill="none"
          stroke={getColor({ color, theme })}
          stroke-width="1"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H17V17H0Z"
          transform="translate(17 17) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
