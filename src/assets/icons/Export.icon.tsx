import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental/helper';
import theme from '~/theme';
function ExportIcon(props) {
  const color =
    props.color ||
    getColor({color: theme?.components?.Icon?.color?.default, theme});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.453}
      height={15.453}
      viewBox="0 0 15.453 15.453"
      {...props}>
      <G
        fill="none"
        stroke="#b3b3b3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}>
        <G data-name="Group 14">
          <Path
            data-name="Path 1048"
            d="M0 6.505L5.926.578"
            transform="translate(-1.5 -1.5) translate(9.949 2)"
          />
          <Path
            data-name="Path 1049"
            d="M6.503 3.469V0H3.035"
            transform="translate(-1.5 -1.5) translate(9.949 2)"
          />
        </G>
        <Path
          data-name="Path 1050"
          d="M8.5 2H7.059C3.445 2 2 3.445 2 7.059v4.336c0 3.613 1.445 5.059 5.059 5.059h4.336c3.613 0 5.059-1.445 5.059-5.059V9.949"
          transform="translate(-1.5 -1.5)"
        />
      </G>
    </Svg>
  );
}

export default ExportIcon;
