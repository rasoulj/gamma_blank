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

const ContentItemModal = ({
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
  console.log(item);
  
  const isMine = item?.userId === user?.id ||  user?.userType === 'OWNER';
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
                    navigateWithName('edit content', {item});
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
   
    </>
  );
};

export default ContentItemModal;

const styles = StyleSheet.create({});
