// ConfirmDeleteWishlistItem.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQueryClient } from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Layer,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import { useRemoveFromWishList } from '~/components/organisms/WishList/hook';

const ConfirmDeleteWishlistItem = ({
  selectedIds,
  isVisible,
  onClose,
}: {
  selectedIds: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const route: any = useRoute();
  const queryClient = useQueryClient();

  const {mutate: mutateRemoveFromWishList,isLoading} = useRemoveFromWishList();
  const removeFromWishlist = () => {
    mutateRemoveFromWishList(
      {wishListId: route?.params?.WishlistId, entityIdList: selectedIds},
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['getShoppingCards']);
          queryClient.refetchQueries(['getProducts']);
          queryClient.refetchQueries(['getWishLists']);
          onClose()
        },
      },
    );
  };
  return (
    <CustomActionSheet
      title="Confirmation"
      isVisible={isVisible}
      onClose={onClose}>
      <View style={styles.container}>
        <Layer style={{marginLeft: 20, marginRight: 20}}>
          <Typography style={styles.text}>
            Are you sure you want to delete this{' '}
            {selectedIds?.lenght > 1 ? 'items' : 'item'}?
          </Typography>
          <Layer
            style={styles.buttonContainer}
            data-parent="content-delete-layer">
            <Button
              style={styles.cancelButton}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              <Typography color={'primary.500'} style={styles.cancelButtonText}>Cancel</Typography>
            </Button>
            <Button
              isLoading={isLoading}
              style={styles.deleteButton}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => removeFromWishlist()}>
              <Typography color={"background.500"} style={styles.deleteButtonText}>Delete</Typography>
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default ConfirmDeleteWishlistItem;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  text: {
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    position: 'relative',
    width: '47%',
    height: 36,
  },
  deleteButton: {
    position: 'relative',
    width: '47%',
    height: 36,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
