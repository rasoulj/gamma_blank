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
import BlockConfirmModal from './BlockConfirmModal';

const ProfileModal = ({
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
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);

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
        </View>
      </CustomActionSheet>
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

export default ProfileModal;

const styles = StyleSheet.create({});
