import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Input, Layer, Typography} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import ReportConfirmModal from './ReportConfirmModal';

const ReportModal = ({
  isVisible,
  onClose,
  handleCreateViolationReport,
  isLoadingReport,
}: {
  isVisible: boolean;
  onClose: () => void;
  handleCreateViolationReport: (reportText: string) => void;
  isLoadingReport: boolean;
}) => {
  const user = useAuthStore(state => state?.user);
  const [reportText, setReportText] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const onReportPress = () => {
    handleCreateViolationReport(reportText);
  };
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        <Typography
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 8,
          }}>
          Report
        </Typography>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={t => setReportText(t)}
            style={{minHeight: 120, padding: 8}}
            placeholder="Write here.."
            textAlignVertical="top"
            multiline={true}
          />
        </View>
        <Layer
          data-id="button_box"
          data-name="Layer"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            width: '100%',
          }}
          data-parent="content-delete-layer">
          <Button
            style={{position: 'relative', width: '45%'}}
            variant="outline"
            data-parent="button_box"
            onPress={() => {
              onClose();
            }}>
            Cancel
          </Button>
          <Button
            isLoading={isLoadingReport}
            style={{position: 'relative', width: '45%'}}
            colorScheme="error.500"
            bgColor="error.500"
            variant="solid"
            data-parent="button_box"
            onPress={() => (reportText ? onReportPress() : {})}>
            <Typography
              color={'#fff'}
              style={{fontWeight: '700', fontSize: 14}}>
              Report
            </Typography>
          </Button>
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

const styles = StyleSheet.create({});
