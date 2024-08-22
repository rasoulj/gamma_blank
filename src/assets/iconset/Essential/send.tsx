import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SendIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="send"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="send-2" data-name="send" transform="translate(-236 -316)">
        <Path
          id="Vector"
          d="M6.46,1.229l8.56,4.28c3.84,1.92,3.84,5.06,0,6.98l-8.56,4.28c-5.76,2.88-8.11.52-5.23-5.23l.87-1.73a2.046,2.046,0,0,0,0-1.61l-.87-1.74C-1.65.709.71-1.651,6.46,1.229Z"
          transform="translate(239.05 319.001)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H5.4"
          transform="translate(241.44 328)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
