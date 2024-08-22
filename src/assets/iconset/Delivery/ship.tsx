import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShipIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ship"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="ship-2" data-name="ship" transform="translate(-435 -188)">
        <Path
          id="Vector"
          d="M18.092,3.065a2.078,2.078,0,0,1,1.21,2.29l-.41,1.86a6.739,6.739,0,0,1-6.84,5.48H7.292a6.739,6.739,0,0,1-6.84-5.48l-.41-1.86a2.078,2.078,0,0,1,1.21-2.29l1.42-.57L8.182.285a4.037,4.037,0,0,1,2.98,0l5.51,2.21Z"
          transform="translate(437.328 197.305)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,12V0"
          transform="translate(447 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M14,3V6.8L8.49,4.59a4.037,4.037,0,0,0-2.98,0L0,6.8V3A3.009,3.009,0,0,1,3,0h8A3.009,3.009,0,0,1,14,3Z"
          transform="translate(440 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M5,3H0V1A1,1,0,0,1,1,0H4A1,1,0,0,1,5,1Z"
          transform="translate(444.5 190)"
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
          transform="translate(435 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
