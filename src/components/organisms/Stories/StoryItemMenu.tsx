import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Divider,
  EyeSlashIconSet,
  ReportIcon,
  Typography,
  getColor,
} from '~/components/elemental';
import {ReportsModal} from '~/components';
import MuteModal from './MuteModal';

const StoryItemMenu = ({
  item,
  isVisible,
  onClose,
  onPauseTimeline,
  onPressOut,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  onPauseTimeline: any;
  onPressOut: any;
}) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isMuteModalVisible, setIsMuteModalVisible] = useState(false);

  const onMutePress = () => {
    onClose();
    setIsMuteModalVisible(true);
  };
  const onCloseMuteModal = () => {
    onPressOut();
    setIsMuteModalVisible(false);
  };
  const onCloseMenu = () => {
    onPressOut();
    onClose();
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onCloseMenu}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.touchable} onPress={onMutePress}>
            <EyeSlashIconSet />
            <Typography style={styles.text}>Mute</Typography>
          </TouchableOpacity>
          <Divider />
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
        </View>
      </CustomActionSheet>
      <ReportsModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        targetEntityName="story"
        onCloseAllReportModals={onPressOut}
      />
      <MuteModal
        isVisible={isMuteModalVisible}
        item={item}
        onClose={onCloseMuteModal}
      />
    </>
  );
};

export default StoryItemMenu;

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
