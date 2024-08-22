import * as React from 'react';
import Svg, {G, Text, TSpan, Path} from 'react-native-svg';

function CryptomatchDrawerLogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={102.059}
      height={21}
      viewBox="0 0 102.059 21"
      {...props}>
      <G data-name="Group 20691">
        <Text
          transform="translate(-190.971 -22) translate(254.029 38)"
          fill="#1de9b6"
          fontSize={15}
          fontWeight={700}>
          <TSpan x={-38.355} y={0}>
            {'mymatch'}
          </TSpan>
        </Text>
        <G data-name="Group 4665">
          <Path
            d="M9.352 19.8l-5.2 2.6.7-4.927A7.749 7.749 0 012 11.62C2 6.859 6.824 3 12.775 3S23.55 6.859 23.55 11.62s-4.824 8.62-10.775 8.62a13.235 13.235 0 01-3.423-.44z"
            transform="translate(-190.971 -22) translate(190.971 23) translate(-2 -3)"
            fill="#1de9b6"
          />
          <Path
            d="M6.457 10.411l-.646-.533C3.515 7.992 2 6.748 2 5.221A2.322 2.322 0 014.451 3a2.79 2.79 0 012.006.844A2.79 2.79 0 018.463 3a2.322 2.322 0 012.451 2.221c0 1.527-1.515 2.771-3.811 4.661z"
            transform="translate(-190.971 -22) translate(190.971 23) translate(4.318 2.992)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default CryptomatchDrawerLogo;
