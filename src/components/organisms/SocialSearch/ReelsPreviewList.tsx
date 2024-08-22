import React, {useCallback} from 'react';
import {FlatList, Image, deviceWidth, scale} from '~/components/elemental';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import {VideoPlay3} from '~/assets';
import EmptyResult from './EmptyResult';

const ReelsPreviewList = ({
  isLoading,
  navigateWithName,
  reelsData,
  refetch,
  onLoadMore,
  isFetchingNextPage,
  numOfCloumn = 3,
}: {
  isLoading?: boolean;
  navigateWithName: any;
  reelsData: any[];
  refetch?: any;
  onLoadMore?: any;
  isFetchingNextPage?: boolean;
  numOfCloumn?: number;
}) => {
  const renderItem = useCallback(({item, index}) => {
    return (
      <ListItem {...{item, index, navigateWithName, itemWidth, numOfCloumn}} />
    );
  }, []);

  const itemWidth = (deviceWidth - 50) / numOfCloumn;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <FlatList
        contentContainerStyle={styles.list}
        style={styles.flex1}
        nestedScrollEnabled
        data={reelsData ?? []}
        keyExtractor={(item): string => `${item?.post?.id}`}
        numColumns={numOfCloumn}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={refetch}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        setEmptyComponent
        ListEmptyComponent={isLoading ? undefined : <EmptyResult />}
      />
    </View>
  );
};

export default ReelsPreviewList;

const ListItem = ({item, index, navigateWithName, itemWidth, numOfCloumn}) => {
  const onPress = () => {
    navigateWithName('ReelsDetail', {
      item,
      currentIndex: 0,
      userId: item?.poster?.id,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Image
        source={{
          uri: item?.post?.thumbnail ?? 'https://via.placeholder.com/350x150',
        }}
        style={[
          styles.thumbnail,
          {
            marginRight: (index + 1) % numOfCloumn != 0 ? 4 : 0,
            width: itemWidth,
          },
        ]}
        resizeMode="cover"
      />
      <View style={styles.icon}>
        <WithLocalSvg asset={VideoPlay3} width={scale(28)} height={scale(26)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 10,
    height: scale(222),
    marginBottom: 4,
  },
  list: {},
  flex1: {flex: 1},
  container: {flex: 1, paddingTop: 10},
  icon: {
    position: 'absolute',
    margin: 20,
    zIndex: 1000,
    right: 0,
  },
});
