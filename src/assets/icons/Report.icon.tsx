import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {getColor, theme} from '~/components/elemental';

function ReportIcon(props) {
  const color =
    props.color ||
    getColor({
      color: props?.color || theme?.components?.Icon?.color?.default || '#ff0000',
      theme,
    });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={21.439}
      viewBox="0 0 22 21.439"
      {...props}>
      <G data-name="Group 20960" fill="none">
        <G data-name="Union 1">
          <Path
            d="M-2471.768-55.922l-2.566-3.078H-2478a4 4 0 01-4-4v-10a4 4 0 014-4h14a4 4 0 014 4v10a4 4 0 01-4 4h-3.665l-2.566 3.079a1 1 0 01-.768.36 1 1 0 01-.769-.361z"
            transform="translate(-71 -309) translate(2553 386)"
          />
          <Path
            d="M-2471-57.343l2.632-3.157h4.368c1.378 0 2.5-1.122 2.5-2.5v-10c0-1.379-1.122-2.5-2.5-2.5h-14a2.503 2.503 0 00-2.5 2.5v10c0 1.378 1.122 2.5 2.5 2.5h4.369l2.631 3.157m0 1.781a.995.995 0 01-.768-.36l-2.566-3.078H-2478a4 4 0 01-4-4v-10a4 4 0 014-4h14a4 4 0 014 4v10a4 4 0 01-4 4h-3.666l-2.566 3.079c-.2.24-.484.36-.768.36z"
            fill={getColor({color})}
            transform="translate(-71 -309) translate(2553 386)"
          />
        </G>
        <G
          data-name="Group 20959"
          stroke={getColor({color})}
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path
            d="M84.06 315v5"
            strokeWidth={1.5}
            transform="translate(-71 -309) translate(-2.054 -1)"
          />
          <Path
            data-name="Vector"
            d="M84.054 323h.009"
            strokeWidth={2}
            transform="translate(-71 -309) translate(-2.054 -1)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default ReportIcon;
