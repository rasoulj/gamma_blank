import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TranslateIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="translate"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="translate-2"
        data-name="translate"
        transform="translate(-748 -316)"
      >
        <Path
          id="Vector"
          d="M4.28,4.27,2.14,0,0,4.27"
          transform="translate(762.78 330.4)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H3.52"
          transform="translate(763.17 333.91)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.08,10.16a5.08,5.08,0,1,1,5.08-5.08A5.081,5.081,0,0,1,5.08,10.16Z"
          transform="translate(759.84 327.84)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M3.02,0H6.94c2.07,0,3.07,1,3.02,3.02V6.94c.05,2.07-.95,3.07-3.02,3.02H3.02C1,10,0,9,0,6.93V3.01C0,1,1,0,3.02,0Z"
          transform="translate(750 318)"
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
            d="M4.06,0H0"
            transform="translate(752.95 321.85)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-6"
            data-name="Vector"
            d="M0,0V.68"
            transform="translate(754.97 321.17)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-7"
            data-name="Vector"
            d="M3.05,0A3.115,3.115,0,0,1,0,3.17"
            transform="translate(752.94 321.84)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-8"
            data-name="Vector"
            d="M1.85,1.01A2.324,2.324,0,0,1,0,0"
            transform="translate(755.16 324)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <G id="Group-2" data-name="Group">
          <Path
            id="Vector-9"
            data-name="Vector"
            d="M0,0A7,7,0,0,0,7,7L5.95,5.25"
            transform="translate(750 331)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-10"
            data-name="Vector"
            d="M7,7A7,7,0,0,0,0,0L1.05,1.75"
            transform="translate(763 318)"
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
          transform="translate(772 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
