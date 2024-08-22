import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Layer,
  RightIcon,
  Typography,
  deviceHeight,
  getColor,
} from '~/components/elemental';
import {useCreateViolationReport} from '../../hook';
import useAuthStore from '~/stores/authStore';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import ReportModal from './ReportModal';
import ReportConfirmModal from './ReportConfirmModal';

const ReportListModal = ({
  entityName = "post",
  item,
  parentId,
  isVisible,
  onClose,
}: {
  entityName?: "post" | "post-comment",
  item: any;
  parentId?: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const user = useAuthStore(state => state?.user);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportConfirmModalVisible, setIsReportConfirmModalVisible] =
    useState(false);

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
    createViolationReport(inputItem, {
      onSuccess: success => {
        console.log('Success', success);
        setIsReportConfirmModalVisible(true)
        onClose();
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
          <Layer
            style={{
              position: 'relative',
              marginLeft: 5,
              marginRight: 5,
              height: deviceHeight / 1.5,
            }}>
            <Typography
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Report
            </Typography>
            <FlatList
              data={reportItems || []}
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
                  <Layer
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 20,
                      marginLeft: 15,
                      marginRight: 15,
                    }}>
                    <Typography style={{fontSize: 15}}>{item?.text}</Typography>
                    <RightIcon color="backgournd.500" height="20px" />
                  </Layer>
                  <Layer
                    style={{
                      borderBottomColor: getColor({color: 'gray.300'}),
                      borderBottomWidth: 0.7,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </Layer>
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

const styles = StyleSheet.create({});
