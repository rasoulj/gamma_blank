import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CameraSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="camera-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="camera-slash-2"
        data-name="camera-slash"
        transform="translate(-428 -320)"
      >
        <Path
          id="Vector"
          d="M0,0H3"
          transform="translate(434 330)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,14.49H10.48a3.636,3.636,0,0,0,3.99-3.75l.52-8.26A3.729,3.729,0,0,0,14.25,0"
          transform="translate(434.76 327.51)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M15.758,4a1.643,1.643,0,0,1-1.45-.89l-.72-1.45A3.3,3.3,0,0,0,10.908,0H8.618a3.3,3.3,0,0,0-2.69,1.66l-.72,1.45A1.643,1.643,0,0,1,3.758,4,3.753,3.753,0,0,0,.008,7.99l.52,8.26a4.488,4.488,0,0,0,.67,2.21"
          transform="translate(430.242 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,4.29A3.248,3.248,0,0,0,5.25,1.73,3.185,3.185,0,0,0,4.75,0"
          transform="translate(438 333.02)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(430 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 320)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
