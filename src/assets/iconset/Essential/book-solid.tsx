import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BookSolidIconSet(props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#0A8080" stroke="#0A8080">
        <Path d="M21.625 4.85v11.883a1.556 1.556 0 01-1.328 1.492l-.306.039-.009.001-.008.002c-2.033.334-4.02.908-5.918 1.71a.5.5 0 01-.681-.467v0V5.603a.52.52 0 01.274-.451 18.689 18.689 0 016.278-1.972h.028a1.668 1.668 0 011.67 1.67zM4.324 3.18l-.031-.004.062-.496h-.07l.039.5zm0 0h-.039 0a1.668 1.668 0 00-1.67 1.67h0v11.883a1.556 1.556 0 001.328 1.492l.306.039.009.001.008.002c2.034.334 4.02.908 5.918 1.71a.5.5 0 00.681-.467v0V5.596h0a.5.5 0 00-.263-.444A18.69 18.69 0 004.324 3.18zm7.041 2.42v13.91a1 1 0 01-1.37.93l1.37-14.84zm0 0a1 1 0 00-.14-.519m.14.519l-.14-.519m0 0a1 1 0 00-.39-.371l.39.371zM7.375 7.24h-2.25a1.25 1.25 0 100 2.5h2.25a1.25 1.25 0 100-2.5zm-2.25 5.5h3a1.25 1.25 0 000-2.5h-3a1.25 1.25 0 000 2.5z" />
      </G>
    </Svg>
  );
}

export default BookSolidIconSet;
