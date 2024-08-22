import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBox from '../SocialSearch/SearchBox';
import {Button, FlatList} from '~/components/elemental';
import {useGetFollowers} from './hooks';
import useAuthStore from '~/stores/authStore';
import {Box} from 'native-base';
import HideStoryItem from './HideStoryItem';

const HideStory = () => {
  const user = useAuthStore(state => state.user);
  const [searchText, setSearchText] = useState<any>();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useGetFollowers(
    searchText?.trim()?.length > 0
      ? {
          userId: user?.id,
          where: {follower: {fullName: {contains: searchText}}},
        }
      : {userId: user?.id},
  );
  const followData = data?.pages?.[0]?.followers ?? [];
  const checkedItems = useRef<any[]>([]);
  useEffect(() => {
    followData.map(item => {
      checkedItems.current.push(item?.follower?.id);
    });
  }, []);
  const renderItem = useCallback(({item, index}) => {
    return <HideStoryItem {...{item, checkedItems, index}} />;
  }, []);

  return (
    <View style={styles.flex1}>
      <SearchBox
        containerStyle={styles.containerStyle}
        type="input"
        hasBackIcon={false}
        onChangeText={setSearchText}
      />
      <FlatList
        renderItem={renderItem}
        data={followData}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        setEmptyComponent
        refreshing={false}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <Box h={4} />}
      />
    </View>
  );
};

export default HideStory;

const styles = StyleSheet.create({
  containerStyle: {marginBottom: 29},
  flex1: {flex: 1},
});
