import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PencilIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}>
      <Path data-name="Path 29574" d="M0 0h18v18H0z" fill="none" />
      <Path
        data-name="Path 29575"
        d="M3 12.5V15h2.5l7.374-7.374-2.5-2.5zm11.807-6.807a.664.664 0 000-.94l-1.56-1.56a.664.664 0 00-.94 0l-1.22 1.22 2.5 2.5 1.22-1.22z"
      />
      <Path fill="none" d="M0 0H18V18H0z" />
    </Svg>
  );
}

export default PencilIcon;
