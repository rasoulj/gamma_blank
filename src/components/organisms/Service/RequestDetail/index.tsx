import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import EmptyPictureIcon from '~/assets/icons/EmptyPicture.icon';
import {
  Button,
  Image,
  Layer,
  RateReview,
  ScrollView,
  Typography,
  getColor,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import {useUpdateBooking} from '../hook';
import useAuthStore from '~/stores/authStore';

const RequestDetail = () => {
  const route: any = useRoute();
  const item: any = route?.params?.item;
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const userId = useAuthStore(state => state?.user?.id);
  console.log(item?.customerId, userId);

  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const {mutate: mutateUpdateBooking, isLoading} = useUpdateBooking();
  const handleBookingCompletion = (bookingData: 'CANCELED' | 'COMPLETED') => {
    mutateUpdateBooking(
      {
        input: {
          id: item?.id,
          status: bookingData,
        },
      },
      {
        onSuccess(data) {
          console.log(data);
          queryClient.refetchQueries(['getBookings']);
        },
      },
    );
  };
  const CustomerButtonRequest = () => {
    switch (item?.status) {
      case 'PENDING':
        return (
          <Button
            variant={'outline'}
            style={{marginVertical: 10}}
            onPress={() => handleBookingCompletion('CANCELED')}>
            Cancel
          </Button>
        );
      case 'IN_PROGRESS':
        return (
          <Button
            style={{marginVertical: 10}}
            onPress={() => handleBookingCompletion('COMPLETED')}>
            Service completed
          </Button>
        );
      case 'COMPLETED':
        return (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <RateReview
              id={item?.service?.id}
              targetName="Service"
              itemName={item?.service?.title}
              isOpen={isReviewModalVisible}
              onClose={() => setIsReviewModalVisible(false)}
              hasReview={true}
            />
            <Button
              variant={'outline'}
              style={{flex: 1, marginVertical: 10, marginRight: 8}}
              onPress={() => setIsReviewModalVisible(true)}>
              Write a review
            </Button>
            <Button
              style={{flex: 1, marginVertical: 10}}
              onPress={() =>
                navigateWithName('service detail', {
                  item: {service: {id: item?.service?.id}},
                })
              }>
              Book again
            </Button>
          </View>
        );
      default:
        return <></>;
    }
  };

  const handleBookingRequest = (bookingRequest: 'Accept' | 'Reject') => {
    mutateUpdateBooking(
      {
        input: {
          id: item?.id,
          status: 'IN_PROGRESS',
          accepted: bookingRequest === 'Accept' ? true : false,
        },
      },
      {
        onSuccess(data) {
          console.log(data);
          queryClient.refetchQueries(['getBookings']);
        },
      },
    );
  };
  const ContractorButtonRequest = () => {
    switch (item?.status) {
      case 'PENDING':
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                style={{height: 39, marginVertical: 10}}
              />
            ) : (
              <>
                <Button
                  variant={'outline'}
                  style={{flex: 1, marginVertical: 10, marginRight: 8}}
                  onPress={() => handleBookingRequest('Reject')}>
                  Reject
                </Button>
                <Button
                  style={{flex: 1, marginVertical: 10}}
                  onPress={() => handleBookingRequest('Accept')}>
                  Accept
                </Button>
              </>
            )}
          </View>
        );
      default:
        return <></>;
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {item?.service?.photoUrl ? (
        <Image
          src={item?.service?.photoUrl}
          style={{width: '100%', height: 167, borderRadius: 5}}
          resizeMode="cover"
        />
      ) : (
        <Layer
          style={{
            width: '100%',
            height: 167,
            borderWidth: 1,
            borderColor: getColor({color: 'gray.300'}),
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EmptyPictureIcon width={160} height={160} />
        </Layer>
      )}
      <Typography
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginVertical: 8,
          marginTop: 20,
        }}>
        Service
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '500', marginBottom: 20}}>
        {item?.service?.title}
      </Typography>
      <Typography style={{fontSize: 18, fontWeight: '700', marginVertical: 8}}>
        Description
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '500', marginBottom: 20}}>
        {item?.service?.description}
      </Typography>
      <Typography style={{fontSize: 18, fontWeight: '700', marginVertical: 8}}>
        Contractor
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '500', marginBottom: 20}}>
        {item?.contractor?.fullName}
      </Typography>
      <Typography style={{fontSize: 18, fontWeight: '700', marginVertical: 8}}>
        Date & time
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '500', marginBottom: 20}}>
        {new Date(item?.startTime).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}{' '}
      </Typography>
      {item?.address && (
        <>
          <Typography
            style={{fontSize: 18, fontWeight: '700', marginVertical: 8}}>
            Address
          </Typography>
          <Typography
            style={{fontSize: 14, fontWeight: '500', marginBottom: 20}}>
            {item?.address}
          </Typography>
        </>
      )}
      {item?.contractorId === userId
        ? ContractorButtonRequest()
        : CustomerButtonRequest()}
    </ScrollView>
  );
};

export default RequestDetail;

const styles = StyleSheet.create({});
