import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  CustomFormInput,
  Input,
  Layer,
  Typography,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import ReportConfirmModal from './ReportConfirmModal';
import {useCreateViolationReport} from '../hooks';

const ReportModal = ({
  entityName = 'profile',
  item,
  isVisible,
  onClose,
}: {
  entityName?: 'profile';
  item: any;
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
    };
    createViolationReport(inputItem, {
      onSuccess: success => {
        console.log('Success', success);
        onClose();
        setIsReportModalVisible(true);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };
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
          <Layer style={{position: 'relative', marginLeft: 8, marginRight: 8}}>
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
                onPress={() =>
                  reportText ? handleCreateViolationReport() : {}
                }>
                <Typography
                  color={'#fff'}
                  style={{fontWeight: '700', fontSize: 14}}>
                  Report
                </Typography>
              </Button>
            </Layer>
          </Layer>
        </View>
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
