import * as React from 'react';
import Svg, {Path, Text, TSpan, G} from 'react-native-svg';

function PromoTagIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 21 21"
      {...props}>
      <Path fill="rgba(0,0,0,0)" d="M0 0H21V21H0z" />
      <Path
        data-name="Path 29792"
        d="M18.537 10.162l-7.668-7.668A1.7 1.7 0 009.668 2H3.7A1.7 1.7 0 002 3.7v5.968a1.675 1.675 0 00.5 1.2l.349.341a4.96 4.96 0 012.556-.69 5.112 5.112 0 015.112 5.112 4.991 4.991 0 01-.7 2.556l.341.341a1.7 1.7 0 001.21.511 1.675 1.675 0 001.2-.5l5.964-5.964a1.675 1.675 0 00.5-1.2 1.709 1.709 0 00-.5-1.21M4.982 6.26A1.278 1.278 0 116.26 4.982 1.278 1.278 0 014.982 6.26m3.834 10.223H6.26v2.556h-1.7v-2.556H2v-1.7h2.556v-2.559h1.7v2.556h2.56z"
        transform="translate(-.296 -.296)"
        fill="#1de9b6"
      />
    </Svg>
  );
}

export default PromoTagIcon;
