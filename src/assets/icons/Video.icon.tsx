import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const VideoIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      data-name="video"
      fill="none"
      stroke={props.color || '#1de9b6'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M12.53 20.42H6.21c-3.16 0-4.21-2.1-4.21-4.21V7.79c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21Z" />
      <Path
        data-name="Vector"
        d="m19.52 17.1-2.78-1.95V8.84l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29ZM13 9.5A1.5 1.5 0 1 1 11.5 8 1.5 1.5 0 0 1 13 9.5Z"
      />
    </G>
  </Svg>
);

export default VideoIcon;
