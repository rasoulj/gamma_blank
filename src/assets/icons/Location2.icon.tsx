import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G} from 'react-native-svg';

function Location2Icon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={16.546}
      viewBox="0 0 13 16.546"
      {...props}>
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Path 51"
            d="M2.562-15.031a6.508 6.508 0 00-1.906 4.594 6.435 6.435 0 001.309 3.9s.177.233.206.267L7.156-.391l4.987-5.881.2-.264a6.432 6.432 0 001.309-3.9 6.508 6.508 0 00-1.906-4.594 6.508 6.508 0 00-4.594-1.906 6.508 6.508 0 00-4.59 1.905zm4.594 6.195L5.029-7.482l.355-2.408-1.773-1.626 2.482-.3 1.064-2.166 1.13 2.167 2.416.3L8.929-9.89l.355 2.407z"
            transform="translate(-.656 16.937)"
            fill="#4488ac"
            clipRule="evenodd"
          />
        </ClipPath>
        <ClipPath id="b">
          <Path
            data-name="Path 50"
            d="M0-.315h353.718V-17H0z"
            transform="translate(0 17)"
            fill="#4488ac"
          />
        </ClipPath>
      </Defs>
      <G data-name="pin icon" clipPath="url(#a)">
        <G
          data-name="Group 70"
          transform="translate(-.73 -.07)"
          clipPath="url(#b)">
          <Path
            data-name="Path 49"
            d="M-4.344-21.937H19.78V5.732H-4.344z"
            transform="translate(-.488 16.445)"
            fill="#4488ac"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Location2Icon;
