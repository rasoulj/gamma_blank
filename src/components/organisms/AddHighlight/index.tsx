import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FlatList,
  LoadIndicator,
  deviceWidth,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetStories} from './hook';
import useAuthStore from '~/stores/authStore';
import HighlightTitleModal from './HighlightTitleModal';
import AddHighlghtItem from './AddHighlightItem';

const AddHighlght = () => {
  const user = useAuthStore(state => state.user);
  const [visibleNext, setVisibleNext] = useState(false);

  const {
    data: stories,
    isLoading,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetStories({
    where: {
      and: [
        {story: {user: {id: {eq: user?.id}}}},
        {story: {isDraft: {eq: false}}},
      ],
    },
    order: [{story: {createdDate: 'DESC'}}],
  });

  const {} = useHeader({
    title: {children: 'Add new highlight', fontWeight: 'bold'},
  });

  const selectedItems = useRef<any[]>([]);
  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <AddHighlghtItem {...{item, index, selectedItems, setVisibleNext}} />
    ),
    [],
  );

  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const [visible, setVisible] = useState(false);
  const {toast} = useToast();
  const nextOnPress = () => {
    if (selectedItems?.current?.length < 1) {
      toast({message: 'At least select on item'});
    } else setVisible(true);
  };

  const onCloseModal = () => setVisible(false);

  return (
    <View style={styles.flex1}>
      {isLoading && <LoadIndicator />}
      <FlatList
        onEndReached={onLoadMore}
        data={stories?.pages}
        renderItem={renderItem}
        numColumns={3}
        refreshing={false}
        onRefresh={refetch}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      {visibleNext && (
        <Button style={styles.button} onPress={nextOnPress}>
          Next
        </Button>
      )}
      <HighlightTitleModal
        isVisible={visible}
        onClose={onCloseModal}
        items={selectedItems.current}
      />
    </View>
  );
};
export default AddHighlght;

const itemWidth = (deviceWidth - 44) / 3;

const styles = StyleSheet.create({
  image: {width: itemWidth, height: itemWidth * 2, marginBottom: 2},
  button: {position: 'absolute', bottom: 14, zIndex: 1, right: 0, left: 0},
  selector: {position: 'absolute', right: 4, top: 4},
  dateText: {
    position: 'absolute',
    left: 4,
    borderRadius: 5,
    top: 4,
    backgroundColor: 'rgba(39, 39, 42, 0.70)',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  flex1: {flex: 1},
});
