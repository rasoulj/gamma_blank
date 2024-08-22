import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import {getColor} from '~/components/elemental';

function CategoryAdventure({color, ...props}) {
  const finalColor = getColor({color: color || '#1de9b6'});
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27.495}
      height={21.165}
      viewBox="0 0 27.495 21.165"
      {...props}>
      <G data-name="Group 26144">
        <G data-name="Group 26145">
          <G data-name="Group 26144">
            <Path
              data-name="Path 44570"
              d="M26.9 16.188L18.792.288a.527.527 0 00-.677-.245c-2.487 1.07-4.355 1.065-7.685-.017a.538.538 0 00-.637.273L2.166 16.183l-2.1 3.669a.527.527 0 10.914.522l1.122-1.964v1.7a.527.527 0 00.527.527h23.8a.527.527 0 00.527-.527v-3.683a1.019 1.019 0 00-.056-.239zm-21-1.709v5.107H3.159v-3.039L9.74 2.84v10.467l-3.416.655a.527.527 0 00-.424.517zm1.053.435l2.256-.433-2.259 3.74zm.406 4.672l2.911-4.825 2.911 4.825zm6.228-1.365l-2.222-3.683 2.222.517zm3.9 1.365h-2.85v-4.949a.526.526 0 00-.407-.513l-3.436-.8V2.811l6.686 13.738zm-4.751-15.2c.3.067.634.136.993.194a.526.526 0 00.168-1.039 14.448 14.448 0 01-1.4-.3 11.882 11.882 0 01-.366-.1l-.857-1.76a9.889 9.889 0 006.805-.183l7.5 14.7h-7.243zm5.8 15.2v-1.614l1.245 1.615zm7.371 0h-4.8l-2.031-2.633H25.9z"
              fill={finalColor}
              stroke={finalColor}
              strokeWidth={0.5}
              transform="translate(.288 -59.724) translate(0 59.999)"
            />
          </G>
        </G>
        <G data-name="Group 26147">
          <G data-name="Group 26146">
            <Circle
              data-name="Ellipse 984"
              cx={0.527}
              cy={0.527}
              r={0.527}
              fill={finalColor}
              stroke={finalColor}
              strokeWidth={0.5}
              transform="translate(.288 -59.724) translate(15.379 63.643)"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default CategoryAdventure;
