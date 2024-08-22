import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import ModalContainer from '~/components/atoms/ModalContainer';
import {
  Button,
  Center,
  CloseIconSet,
  CustomFormInput,
  deviceHeight,
  DrawerKit,
  FlatList,
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
} from '../../elemental';
import Card from '../../atoms/Card';
import {getColor} from '../../elemental/helper';
import { useCreateViolationReport, useRemoveRate } from './hooks';

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
  const {handleSubmit, register, setValue, control} = methods;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const {
    isOpen: isReportListDrawerKitOpen,
    setIsOpen: setIsReportListDrawerKitOpen,
  } = useDrawer('ReportListDrawerKit');
  const {isOpen: isReportDrawerKitOpen, setIsOpen: setIsReportDrawerKitOpen} =
    useDrawer('ReportDrawerKit');
  const {data: userData}: any = useGetCurrentUser(null);
  const user = userData?.user_getCurrentUser?.result;
  const {
    isOpen: isDeleteReviewDrawerKitOpen,
    setIsOpen: setIsDeleteReviewDrawerKitOpen,
  } = useDrawer('DeleteReviewDrawerKit');

  const {mutate, isLoading} = useRemoveRate();

  const removeReview = () => {
    mutate(
      {entityId: item.entityId},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getRatings']);
          console.log(data);
          setIsDeleteReviewDrawerKitOpen(false);
          onClose();
        },
      },
    );
  };
  const {mutate: createViolationReport, isLoading: isLoadingReport} =
    useCreateViolationReport();
  const handleCreateViolationReport = text => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: item?.id,
      reason: text?.report ? text?.report : text,
      targetEntityName: 'post',
      // targetEntityId: postId,
    };
    // console.log(inputItem);
    createViolationReport(inputItem, {
      onSuccess: success => {
        console.log('Success', success);
        setIsReportListDrawerKitOpen(false);
        setIsReportDrawerKitOpen(false);
        queryClient.invalidateQueries('getPostComments');
        setIsModalVisible(true);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };
  return (
    <>
      <ModalContainer
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}>
        <View style={{}}>
          <Center>
            <TickIcon />
            <Typography color={'success.500'} style={styles.SuccessText}>
              Report Submitted!
            </Typography>
            <Typography color={'#828282'} style={styles.SuccessSubText}>
              Thanks for letting us know.
            </Typography>
          </Center>
          <Button
            rounded="full"
            variant={'solid'}
            style={{width: 140, alignSelf: 'center', marginTop: 30}}
            py={3}
            _text={{
              fontWeight: 'bold',
            }}
            onPress={() => [setIsModalVisible(false), onClose()]}>
            Done
          </Button>
        </View>
      </ModalContainer>
      <DrawerKit
        data-id="delete-review-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-delete-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}
          data-parent="delete-review-drawer-kit">
          <Layer
            data-id="content-delete-layer"
            data-name="Layer"
            style={{position: 'relative', marginLeft: 20, marginRight: 20}}
            data-parent="123-456-789-delete-layer">
            <Typography
              data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
              data-name="Typography"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 17,
                marginTop: 8,
              }}
              data-parent="content-delete-layer">
              Confirmation
            </Typography>
            <Typography
              data-id="532f9254-679b-458d-afae-6fb62c9f191e"
              data-name="Typography"
              style={{
                position: 'relative',
                marginTop: 23,
                marginBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'left',
                fontSize: 17,
              }}
              data-parent="content-delete-layer">
              Are you sure you want to delete this review?
            </Typography>
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
                data-id="cancel_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 20, width: '45%'}}
                variant="outline"
                data-parent="button_box"
                onPress={() => {
                  setIsDeleteReviewDrawerKitOpen(!isDeleteReviewDrawerKitOpen);
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                data-id="delete_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 20, width: '45%'}}
                colorScheme="error.500"
                bgColor="error.500"
                variant="solid"
                data-parent="button_box"
                onPress={() => removeReview()}>
                <Typography
                  color={'#fff'}
                  style={{fontWeight: '700', fontSize: 14}}>
                  Delete
                </Typography>
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
      <DrawerKit
        data-id="report-list-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5,}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-list-report-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}
          data-parent="report-drawer-kit">
          <Layer
            data-id="content-report-layer"
            data-name="Layer"
            style={{
              position: 'relative',
              marginLeft: 5,
              marginRight: 5,
              height: deviceHeight / 1.5,
            }}
            data-parent="123-456-789-report-layer">
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
                <Pressable
                  onPress={() => {
                    if (item?.text === 'Other') {
                      setIsReportListDrawerKitOpen(false);
                      setIsReportDrawerKitOpen(true);
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
                </Pressable>
              )}
            />
          </Layer>
        </View>
      </DrawerKit>
      <DrawerKit
        data-id="report-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-report-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}
          data-parent="report-drawer-kit">
          <Layer
            data-id="content-report-layer"
            data-name="Layer"
            style={{position: 'relative', marginLeft: 20, marginRight: 20}}
            data-parent="123-456-789-delete-layer">
            <Typography
              data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
              data-name="Typography"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 17,
                marginTop: 8,
              }}
              data-parent="content-delete-layer">
              Report
            </Typography>
            <View style={{marginVertical: 20}}>
              <CustomFormInput
                {...register('report')}
                control={control}
                placeholder="Write here.."
                label=""
                textArea
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
                data-id="cancel_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 20, width: '45%'}}
                variant="outline"
                data-parent="button_box"
                onPress={() => {
                  setIsReportDrawerKitOpen(false);
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isLoadingReport}
                data-id="delete_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 20, width: '45%'}}
                colorScheme="error.500"
                bgColor="error.500"
                variant="solid"
                data-parent="button_box"
                onPress={handleSubmit(handleCreateViolationReport)}>
                <Typography
                  color={'#fff'}
                  style={{fontWeight: '700', fontSize: 14}}>
                  Report
                </Typography>
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
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
              onPress={() => setIsDeleteReviewDrawerKitOpen(true)}>
              <TrashIconSet color={isDark() ? '#fff' : '#222'} />
            </TouchableOpacity>
          )}
          {user?.id !== item?.user.id && (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setIsReportListDrawerKitOpen(true)}>
              <ReportIcon color={isDark() ? '#fff' : '#222'} />
            </TouchableOpacity>
          )}
        </View>
      </Card>
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
