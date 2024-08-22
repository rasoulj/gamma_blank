import {SVGAttributes} from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import React from 'react';
import theme from '~/theme';

export default function EditPen(props: SVGAttributes<SVGElement>) {
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.Icon?.color?.default ||
    '#1DE9B6';
  return (
    <Svg
      id="Component_160_1"
      data-name="Component 160 – 1"
      xmlns="http://www.w3.org/2000/Svg"
      width="30"
      height="29.667"
      viewBox="0 0 30 29.667"
      {...props}>
      <Rect
        id="Rectangle_8"
        data-name="Rectangle 8"
        width="30"
        height="29.667"
        rx="14.833"
      />
      <G
        id="vuesax_bold_edit-2"
        data-name="vuesax/bold/edit-2"
        transform="translate(-676.342 -244.498)">
        <G id="edit-2" transform="translate(684 252)">
          <Path
            id="Vector"
            d="M11.472.918H.459A.462.462,0,0,1,0,.459.462.462,0,0,1,.459,0H11.472a.462.462,0,0,1,.459.459A.462.462,0,0,1,11.472.918Z"
            transform="translate(1.377 12.542)"
            fill="#fff"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M4.378.9A2.215,2.215,0,0,0,.811.9l-.74.74a.255.255,0,0,0-.061.245A4.973,4.973,0,0,0,3.393,5.27a.307.307,0,0,0,.073.012.245.245,0,0,0,.177-.073l.734-.74a2.529,2.529,0,0,0,.9-1.768A2.519,2.519,0,0,0,4.378.9Z"
            transform="translate(7.259 1.227)"
            fill="#fff"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M7.413,3.353c-.177-.086-.349-.171-.514-.269-.135-.08-.263-.165-.392-.257a3.694,3.694,0,0,1-.343-.263.746.746,0,0,1-.1-.092,5.174,5.174,0,0,1-.63-.636.745.745,0,0,1-.092-.11,3.558,3.558,0,0,1-.257-.336,3.359,3.359,0,0,1-.239-.361c-.1-.165-.184-.33-.269-.5S4.421.165,4.36,0L.518,3.842a.736.736,0,0,0-.171.336L.016,6.522A1.254,1.254,0,0,0,.328,7.593a1.218,1.218,0,0,0,.857.33A1.338,1.338,0,0,0,1.4,7.9l2.349-.33A.681.681,0,0,0,4.091,7.4L7.933,3.561C7.762,3.5,7.6,3.432,7.413,3.353Z"
            transform="translate(2.138 3.701)"
            fill="#fff"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,0H14.684V14.684H0Z"
            transform="translate(14.684 14.684) rotate(180)"
            fill="none"
            opacity="0"
          />
        </G>
      </G>
    </Svg>
  );
}
