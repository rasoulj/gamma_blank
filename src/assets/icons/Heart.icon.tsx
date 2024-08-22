import * as React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { getColor } from "~/components/elemental";
import theme from "~/theme";
function HeartIcon({
  style = {},
  color,
  isLiked,
  onPress,
  children,
  borderColor,
  ...props
}: any) {
  const { height, width, left, right, top, bottom, position, ...rest } = style;
  // const c = getColor({
  //   color: color || 'secondary.500' || '#006194',
  // });

  const c =
    color ||
    getColor({
      color: "secondary.500" || "#006194",
    });
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        style={{
          ...rest,
        }}
        {...props}
      >
        <Path
          d="M12.62 20.81a2.181 2.181 0 01-1.24 0C8.48 19.82 2 15.69 2 8.69A5.574 5.574 0 017.56 3.1 5.515 5.515 0 0112 5.34a5.547 5.547 0 0110 3.35c0 7-6.48 11.13-9.38 12.12z"
          fill={isLiked ? props?.fill ?? c : "transparent"}
          stroke={
            !isLiked
              ? props?.fill ?? c
              : getColor({
                  color: borderColor || "error.500",
                })
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? 1.5}
          data-name="heart"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default HeartIcon;
