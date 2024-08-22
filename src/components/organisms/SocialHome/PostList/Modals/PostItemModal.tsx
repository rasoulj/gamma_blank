import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  Divider,
  EditIconSet,
  EyeSlashIconSet,
  Layer,
  ReportIcon,
  Trash2Icon,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import DeleteConfirmModal from './DeleteConfirmModal';
import BlockConfirmModal from './BlockConfirmModal';
import ReportListModal from './ReportListModal';
import MuteModal from './MuteModal';

const PostItemModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const [isBlockUserModalVisible, setIsBlockUserModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isMuteModalVisible, setIsMuteModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);
  const isMine = item?.poster?.id === user?.id;

  const onEditPress = () => {
    onClose();
    if (item?.postType === 'REELS')
      navigateWithName('EditPost', {
        item: {postId: item?.id, item, postType: 'REELS'},
      });
    else
      navigateWithName('EditPost', {
        item: {
          postId: item?.id,
          ...item,
          postType: 'POST',
          mediaGalleryUrl: item?.mediaGalleryUrl
            ? JSON.parse(item?.mediaGalleryUrl)
            : {},
        },
      });
  };

  const onCloseDelete = () => {
    setIsDeleteModalVisible(false);
    onClose();
  };
  const onOpenDeleteConfirm = () => {
    setIsDeleteModalVisible(true);
  };

  const onOpenBlockModal = () => setIsBlockUserModalVisible(true);
  const onCLoseBlockModal = () => {
    setIsBlockUserModalVisible(false);
    onClose();
  };

  const onOpenMuteModal = () => setIsMuteModalVisible(true);
  const onCLoseMuteModal = () => {
    setIsMuteModalVisible(false);
    onClose();
  };

  const onOpenReoprtModal = () => setIsReportModalVisible(true);
  const onCLoseReportModal = () => {
    setIsReportModalVisible(false);
    onClose();
  };

  if (isDeleteModalVisible)
    return (
      <DeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={onCloseDelete}
      />
    );
  if (isBlockUserModalVisible)
    return (
      <BlockConfirmModal
        item={item}
        isVisible={isBlockUserModalVisible}
        onClose={onCLoseBlockModal}
      />
    );
  if (isReportModalVisible)
    return (
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={onCLoseReportModal}
      />
    );
  if (isMuteModalVisible)
    return (
      <MuteModal
        isVisible={isMuteModalVisible}
        item={item}
        onClose={onCLoseMuteModal}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {isMine ? (
          <>
            <Layer>
              <TouchableOpacity style={styles.touchable} onPress={onEditPress}>
                <EditIconSet color="gray.800" />
                <Typography style={styles.text}>Edit</Typography>
              </TouchableOpacity>
              <Divider />
            </Layer>
            <Layer>
              <TouchableOpacity
                style={styles.touchable}
                onPress={onOpenDeleteConfirm}>
                <Trash2Icon color="error.600" />
                <Typography color={'error.600'} style={styles.text}>
                  Delete
                </Typography>
              </TouchableOpacity>
            </Layer>
          </>
        ) : (
          <>
            <Layer>
              <TouchableOpacity
                style={styles.touchable}
                onPress={onOpenMuteModal}>
                <EyeSlashIconSet color="gray.800" />
                <Typography style={styles.text}>Mute</Typography>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                style={styles.touchable}
                onPress={onOpenReoprtModal}>
                <ReportIcon color={getColor({color: 'error.600'})} />
                <Typography color={'error.600'} style={styles.text}>
                  Report
                </Typography>
              </TouchableOpacity>
              <Divider />
            </Layer>
            <Layer>
              <TouchableOpacity
                style={styles.touchable}
                onPress={onOpenBlockModal}>
                <BlockIcon color={'error.600'} />
                <Typography color={'error.600'} style={styles.text}>
                  Block {item?.poster?.fullName}
                </Typography>
              </TouchableOpacity>
            </Layer>
          </>
        )}
      </View>
    </CustomActionSheet>
  );
};

export default PostItemModal;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  text: {marginLeft: 8, fontWeight: 'bold'},
});
