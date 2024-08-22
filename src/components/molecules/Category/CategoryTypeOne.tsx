import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlatList} from 'native-base';
import CategoryTypeOneItem from './CategoryTypeOneItem';
import {LoadIndicator} from '~/components/elemental';
import {useGetCategories} from '../ItemSearch/hook';

const CategoryTypeOne = ({
  entity,
  multiSelect,
}: {
  entity: string;
  multiSelect?: boolean;
}) => {
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  }: any = useGetCategories({
    key: entity,
  });

  let c;

  try {
    c = JSON.parse(data?.staticConfig_getStaticConfig?.result.value || '[]');
  } catch {}

  const renderItem = ({item}: any) => {
    return <CategoryTypeOneItem item={item} />;
  };

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <FlatList
      data={c ?? []}
      refreshing={isRefetching}
      onRefresh={refetch}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={{
        width: '100%',
        // paddingHorizontal:10,
      }}
      ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
      style={{flex: 1, margin: 15}}
      renderItem={renderItem}
      // ListHeaderComponent={Header}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
};

export default CategoryTypeOne;

const styles = StyleSheet.create({});
