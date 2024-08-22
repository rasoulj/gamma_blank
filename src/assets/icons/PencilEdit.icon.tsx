import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Pressable} from 'react-native';

function PencilEditIcon(props) {
  return (
    <Pressable onPress={props?.onPress}>
      <Svg
        data-name="Group 20962"
        xmlns="http://www.w3.org/2000/svg"
        width={18.172}
        height={18.172}
        viewBox="0 0 15.172 15.172"
        {...props}>
        <Path
          data-name="Path 32771"
          d="M13.73 86.616a.5.5 0 00-.5.5v7.279a.828.828 0 01-.827.827H1.82a.828.828 0 01-.827-.827V83.8a.828.828 0 01.827-.827H9.1a.5.5 0 000-.993H1.82A1.822 1.822 0 000 83.8v10.591a1.822 1.822 0 001.82 1.82h10.587a1.822 1.822 0 001.82-1.82v-7.279a.5.5 0 00-.497-.496z"
          transform="translate(0 -81.038)"
          fill={props?.color || '#006194'}
        />
        <Path
          data-name="Path 32772"
          d="M189.83 1.275l-.936-.936a1.159 1.159 0 00-1.638 0l-7.486 7.486a.5.5 0 00-.136.254l-.468 2.339a.5.5 0 00.584.584l2.339-.468a.5.5 0 00.254-.136l7.486-7.486a1.159 1.159 0 000-1.638zm-8.082 8.316l-1.462.292.292-1.462 6.093-6.093 1.17 1.17zm7.38-7.38l-.585.585-1.17-1.17.585-.585a.166.166 0 01.234 0l.936.936a.166.166 0 010 .234z"
          transform="translate(-174.996 -.001)"
          fill={props?.color || '#006194'}
        />
      </Svg>
    </Pressable>
  );
}

export default PencilEditIcon;
