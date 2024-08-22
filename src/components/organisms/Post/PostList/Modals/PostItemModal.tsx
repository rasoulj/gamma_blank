import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  Divider,
  EditIconSet,
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

  const user = useAuthStore(state => state?.user);
  const isMine = item?.poster?.id === user?.id;
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}>
          {isMine ? (
            <>
              <Layer
                style={{
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                    marginTop: 16,
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    navigateWithName('editPost', {
                      item: {postId: item?.id},
                    });
                    onClose();
                  }}>
                  <EditIconSet />
                  <Typography style={{marginLeft: 8, fontWeight: 'bold'}}>
                    Edit
                  </Typography>
                </TouchableOpacity>
                <Divider />
              </Layer>
              <Layer
                style={{
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                    marginTop: 16,
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    onClose();
                    setIsDeleteModalVisible(true);
                  }}>
                  <Trash2Icon color="error.600" />
                  <Typography
                    color={'error.600'}
                    style={{marginLeft: 8, fontWeight: 'bold'}}>
                    Delete
                  </Typography>
                </TouchableOpacity>
              </Layer>
            </>
          ) : (
            <>
              <Layer
                style={{
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                    marginTop: 16,
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    onClose();
                    setIsReportModalVisible(true);
                  }}>
                  <ReportIcon color={getColor({color: 'error.600'})} />
                  <Typography
                    color={'error.600'}
                    style={{marginLeft: 8, fontWeight: 'bold'}}>
                    Report
                  </Typography>
                </TouchableOpacity>
                <Divider />
              </Layer>
              <Layer
                style={{
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                    marginTop: 16,
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    onClose();
                    setIsBlockUserModalVisible(true);
                  }}>
                  <BlockIcon color={'error.600'} />
                  <Typography
                    color={'error.600'}
                    style={{marginLeft: 8, fontWeight: 'bold'}}>
                    Block {item?.poster?.fullName}
                  </Typography>
                </TouchableOpacity>
              </Layer>
            </>
          )}
        </View>
      </CustomActionSheet>
      <DeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
      <BlockConfirmModal
        item={item}
        isVisible={isBlockUserModalVisible}
        onClose={() => setIsBlockUserModalVisible(false)}
      />
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </>
  );
};

export default PostItemModal;

const styles = StyleSheet.create({});
