import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function QuestionsIconSet(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.484 9.891v3.667c.002.23-.01.459-.036.687-.211 2.475-1.669 3.704-4.355 3.704h-.366a.74.74 0 00-.587.293l-1.1 1.466a1.037 1.037 0 01-1.76 0l-1.1-1.466a.847.847 0 00-.587-.294h-.366c-2.924 0-4.391-.724-4.391-4.39V9.89c0-2.686 1.237-4.143 3.703-4.354.228-.027.458-.039.688-.037h5.866c2.925 0 4.388 1.464 4.391 4.391z"
        stroke="#27272A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.15 6.227v3.666c0 2.695-1.234 4.147-3.703 4.355.027-.229.04-.458.037-.688V9.893c0-2.924-1.464-4.387-4.39-4.39H6.226a5.56 5.56 0 00-.688.036c.21-2.466 1.668-3.703 4.354-3.703h5.867c2.924 0 4.388 1.464 4.39 4.39z"
        stroke="#27272A"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.997 12.976v-.194a1.45 1.45 0 01.778-1.231 1.419 1.419 0 00.758-1.203 1.537 1.537 0 10-3.072 0"
        stroke="#27272A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 15.188h.005"
        stroke="#27272A"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default QuestionsIconSet;
