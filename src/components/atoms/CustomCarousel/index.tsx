import React from 'react';
import {scale} from '../../elemental';
import HorizontalList from './HorizontalList';
import TinderCarousel from './TinderCarousel';

const CustomCarousel = ({
  data = [],
  layout,
  w,
  h,
  size = scale(65),
  resizeMode,
  renderCustomItem,
  manualScrollEnable,
}: {
  data: any;
  w?: string | number;
  h?: string | number;
  size?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
  layout?: 'tinder' | string;
  renderCustomItem?: any;
  manualScrollEnable?: boolean;
}) => {
  w = Number(w);
  h = Number(h);

  switch (layout) {
    case 'tinder':
      return <TinderCarousel {...{data, w, h, resizeMode}} />;
    default:
      return (
        <HorizontalList
          {...{data, size, w, h, renderCustomItem, manualScrollEnable}}
        />
      );
  }
};

export default CustomCarousel;
