import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const QuestionIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <G
      fill="none"
      stroke="#292d32"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path
        d="M12 14.923v-.583a4.349 4.349 0 0 1 2.332-3.692 4.256 4.256 0 0 0 2.276-3.609 4.609 4.609 0 1 0-9.217 0"
        strokeWidth={2}
      />
      <Path data-name="Vector" d="M11.992 21.559h.02" strokeWidth={2.5} />
    </G>
  </Svg>
);

export default QuestionIcon;
