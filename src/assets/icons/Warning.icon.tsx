import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const WarningIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      data-name="info-circle"
      fill="none"
      stroke="#ef4444"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path
        d="M12 22A10 10 0 1 0 2 12a10.029 10.029 0 0 0 10 10Z"
        strokeWidth={1.5}
      />
      <Path data-name="Vector" d="M12 8v5" strokeWidth={1.5} />
      <Path data-name="Vector" d="M11.995 16h.009" strokeWidth={2} />
    </G>
  </Svg>
);

export default WarningIcon;
