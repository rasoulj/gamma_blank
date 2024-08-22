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
import ReportListModal from './ReportListModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import BlockConfirmModal from './BlockConfirmModal';

const ServiceDetailModal = ({
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

  const isMine = item?.userId === user?.id || user?.userType === 'OWNER';
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
                    navigateWithName('edit Service', {item});
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
                    Report this content
                  </Typography>
                </TouchableOpacity>
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
                    Block user
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

export default ServiceDetailModal;

const styles = StyleSheet.create({});
