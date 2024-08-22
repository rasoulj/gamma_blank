import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Layer, Typography, useNavigate, useRoute} from '~/components/elemental';
import {Button} from 'native-base';
import {useDeletePost} from '../../hook';
import {useQueryClient} from 'react-query';

const DeleteConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigation} = useNavigate();
  const queryClient = useQueryClient();
  const route = useRoute();

  const {mutate: mutateDeletePost, isLoading: isLoadingDeletePost} =
    useDeletePost();
  const handleDeletePost = () => {
    mutateDeletePost(
      {entityId: item?.id},
      {
        onSuccess: success => {
          onClose();
          queryClient.invalidateQueries(['getPosts'], {exact: false});
          queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
            exact: false,
          });
          queryClient.invalidateQueries(['user_getUsers'], {exact: false});
          if (route?.key?.includes('PostDetail')) {
            navigation?.goBack();
          }
        },
        onError: error => {},
      },
    );
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer>
          <Typography style={styles.title}>Confirmation</Typography>
          <Typography style={styles.description}>
            {`Are you sure you want to delete this ${
              item?.postType === 'POST' ? 'post' : 'reel'
            }?`}
          </Typography>
          <Layer style={styles.layerButton} data-parent="content-delete-layer">
            <Button
              style={styles.button}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              isLoading={isLoadingDeletePost}
              style={styles.button}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => handleDeletePost()}>
              Delete
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  button: {position: 'relative', borderRadius: 20, width: '47%'},

  layerButton: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },

  description: {
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },

  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
});
