import {
  ActivityIndicator,
  FlatListProps,
  FlatList as FlatListReact,
  StyleSheet,
} from 'react-native';
import React, {forwardRef, useCallback} from 'react';
import {Center, EmptyData, LoadIndicator} from '~/components';

interface FProps extends FlatListProps<any> {
  data: any;
  renderItem: any;
  estimatedItemSize?: number;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  setEmptyComponent?: boolean;
  keyValue?: string;
  listKey?: any;
}
const FlatList = forwardRef(
  (
    {
      data,
      renderItem,
      isLoading,
      isFetchingNextPage,
      ListFooterComponent,
      setEmptyComponent = false,
      keyExtractor,
      keyValue = 'id',
      listKey,
      ...rest
    }: FProps,
    ref,
  ) => {
    const footerComponent = useCallback(() => {
      return (
        <Center h="20px">
          <ActivityIndicator />
        </Center>
      );
    }, []);
    const keyExtractorLocal = keyExtractor
      ? keyExtractor
      : listKey
      ? undefined
      : useCallback(
          (item, index: number) => `itm${item?.[keyValue] ?? index}`,
          [keyValue],
        );
    return (
      <FlatListReact
        ref={ref}
        ListEmptyComponent={
          !isLoading && setEmptyComponent ? EmptyData : undefined
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractorLocal}
        ListFooterComponent={
          isFetchingNextPage ? footerComponent : ListFooterComponent
        }
        {...rest}
      />
    );
  },
);

export default FlatList;

const styles = StyleSheet.create({});
