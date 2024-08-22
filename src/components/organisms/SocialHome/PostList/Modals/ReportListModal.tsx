import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Layer,
  RightIcon,
  Typography,
  deviceHeight,
  getColor,
  useToast,
} from '~/components/elemental';
import {useCreateViolationReport} from '../../hook';
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
  {id: 9, text: `Other`},
];

const ReportListModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const user = useAuthStore(state => state?.user);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportConfirmModalVisible, setIsReportConfirmModalVisible] =
    useState(false);

  const {mutate: createViolationReport, isLoading: isLoadingReport} =
    useCreateViolationReport();
  const {toast} = useToast();
  const handleCreateViolationReport = text => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: item?.id,
      reason: text?.report ? text?.report : text,
      targetEntityName: 'post',
    };
    createViolationReport(inputItem, {
      onSuccess: success => {
        if (
          success?.violationReport_createViolationReport?.status?.code === 7
        ) {
          onClose();
          toast({message: 'Already reported'});
        } else {
          setIsReportConfirmModalVisible(true);
        }
      },
      onError: error => {},
    });
  };

  const renderReportItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        onPress={() => {
          if (item?.text === 'Other') {
            setIsReportModalVisible(true);
          } else handleCreateViolationReport(item?.text);
        }}>
        <Layer style={styles.touchable}>
          <Typography fontSize="sm">{item?.text}</Typography>
          <RightIcon color="gray.800" height={24} width={24} />
        </Layer>
        <Layer style={styles.bottomLayer} />
      </TouchableOpacity>
    ),
    [],
  );

  if (isReportModalVisible)
    return (
      <ReportModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => {
          setIsReportModalVisible(false);
          onClose();
        }}
      />
    );
  if (isReportConfirmModalVisible)
    return (
      <ReportConfirmModal
        isVisible={isReportConfirmModalVisible}
        onClose={() => {
          setIsReportConfirmModalVisible(false);
          onClose();
        }}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer style={styles.layerContainer}>
          <Typography textAlign="center" fontSize="sm" fontWeight="bold">
            Report
          </Typography>
          <FlatList data={reportItems || []} renderItem={renderReportItem} />
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default ReportListModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  layerContainer: {
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
    height: deviceHeight / 1.5,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  bottomLayer: {
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 0.7,
  },
});
