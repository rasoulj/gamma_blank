import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Layer,
  LoadIndicator,
  RightIcon,
  Typography,
  deviceHeight,
  getColor,
} from '~/components/elemental';
import {useCreateViolationReport} from './hook';
import useAuthStore from '~/stores/authStore';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import ReportModal from './ReportModal';
import ReportConfirmModal from './ReportConfirmModal';

const reportItems = [
  {id: 1, text: `I just don't like it`},
  {id: 2, text: `It's a spam`},
  {id: 3, text: `Nudity or Sexual activity`},
  {id: 4, text: `Violence or dangerous`},
  {id: 5, text: `Bullying or harassement`},
  {id: 6, text: `False information`},
  {id: 7, text: `Hate speech or symbols`},
  {id: 8, text: `Suicide or self-injury`},
  {id: 9, text: `Other`, isOther: true},
];
const ReportListModal = ({
  item,
  isVisible,
  onClose,
  targetEntityName = 'post',
  onCloseAllReportModals,
  reportList = reportItems,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  targetEntityName?: string;
  onCloseAllReportModals?: any;
  reportList?: any[];
}) => {
  const user = useAuthStore(state => state?.user);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportConfirmModalVisible, setIsReportConfirmModalVisible] =
    useState(false);

  const handleReportClose = () => {
    onCloseAllReportModals?.();
    setIsReportModalVisible(false);
    setIsReportConfirmModalVisible(false);
    onClose();
  };

  const {mutate: createViolationReport, isLoading: isLoadingReport} =
    useCreateViolationReport();
  const handleCreateViolationReport = text => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: item?.id,
      reason: text?.report ?? text,
      targetEntityName,
    };
    createViolationReport(inputItem, {
      onSuccess: success => {
        if (
          success?.violationReport_createViolationReport?.status?.code === 1
        ) {
          setIsReportConfirmModalVisible(true);
        } else onClose();
      },
      onError: error => {},
    });
  };

  const renerReportItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        if (item?.isOther) {
          setIsReportModalVisible(true);
          return;
        }
        handleCreateViolationReport(item?.text);
      }}>
      <Layer style={styles.item}>
        <Typography fontSize="md">{item?.text}</Typography>
        <RightIcon color="primary.800" height="20px" />
      </Layer>
      <Layer style={styles.divider} />
    </TouchableOpacity>
  );
  if (isReportModalVisible)
    return (
      <ReportModal
        isVisible={isReportModalVisible}
        onClose={handleReportClose}
        handleCreateViolationReport={handleCreateViolationReport}
        isLoadingReport={isLoadingReport}
      />
    );
  if (isReportConfirmModalVisible)
    return (
      <ReportConfirmModal
        isVisible={isReportConfirmModalVisible}
        onClose={handleReportClose}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={handleReportClose}>
      <View style={styles.container}>
        {isLoadingReport && <LoadIndicator />}
        <Layer style={styles.innerView}>
          <Typography style={styles.title}>Report</Typography>
          <FlatList data={reportList} renderItem={renerReportItem} />
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default ReportListModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerView: {
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
    maxHeight: deviceHeight / 1.5,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  divider: {
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 0.7,
  },
});
