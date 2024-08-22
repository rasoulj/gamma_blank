import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PaintbucketIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="paintbucket"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="paintbucket-2" data-name="paintbucket">
        <Path
          id="Vector"
          d="M1.868,12.937l3.46,3.46c2.43,2.43,3.26,2.39,5.66,0l5.57-5.57c1.94-1.94,2.43-3.23,0-5.66L13.1,1.707c-2.59-2.59-3.72-1.94-5.66,0l-5.57,5.57C-.522,9.677-.722,10.347,1.868,12.937Z"
          transform="translate(1.902 2.623)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M1.067.645l-.66,1.09c-.93,1.55-.21,2.82,1.6,2.82s2.53-1.27,1.6-2.82L2.947.645A1.007,1.007,0,0,0,1.067.645Z"
          transform="translate(18.133 16.145)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,1.169a33.319,33.319,0,0,1,17-.13l.5.13"
          transform="translate(2 11.071)"
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
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
