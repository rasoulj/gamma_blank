import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SecurityCardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="security-card"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="Group_20953"
        data-name="Group 20953"
        transform="translate(-300 -444)"
      >
        <G id="Group">
          <G id="Group-2" data-name="Group">
            <Path
              id="Vector"
              d="M9.74,15.7h5.92c-.09.08-.18.15-.27.23l-4.27,3.2a4.571,4.571,0,0,1-5.13,0l-4.28-3.2A4.834,4.834,0,0,1,0,12.512V5.1a3.453,3.453,0,0,1,2.07-3L7.05.233a4.955,4.955,0,0,1,3,0L15.02,2.1a3.547,3.547,0,0,1,2.01,2.38H9.73c-.22,0-.42.01-.61.01-1.85.11-2.33.78-2.33,2.89v5.43C6.8,15.112,7.39,15.7,9.74,15.7Z"
              transform="translate(302 446.047)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,0H13.2"
            transform="translate(308.8 455.22)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M13.2,2.91V8.46c-.02,2.22-.63,2.77-2.94,2.77H2.94C.59,11.23,0,10.64,0,8.33V2.9C0,.8.48.13,2.33.01c.19,0,.39-.01.61-.01h7.32C12.61.01,13.2.59,13.2,2.91Z"
            transform="translate(308.8 450.51)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,0H1.33"
            transform="translate(311.32 459.26)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-5"
            data-name="Vector"
            d="M0,0H3.27"
            transform="translate(314.75 459.26)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 444)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
