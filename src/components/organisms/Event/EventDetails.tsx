import {Spacer, ThreeDotsIcon} from 'native-base';
import {
  VStack,
  HStack,
  Text,
  View,
  ScrollView,
  Center,
  CalenderIcon,
  ClockIcon,
  RelativeLayout,
  EventHeartIcon,
  cache,
  useToast,
  useQuery,
  graphqlFetcher,
  useMutation,
  LocationIconSet,
  Layer,
  Header,
  LoadIndicator,
  Scrollable,
  RateReview,
  isDark,
  getColor,
  print,
} from '~/components/elemental';
import dayjs from 'dayjs';

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowBackIcon,
  convertTimeSpanToTime,
  Typography,
  Button,
  useNavigate,
  useRoute,
  Rating,
  FlatList,
  AddIconSet,
} from '~/components/elemental';
import Screen from '../../atoms/Screen';
import {deviceHeight} from '../../elemental';
import {
  useCreateViolationReport,
  useDisLikeEvent,
  useGetEvents,
  useGetRatingRate,
  useGetTotalRate,
  useLikeEvent,
} from './hooks';
import Svg, {G, Rect, Text as TextSvg, TSpan} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';
import ReviewSelectedHeader from './ReviewSelectedHeader';
import ReviewItem from './ReviewItem';
import ReportActionSheet from './ReportActionSheet';
import OptionsActionSheet from './OptionsActionSheet';
import ReportModal from './ReportModal';
import useAuthStore from '~/stores/authStore';

