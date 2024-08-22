import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CrownIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="crown"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="crown-2" data-name="crown" transform="translate(-172 -380)">
        <Path
          id="Vector"
          d="M14.781,16.995h-9.4a1.18,1.18,0,0,1-1.03-.73L.211,4.685c-.59-1.66.1-2.17,1.52-1.15l3.9,2.79a1.054,1.054,0,0,0,1.67-.51l1.76-4.69c.56-1.5,1.49-1.5,2.05,0l1.76,4.69a1.046,1.046,0,0,0,1.66.51l3.66-2.61c1.56-1.12,2.31-.55,1.67,1.26l-4.04,11.31A1.221,1.221,0,0,1,14.781,16.995Z"
          transform="translate(173.919 381.985)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H11"
          transform="translate(178.5 402)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H5"
          transform="translate(181.5 394)"
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
          transform="translate(172 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
