import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function MedalFillStartIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#006194">
        <Path d="M13.55 11.882l-.99.234a.589.589 0 00-.444.444l-.21.882a.6.6 0 01-1.044.252L9.068 11.63a.3.3 0 01.15-.486 5.095 5.095 0 002.717-1.698.3.3 0 01.444-.03l1.332 1.332c.457.456.295 1.026-.16 1.134zM2.42 11.882l.99.234a.589.589 0 01.444.444l.21.882a.6.6 0 001.044.252l1.794-2.064a.3.3 0 00-.15-.486 5.095 5.095 0 01-2.718-1.698.3.3 0 00-.444-.03l-1.332 1.332c-.456.456-.294 1.026.162 1.134zM8 2a4.196 4.196 0 00-.63 8.346c.417.072.843.072 1.26 0A4.196 4.196 0 008 2zm1.836 4.068l-.498.498a.425.425 0 00-.102.366l.144.618c.114.486-.144.678-.576.42l-.6-.354a.42.42 0 00-.396 0l-.6.354c-.432.252-.69.066-.576-.42l.144-.618a.45.45 0 00-.102-.366l-.51-.498c-.294-.294-.198-.588.21-.654l.642-.108a.437.437 0 00.282-.21l.354-.708c.192-.384.504-.384.696 0l.354.708a.435.435 0 00.288.21l.642.108c.402.066.498.36.204.654z" />
      </G>
    </Svg>
  );
}

export default MedalFillStartIcon;
