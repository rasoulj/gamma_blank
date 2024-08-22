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
  {id: 1, text: `Inappropriate Behavior`},
  {id: 2, text: `Misleading Information`},
  {id: 3, text: `Poor Teaching Quality`},
  {id: 4, text: `Plagiarism or Copyright Violations`},
  {id: 5, text: `Engagement Issues`},
  {id: 6, text: `Irrelevant or Off-Topic Content`},
  {id: 7, text: `Unethical Practices`},
  {id: 8, text: `Safety Concerns`},
  {id: 9, text: `Other`},
];

const ReportListModal = ({
  entityName = 'course',
  item,
  parentId,
  isVisible,
  onClose,
}: {
  entityName?: 'course' | string;
  item: any;
  parentId?: any;
  isVisible: boolean;
  onClose: () => void;
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
      targetEntityId: item?.review?.id,
      reason: text?.report ? text?.report : text,
      targetEntityName: entityName,
      data: JSON?.stringify({id: parentId}),
    };
    createViolationReport(
      {input: inputItem},
      {
        onSuccess: () => {
          setIsReportConfirmModalVisible(true);
          onClose();
        },
      },
    );
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.container}>
          <FlatList
            data={reportItems || []}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (item?.text === 'Other') {
                    onClose();
                    setIsReportModalVisible(true);
                    return;
                  }
                  handleCreateViolationReport(item?.text);
                }}>
                <Layer style={styles.itemContainer}>
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
  divider: {
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 0.7,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    height: deviceHeight / 1.4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  text: {fontSize: 15},
});
