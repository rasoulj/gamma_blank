import {FlatList, Center} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import React from 'react';
import {ListRenderItem, View} from 'react-native';

import LoadIndicator from '../LoadIndicator';
import {hp} from '~/utils/responsive';
import {getWidth} from '~/utils/helper/getWidth';
//TODO - complete this
interface IProps extends Omit<IFlatListProps<any>, 'horizontal'> {
  pageSize?: number;
  height?: number | string;
  fetchNextPage?: () => void;
  isLoading?: boolean;
  renderItem: ListRenderItem<any>;
  style?: Record<string, unknown>;
  reverse?: boolean;
  horizontal?: string | boolean;
}
const InfiniteScroll = ({
  data,
  reverse,
  pageSize,
  isLoading,
  style,
  horizontal,
  renderItem: RenderItem,
  ...props
}: IProps) => {
  const flatListRef = React.useRef<any>(null);
  const ListFooterComponent = () => {
    return <Center>{isLoading && <LoadIndicator />}</Center>;
  };

  horizontal =
    typeof horizontal === 'boolean' ? horizontal : horizontal === 'true';

  const {backgroundColor} = style || {};

  return (
    <View style={style}>
      <FlatList
        style={{backgroundColor}}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={(...props) => (
          <View
            style={
              horizontal
                ? {
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }
                : {}
            }>
            {RenderItem(...props)}
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={props.fetchNextPage}
        maxToRenderPerBatch={pageSize}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={() => (
          <>
            {isLoading && (
              <View
                style={{
                  height: hp(80),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LoadIndicator />
              </View>
            )}
          </>
        )}
        onContentSizeChange={() =>
          reverse && flatListRef.current?.scrollToEnd({animated: true})
        }
        {...props}
      />
    </View>
  );
};

export default InfiniteScroll;
