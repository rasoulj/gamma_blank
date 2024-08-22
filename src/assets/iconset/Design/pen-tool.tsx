import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PenToolIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="pen-tool"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="pen-tool-2" data-name="pen-tool" transform="translate(-364 -188)">
        <G id="Group">
          <G id="Group-2" data-name="Group">
            <Path
              id="Vector"
              d="M1.429,3.32h2.52a1.27,1.27,0,0,0,1.4-1.51L4.939,0H.439L.029,1.81A1.314,1.314,0,0,0,1.429,3.32Z"
              transform="translate(373.321 207.18)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-2"
              data-name="Vector"
              d="M7.011,8.448l1.73-1.54c.97-.86,1.01-1.46.24-2.43L5.931.608a1.421,1.421,0,0,0-2.33,0L.551,4.477c-.77.97-.77,1.6.24,2.43l1.73,1.54"
              transform="translate(371.249 198.723)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <Path
              id="Vector-3"
              data-name="Vector"
              d="M0,0V2.53"
              transform="translate(376.01 199.12)"
              fill="none"
              stroke={getColor({ theme, color })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </G>
        </G>
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1.132,3.613l-.78-.78a1.2,1.2,0,0,1,0-1.7l.78-.78a1.2,1.2,0,0,1,1.7,0l.78.78a1.2,1.2,0,0,1,0,1.7l-.78.78A1.2,1.2,0,0,1,1.132,3.613Z"
          transform="translate(374.018 189.578)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M1.2,0H2.3A1.2,1.2,0,0,1,3.5,1.2V2.3A1.2,1.2,0,0,1,2.3,3.5H1.2A1.2,1.2,0,0,1,0,2.3V1.2A1.2,1.2,0,0,1,1.2,0Z"
          transform="translate(382.25 197.81)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M2.3,0H1.2A1.2,1.2,0,0,0,0,1.2V2.3A1.2,1.2,0,0,0,1.2,3.5H2.3A1.2,1.2,0,0,0,3.5,2.3V1.2A1.2,1.2,0,0,0,2.3,0Z"
          transform="translate(366.25 197.81)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M5.3,5.3,0,0"
          transform="translate(377.24 192.8)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-8"
          data-name="Vector"
          d="M0,5.3,5.3,0"
          transform="translate(369.46 192.8)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-9"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
