import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShoppingCartIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="shopping-cart"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="shopping-cart-2"
        data-name="shopping-cart"
        transform="translate(-622 -188)"
      >
        <Path
          id="Vector"
          d="M0,0H1.74A1.85,1.85,0,0,1,3.58,2l-.83,9.96a2.8,2.8,0,0,0,2.79,3.03H16.19A2.877,2.877,0,0,0,19,12.38l.54-7.5a2.773,2.773,0,0,0-2.81-3.01H3.82"
          transform="translate(624 190)"
          fill={props?.fill || 'none'}
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.5,1.25A1.25,1.25,0,1,1,1.25,0,1.25,1.25,0,0,1,2.5,1.25Z"
          transform="translate(637 207.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.5,1.25A1.25,1.25,0,1,1,1.25,0,1.25,1.25,0,0,1,2.5,1.25Z"
          transform="translate(629 207.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H12"
          transform="translate(631 196)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(622 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
