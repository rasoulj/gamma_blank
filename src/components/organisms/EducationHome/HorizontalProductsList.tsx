/* eslint-disable react/prop-types */
import React, {useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {HorizontalProductsListProps} from './horizontal-products-list.props';
import ProductHorizontalItemLoader from './ProductHorizontalLoader';
import styles from './styles';
import {
  Button,
  getColor,
  Typography,
  useNavigate,
  VStack,
} from '~/components/elemental';
import {createLoaderItems} from '~/utils/createLoaderItems';
import EducationHorizontalItem from '~/components/molecules/EducationHorizontalItem';

export default function HorizontalProductsList({
  title,
  style,
  data,
  loading,
  onClickSeeAll,
}: HorizontalProductsListProps) {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  const renderItem = useCallback(
    ({item, index}) => (
      // loading ? (
      //   <ProductHorizontalItemLoader key={item.id} />
      // ) :
      <EducationHorizontalItem
        course={item}
        style={index === 0 && {marginLeft: 20}}
        onCoursePress={() =>
          navigateWithName('CourseDetails', {id: item?.course?.id})
        }
      />
    ),
    [loading],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography
          variant="ButtonText"
          color={getColor({color: 'black'})}
          style={styles.title}>
          {title}
        </Typography>
        {data?.length > 10 && (
          <Typography
            onPress={onClickSeeAll}
            fontSize={'md'}
            fontWeight={'500'}
            color={getColor({color: 'secondary.500'})}>
            See all
          </Typography>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
}
