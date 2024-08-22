import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Layer,
  RightIcon,
  Typography,
  deviceHeight,
  getColor,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {useCreateViolationReport} from '../../Content/hook';
import ReportConfirmModal from '../../Content/ContentDetail/Modals/ReportConfirmModal';
import ReportModal from '../../Content/ContentDetail/Modals/ReportModal';

const reportItems = [
  {id: 1, text: `Inaccurate or Outdated Content`},
  {id: 2, text: `Low Quality or Poorly Structured`},
  {id: 3, text: `Inappropriate Content`},
  {id: 4, text: `Misleading Title or Description`},
  {id: 5, text: `Engagement Issues`},
  {id: 6, text: `Spam or Self-Promotion`},
  {id: 7, text: `Abusive Behavior`},
  {id: 8, text: `Unresponsive Instructor`},
  {id: 9, text: `Other`},
];

const ReportListModal = ({
  entityName = 'course',
  item,
  parentId,
  isVisible,
  onClose,
  reportList = reportItems,
}: {
  entityName?: string;
  item: any;
  parentId?: any;
  isVisible: boolean;
  onClose: () => void;
  reportList?: any[];
}) => {
  const user = useAuthStore(state => state?.user);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportConfirmModalVisible, setIsReportConfirmModalVisible] =
    useState(false);

  const {mutate: createViolationReport, isLoading: isLoadingReport} =
    useCreateViolationReport();
  const handleCreateViolationReport = text => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: item?.id,
      reason: text?.report ? text?.report : text,
      targetEntityName: entityName,
      data: JSON?.stringify({id: parentId}),
    };
    createViolationReport(
      {input: inputItem},
      {
        onSuccess: data => {
          setIsReportConfirmModalVisible(true);
          onClose();
        },
      },
    );
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.content}>
          <FlatList
            data={reportList || []}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  if (item?.text === 'Other') {
                    onClose();
                    setIsReportModalVisible(true);
                    return;
                  }
                  handleCreateViolationReport(item?.text);
                }}>
                <Layer style={styles.view}>
                  <Typography style={styles.text}>{item?.text}</Typography>
                  <RightIcon color="gray.800" />
                </Layer>
                <Layer style={styles.divider} />
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomActionSheet>
      <ReportModal
        entityName={entityName}
        item={item}
        parentId={parentId}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
      <ReportConfirmModal
        isVisible={isReportConfirmModalVisible}
        onClose={() => setIsReportConfirmModalVisible(false)}
      />
    </>
  );
};

export default ReportListModal;

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    height: deviceHeight / 1.4,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  divider: {
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 0.7,
  },
  text: {fontSize: 15},
});
