import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ArchiveSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="archive-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="archive-slash-2"
        data-name="archive-slash"
        transform="translate(-236 -188)"
      >
        <Path
          id="Vector"
          d="M20,0,0,20"
          transform="translate(238 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.68,0V11c0,2.01-1.44,2.86-3.2,1.88L0,8.83"
          transform="translate(247 196.71)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,17.95V3.86A3.869,3.869,0,0,1,3.86,0h9.65a3.844,3.844,0,0,1,3,1.44"
          transform="translate(239.32 190)"
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
          transform="translate(236 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
