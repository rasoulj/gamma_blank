import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryFitness({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27.503}
      height={21.202}
      viewBox="0 0 27.503 21.202"
      {...props}>
      <Path
        d="M1.35 13.051h.45v3.15a2.253 2.253 0 002.25 2.25 2.227 2.227 0 001.35-.462v.462a2.25 2.25 0 004.5 0v-5.4h7.2v5.4a2.25 2.25 0 004.5 0v-.462a2.227 2.227 0 001.35.462 2.253 2.253 0 002.25-2.25v-3.15h.45a1.35 1.35 0 001.35-1.35v-2.7a1.35 1.35 0 00-1.35-1.35h-.45v-3.15a2.253 2.253 0 00-2.25-2.25 2.227 2.227 0 00-1.35.462v-.462a2.25 2.25 0 10-4.5 0v5.4H9.9v-5.4a2.25 2.25 0 10-4.5 0v.462a2.227 2.227 0 00-1.35-.462 2.253 2.253 0 00-2.25 2.25v3.15h-.45A1.35 1.35 0 000 9.001v2.7a1.35 1.35 0 001.35 1.35zm24.3-4.5a.45.45 0 01.45.45v2.7a.45.45 0 01-.45.45h-.45v-3.6h.45zm-2.7-5.4a1.35 1.35 0 011.35 1.35v11.7a1.35 1.35 0 11-2.7 0v-11.7a1.35 1.35 0 011.35-1.35zM18 2.25a1.35 1.35 0 112.7 0v16.2a1.35 1.35 0 01-2.7 0zm-.9 6.3v3.6H9.9v-3.6zM6.3 2.25a1.35 1.35 0 112.7 0v16.2a1.35 1.35 0 01-2.7 0zM2.7 4.5a1.35 1.35 0 112.7 0v11.7a1.35 1.35 0 11-2.7 0zM.9 9a.45.45 0 01.45-.45h.45v3.6h-.45a.45.45 0 01-.45-.45z"
        fill={finalColor}
        stroke={finalColor}
        strokeWidth={0.5}
        transform="translate(.25 -59.483) translate(0 59.733)"
        data-name="Group 27618"
      />
    </Svg>
  );
}

export default CategoryFitness;
