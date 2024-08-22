import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Image,
  Layer,
  RateReview,
  Typography,
  User2Icon,
  getColor,
  isDark,
  useNavigate,
} from '~/components/elemental';
import EmptyPictureIcon from '~/assets/icons/EmptyPicture.icon';
import {useUpdateBooking} from '../hook';
import {useQueryClient} from 'react-query';

const RequestListItem = ({
  item,
  status,
  type,
  navigateWithName,
}: {
  item: any;
  status?: any;
  type: 'customer' | 'contractor' | 'upcoming' | 'past';
  navigateWithName: any;
}) => {
  const queryClient = useQueryClient();
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
    switch (status) {
      case 'Pending':
        return (
          <Button
            variant={'outline'}
            style={{marginTop: 10}}
            onPress={() => handleBookingCompletion('CANCELED')}>
            Cancel
          </Button>
        );
      case 'In progress':
        return (
          <Button
            style={{marginTop: 10}}
            onPress={() => handleBookingCompletion('COMPLETED')}>
            Service completed
          </Button>
        );
      case 'Completed':
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
              style={{flex: 1, marginTop: 10, marginRight: 8}}
              onPress={() => setIsReviewModalVisible(true)}>
              Write a review
            </Button>
            <Button
              style={{flex: 1, marginTop: 10}}
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
    switch (status) {
      case 'Pending':
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
                style={{height: 39, marginTop: 10}}
              />
            ) : (
              <>
                <Button
                  variant={'outline'}
                  style={{flex: 1, marginTop: 10, marginRight: 8}}
                  onPress={() => handleBookingRequest('Reject')}>
                  Reject
                </Button>
                <Button
                  style={{flex: 1, marginTop: 10}}
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

  const UpcomingButtonRequest = () => {
    const isDesabled = new Date(item?.startTime) > new Date();

    return (
      <Button
        disabled={isDesabled}
        style={{
          marginTop: 10,
          backgroundColor: getColor({
            color: isDesabled ? 'primary.300' : 'primary.500',
          }),
        }}
        onPress={() => navigateWithName('livestream', {item: item?.customer})}>
        Join
      </Button>
    );
  };
  const PastButtonRequest = () => {
    return (
      <View>
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
          style={{marginTop: 10}}
          onPress={() => setIsReviewModalVisible(true)}>
          Write a review
        </Button>
      </View>
    );
  };
  const identifyButtonPurpose = () => {
    switch (type) {
      case 'customer':
        return <CustomerButtonRequest />;
      case 'contractor':
        return <ContractorButtonRequest />;
      case 'upcoming':
        return <UpcomingButtonRequest />;
      case 'past':
        return <PastButtonRequest />;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        type?.includes('r') ? [navigateWithName('RequestDetail', {item})] : {}
      }>
      <Layer
        style={{
          borderRadius: 15,
          marginVertical: 8,
          marginHorizontal: 3,
          padding: 16,
          backgroundColor: isDark()
            ? getColor({color: 'background.400'})
            : getColor({color: 'background.500'}),
          shadowColor: '#555',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Layer style={{flexDirection: 'row'}}>
          <Layer
            style={{
              width: 112,
              height: 112,
              borderWidth: 1,
              borderColor: getColor({color: 'background.700'}),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            {item?.service?.photoUrl ? (
              <Image
                src={item?.service?.photoUrl}
                style={{width: 112, height: 112, borderRadius: 5}}
              />
            ) : (
              <EmptyPictureIcon width={90} height={90} />
            )}
          </Layer>
          <Layer
            style={{
              width: '100%',
              paddingHorizontal: 8,
              justifyContent: 'center',
            }}>
            <Typography
              numberOfLines={1}
              style={{
                width: '70%',
                fontWeight: '700',
                fontSize: 14,
                marginBottom: 8,
              }}>
              {item?.service?.title}
            </Typography>
            <Typography
              numberOfLines={1}
              style={{width: '70%', fontWeight: '500', fontSize: 12}}>
              {type.includes('r')
                ? `Contractor: ${item?.contractor?.fullName}`
                : item?.service?.category}
            </Typography>
            <Typography
              numberOfLines={2}
              style={{width: '70%', fontWeight: '500', fontSize: 12}}
              color={'gray.500'}>
              Date & time:{' '}
              {new Date(item?.startTime).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                year:"numeric",
                hour12: true,
              })}{' '}
            </Typography>
          </Layer>
        </Layer>
        {identifyButtonPurpose()}
      </Layer>
    </TouchableWithoutFeedback>
  );
};

export default RequestListItem;

const styles = StyleSheet.create({});
