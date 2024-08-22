import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RepeatIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="repeat"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="repeat-2" data-name="repeat" transform="translate(-556 -508)">
        <G id="Group">
          <Path
            id="Vector"
            d="M0,0H13.84a3,3,0,0,1,3,3V6.32"
            transform="translate(559.58 513.16)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M3.16,0,0,3.16,3.16,6.32"
            transform="translate(559.58 510)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M16.84,6.32H3a3,3,0,0,1-3-3V0"
            transform="translate(559.58 520.52)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,6.32,3.16,3.16,0,0"
            transform="translate(573.26 523.68)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(580 532) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
