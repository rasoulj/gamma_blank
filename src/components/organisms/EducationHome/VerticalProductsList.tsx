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
import EducationVerticalItem from '~/components/molecules/EducationVerticalItem';

export default function VerticalProductsList({
  title,
  style,
  data,
  loading,
  onClickSeeAll,
}: HorizontalProductsListProps) {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  const renderItem = useCallback(
    ({item}) => (
      // loading ? (
      //   <ProductHorizontalItemLoader key={item.id} />
      // ) :
      <EducationVerticalItem
        course={item}
        onCoursePress={() =>
          navigateWithName('CourseDetails', {id: item?.course?.id})
        }
      />
    ),
    [loading],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, {marginBottom: 0}]}>
        <Typography
          variant="ButtonText"
          color={getColor({color: 'black'})}
          style={styles.title}>
          {title}
        </Typography>
        {data?.length >= 4 && (
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
        renderItem={renderItem}
      />
    </View>
  );
}
