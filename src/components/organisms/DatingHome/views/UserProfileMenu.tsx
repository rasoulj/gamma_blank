import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  ConfirmationActionSheet,
  ReportIcon,
  Typography,
  getColor,
  useNavigate,
  useToast,
} from '~/components/elemental';
import ReportListModal from '~/components/molecules/ReportModal';
import {useBlockUserhMutation} from '../../DatingLikes/hooks';

const UserProfileMenu = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {toast} = useToast();
  const {navigation} = useNavigate();
  const [isBlockUserModalVisible, setIsBlockUserModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const closeBlock = () => {
    onClose();
    setIsBlockUserModalVisible(false);
  };
  const openBlock = () => {
    setIsBlockUserModalVisible(true);
  };

  const {mutate, isLoading} = useBlockUserhMutation();
  const onConfirmPress = () => {
    mutate(
      {input: {blockedUserId: item?.id}},
      {
        onSuccess: data => {
          closeBlock();
          if (data?.blockUser_block?.status?.code === 1) {
            toast({message: 'Blocked successfully', type: 'success'});
            navigation.goBack();
          } else {
            toast({
              message: data?.blockUser_block?.status?.value ?? 'Failed',
              type: 'error',
            });
          }
        },
        onError: () => {
          toast({message: 'Something went wrong', type: 'error'});
        },
      },
    );
  };

  if (isReportModalVisible)
    return (
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => {
          setIsReportModalVisible(false);
        }}
        targetEntityName="user"
      />
    );

  if (isBlockUserModalVisible)
    return (
      <ConfirmationActionSheet
        description={'Are you sure you want to block this user?'}
        isOpen={isBlockUserModalVisible}
        onClose={closeBlock}
        onConfirmPress={onConfirmPress}
        confirmButtonText="Block"
        isLoading={isLoading}
      />
    );

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            onClose();
            setIsReportModalVisible(true);
          }}>
          <ReportIcon color={getColor({color: 'error.600'})} />
          <Typography color={'error.600'} style={styles.text}>
            Report
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={openBlock}>
          <BlockIcon color={'error.600'} />
          <Typography color={'error.600'} style={styles.text}>
            Block user
          </Typography>
        </TouchableOpacity>
      </View>
    </CustomActionSheet>
  );
};

export default UserProfileMenu;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },

  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 10,
  },

  text: {marginLeft: 8, fontWeight: 'bold'},
});
