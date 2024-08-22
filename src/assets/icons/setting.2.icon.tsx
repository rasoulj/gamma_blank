import React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';
import {SVGAttributes} from 'react';
import {getColor} from '~/utils/helper/theme.methods';
import {isDark} from '~/components/elemental';
import theme from '~/theme';

export default function Setting(props: SVGAttributes<SVGElement>) {
  // @ts-ignore
  const color = props?.color || isDark() ? '#FAFAFA' : '#18181B';

  return (
    <Svg
      id="setting-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G
        id="setting-2-2"
        data-name="setting-2"
        transform="translate(-300 -188)">
        <Path
          id="Vector"
          d="M6,3A3,3,0,1,1,3,0,3,3,0,0,1,6,3Z"
          transform="translate(309 197)"
          fill="none"
          stroke={getColor({color})}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,10.319V8.559a1.906,1.906,0,0,1,1.9-1.9c1.81,0,2.55-1.28,1.64-2.85a1.9,1.9,0,0,1,.7-2.59L5.97.229a1.669,1.669,0,0,1,2.28.6l.11.19c.9,1.57,2.38,1.57,3.29,0l.11-.19a1.669,1.669,0,0,1,2.28-.6l1.73.99a1.9,1.9,0,0,1,.7,2.59c-.91,1.57-.17,2.85,1.64,2.85a1.906,1.906,0,0,1,1.9,1.9v1.76a1.906,1.906,0,0,1-1.9,1.9c-1.81,0-2.55,1.28-1.64,2.85a1.9,1.9,0,0,1-.7,2.59l-1.73.99a1.669,1.669,0,0,1-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29,0l-.11.19a1.669,1.669,0,0,1-2.28.6l-1.73-.99a1.9,1.9,0,0,1-.7-2.59c.91-1.57.17-2.85-1.64-2.85A1.906,1.906,0,0,1,0,10.319Z"
          transform="translate(302 190.561)"
          fill="none"
          stroke={getColor({color})}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
