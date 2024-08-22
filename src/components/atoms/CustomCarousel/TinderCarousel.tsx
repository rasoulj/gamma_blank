import {Box, Image} from 'native-base';
import React, {useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {deviceWidth, verticalScale} from '../../elemental';

const TinderCarousel = ({
  data,
  w = deviceWidth,
  h = verticalScale(150),
  resizeMode = 'stretch',
}: {
  w?: number;
  h?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
  data: any;
}) => {
  const carousel = useRef();

  function _renderItem({item, index}) {
    return (
      <Image
        source={{
          uri: item?.uri,
        }}
        style={{
          width: deviceWidth - 64,
          height: 170,
        }}
        alt="image"
        borderRadius="xl"
        resizeMode={resizeMode}
      />
    );
  }

  return (
    <>
      <Carousel
        layout={'default'}
        ref={carousel}
        data={data || []}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
        renderItem={_renderItem}
        loop
      />
    </>
  );
};

export default TinderCarousel;
