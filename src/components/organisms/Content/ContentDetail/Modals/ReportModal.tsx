import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Input, Layer, Typography} from '~/components/elemental';
import {useCreateViolationReport} from '../../hook';
import useAuthStore from '~/stores/authStore';
import ReportConfirmModal from './ReportConfirmModal';

const ReportModal = ({
  entityName = 'product',
  item,
  parentId,
  isVisible,
  onClose,
}: {
  entityName?: 'product' | 'product-comment' | 'course' | string;
  item: any;
  parentId?: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const user = useAuthStore(state => state?.user);
  const [reportText, setReportText] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const {mutate: createViolationReport, isLoading: isLoadingReport} =
    useCreateViolationReport();
  const handleCreateViolationReport = () => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: item?.id,
      reason: reportText,
      targetEntityName: entityName,
      data: JSON?.stringify({id: parentId}),
    };
    createViolationReport(
      {input: inputItem},
      {
        onSuccess: () => {
          onClose();
          setIsReportModalVisible(true);
        },
      },
    );
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <Layer style={styles.content}>
          <Typography style={styles.sheetTitle}>Report</Typography>
          <View style={styles.input}>
            <Input
              onChangeText={t => setReportText(t)}
              style={styles.inputText}
              placeholder="Write here.."
              textAlignVertical="top"
              multiline={true}
              maxLength={300}
              multi
            />
          </View>
          <Layer style={styles.rowView}>
            <Button
              style={styles.btn}
              variant="outline"
              onPress={() => {
                onClose();
              }}>
              <Typography
                color={'primary.500'}
                fontSize="sm"
                lineHeight={17}
                fontWeight={'700'}>
                Cancel
              </Typography>
            </Button>
            <Button
              isLoading={isLoadingReport}
              style={styles.btn}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={() => (reportText ? handleCreateViolationReport() : {})}>
              <Typography
                color={'gray.50'}
                fontSize="sm"
                lineHeight={17}
                fontWeight={'700'}>
                Report
              </Typography>
            </Button>
          </Layer>
        </Layer>
      </CustomActionSheet>
      <ReportConfirmModal
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    position: 'relative',
  },

  btn: {position: 'relative', width: '47%', height: 36},

  rowView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },

  sheetTitle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },

  input: {marginVertical: 20},

  inputText: {minHeight: 120, padding: 8},
});
