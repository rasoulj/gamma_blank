import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SortIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.003}
      height={15}
      viewBox="0 0 15.003 15"
      {...props}>
      <G fill={props.color ? props.color : '#1de9b6'}>
        <Path
          data-name="Path 31823"
          d="M11.75 3.5h-9a.75.75 0 010-1.5h9a.75.75 0 010 1.5z"
          transform="translate(-2 -2)"
        />
        <Path
          data-name="Path 31824"
          d="M10.25 9.5h-7.5a.75.75 0 010-1.5h7.5a.75.75 0 110 1.5z"
          transform="translate(-2 -2) translate(0 -1.5)"
        />
        <Path
          data-name="Path 31825"
          d="M8.75 15.5h-6a.75.75 0 110-1.5h6a.75.75 0 010 1.5z"
          transform="translate(-2 -2) translate(0 -3)"
        />
        <Path
          data-name="Path 31826"
          d="M7.25 21.5h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5z"
          transform="translate(-2 -2) translate(0 -4.5)"
        />
        <Path
          data-name="Path 31827"
          d="M17.75 15.5a.75.75 0 01-.75-.75v-12a.75.75 0 111.5 0v12a.75.75 0 01-.75.75z"
          transform="translate(-2 -2) translate(-3.75)"
        />
        <Path
          data-name="Path 31828"
          d="M17 20.749a.75.75 0 01-.532-.218l-2.25-2.25a.753.753 0 011.065-1.065L17 18.941l1.718-1.725a.753.753 0 111.065 1.065l-2.25 2.25a.75.75 0 01-.532.218z"
          transform="translate(-2 -2) translate(-2.999 -3.749)"
        />
      </G>
    </Svg>
  );
}

export default SortIcon;
