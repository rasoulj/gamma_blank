import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function ArchiveMinusIconSet(
  props: SvgProps & {solid?: boolean},
) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  const moreProps: any = !props.solid
    ? {
        fill: 'none',
        stroke: getColor({theme, color}),
      }
    : {
        stroke: getColor({theme, color}),
        fill: getColor({theme, color}),
      };

  return (
    <Svg
      {...props}
      id="archive-minus"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G
        id="archive-minus-2"
        data-name="archive-minus"
        transform="translate(-364 -188)">
        <Path
          id="Vector"
          d="M5,0H0"
          transform="translate(373.5 198.65)"
          fill={'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? '1.5'}
          {...moreProps}
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M13.5,0H3.86A3.869,3.869,0,0,0,0,3.86V17.95c0,1.8,1.29,2.56,2.87,1.69l4.88-2.71a2.118,2.118,0,0,1,1.87,0l4.88,2.71c1.58.88,2.87.12,2.87-1.69V3.86A3.884,3.884,0,0,0,13.5,0Z"
          transform="translate(367.32 190)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? '1.5'}
          {...moreProps}
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
