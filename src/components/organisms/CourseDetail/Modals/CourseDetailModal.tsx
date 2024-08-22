import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Divider,
  ReportIcon,
  Typography,
  getColor,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import ReportListModal from './ReportListModal';
import {Share3Icon} from '~/assets';
import CourseShareModal from './CourseShareModal';

const CourseDetailModal = ({
  item,
  isVisible,
  onClose,
  reportTitle = 'Course',
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  reportTitle?: string;
}) => {
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);

  const isMine = item?.userId === user?.id || user?.userType === 'OWNER';
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnContainer2}
            onPress={() => {
              onClose();
              setIsShareModalVisible(true);
            }}>
            <Share3Icon color={'grey.800'} />
            <Typography
              color={'grey.800'}
              fontSize="sm"
              style={styles.reportTitle}>
              Share
            </Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              onClose();
              setIsReportModalVisible(true);
            }}>
            <ReportIcon color={getColor({color: 'error.500'})} />
            <Typography
              color={'error.500'}
              fontSize="sm"
              style={styles.reportTitle}>
              Report this {reportTitle}
            </Typography>
          </TouchableOpacity>
        </View>
      </CustomActionSheet>
      <CourseShareModal
        item={item}
        isVisible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
      />
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </>
  );
};

export default CourseDetailModal;

const styles = StyleSheet.create({
  reportTitle: {marginLeft: 8, fontWeight: 'bold'},
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  btnContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
});
