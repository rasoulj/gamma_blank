import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
export default function EditIcon(props) {
  const color = props.color || theme?.components?.Icon?.color?.default;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Path 29960"
        d="M5 3a1.993 1.993 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7H5V5h7V3H5m12.78 1a.69.69 0 00-.48.2l-1.22 1.21 2.5 2.5L19.8 6.7a.676.676 0 000-.95L18.25 4.2a.668.668 0 00-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38-2.5-2.5z"
        fill={color}
      />
      <Path data-name="Rectangle 3095" fill="rgba(0,0,0,0)" d="M0 0H24V24H0z" />
    </Svg>
  );
}
