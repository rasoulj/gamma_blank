import * as React from 'react';
import Svg, {SvgProps, G, Circle, Rect} from 'react-native-svg';

const EqualizerIcon = (props: SvgProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} {...props}>
      <G data-name="Group 27549" transform="translate(-300 -164)">
        <Circle
          data-name="Ellipse 791"
          cx={16}
          cy={16}
          r={16}
          transform="translate(300 164)"
          fill="#1de9b6"
        />
        <G
          data-name="Group 27548"
          transform="translate(-9735 11686)"
          fill="#fff">
          <Rect
            data-name="Rectangle 20953"
            width={4}
            height={15}
            rx={2}
            transform="translate(10049 -11513)"
          />
          <Rect
            data-name="Rectangle 20954"
            width={4}
            height={10}
            rx={2}
            transform="translate(10055 -11511)"
          />
          <Rect
            data-name="Rectangle 20955"
            width={4}
            height={10}
            rx={2}
            transform="translate(10043 -11511)"
          />
        </G>
      </G>
    </Svg>
  );
};
export default EqualizerIcon;
