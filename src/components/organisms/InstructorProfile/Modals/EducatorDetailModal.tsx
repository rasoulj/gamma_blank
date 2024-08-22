import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BellIcon,
  BlockIcon,
  Divider,
  EditIconSet,
  Layer,
  NotificationIconSet,
  ReportIcon,
  Trash2Icon,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import TurnNotifModal from './TurnNotifModal';
import ReportListModal from './ReportListModal';
import {
  useDisableNotificationUser,
  useEnableNotificationUser,
  useGetDisabledNotification,
} from '../../CourseList/hook';
import {useQueryClient} from 'react-query';

const EducatorDetailModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const user = useAuthStore(state => state?.user);

  const {data} = useGetDisabledNotification({
    where: {targetUserId: {eq: item?.id}},
  });

  const {mutate} = useDisableNotificationUser();

  const isMine = item?.userId === user?.id || user?.userType === 'OWNER';
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.container}>
          {isMine ? (
            <>
              <Layer>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => {
                    navigateWithName('edit content', {item});
                    onClose();
                  }}>
                  <EditIconSet />
                  <Typography style={styles.text}>Edit</Typography>
                </TouchableOpacity>
                <Divider />
              </Layer>
              <Layer>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => {
                    onClose();
                    setIsDeleteModalVisible(true);
                  }}>
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
                  style={styles.container3}
                  onPress={() => {
                    if (data?.pages?.length > 0) {
                      onClose();
                      setIsNotifVisible(true);
                    } else {
                      mutate(
                        {targetUserId: item?.id},
                        {
                          onSuccess() {
                            queryClient.invalidateQueries(
                              'getDisabledNotification',
                            );
                            onClose();
                          },
                        },
                      );
                    }
                  }}>
                  <NotificationIconSet color={'grey.800'} />
                  <Typography
                    color={'gray.800'}
                    fontSize="sm"
                    style={styles.text}>
                    {data?.pages?.length > 0
                      ? 'Turn on Notification'
                      : 'Turn off Notification'}
                  </Typography>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                  style={styles.container2}
                  onPress={() => {
                    onClose();
                    setIsReportModalVisible(true);
                  }}>
                  <ReportIcon color={getColor({color: 'error.500'})} />
                  <Typography
                    color={'error.500'}
                    fontSize="sm"
                    style={styles.text}>
                    Report this Educator
                  </Typography>
                </TouchableOpacity>
              </Layer>
            </>
          )}
        </View>
      </CustomActionSheet>
      <TurnNotifModal
        item={item}
        isVisible={isNotifVisible}
        onClose={() => setIsNotifVisible(false)}
      />
      <ReportListModal
        entityName="educator"
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </>
  );
};

export default EducatorDetailModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 10,
  },
  text: {marginLeft: 8, fontWeight: 'bold'},
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
});
