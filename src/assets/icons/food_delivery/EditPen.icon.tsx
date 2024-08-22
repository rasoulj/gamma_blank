import * as React from 'react';
import Svg, {Rect, G, Path} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/components/elemental/helper';
function EditPenIcon({color: iconColor, ...props}) {
  const color =
    iconColor ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    '#1DE9B6';
  return (
    <Svg
      data-name="Component 160 \u2013 1"
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={29.667}
      viewBox="0 0 30 29.667"
      fill={getColor({color, theme})}
      {...props}>
      <Rect
        data-name="Rectangle 8"
        width={30}
        height={29.667}
        rx={14.833}
        fill={getColor({color, theme})}
      />
      <G fill="#fff" data-name="vuesax/bold/edit-2">
        <Path
          d="M11.472.918H.459A.462.462 0 010 .459.462.462 0 01.459 0h11.013a.462.462 0 01.459.459.462.462 0 01-.459.459z"
          transform="translate(-676.342 -244.498) translate(684 252) translate(1.377 12.542)"
        />
        <Path
          data-name="Vector"
          d="M4.378.9A2.215 2.215 0 00.811.9l-.74.74a.255.255 0 00-.061.245A4.973 4.973 0 003.393 5.27a.307.307 0 00.073.012.245.245 0 00.177-.073l.734-.74a2.529 2.529 0 00.9-1.768A2.519 2.519 0 004.378.9z"
          transform="translate(-676.342 -244.498) translate(684 252) translate(7.259 1.227)"
        />
        <Path
          data-name="Vector"
          d="M7.413 3.353a6.93 6.93 0 01-.514-.269 5.499 5.499 0 01-.392-.257 3.694 3.694 0 01-.343-.263.746.746 0 01-.1-.092 5.174 5.174 0 01-.63-.636.745.745 0 01-.092-.11 3.558 3.558 0 01-.257-.336 3.359 3.359 0 01-.239-.361c-.1-.165-.184-.33-.269-.5S4.421.165 4.36 0L.518 3.842a.736.736 0 00-.171.336L.016 6.522a1.254 1.254 0 00.312 1.071 1.218 1.218 0 00.857.33A1.338 1.338 0 001.4 7.9l2.349-.33a.681.681 0 00.342-.17l3.842-3.839a9.702 9.702 0 01-.52-.208z"
          transform="translate(-676.342 -244.498) translate(684 252) translate(2.138 3.701)"
        />
      </G>
    </Svg>
  );
}

export default EditPenIcon;
