import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View, ViewToken, ViewabilityConfig} from 'react-native';
import {FlatList, LoadIndicator, useRoute} from '~/components/elemental';
import ReelsItem from './ReelsItem';

const viewAbilityConfig: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 80,
  minimumViewTime: 50,
};

const ReelsList = ({
  reelsData,
  refetch,
  isLoading,
  onLoadMore,
  listEmtpyComponent,
}: {
  reelsData: any[];
  refetch?: any;
  isLoading: boolean;
  onLoadMore?: any;
  listEmtpyComponent?: any;
}) => {
  const [screenHeight, setScreenHeight] = useState<number>(0);

  const route = useRoute();
  const params = route?.params;
  const currentIndex = params?.currentIndex;
  const elRefs = React.useRef();
  const [refCrated, setRefCreated] = useState(false);

  useEffect(() => {
    if (!isLoading && reelsData?.length === 0) setRefCreated(true);
    reelsData?.forEach((item: any, index: number) => {
      elRefs[item?.post?.id] = createRef();
      if (index === reelsData?.length - 1) {
        setRefCreated(true);
      }
    });
  }, [reelsData]);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ReelsItem
          {...{
            item,
            index,
            ref: elRefs[item?.post?.id],
            height: screenHeight,
          }}
        />
      );
    },
    [screenHeight],
  );

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      let index2 = -1;
      info.changed.forEach((item, index) => {
        const cell = elRefs[item?.item?.post?.id];
        if (cell && cell?.current) {
          if (index2 === -1 && item?.isViewable) {
            cell.current?.play();
            index2 = 0;
          } else {
            cell.current?.pause();
          }
        }
      });
    },
    [],
  );
  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    if (currentIndex > 0 && refCrated) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex, refCrated]);
  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef?.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  const keyExtractor = React.useCallback(
    (item: any, index: number) => `reels-${item?.post?.id}`,
    [],
  );

  return (
    <View
      onLayout={event => setScreenHeight(event.nativeEvent.layout.height)}
      style={styles.flex1}>
      {refCrated ? (
        <FlatList
          ref={flatListRef}
          data={reelsData}
          isLoading={isLoading}
          onRefresh={refetch}
          refreshing={false}
          setEmptyComponent
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          viewabilityConfig={viewAbilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={onLoadMore}
          onScrollToIndexFailed={onScrollToIndexFailed}
          pagingEnabled
          ListEmptyComponent={listEmtpyComponent}
        />
      ) : (
        <LoadIndicator />
      )}
    </View>
  );
};

export default ReelsList;

const styles = StyleSheet.create({
  marginBottom: {paddingBottom: 10},

  flex1: {flex: 1},
});
