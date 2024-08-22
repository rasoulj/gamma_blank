import {useRoute} from '@react-navigation/native';
import {HStack, ThreeDotsIcon} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import useAuthStore from '~/stores/authStore';
import {
  AddIconSet,
  Button,
  CalendarIconSet,
  Description,
  Header as HeaderScreen,
  HeartIcon,
  IMG,
  Image,
  Layer,
  LoadIndicator,
  ProfileIconSet,
  RateReview,
  Rating,
  Scrollable,
  Timer1IconSet,
  TimerIconSet,
  Typography,
  User2Icon,
  convertTimeSpanToTime,
  getColor,
  isDark,
  useNavigate,
} from '../../../elemental';

import Pagination from '~/components/atoms/Pagination';
import DownloadFile from '~/components/molecules/DownloadFile';
import {useGetRatingRate, useGetServices} from '../hook';
import ReviewItem from './ReviewItem';
import ReviewSelectedHeader from './ReviewSelectedHeader';
import ServiceDetailModal from './Modals/ServiceDetailModal';

const ServiceDetail = () => {
  const {navigateWithName} = useNavigate();
  const route = useRoute();
  const {item} = route?.params as any;
  const ServiceId = item?.service?.id;
  const serviceDuration = {
    PT1H: '1 hour',
    PT2H: '2 hour',
    PT3H: '3 hour',
    PT4H: '4 hour',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const {user, token, setIsModalUserLoggedInVisible} = useAuthStore();

  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedReview, setSelectReview] = useState(null);

  const {data, isLoading}: any = useGetServices({
    where: {
      service: {
        id: {
          eq: ServiceId,
        },
      },
    },
  });

  const serviceDetail = data?.pages?.[0]?.service || [];

  console.log(serviceDetail);

  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
  } = useGetRatingRate({
    where: {
      review: {
        serviceId: {
          eq: ServiceId,
        },
      },
    },
    order: {
      review: {
        createdDate: 'DESC',
      },
    },
    take: 10,
  });

  const Header = () => {
    return (
      <>
        <Layer style={{margin: 5}}>
          <Layer
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 16,
            }}></Layer>
          <Image
            source={{uri: serviceDetail?.photoUrl}}
            style={{
              width: '100%',
              height: 180,
              backgroundColor: '#EBEBEB',
              alignSelf: 'center',
              borderRadius: 11,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="cover"
          />
          <Typography
            style={{
              fontSize: 18,
              fontWeight: '500',
              marginVertical: 4,
              marginTop: 16,
            }}>
            {serviceDetail?.title} - {serviceDetail?.category}
          </Typography>
          <Typography
            style={{fontSize: 18, fontWeight: '700', marginVertical: 4}}>
            US ${serviceDetail?.price}
          </Typography>
          <Rating
            rating={serviceDetail?.rateAverage || 0}
            onChange={() => {}}
            style={{alignSelf: 'flex-start'}}
          />
          <Typography
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginVertical: 4,
              marginTop: 20,
            }}>
            Description
          </Typography>
          <Typography
            style={{fontSize: 14, fontWeight: '400', marginVertical: 4}}>
            {serviceDetail?.description}
          </Typography>
          <Layer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Layer
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ProfileIconSet style={{marginRight: 8}} />
              <Typography
                numberOfLines={1}
                style={{
                  width: '70%',
                  fontSize: 14,
                  fontWeight: '700',
                  marginVertical: 4,
                }}>
                {serviceDetail?.user?.fullName}
              </Typography>
            </Layer>
            <Layer
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}>
              <Timer1IconSet style={{marginRight: 8}} />
              <Typography
                numberOfLines={1}
                style={{
                  width: '70%',
                  fontSize: 14,
                  fontWeight: '700',
                  marginVertical: 4,
                  alignSelf: 'flex-start',
                }}>
                {serviceDuration[serviceDetail?.duration]}
              </Typography>
            </Layer>
          </Layer>
          {serviceDetail?.serviceType === 'ONLINE' && (
            <Layer
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Layer
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CalendarIconSet style={{marginRight: 8}} />
                <Typography
                  numberOfLines={1}
                  style={{
                    width: '70%',
                    fontSize: 14,
                    fontWeight: '700',
                    marginVertical: 4,
                  }}>
                  {new Date(serviceDetail?.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </Layer>
              <Layer
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <TimerIconSet style={{marginRight: 8}} />
                <Typography
                  numberOfLines={1}
                  style={{
                    width: '70%',
                    fontSize: 14,
                    fontWeight: '700',
                    marginVertical: 4,
                    alignSelf: 'flex-start',
                  }}>
                  {convertTimeSpanToTime(serviceDetail?.startTime)} -{' '}
                  {convertTimeSpanToTime(serviceDetail?.endTime)}
                </Typography>
              </Layer>
            </Layer>
          )}
          {/* <Typography
            style={{fontSize: 18, fontWeight: '700', marginVertical: 4}}>
            Service Duration
          </Typography>
          <Typography
            style={{fontSize: 14, fontWeight: '400', marginVertical: 4}}>
            2 hours - 3 hours
          </Typography> */}

          {user?.id !== serviceDetail?.userId && (
            <Button
              style={{marginTop: 20, height: 49}}
              onPress={() =>
                token
                  ? serviceDetail?.serviceType === 'ONLINE'
                    ? navigateWithName('Payment', {
                        contractorId: serviceDetail?.user?.id,
                        startTime: new Date(),
                        endTime: new Date(),
                        price: serviceDetail?.price,
                        serviceId: serviceDetail?.id,
                        fullName: '',
                        phoneNumber: '',
                        status: 'PENDING',
                        type: 'BOOKING',
                      })
                    : navigateWithName('Appointment', {item})
                  : setIsModalUserLoggedInVisible(true)
              }
              variant={'solid'}
              backgroundColor={getColor({color: 'primary.500'})}
              disabled={serviceDetail?.soldOut}>
              <Typography
                color={'background.500'}
                style={{
                  fontWeight: '700',
                }}>
                Book
              </Typography>
            </Button>
          )}

          <View style={{height: 10}} />
        </Layer>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          mx={1}
          style={{marginTop: 16, marginBottom: 8}}>
          <Typography style={{fontSize: 18, fontWeight: '700'}}>
            Reviews
          </Typography>
          <TouchableOpacity
            onPress={() =>
              token
                ? setIsReviewModalVisible(true)
                : setIsModalUserLoggedInVisible(true)
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: getColor({color: 'primary.400'}),
              borderWidth: 2,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <AddIconSet color={getColor({color: 'primary.400'})} style={{}} />
            <Typography
              color={'primary.400'}
              style={{fontSize: 14, fontWeight: '700'}}>
              Write a Review
            </Typography>
          </TouchableOpacity>
        </HStack>
      </>
    );
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            item?.review?.id === selectedReview?.id
              ? isDark()
                ? getColor({color: 'primary.800'})
                : getColor({color: 'primary.100'})
              : getColor({color: 'background.500'}),
          // borderRadius:10
        }}
        onLongPress={() => setSelectReview(item?.review)}>
        <ReviewItem item={item} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {selectedReview ? (
        <ReviewSelectedHeader
          isAdmin={user?.id === serviceDetail?.userId}
          item={selectedReview}
          onClose={() => setSelectReview(null)}
        />
      ) : (
        <HeaderScreen title="Service Detail" style={{marginHorizontal: 5}}>
          {/* {user?.id !== serviceDetail?.userId && ( */}
          <Pressable onPress={() => setIsModalVisible(true)}>
            <ThreeDotsIcon
              style={{transform: [{rotate: '90deg'}], marginHorizontal: 5}}
            />
          </Pressable>
          {/* )} */}
        </HeaderScreen>
      )}

      {isLoading && <LoadIndicator />}
      <Scrollable style={{}}>
        <RateReview
          id={ServiceId}
          targetName="Service"
          itemName={serviceDetail?.title}
          isOpen={isReviewModalVisible}
          onClose={() => setIsReviewModalVisible(false)}
          hasReview={true}
        />
        <FlatList
          data={reviews?.pages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
          }}
          ItemSeparatorComponent={() => (
            <View style={{width: 10, height: 10}} />
          )}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          ListFooterComponent={() => {
            return <View style={{height: 100}} />;
          }}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      </Scrollable>
      <ServiceDetailModal
        item={serviceDetail}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({});
