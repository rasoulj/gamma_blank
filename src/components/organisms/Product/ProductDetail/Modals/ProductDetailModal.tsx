import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  Divider,
  EditIconSet,
  Layer,
  ReportIcon,
  Share2Icon,
  ShareIcon,
  Trash2Icon,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import ReportListModal from './ReportListModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import ShareModal from './ShareModal';
import {Share3Icon} from '~/assets';
const appConfig = require('../../../../../../app.json');
import config from 'config';
import {Share} from 'react-native';

const ProductDetailModal = ({
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
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);

  const deepLink = `${config?.baseURL}/share?redirecturl=${String(
    appConfig?.name,
  ).toLocaleLowerCase()}://Product/detail/${item?.id}`;

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: `${appConfig?.name} shared a link: ${deepLink}`,
        url: deepLink,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log(`Shared via ${result.activityType}`);
          onClose();
        } else {
          // Shared
          console.log('Shared successfully');
          onClose();
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
        onClose();
      }
    } catch (error) {
      console.error('Error sharing link:', error.message);
    }
  };

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
                    navigateWithName('Create product', {
                      productId: item?.id,
                      item,
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
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
      <ShareModal
        item={item}
        isVisible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
      />
    </>
  );
};

export default ProductDetailModal;

const styles = StyleSheet.create({});
