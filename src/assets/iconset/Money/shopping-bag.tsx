import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShoppingBagIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="shopping-bag"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="shopping-bag-2"
        data-name="shopping-bag"
        transform="translate(-686 -188)"
      >
        <Path
          id="Vector"
          d="M4.92,0h7.2c3.4,0,3.74,1.59,3.97,3.53l.9,7.5c.29,2.46-.47,4.47-3.97,4.47H4.03C.52,15.5-.24,13.49.06,11.03l.9-7.5C1.18,1.59,1.52,0,4.92,0Z"
          transform="translate(689.48 194.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,6V2.5A2.362,2.362,0,0,1,2.5,0h3A2.362,2.362,0,0,1,8,2.5V6"
          transform="translate(694 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M12.41,0H0"
          transform="translate(694 205.03)"
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
          transform="translate(686 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
