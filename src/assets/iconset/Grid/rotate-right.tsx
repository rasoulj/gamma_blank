import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RotateRight1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="rotate-right"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="rotate-right-2"
        data-name="rotate-right"
        transform="translate(-364 -380)"
      >
        <Path
          id="Vector"
          d="M9.75,15H5.25C1.5,15,0,13.5,0,9.75V5.25C0,1.5,1.5,0,5.25,0h4.5C13.5,0,15,1.5,15,5.25v4.5C15,13.5,13.5,15,9.75,15Z"
          transform="translate(371 387)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,7A7,7,0,0,1,7,0L5.95,1.75"
          transform="translate(366 382)"
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
          transform="translate(364 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
