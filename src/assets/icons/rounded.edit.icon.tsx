import React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import {isDark} from '~/utils/methods';

export default function RoundedEditIcon(props) {
  const color =
    props.color ||
    getColor({color: isDark ? 'gray.100' : 'gray.500', theme}) ||
    '#292d32';

  return (
    <Svg
      id="edit"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="edit-2" data-name="edit" transform="translate(-620 -252)">
        <Path
          id="Vector"
          d="M9,0H7C2,0,0,2,0,7v6c0,5,2,7,7,7h6c5,0,7-2,7-7V11"
          transform="translate(622 254)"
          fill="none"
          stroke={getColor({color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.991,1.271l-7.88,7.88a2.712,2.712,0,0,0-.66,1.32l-.43,3.01a1.424,1.424,0,0,0,1.7,1.7l3.01-.43a2.8,2.8,0,0,0,1.32-.66l7.88-7.88c1.36-1.36,2-2.94,0-4.94S10.351-.089,8.991,1.271Z"
          transform="translate(627.049 253.749)"
          fill="none"
          stroke={getColor({color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0A7.144,7.144,0,0,0,4.94,4.94"
          transform="translate(634.91 256.15)"
          fill="none"
          stroke={getColor({color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(620 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
