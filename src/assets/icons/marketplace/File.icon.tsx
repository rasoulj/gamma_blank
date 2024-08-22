import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const FileIcon = (props: SvgProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...props}>
      <G
        fill={props.color ? props.color : '#1de9b6'}
        data-name="vuesax/bold/document">
        <Path d="M18.808 9.339h-2.655a3.955 3.955 0 0 1-3.95-3.948V2.737a.921.921 0 0 0-.918-.918H7.39a4.846 4.846 0 0 0-5.117 5.114v8.135a4.846 4.846 0 0 0 5.117 5.114h7.22a4.846 4.846 0 0 0 5.117-5.114v-4.811a.921.921 0 0 0-.919-.918Z" />
        <Path
          data-name="Vector"
          d="M14.544 2.009a.594.594 0 0 0-1.018.4v3.174a2.479 2.479 0 0 0 2.5 2.427c.864.009 2.064.009 3.091.009a.573.573 0 0 0 .427-.973c-1.308-1.314-3.654-3.691-5-5.037Z"
        />
      </G>
    </Svg>
  );
};

export default FileIcon;
