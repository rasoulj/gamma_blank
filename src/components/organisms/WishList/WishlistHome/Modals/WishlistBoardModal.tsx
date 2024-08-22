import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  FlatList,
  Typography,
  deviceHeight,
} from '~/components/elemental';
import AddBoardModal from './AddBoardModal';
import {useGetWishLists} from '../../hook';
import WishListBoarditem from './WishListBoardItem';

const WishListBoardModal = ({
  ids,
  item,
  isVisible,
  onClose,
  onVisible,
  entityName,
}: {
  ids?: Array<Number>;
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onVisible?: () => void;
  entityName: 'product' | 'post';
}) => {
  const [isAddBoardVisible, setIsAddBoardVisible] = useState(false);
  const [addedToWishList, setAddedToWishList] = useState([]);

  const {data, hasNextPage, fetchNextPage, refetch, isRefetching} =
    useGetWishLists({
      entityName,
      entityId: item?.product?.id
        ? item?.product?.id
        : item?.id
        ? item?.id
        : ids?.length === 1
        ? ids?.[0]
        : undefined,
    });

  const product = item?.product;
  const renderItem = ({item}) => {
    return (
      <WishListBoarditem
        {...{
          item: {...item, product},
          ids,
          addedToWishList,
          setAddedToWishList,
          onClose,
          product,
        }}
      />
    );
  };
  
  if (isAddBoardVisible)
    return (
      <AddBoardModal
        entityName={entityName}
        item={item}
        isVisible={isAddBoardVisible}
        refetch={refetch}
        onClose={() => [setIsAddBoardVisible(false), onVisible?.()]}
        ids={ids}
      />
    );
  return (
    <CustomActionSheet
      isVisible={isVisible}
      onClose={() => [onClose(), setAddedToWishList([])]}>
      <Typography style={styles.addTo}>Add to</Typography>
      <Button
        variant={'outline'}
        style={styles.createBtn}
        onPress={() => [setIsAddBoardVisible(true)]}>
        <Typography
          color={'primary.500'}
          fontSize="sm"
          fontWeight="700"
          lineHeight={16}>
          Create New Board
        </Typography>
      </Button>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={data?.pages}
        refreshing={isRefetching}
        onRefresh={refetch}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </CustomActionSheet>
  );
};

export default WishListBoardModal;

const styles = StyleSheet.create({
  createBtn: {marginBottom: 10, height: 36},
  flatList: {
    flexGrow: 1,
    height: deviceHeight / 3,
  },
  addTo: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
