import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CameraIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="camera"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="camera-2" data-name="camera" transform="translate(-364 -320)">
        <Path
          id="Vector"
          d="M4.518,20H15a3.636,3.636,0,0,0,3.99-3.75l.52-8.26A3.753,3.753,0,0,0,15.758,4a1.643,1.643,0,0,1-1.45-.89l-.72-1.45A3.3,3.3,0,0,0,10.908,0H8.618a3.3,3.3,0,0,0-2.69,1.66l-.72,1.45A1.643,1.643,0,0,1,3.758,4,3.753,3.753,0,0,0,.008,7.99l.52,8.26A3.631,3.631,0,0,0,4.518,20Z"
          transform="translate(366.242 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H3"
          transform="translate(374.5 328)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.25,6.5A3.25,3.25,0,1,0,0,3.25,3.256,3.256,0,0,0,3.25,6.5Z"
          transform="translate(372.75 331.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 320)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
