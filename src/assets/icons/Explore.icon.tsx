import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { getColor } from "~/components/elemental";
import { theme } from "~/components/elemental";
function ExploreIcon(props: any) {
  const color = getColor({ color: props?.color || "#71717A", theme });
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.425 2.1L8.49497 4.59C7.7216 4.8266 7.01811 5.24939 6.44624 5.82127C5.87436 6.39314 5.45157 7.09663 5.21497 7.87L2.72497 17.8C1.97497 20.8 3.81497 22.65 6.82497 21.9L16.755 19.42C17.5267 19.1803 18.2286 18.7564 18.8 18.185C19.3714 17.6136 19.7953 16.9117 20.035 16.14L22.525 6.2C23.275 3.2 21.425 1.35 18.425 2.1Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.125 12C16.125 12.6922 15.9197 13.3689 15.5351 13.9445C15.1506 14.5201 14.6039 14.9687 13.9644 15.2336C13.3249 15.4985 12.6211 15.5678 11.9422 15.4327C11.2633 15.2977 10.6396 14.9644 10.1501 14.4749C9.66064 13.9854 9.3273 13.3617 9.19225 12.6828C9.0572 12.0039 9.12652 11.3001 9.39142 10.6606C9.65633 10.0211 10.1049 9.47444 10.6805 9.08986C11.2561 8.70527 11.9328 8.5 12.625 8.5C13.5533 8.5 14.4435 8.86875 15.0999 9.52513C15.7563 10.1815 16.125 11.0717 16.125 12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ExploreIcon;
