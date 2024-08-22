import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  BackIcon,
  Layer,
  Typography,
  deviceWidth,
  getColor,
} from '~/components/elemental';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: any) => void;
}) => {
  const ref: any = useRef();

  const scrollToIndex = index => {
    const itemWidth = 40;
    const xOffset = index * itemWidth;

    ref?.current?.scrollToOffset({
      animated: false,
      offset: xOffset,
    });
  };
  const handlePageChange = newPage => {
    scrollToIndex(newPage - 1);
    onPageChange(newPage);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          padding: 5,
          backgroundColor:
            item + 1 === currentPage
              ? getColor({color: 'primary.500'})
              : getColor({color: 'background.500'}),
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handlePageChange(item + 1)}>
        <Typography color={item + 1 === currentPage ? 'gray.50' : 'gray.800'}>
          {item + 1}
        </Typography>
      </TouchableOpacity>
    );
  };
  return (
    <Layer
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() =>
          handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
        }>
        <BackIcon />
      </TouchableOpacity>
      <View style={{flex: 1}} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={ref}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data={totalPages ? [...Array?.(totalPages).keys()] : []}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={{width: 20}} />}
        ListFooterComponent={() => <View style={{width: 20}} />}
      />
      {/* <View style={{flex: 1}} /> */}

      <TouchableOpacity
        onPress={() =>
          handlePageChange(
            currentPage < totalPages ? currentPage + 1 : currentPage,
          )
        }>
        <BackIcon style={{transform: [{rotate: '180deg'}]}} />
      </TouchableOpacity>
    </Layer>
  );
};

export default memo(Pagination);

const styles = StyleSheet.create({});
