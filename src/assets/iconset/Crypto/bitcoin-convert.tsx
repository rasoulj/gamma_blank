import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BitcoinConvertIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="bitcoin-convert"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="bitcoin-convert-2"
        data-name="bitcoin-convert"
        transform="translate(-366 -188)"
      >
        <Path
          id="Vector"
          d="M7,0A7,7,0,0,1,0,7L1.05,5.25"
          transform="translate(382 203.97)"
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
          transform="translate(367 188.97)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <G id="Group-2" data-name="Group">
            <Path
              id="Vector-3"
              data-name="Vector"
              d="M0,0H2.81A1.169,1.169,0,0,1,3.94,1.13,1.129,1.129,0,0,1,2.81,2.26H0Z"
              transform="translate(372.62 201.07)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-4"
              data-name="Vector"
              d="M0,0H3.22A1.216,1.216,0,0,1,4.51,1.13,1.222,1.222,0,0,1,3.22,2.26H0Z"
              transform="translate(372.62 203.33)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-5"
              data-name="Vector"
              d="M0,0V1.12"
              transform="translate(374.42 205.58)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-6"
              data-name="Vector"
              d="M0,0V1.12"
              transform="translate(374.42 199.95)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
          <Path
            id="Vector-7"
            data-name="Vector"
            d="M12.34,6.17A6.17,6.17,0,1,1,6.17,0c.16,0,.31.01.48.02A6.174,6.174,0,0,1,12.33,5.7C12.33,5.85,12.34,6,12.34,6.17Z"
            transform="translate(368.51 197.16)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-8"
            data-name="Vector"
            d="M12.34,6.17a6.167,6.167,0,0,1-6.17,6.17H5.68A6.174,6.174,0,0,0,0,6.66V6.17a6.17,6.17,0,0,1,12.34,0Z"
            transform="translate(375.16 190.5)"
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
          transform="translate(366 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
