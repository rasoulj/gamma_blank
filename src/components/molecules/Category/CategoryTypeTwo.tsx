import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'native-base';
import CategoryTypeTwoItem from './CategoryTypeTwoItem';
import {useGetCategories} from '../ItemSearch/hook';
import {LoadIndicator, useNavigate} from '~/components/elemental';

const CategoryTypeTwo = ({
  entity,
  multiSelect,
  intrestItems = [],
  setIntrestItems,
}: {
  entity: string;
  multiSelect?: boolean;
  intrestItems?: any;
  setIntrestItems?: (item: any) => void;
}) => {
  const {navigateWithName} = useNavigate();

  const [selecetedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setIntrestItems?.(selecetedItems);
  }, [selecetedItems]);

  useEffect(() => {
    setSelectedItems(intrestItems);
  }, []);

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

  c = JSON.parse(data?.staticConfig_getStaticConfig?.result.value || '[]');

  const renderItem = ({item}: {item: any}) => {
    return (
      <CategoryTypeTwoItem
        item={item}
        selecetedItems={selecetedItems}
        setSelectedItems={
          multiSelect ? data => setSelectedItems(data) : () => {}
        }
        onPress={() =>
          multiSelect
            ? null
            : navigateWithName('CourseList', {data: item, hasHeader: true})
        }
      />
    );
  };
  return isLoading ? (
    <LoadIndicator />
  ) : (
    <FlatList
      data={c ?? []}
      refreshing={isRefetching}
      onRefresh={refetch}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.wrapper}
      contentContainerStyle={styles.flatList}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      style={{flex: 1}}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
};

export default CategoryTypeTwo;

const styles = StyleSheet.create({
  divider: {width: 10, height: 10},
  wrapper: {
    justifyContent: 'space-between',
  },
  flatList: {
    width: '100%',
    paddingBottom: 100,
  },
});
