import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BitcoinRefreshIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24.131"
      height="24"
      viewBox="0 0 24.131 24"
    >
      <G id="bitcoin-refresh" transform="translate(0.061)">
        <G
          id="bitcoin-refresh-2"
          data-name="bitcoin-refresh"
          transform="translate(-430 -188)"
        >
          <Path
            id="Vector"
            d="M3.47,1.74,1.73,0,0,1.74"
            transform="translate(431 197.68)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,0,1.74,1.74,3.48,0"
            transform="translate(449.53 200.58)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M16.49,11.58V9.26A9.262,9.262,0,0,0,0,3.47"
            transform="translate(434.77 190.74)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,0V2.32A9.262,9.262,0,0,0,16.49,8.11"
            transform="translate(432.74 197.68)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <G id="Group">
            <Path
              id="Vector-5"
              data-name="Vector"
              d="M0,0H4.38A1.813,1.813,0,0,1,6.13,1.75,1.746,1.746,0,0,1,4.38,3.5H0Z"
              transform="translate(439 196.5)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-6"
              data-name="Vector"
              d="M0,0H5A1.888,1.888,0,0,1,7,1.75,1.888,1.888,0,0,1,5,3.5H0Z"
              transform="translate(439 200)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-7"
              data-name="Vector"
              d="M0,0V1.75"
              transform="translate(441.8 203.5)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-8"
              data-name="Vector"
              d="M0,0V1.75"
              transform="translate(441.8 194.75)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
          <Path
            id="Vector-9"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(430 188)"
            fill="none"
            opacity="0"
          />
        </G>
      </G>
    </Svg>
  );
}
