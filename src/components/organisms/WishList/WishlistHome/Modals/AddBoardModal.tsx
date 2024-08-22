import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Input,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import {useAddToWishList, useAddWishList, useUpdateWishList} from '../../hook';
import AddBoardConfirmModal from './AddBoardConfirmModal';

const AddBoardModal = ({
  item,
  isVisible,
  onClose,
  entityName,
  ids,
  refetch,
  type = 'add',
}: {
  item?: any;
  isVisible: boolean;
  onClose: () => void;
  entityName: 'product' | 'post';
  ids?: any;
  refetch?: any;
  type?: 'add' | 'edit';
}) => {
  const queryClient = useQueryClient();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [text, setText] = useState('');
  const route = useRoute();
  const {navigation} = useNavigate();

  const invalidateWishlistQueries = () => {
    queryClient.invalidateQueries(['getShoppingCards']);
    queryClient.refetchQueries(['getProducts']);
    queryClient.invalidateQueries(['getWishLists'], {exact: false});
    queryClient.invalidateQueries(['getPosts'], {exact: false});
    queryClient.invalidateQueries(['getWishListPosts'], {exact: false});
    queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
      exact: false,
    });
  };

  const {mutate, isLoading} =
    type === 'edit' ? useUpdateWishList() : useAddWishList();
  const {mutate: addToWhislistMutate, isLoading: addLoading} =
    useAddToWishList();
  const onSubmit = () => {
    mutate(
      {
        input: {
          name: text,
          id: type === 'edit' ? item?.id : undefined,
          entityName,
        },
      },
      {
        onSuccess(data) {
          if (data?.wishList_createWishList?.status?.code === 1) {
            refetch?.();
            if (ids && ids?.length > 0)
              onAddToWishlist(data?.wishList_createWishList?.result?.id);
            else {
              invalidateWishlistQueries();
              setIsConfirmModalVisible(true);
            }
          } else {
            if (route?.name === 'ProductListScreen') {
              navigation?.goBack();
            }
            invalidateWishlistQueries();
            if (!item) {
              setIsConfirmModalVisible(true);
            }
          }
          onClose();
        },
      },
    );
  };

  const onAddToWishlist = id => {
    addToWhislistMutate(
      {entityIdList: ids, wishListId: id},
      {
        onSuccess(data) {
          invalidateWishlistQueries();
          if (!item) {
            setIsConfirmModalVisible(true);
          }

          onClose();
        },
      },
    );
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <Typography
          fontSize="lg"
          fontWeight="700"
          alignSelf="center"
          marginTop={2}
          marginBottom={4}>
          {item?.name ? 'Edit Board' : 'Create New Board'}
        </Typography>
        <Typography fontSize="md" fontWeight="500" marginBottom={1}>
          Board Name
        </Typography>
        <Input
          defaultValue={item?.name}
          style={styles.input}
          placeholder="Input Text Here"
          onChangeText={setText}
        />
        <View style={styles.row}>
          <Button
            variant={'outline'}
            style={styles.cancelBtn}
            onPress={onClose}>
            <Typography
              color={'primary.500'}
              fontSize="sm"
              fontWeight="700"
              lineHeight={16}>
              Cancel
            </Typography>
          </Button>
          <Button
            isLoading={isLoading}
            style={styles.saveBtn}
            onPress={onSubmit}>
            <Typography
              color={'background.500'}
              fontSize="sm"
              fontWeight="700"
              lineHeight={16}>
              Save
            </Typography>
          </Button>
        </View>
      </CustomActionSheet>
      <AddBoardConfirmModal
        isVisible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
      />
    </>
  );
};

export default AddBoardModal;

const styles = StyleSheet.create({
  saveBtn: {flex: 1, height: 36},

  cancelBtn: {flex: 1, marginRight: 16, height: 36},

  input: {marginBottom: 24},

  row: {flexDirection: 'row'},
});
