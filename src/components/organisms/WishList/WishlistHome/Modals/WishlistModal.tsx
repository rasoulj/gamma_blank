import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  EditIconSet,
  Element4IconSet,
  FolderAddIconSet,
  Layer,
  Trash2Icon,
  Typography,
  useNavigate,
} from '~/components/elemental';
import {TouchableOpacity} from 'react-native';
import DeleteConfirmModal from './DeleteConfirmModal';
import AddBoardModal from './AddBoardModal';

const WishlistModal = ({dtoItem, isVisible, onClose}) => {
  const {navigateWithName} = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const item = dtoItem?.wishList;
  const entityName = item?.entityName;

  const config = [
    {
      title: 'Edit Board Name',
      color: '',
      icon: <EditIconSet />,
      onPress: () => [setIsEditModalVisible(true), onClose()],
    },
    {
      title: 'Select',
      color: '',
      icon: <Element4IconSet />,
      onPress: () =>
        entityName === 'product'
          ? [
              navigateWithName('productlist', {
                isWishList: true,
                selectable: true,
                WishlistId: item?.id,
                item,
              }),
              onClose(),
            ]
          : [
              navigateWithName('wishlistDetail', {
                isWishList: true,
                selectable: true,
                WishlistId: item?.id,
                item,
              }),
              onClose(),
            ],
    },
    {
      title: 'Add to Board',
      color: '',
      icon: <FolderAddIconSet />,
      onPress: () =>
        entityName === 'product'
          ? [
              onClose(),
              navigateWithName('productlist', {
                isWishList: true,
                selectable: true,
                isAddToBorad: true,
                WishlistId: item?.id,
                item,
              }),
            ]
          : [
              navigateWithName('wishlistDetail', {
                isWishList: true,
                selectable: true,
                isAddToBorad: true,
                WishlistId: item?.id,
                item,
              }),
              onClose(),
            ],
    },
    {
      title: 'Delete',
      color: 'error.500',
      icon: <Trash2Icon color="error.600" />,
      onPress: () => [setIsDeleteModalVisible(true), onClose()],
    },
  ];
  const AllItemConfig = [config[1]];

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        {[...(item?.name === 'All Items' ? AllItemConfig : config)]?.map(
          item => {
            return (
              <Layer>
                <TouchableOpacity
                  style={styles.itemTouchable}
                  onPress={item?.onPress}>
                  {item.icon}
                  <Typography
                    color={item?.color ? item?.color : ''}
                    marginLeft={2}
                    fontWeight="bold">
                    {item?.title}
                  </Typography>
                </TouchableOpacity>
              </Layer>
            );
          },
        )}
      </CustomActionSheet>
      <AddBoardModal
        entityName={item?.entityName}
        item={item}
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        type="edit"
      />
      <DeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </>
  );
};

export default WishlistModal;

const styles = StyleSheet.create({
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 10,
  },
});
