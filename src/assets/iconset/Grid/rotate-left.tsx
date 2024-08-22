import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RotateLeft1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="rotate-left"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="rotate-left-2"
        data-name="rotate-left"
        transform="translate(-300 -380)"
      >
        <Path
          id="Vector"
          d="M5.25,15h4.5C13.5,15,15,13.5,15,9.75V5.25C15,1.5,13.5,0,9.75,0H5.25C1.5,0,0,1.5,0,5.25v4.5C0,13.5,1.5,15,5.25,15Z"
          transform="translate(302 387)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M7,7A7,7,0,0,0,0,0L1.05,1.75"
          transform="translate(315 382)"
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
          transform="translate(300 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
