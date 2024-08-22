import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CallSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="call-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="call-slash-2"
        data-name="call-slash"
        transform="translate(-620 -188)"
      >
        <G id="call-slash-3" data-name="call-slash">
          <Path
            id="Vector"
            d="M0,4.93c.14.11.28.21.43.32A17.564,17.564,0,0,0,3.87,7.23a8.334,8.334,0,0,0,3.26.73,5.022,5.022,0,0,0,1.95-.38A4.508,4.508,0,0,0,10.72,6.4a4.126,4.126,0,0,0,.68-1.02,2.545,2.545,0,0,0,.25-1.09,2.052,2.052,0,0,0-.16-.78,1.517,1.517,0,0,0-.55-.64L7.63.52a3.868,3.868,0,0,0-.7-.39A1.6,1.6,0,0,0,6.32,0a1.332,1.332,0,0,0-.71.21,3.068,3.068,0,0,0-.72.56l-.76.75a.55.55,0,0,1-.41.17.69.69,0,0,1-.25-.04c-.07-.03-.13-.06-.18-.08a4.957,4.957,0,0,1-.65-.42"
            transform="translate(630.32 202.04)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M8.73,11.22c-.52-.53-1-1.06-1.45-1.58a8.3,8.3,0,0,1-.93-1.28c-.02-.06-.05-.12-.08-.2a.908.908,0,0,1-.03-.23.535.535,0,0,1,.16-.4l.76-.79a3.4,3.4,0,0,0,.56-.71,1.357,1.357,0,0,0,.21-.71,1.581,1.581,0,0,0-.14-.61,3.422,3.422,0,0,0-.4-.7L5.07.74A1.63,1.63,0,0,0,4.4.18,1.879,1.879,0,0,0,3.59,0,2.93,2.93,0,0,0,1.51.94,4.6,4.6,0,0,0,.36,2.61,5.173,5.173,0,0,0,0,4.54,8.423,8.423,0,0,0,.72,7.81a17.828,17.828,0,0,0,1.96,3.41,28.414,28.414,0,0,0,2.79,3.27"
            transform="translate(622 190)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M20,0,0,20"
            transform="translate(622 190)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(620 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
