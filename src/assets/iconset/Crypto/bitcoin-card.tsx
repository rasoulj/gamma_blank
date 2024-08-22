import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BitcoinCardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="bitcoin-card"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="bitcoin-card-2"
        data-name="bitcoin-card"
        transform="translate(-302 -188)"
      >
        <Path
          id="Vector"
          d="M0,0H11"
          transform="translate(304 196.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H2"
          transform="translate(308 204.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H4"
          transform="translate(312.5 204.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M20,7.83v4.78c0,3.51-.89,4.39-4.44,4.39H4.44C.89,17,0,16.12,0,12.61V4.39C0,.88.89,0,4.44,0h6.84"
          transform="translate(304 191.5)"
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
            d="M0,0H3.13A1.3,1.3,0,0,1,4.38,1.25,1.25,1.25,0,0,1,3.13,2.5H0Z"
            transform="translate(319 191.25)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-6"
            data-name="Vector"
            d="M0,0H3.57A1.349,1.349,0,0,1,5,1.25,1.349,1.349,0,0,1,3.57,2.5H0Z"
            transform="translate(319 193.75)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-7"
            data-name="Vector"
            d="M0,0V1.25"
            transform="translate(320.76 196.25)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-8"
            data-name="Vector"
            d="M0,0V1.25"
            transform="translate(320.76 190)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-9"
            data-name="Vector"
            d="M2.19,0H0"
            transform="translate(318 191.25)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-10"
            data-name="Vector"
            d="M2.19,0H0"
            transform="translate(318 196.25)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-11"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(302 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
