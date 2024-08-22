import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CallOutgoingIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="call-outgoing"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="call-outgoing-2"
        data-name="call-outgoing"
        transform="translate(-300 -188)"
      >
        <G id="call-outgoing-3" data-name="call-outgoing">
          <Path
            id="Vector"
            d="M19.97,16.33a2.545,2.545,0,0,1-.25,1.09,4.126,4.126,0,0,1-.68,1.02,4.508,4.508,0,0,1-1.64,1.18,5.022,5.022,0,0,1-1.95.38,8.334,8.334,0,0,1-3.26-.73,17.564,17.564,0,0,1-3.44-1.98,28.75,28.75,0,0,1-3.28-2.8,28.414,28.414,0,0,1-2.79-3.27A17.828,17.828,0,0,1,.72,7.81,8.423,8.423,0,0,1,0,4.54,5.173,5.173,0,0,1,.36,2.61,4.6,4.6,0,0,1,1.51.94,2.93,2.93,0,0,1,3.59,0,1.879,1.879,0,0,1,4.4.18a1.63,1.63,0,0,1,.67.56L7.39,4.01a3.422,3.422,0,0,1,.4.7,1.581,1.581,0,0,1,.14.61,1.357,1.357,0,0,1-.21.71,3.4,3.4,0,0,1-.56.71l-.76.79a.535.535,0,0,0-.16.4.908.908,0,0,0,.03.23c.03.08.06.14.08.2a8.3,8.3,0,0,0,.93,1.28c.45.52.93,1.05,1.45,1.58.54.53,1.06,1.02,1.59,1.47a7.675,7.675,0,0,0,1.29.92c.05.02.11.05.18.08a.69.69,0,0,0,.25.04.55.55,0,0,0,.41-.17l.76-.75a3.068,3.068,0,0,1,.72-.56,1.332,1.332,0,0,1,.71-.21,1.6,1.6,0,0,1,.61.13,3.868,3.868,0,0,1,.7.39l3.31,2.35a1.517,1.517,0,0,1,.55.64A2.052,2.052,0,0,1,19.97,16.33Z"
            transform="translate(302 190)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M4.8,0V0Zm0,0H0"
            transform="translate(315.2 192)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
