import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShieldSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="shield-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="shield-slash-2"
        data-name="shield-slash"
        transform="translate(-428 -188)"
      >
        <Path
          id="Vector"
          d="M0,12.9l1.59,1.19a4.552,4.552,0,0,0,5.14,0l4.3-3.21a4.862,4.862,0,0,0,1.73-3.44V0"
          transform="translate(435.84 195.12)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M15.57,2.343a4.156,4.156,0,0,0-.47-.24L10.11.233a5.02,5.02,0,0,0-3.02,0l-5,1.88A3.47,3.47,0,0,0,0,5.122v7.43a4.862,4.862,0,0,0,1.73,3.44l.2.15"
          transform="translate(431.41 189.997)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(430 190)"
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
          transform="translate(452 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
