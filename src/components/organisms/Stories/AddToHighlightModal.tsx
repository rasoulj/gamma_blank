import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, FlatList, Typography, VStack} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import useAuthStore from '~/stores/authStore';
import {useGetHighlights} from './hooks';
import AddHighlightItem from './AddHighlightItem';

const AddToHighlightModal = ({
  isVisible,
  onClose,
  onPressNewHighlight,
  item,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onPressNewHighlight?: any;
}) => {
  const user = useAuthStore(state => state.user);
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useGetHighlights({
      userId: user?.id,
      order: [{highlight: {createdDate: 'DESC'}}],
      storyId: item?.id,
    });
  const renderItem = ({item: highlightItem, index}) => {
    return (
      <AddHighlightItem
        isAdded={highlightItem?.containsThisStory}
        {...{
          storyId: item?.id,
          highlightItem: highlightItem?.highlight,
          onClose,
        }}
      />
    );
  };
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <VStack
        space="4"
        maxH={'90%'}
        bgColor="background.500"
        borderTopRadius={'25'}>
        <Typography
          fontWeight={'700'}
          fontSize="lg"
          color={'gray.800'}
          alignSelf="center">
          Add to
        </Typography>
        <TouchableOpacity onPress={onPressNewHighlight}>
          <VStack
            borderWidth="2"
            borderColor="primary.500"
            h="12"
            w="100%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            borderRadius="10">
            <Typography
              fontWeight={'600'}
              fontSize="md"
              color="primary.500"
              alignSelf="center">
              Create New Highlight
            </Typography>
          </VStack>
        </TouchableOpacity>
        <VStack h="100%">
          <FlatList
            data={data?.pages}
            renderItem={renderItem}
            isLoading={isLoading}
            onEndReached={onLoadMore}
            isFetchingNextPage={isFetchingNextPage}
            style={{marginTop: 16}}
            ItemSeparatorComponent={() => <Box h="5" />}
            ListFooterComponent={() => <Box h={170} />}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      </VStack>
    </CustomActionSheet>
  );
};

export default AddToHighlightModal;
