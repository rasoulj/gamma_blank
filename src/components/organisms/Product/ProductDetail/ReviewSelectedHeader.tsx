import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import useAuthStore from '~/stores/authStore';
import Card from '../../../atoms/Card';
import {
  CloseIconSet,
  ReportIcon,
  TrashIconSet,
  Typography,
  isDark,
  scale,
} from '../../../elemental';
import {getColor} from '../../../elemental/helper';
import ReportListModal from './Modals/ReportListModal';
import ReviewDeleteConfirmModal from './Modals/ReviewDeleteConfirmModal';

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
  const queryClient = useQueryClient();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {},
  });
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const user = useAuthStore(state => state?.user);

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
          {/* {user?.id !== item?.user.id && (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setIsReportModalVisible(true)}>
              <ReportIcon color={isDark() ? '#fff' : '#222'} />
            </TouchableOpacity>
          )} */}
        </View>
      </Card>
      <ReviewDeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => [setIsDeleteModalVisible(false), onClose()]}
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
