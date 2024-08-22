import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ConfirmationActionSheet,
  CustomActionSheet,
  Divider,
  EditIconSet,
  FolderAddIconSet,
  Grid7IconSet,
  TrashIconSet,
  Typography,
  useNavigate,
  useToast,
} from '~/components';
import {useDeleteWishlistMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {useState} from 'react';
import CreateWishlistActionSheet from '../SocialHome/PostList/Modals/CreateWishlistActionSheet';
import {Box} from 'native-base';
import {scale} from '~/components/elemental';

const MenuActionSheet = ({item, isVisible, onClose}) => {
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const {navigateWithName} = useNavigate();
  const {toast} = useToast();
  const queryClient = useQueryClient();

  const onDeletePress = () => {
    setVisibleConfirm(true);
  };
  const onCloseConfirm = () => {
    setVisibleConfirm(false);
    onClose();
  };

  const onEditPress = () => setVisibleEdit(true);
  const onCloseEdit = () => {
    setVisibleEdit(false);
    onClose();
  };

  const {mutate, isLoading} = useDeleteWishlistMutation();
  const onConfirmDeletePress = () => {
    mutate(
      {wishListId: item?.id},
      {
        onSuccess: data => {
          if (data?.post_deleteWishList?.code === 1) {
            onClose();
            toast({message: 'Removed successfully', type: 'success'});
            queryClient.invalidateQueries(['post_getWishLists'], {
              exact: false,
            });
          } else {
            onClose();
            toast({message: data?.post_deleteWishList?.value, type: 'error'});
          }
        },
      },
    );
  };

  const onSelectPress = () => {
    onClose();
    navigateWithName('WishListDetail', {
      mode: 'select',
      boardId: item?.id,
      isMainBoard: item?.name === 'All Items',
    });
  };
  const onAddToBoardPress = () => {
    onClose();
    navigateWithName('WishListDetail', {
      mode: 'add',
      boardId: item?.id,
    });
  };

  if (visibleEdit)
    return (
      <CreateWishlistActionSheet
        isVisible={visibleEdit}
        onClose={onCloseEdit}
        boardId={item?.id}
        type="edit"
        boardName={item?.name}
      />
    );
  if (visibleConfirm)
    return (
      <ConfirmationActionSheet
        isOpen={visibleConfirm}
        onConfirmPress={onConfirmDeletePress}
        isLoading={isLoading}
        description="Are you sure you want to Delete this Board?"
        title="Confirmation"
        onClose={onCloseConfirm}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      {item?.name === 'All Items' ? (
        <MenuItem
          IconName={Grid7IconSet}
          onPress={onSelectPress}
          title={'Select'}
          hasBorder={false}
        />
      ) : (
        <View>
          <MenuItem
            IconName={EditIconSet}
            onPress={onEditPress}
            title={'Edit board name'}
          />
          <MenuItem
            IconName={Grid7IconSet}
            onPress={onSelectPress}
            title={'Select'}
          />
          <MenuItem
            IconName={FolderAddIconSet}
            title={'Add to board'}
            onPress={onAddToBoardPress}
          />
          <MenuItem
            IconName={TrashIconSet}
            onPress={onDeletePress}
            title={'Delete'}
            hasBorder={false}
          />
        </View>
      )}
    </CustomActionSheet>
  );
};

export default MenuActionSheet;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
});

const MenuItem = ({onPress, title, IconName, hasBorder = true}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <IconName width={scale(24)} height={scale(24)} />
          <Typography
            marginLeft={2}
            fontWeight="800"
            fontSize="sm"
            color="gray.800">
            {title}
          </Typography>
        </View>
      </TouchableOpacity>
      {hasBorder ? <Divider my={4} /> : <Box h={4} />}
    </View>
  );
};
