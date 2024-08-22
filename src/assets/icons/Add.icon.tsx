import * as React from 'react';
import Svg, {G, Rect, Text, TSpan} from 'react-native-svg';

function AddIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}>
      <G data-name="Group 20709">
        <G
          data-name="Rectangle 187"
          transform="translate(-114 -941) translate(114 941)"
          fill="#fff"
          stroke="#b3b3b3"
          strokeWidth={1}>
          <Rect width={16} height={16} rx={5} stroke="none" />
          <Rect x={0.5} y={0.5} width={15} height={15} rx={4.5} fill="none" />
        </G>
        <Text
          data-name="+"
          transform="translate(-114 -941) translate(119 942)"
          fill="#b3b3b3"
          fontSize={10}
          fontFamily="Poppins-Light, Poppins"
          fontWeight={300}>
          <TSpan x={0} y={11}>
            {' + '}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default AddIcon;
