import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';

function BookmarkIcon(props) {
  const {colors} = theme;
  const {color, ...rest} = props.style;
  let myColor = 'primary.100';

  const colorArr = props.style?.color?.split('.');

  if (colorArr?.length > 0) {
    if (colorArr.length === 1) {
      myColor = colorArr?.[0];
      console.log(color);
    } else {
      const colorRef = colors[colorArr?.[0]]?.[colorArr[1]];
      myColor = colorRef;
    }
  } else {
    myColor = props.style?.color;
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19.291}
      height={25.722}
      viewBox="0 0 19.291 25.722"
      {...props}>
      <Path
        data-name="Icon awesome-bookmark"
        d="M0 25.722V2.411A2.411 2.411 0 012.411 0H16.88a2.411 2.411 0 012.411 2.411v23.31L9.646 20.1z"
        fill={myColor || '#000'}
        // fill={'#000'}
      />
    </Svg>
  );
}

export default BookmarkIcon;
