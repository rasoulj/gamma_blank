import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function QuoteDownIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="quote-down"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="quote-down-2"
        data-name="quote-down"
        transform="translate(-236 -316)"
      >
        <G id="Group">
          <G id="Group-2" data-name="Group">
            <Path
              id="Vector"
              d="M8.38,8.38H2.58A2.518,2.518,0,0,1,0,5.8V2.58A2.518,2.518,0,0,1,2.58,0H5.8A2.586,2.586,0,0,1,8.38,2.58Z"
              transform="translate(249.62 319.27)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-2"
              data-name="Vector"
              d="M4.53,0C4.53,6.05,3.4,7.05,0,9.07"
              transform="translate(253.47 327.65)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
          <G id="Group-3" data-name="Group">
            <Path
              id="Vector-3"
              data-name="Vector"
              d="M8.38,8.38H2.58A2.518,2.518,0,0,1,0,5.8V2.58A2.518,2.518,0,0,1,2.58,0H5.81A2.586,2.586,0,0,1,8.39,2.58v5.8"
              transform="translate(237.99 319.27)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-4"
              data-name="Vector"
              d="M4.53,0C4.53,6.05,3.4,7.05,0,9.07"
              transform="translate(241.84 327.65)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(260 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
