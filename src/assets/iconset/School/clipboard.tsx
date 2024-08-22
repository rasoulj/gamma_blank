import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ClipboardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="clipboard"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="clipboard-2"
        data-name="clipboard"
        transform="translate(-684 -188)"
      >
        <Path
          id="Vector"
          d="M16.653,5.152a9.574,9.574,0,0,1-.13,2.07l-.73,4.69c-.62,3.91-2.43,5.23-6.34,4.62l-4.69-.74a7.352,7.352,0,0,1-3.15-1.11c-1.45-1.01-1.87-2.67-1.47-5.23l.74-4.69C1.5.852,3.313-.468,7.223.142l4.69.74C15.053,1.372,16.523,2.652,16.653,5.152Z"
          transform="translate(685.977 189.998)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M16.91,6.32l-1.5,4.51c-1.25,3.76-3.25,4.76-7.01,3.51l-4.51-1.5C1.62,12.09.36,11.05,0,9.53a7.352,7.352,0,0,0,3.15,1.11l4.69.74c3.91.61,5.72-.71,6.34-4.62l.73-4.69A9.574,9.574,0,0,0,15.04,0C17.43,1.27,17.95,3.19,16.91,6.32Z"
          transform="translate(687.59 195.15)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.48,1.74A1.74,1.74,0,1,1,1.74,0,1.74,1.74,0,0,1,3.48,1.74Z"
          transform="translate(690.5 193.5)"
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
          transform="translate(708 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
