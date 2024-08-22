import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function QuoteUpIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="quote-up"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="quote-up-2" data-name="quote-up" transform="translate(-172 -316)">
        <G id="Group">
          <G id="Group-2" data-name="Group">
            <Path
              id="Vector"
              d="M0,0H5.8A2.518,2.518,0,0,1,8.38,2.58V5.8A2.518,2.518,0,0,1,5.8,8.38H2.58A2.586,2.586,0,0,1,0,5.8Z"
              transform="translate(174 328.35)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-2"
              data-name="Vector"
              d="M0,9.07C0,3.02,1.13,2.02,4.53,0"
              transform="translate(174 319.28)"
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
              d="M0,0H5.8A2.518,2.518,0,0,1,8.38,2.58V5.8A2.518,2.518,0,0,1,5.8,8.38H2.58A2.586,2.586,0,0,1,0,5.8Z"
              transform="translate(185.63 328.35)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-4"
              data-name="Vector"
              d="M0,9.07C0,3.02,1.13,2.02,4.53,0"
              transform="translate(185.63 319.28)"
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
          transform="translate(196 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