const EventDetails = ({
  // eventId,
  onBackPressDetail,
}: {
  // eventId: any;
  onBackPressDetail?: any;
}) => {
  const {user} = useAuthStore();
  const queryClient = useQueryClient();
  const route: any = useRoute();

  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedReview, setSelectReview] = useState(null);

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [modalData, setModalData] = useState({
    showModal: false,
    type: 'success',
  });

  const eventId = route?.params?.item?.event?.id;

  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
  } = useGetRatingRate({
    where: {
      targetEntityId: {
        eq: eventId,
      },
      targetEntityName: {
        eq: 'Event',
      },
    },
    order: {
      createdDate: 'DESC',
    },
    take: 10,
  });
  const {data, error, isLoading}: any = useGetEvents({
    where: {
      event: {id: {eq: eventId}},
    },
  });
  const {navigateWithName, navigation} = useNavigate();

  const event = data?.pages?.[0]?.event || [];
  const [isLiked, setIsLiked] = useState(data?.pages?.[0]?.isFavorite || false);

  const {toast} = useToast();
  const {mutate: mutateDislike, isLoading: isLoadingDisLike} =
    useDisLikeEvent();
  const {mutate: mutateLike, isLoading: isLoadingLike} = useLikeEvent();

  const {data: rateData}: any = useGetTotalRate({
    targetEntityName: 'Event',
    targetEntityId: eventId,
  });
  const rate = rateData?.rating_getTotalRate?.result?.average;

  const removeLike = () => {
    mutateDislike(
      {eventId: eventId},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getEvents']);
          setIsLiked(!isLiked);
        },
      },
    );
  };

  const addLike = () => {
    mutateLike(
      {eventId: eventId},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getEvents']);
          setIsLiked(!isLiked);
        },
      },
    );
  };

  const {mutate: mutateReportProduct, isLoading: isLoadingReport} =
    useCreateViolationReport();

  const handleCreateViolationReport = text => {
    let inputItem = {
      userId: user?.id,
      targetEntityId: eventId,
      reason: text,
      targetEntityName: 'event',
      // targetEntityId: postId,
    };
    mutateReportProduct(inputItem, {
      onSuccess: success => {
        console.log('Success', success);
        setIsOpenReport(false);
        setIsOpenOptions(false);
        setModalData({showModal: true, type: 'success'});
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  const renderHeaderItem = () => {
    return (
      <>
        <VStack
          borderRadius="xl"
          style={{
            marginTop: 15,
          }}>
          <Image
            source={{
              uri: event?.imageUrl,
              // uri: "https://apsygammastorage.blob.core.windows.net/images/5rt1UDGCEw.jpg",
            }}
            style={{
              width: '100%',
              height: 167,
              borderRadius: 5,
            }}
          />
          {/* <RelativeLayout
          data-name="RelativeLayout"
          avoidKeyborad="false"
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 100,
            zIndex: 10,
            right: 10,
            top: 10,
            backgroundColor: '#fff',
          }}
          onPress={e => {
            const events = {
              onSuccess: () => {
                cache.refetch('eventAndTicketing_getEvents');
                toast({message: 'success'});
              },
              onError: error => {
                console.log(error);
                toast({message: error.toString()});
              },
            };

            if (data?.pages?.[0]?.isFavorite) {
              removeLike();
            } else {
              addLike();
              // alert("success")
            }
          }}>
          {isLoadingDisLike || isLoadingLike ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <EventHeartIcon
              data-id="587961b2-07e5-4245-beab-7b8eda2e0976"
              data-name="EventHeartIcon"
              style={{position: 'relative'}}
              data-parent="9abee7f7-97c7-4a6d-8a2e-309c0a42d150"
              isFavorite={data?.pages?.[0]?.isFavorite}
              width="16"
              height="16"
              color="primary.400">
              eventhearticon
            </EventHeartIcon>
          )}
        </RelativeLayout> */}
          <Spacer h="3" />
          <VStack space="2">
            {/* <Text>{event?.title}</Text> */}
            <Typography bold style={{fontSize: 18, fontWeight: '700'}}>
              {event?.title}
            </Typography>
            <Rating
              rating={rate || 0}
              onChange={() => {}}
              style={{alignSelf: 'flex-start'}}
            />
            <HStack
              style={{justifyContent: 'space-between'}}
              alignItems="center"
              space="2">
              {/* <Text>{event?.eventType?.typeTitle}</Text> */}
              <Typography style={{color: '#9A9A9A', fontSize: 12}}>
                {event?.category}
              </Typography>
              <Typography
                style={{color: '#006194', fontWeight: '900', fontSize: 20}}>
                ${event?.price}
              </Typography>
            </HStack>
            <Layer
              style={{
                flexDirection: 'row',
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              <Layer style={{flexDirection: 'row', alignItems: 'center'}}>
                <CalenderIcon style={{width: 24, height: 24}} />
                <Typography
                  style={{
                    marginLeft: 6,
                    fontWeight: '700',
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {dayjs(event?.eventType?.createdDate).format('DD MMMM, YYYY')}
                </Typography>
              </Layer>
              <Layer
                style={{
                  flexDirection: 'row',
                  marginLeft: scale(50),
                  alignItems: 'center',
                }}>
                <ClockIcon style={{width: 24, height: 24}} color={undefined} />
                <Typography
                  style={{
                    marginLeft: 6,
                    fontWeight: '700',
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {convertTimeSpanToTime(event?.startTime)}-
                  {convertTimeSpanToTime(event?.endTime)}
                  {/* {dayjs(event?.startTime).format('h:mm A')} */}
                </Typography>
              </Layer>
            </Layer>
            <Layer
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <LocationIconSet style={{marginRight: 8}} />
              <Typography
                style={{fontSize: 14, fontWeight: '700', marginVertical: 8}}>
                {event?.state}, {event?.city}
              </Typography>
            </Layer>
            <Button
              style={{marginTop: 8, height: 49}}
              onPress={() =>
                navigateWithName('Payment', {
                  entityId: eventId,
                  price: event?.price,
                })
              }>
              Buy Ticket
            </Button>

            <Text bold style={{fontSize: 18, fontWeight: '700', marginTop: 16}}>
              Descriptions
            </Text>
            <Text>{event?.description}</Text>
            {event?.tickets?.length > 0 ? (
              <HStack my={5} space="4" alignItems="center">
                <Partisipants users={event?.tickets} />
                <Text fontSize={16}>
                  +{event?.tickets?.length} Participant
                  {event?.tickets?.length > 1 ? 's' : ''}
                </Text>
              </HStack>
            ) : null}
          </VStack>
        </VStack>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          style={{marginTop: 24, marginBottom: 8}}>
          <Typography style={{fontSize: 18, fontWeight: '700'}}>
            Reviews
          </Typography>
          <TouchableOpacity
            onPress={() => setIsReviewModalVisible(true)}
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
            item?.id === selectedReview?.id
              ? isDark()
                ? getColor({color: 'primary.800'})
                : getColor({color: 'primary.100'})
              : getColor({color: 'background.500'}),
          // borderRadius:10
        }}
        onLongPress={() => setSelectReview(item)}>
        <ReviewItem item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {selectedReview ? (
        <ReviewSelectedHeader
          isAdmin={user?.id === event?.userId}
          item={selectedReview}
          onClose={() => setSelectReview(null)}
        />
      ) : (
        <Header
          title="Event Detail"
          style={{marginHorizontal: 5}}
          onClickBack={() => {
            if (route?.params?.hasMap) {
              navigation.goBack();
            } else if (route?.params?.hasManagement) {
              navigateWithName('event management');
            } else {
              navigateWithName('event list');
            }
          }}>
          <Pressable onPress={() => setIsOpenOptions(true)}>
            <ThreeDotsIcon
              style={{transform: [{rotate: '90deg'}], marginHorizontal: 5}}
            />
          </Pressable>
        </Header>
      )}

      {isLoading ? (
        <LoadIndicator />
      ) : (
        <Scrollable style={{}}>
          <RateReview
            id={eventId}
            targetName={'Event'}
            itemName={event?.title}
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
            ListHeaderComponent={renderHeaderItem}
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
      )}
      <ReportActionSheet
        isOpen={isOpenReport}
        isLoading={isLoadingReport}
        onClose={() => setIsOpenReport(false)}
        onPressReport={text => handleCreateViolationReport(text)}
      />
      <OptionsActionSheet
        hasEdit={user?.id === event?.userId}
        isOpen={isOpenOptions}
        onClose={() => setIsOpenOptions(false)}
        onPressReport={() => {
          if (user?.id === event?.userId) {
            // navigateWithName('edit product', {eventId: eventId});
          } else {
            setIsOpenReport(true);
            setIsOpenOptions(false);
          }
        }}
      />
      <ReportModal
        visible={modalData.showModal}
        type={modalData.type}
        onRequestClose={() =>
          setModalData({
            ...modalData,
            showModal: false,
          })
        }
      />
    </View>
  );
};

export default EventDetails;

function Partisipants({users}) {
  const colors = ['#9fbccc', '#547d92', '#006194', '#4488ac'];

  return (
    <HStack>
      {users?.slice(0, 4)?.map((user, index) => (
        <Center bg={colors?.[index]} size="12" borderRadius="full">
          <Text fontSize={16} color="white">
            {user?.participant?.fullName?.slice(0, 2)}
          </Text>
        </Center>
      ))}
    </HStack>
  );
}

function PartisipantsIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={137}
      height={48}
      viewBox="0 0 137 48"
      {...props}>
      <G data-name="Size=Medium, Badge=False">
        <Rect
          data-name="Size=Medium, Badge=False"
          width={48}
          height={48}
          rx={24}
          fill="#9fbccc"
        />
        <TextSvg
          transform="translate(13 10)"
          fill="#fff"
          fontSize={16}
          // fontFamily="Poppins-Black, Poppins"
          fontWeight={800}>
          <TSpan x={-10.36} y={17}>
            {'RS'}
          </TSpan>
        </TextSvg>
      </G>
      <G data-name="Size=Medium, Badge=False" transform="translate(30)">
        <Rect
          data-name="Size=Medium, Badge=False"
          width={48}
          height={48}
          rx={24}
          fill="#547d92"
        />
        <TextSvg
          data-name="Text"
          transform="translate(13 10)"
          fill="#fff"
          fontSize={16}
          // fontFamily="Poppins-Black, Poppins"
          fontWeight={800}>
          <TSpan x={-10.36} y={17}>
            {'RS'}
          </TSpan>
        </TextSvg>
      </G>
      <G data-name="Size=Medium, Badge=False" transform="translate(60)">
        <Rect
          data-name="Size=Medium, Badge=False"
          width={48}
          height={48}
          rx={24}
          fill="#006194"
        />
        <TextSvg
          data-name="Text"
          transform="translate(13 10)"
          fill="#fff"
          fontSize={16}
          // fontFamily="Poppins-Black, Poppins"
          fontWeight={800}>
          <TSpan x={-10.36} y={17}>
            {'RS'}
          </TSpan>
        </TextSvg>
      </G>
      <G data-name="Size=Medium, Badge=False" transform="translate(89)">
        <Rect
          data-name="Size=Medium, Badge=False"
          width={48}
          height={48}
          rx={24}
          fill="#4488ac"
        />
        <TextSvg
          data-name="Text"
          transform="translate(13 10)"
          fill="#fff"
          fontSize={16}
          // fontFamily="Poppins-Black, Poppins"
          fontWeight={800}>
          <TSpan x={-10.36} y={17}>
            {'RS'}
          </TSpan>
        </TextSvg>
      </G>
    </Svg>
  );
}
