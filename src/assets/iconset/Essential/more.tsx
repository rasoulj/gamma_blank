import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MoreIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="more"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="more-2" data-name="more" transform="translate(-556 -188)">
        <Path
          id="Vector"
          d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
          transform="translate(559 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
          transform="translate(573 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
          transform="translate(566 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
