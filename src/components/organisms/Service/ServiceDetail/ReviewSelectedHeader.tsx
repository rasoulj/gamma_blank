import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import ModalContainer from '~/components/atoms/ModalContainer';
import {
  Button,
  Card,
  Center,
  CloseIconSet,
  CustomFormInput,
  deviceHeight,
  DrawerKit,
  FlatList,
  getColor,
  isDark,
  Layer,
  Pressable,
  ReportIcon,
  RightIcon,
  scale,
  TickIcon,
  TrashIconSet,
  Typography,
  useDrawer,
  useGetCurrentUser,
} from '../../../elemental';
import {useCreateViolationReport, useRemoveRate} from '../hook';
import DeleteConfirmModal from './Modals/DeleteConfirmModal';
import ReviewDeleteConfirmModal from './Modals/ReviewDeleteConfirmModal';
import ReportListModal from './Modals/ReportListModal';

const schema = yup.object().shape({
  report: yup.string().required(),
});

const ReviewSelectedHeader = ({
  isAdmin,
  item,
  onClose,
}: {
  isAdmin: boolean;
  item: any;
  onClose: () => void;
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const {data: userData}: any = useGetCurrentUser(null);
  const user = userData?.user_getCurrentUser?.result;

  return (
    <>
      <Card
        style={{
          height: 60,
          borderRadius: 10,
          shadowOffset: {width: 0, height: 2},
          shadowColor: 'rgb(0,0,0)',
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 10,
          zIndex: 10,
          marginVertical: 10,
          marginHorizontal: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 15,
          backgroundColor: isDark()
            ? getColor({color: 'primary.800'})
            : getColor({color: 'primary.100'}),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => onClose()}>
            <CloseIconSet color={isDark() ? '#fff' : '#222'} />
          </TouchableOpacity>
          <Typography style={{fontSize: 18, fontWeight: '600', marginLeft: 10}}>
            Select
          </Typography>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {(user?.id === item?.user.id || isAdmin) && ( // check when is admin
            <TouchableOpacity
              style={{}}
              onPress={() => setIsDeleteModalVisible(true)}>
              <TrashIconSet color={isDark() ? '#fff' : '#222'} />
            </TouchableOpacity>
          )}
          {user?.id !== item?.user.id && (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setIsReportModalVisible(true)}>
              <ReportIcon color={isDark() ? '#fff' : '#222'} />
            </TouchableOpacity>
          )}
        </View>
      </Card>
      <ReviewDeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => [setIsDeleteModalVisible(false), onClose()]}
      />
      <ReportListModal
        entityName="service"
        item={item}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </>
  );
};

export default ReviewSelectedHeader;

const styles = StyleSheet.create({
  SuccessContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(100),
    paddingBottom: 30,
    // marginHorizontal: 20,
  },
  SuccessText: {
    fontWeight: '600',
    marginTop: 45,
    fontSize: 22,
  },
  SuccessSubText: {
    fontSize: 14,
    marginTop: 10,
  },
  payment_btn: {
    height: 49,
    marginHorizontal: 20,
    marginTop: scale(290),
  },
});
