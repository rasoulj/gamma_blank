import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  Divider,
  EditIconSet,
  Layer,
  ReportIcon,
  Share,
  Share2Icon,
  ShareIcon,
  Trash2Icon,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import DeleteConfirmModal from './DeleteConfirmModal';

const PromotionModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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
                  navigateWithName('Create promotion', {
                    item
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
                  Delete this promotion
                </Typography>
              </TouchableOpacity>
            </Layer>
          </>
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

export default PromotionModal;

const styles = StyleSheet.create({});
