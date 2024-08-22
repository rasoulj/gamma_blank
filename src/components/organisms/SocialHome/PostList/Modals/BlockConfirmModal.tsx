import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Layer, Typography} from '~/components/elemental';
import {Button} from 'native-base';
import {useCreateBlockUser} from '../../hook';
import {useQueryClient} from 'react-query';
import SuccessBlockModal from '~/components/organisms/Profile/SuccessBlockModal';

const BlockConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const {mutate: createBlockUser, isLoading: createBlockUserLoading} =
    useCreateBlockUser();

  const handleBlockUser = () => {
    const input: any = {
      blockedUserId: item?.poster?.id,
    };
    createBlockUser(
      {input},
      {
        onSuccess: success => {
          if (success?.blockUser_block?.status?.code === 1) {
            queryClient.refetchQueries('getPosts');
            setVisibleSuccess(true);
          }
        },
        onError: error => {},
      },
    );
  };

  const onCloseSuccessModal = () => {
    setVisibleSuccess(false);
    onClose();
  };

  if (visibleSuccess)
    return (
      <SuccessBlockModal
        isVisible={visibleSuccess}
        onClose={onCloseSuccessModal}
        isBlocked={true}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Typography textAlign="center" fontSize="sm" fontWeight="bold">
          Block
        </Typography>
        <Typography style={styles.description}>
          Are you sure you want to block this user?
        </Typography>
        <Layer style={styles.btnContainer}>
          <Button
            data-name="Button"
            width="45%"
            variant="outline"
            onPress={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={createBlockUserLoading}
            width="45%"
            colorScheme="error.500"
            bgColor="error.500"
            variant="solid"
            data-parent="button_box"
            onPress={handleBlockUser}>
            Block
          </Button>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default BlockConfirmModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 50,
    width: '100%',
  },
});
