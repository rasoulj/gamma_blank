import {Divider, Spacer} from 'native-base';
import {
  Typography,
  Card,
  RelativeLayout,
  IMG,
  EventHeartIcon,
  relativeTime,
  convertTimeSpanToTime,
  EventLocationIcon,
  useToast,
  cache,
  Rating,
  Layer,
  Button,
  TreeDotIcon,
  EditIconSet,
  DrawerKit,
  Trash2Icon,
  useDrawer,
  useNavigate,
  getColor,
} from '~/components/elemental';
import React from 'react';
import {
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {deviceHeight} from '../../elemental';
import theme from '~/theme';
import dayjs from 'dayjs';
import {useDeleteEvent, useGetTotalRate, useUpdateEvent} from './hooks';
import {useQueryClient} from 'react-query';

const EventListItem = ({
  item,
  index,
  onPress,
  mb = '0',
  like,
  dislike,
  navigation,
  hasManagement = false,
}: {
  onPress?: any;
  item: any;
  mb?: string;
  like: any;
  dislike: any;
  navigation: any;
  index: number;
  hasManagement?: boolean;
}) => {
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const {isOpen: isDrawerKitOpen, setIsOpen: setDrawerKitOpen} = useDrawer(
    `OpenDrawerKit${item?.event?.id}`,
  );
  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer(`DeleteDrawerKit${item?.event?.id}`);

  const {mutate: DeleteEvent, isLoading: isLoadingDeleteEvent} =
    useDeleteEvent();

  const handleDeleteEvent = () => {
    console.log(item?.event?.id);

    DeleteEvent(
      {eventId: item?.event?.id},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          setIsDeleteDrawerKitOpen(false);
          setDrawerKitOpen(false);
          queryClient.invalidateQueries(['getEvents']);
        },
      },
    );
  };

  const {data: rateData}: any = useGetTotalRate({
    targetEntityName: 'Event',
    targetEntityId: item?.event?.id,
  });
  const rate = rateData?.rating_getTotalRate?.result?.average;

  const {mutate: mutateUpdateEvent, isLoading: isLoadingUpdateEvent} =
    useUpdateEvent();
  const activateHanddler = (isActive: boolean) => {
    const input = {
      id: item?.event?.id,
      title: item?.event?.title || '',
      imageUrl: item?.event?.imageUrl || '',
      description: item?.event?.description || '',
      state: item?.event?.state || '',
      date: item?.event?.date || '',
      currency: item?.event?.currency || '',
      city: item?.event?.city || '',
      streetAddress: item?.event?.streetAddress || '',
      zipCode: item?.event?.zipCode || '',
      isActive: isActive,
      eventTypeId: item?.event?.eventTypeId || 4,
      category: item?.event?.category || '',
    };

    mutateUpdateEvent(
      {input},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          queryClient.invalidateQueries(['getEvents']);
        },
      },
    );
  };
  return (
    <>
      <TouchableWithoutFeedback
        key={index}
        onPress={e => {
          navigation('event detail', {item, hasManagement});
        }}>
        <Card
          style={{
            borderWidth: 1,
            borderRadius: 15,
            borderStyle: 'solid',
            shadowOffset: {width: 0, height: 2},
            shadowColor: 'rgb(0,0,0)',
            shadowOpacity: 0.12,
            borderColor: '#2222220D',
            shadowRadius: 5,
            elevation: 5,
            marginBottom: 10,
            paddingHorizontal: 8,
            paddingVertical: 8,
            marginHorizontal: 2,
          }}>
          {hasManagement && (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 6,
              }}
              onPress={() => setDrawerKitOpen(true)}>
              <TreeDotIcon
                width={24}
                height={24}
                color={getColor({color: 'gray.800'})}
                style={{padding: 5}}
                onPress={() => setDrawerKitOpen(true)}
              />
            </TouchableOpacity>
          )}
          <Layer
            style={{
              flexDirection: 'row',
            }}>
            <RelativeLayout
              data-id="87f40e59-daa9-4cff-a4a1-861ebc8a0e93"
              data-name="RelativeLayout"
              style={{
                position: 'relative',
                display: 'flex',
                minHeight: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data-parent="scrollable_screen">
              <IMG
                data-id="f9f1b8bd-7b89-4dc7-a38c-616ea598f8c0"
                data-name="IMG"
                style={{
                  position: 'relative',
                  margin: 'auto',
                  width: 129,
                  height: 129,
                  borderRadius: 9,
                }}
                src={item?.event?.imageUrl}
                attribute="event?.imageUrl"
                data-parent="87f40e59-daa9-4cff-a4a1-861ebc8a0e93"
              />
              {/* <RelativeLayout
            data-id="17665f36-7069-4a2a-8124-c3364765d7f2"
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
              borderRadius: 50,
              zIndex: 5,
              top: 12,
              right: 12,
              backgroundColor: '#fff',
            }}
            data-parent="87f40e59-daa9-4cff-a4a1-861ebc8a0e93"
            onPress={e => {
              if (item?.isFavorite) {
                dislike({eventId: item?.event?.id});
              } else {
                like({eventId: item?.event?.id});
              }
            }}>
            <EventHeartIcon
              data-id="e9ea3f53-daaa-40ce-9e57-291a25cf3758"
              data-name="EventHeartIcon"
              style={{position: 'relative'}}
              width="16"
              height="16"
              isFavorite={item?.isFavorite}
              color="primary.400"
              data-parent="17665f36-7069-4a2a-8124-c3364765d7f2">
              eventhearticon
            </EventHeartIcon>
          </RelativeLayout> */}
            </RelativeLayout>
            <RelativeLayout
              data-id="d0a88cb8-2ef5-4e49-8727-5718d0ec7383"
              data-name="RelativeLayout"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 8,
              }}
              data-parent="scrollable_screen">
              <Typography
                data-id="fe4cbd7b-2487-4f59-a8d5-0264873da11a"
                data-name="Typography"
                style={{
                  position: 'relative',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
                data-parent="d0a88cb8-2ef5-4e49-8727-5718d0ec7383">
                {item?.event?.title}
              </Typography>
              <Rating
                rating={rate || 0}
                onChange={() => {}}
                style={{alignSelf: 'flex-start'}}
              />
              <Typography
                data-id="b41c9e6e-7bb0-41f0-9d37-ca0ed9d0d8ef"
                data-name="Typography"
                color={"gray.500"}
                style={{
                  position: 'relative',
                  fontSize: 12,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 8,
                  marginBottom: 8,
                }}
                data-parent="d0a88cb8-2ef5-4e49-8727-5718d0ec7383">
                {item?.event?.category}
              </Typography>
              <Typography
                data-id="4b510886-97aa-4aef-9dcc-ba3407ff8e24"
                data-name="Typography"
                color={"gray.500"}
                style={{
                  position: 'relative',
                  fontSize: 12,
                }}
                data-parent="d0a88cb8-2ef5-4e49-8727-5718d0ec7383">
                {relativeTime(item?.event?.date, 'MMM, DD,YYYY / ') +
                  '' +
                  convertTimeSpanToTime(item?.event?.startTime) +
                  ' - ' +
                  convertTimeSpanToTime(item?.event?.endTime)}
              </Typography>
              <RelativeLayout
                data-id="950d471a-ed4b-4e6d-b1cb-ae651281aa16"
                data-name="RelativeLayout"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 5,
                  padding: 0,
                }}
                data-parent="d0a88cb8-2ef5-4e49-8727-5718d0ec7383">
                <EventLocationIcon
                  data-id="4c247fc3-aef6-4917-b71b-ee876ffab576"
                  data-name="EventLocationIcon"
                  style={{position: 'relative'}}
                  data-parent="950d471a-ed4b-4e6d-b1cb-ae651281aa16"
                  color={getColor({color: 'secondray.500'})}>
                  eventlocationicon
                </EventLocationIcon>
                <Typography
                  data-id="3e990075-0e90-450f-8d29-788f211d772d"
                  data-name="Typography"
                  color={"secondary.500"}
                  style={{
                    position: 'relative',
                    color: '#006194',
                    marginLeft: 8,
                    fontSize: 12,
                  }}
                  data-parent="950d471a-ed4b-4e6d-b1cb-ae651281aa16">
                  {item?.event?.city + ' - '}
                  {item?.event?.state}
                </Typography>
              </RelativeLayout>
            </RelativeLayout>
          </Layer>
          {hasManagement && (
            <Button
              variant={item?.event?.isActive ? 'outline' : 'solid'}
              onPress={() => activateHanddler(!item?.event?.isActive)}>
              {item?.event?.isActive ? 'Deactivate' : 'Active'}
            </Button>
          )}
        </Card>
      </TouchableWithoutFeedback>
      <DrawerKit
        data-id={`open-drawer-kit-${item?.event?.id}`}
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <Layer
          data-id="123-456-789-open-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}
          data-parent={`open-drawer-kit-${item?.event?.id}`}>
          <Layer
            data-id="content-open-layer"
            data-name="Layer"
            style={{
              position: 'relative',
              marginLeft: 20,
              marginRight: 20,
            }}
            data-parent="123-456-789-open-layer">
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                marginTop: 16,
                paddingLeft: 10,
              }}
              onPress={() => {
                navigateWithName('Edit event', {
                  screen: 'edit',
                  item: item,
                });
                setDrawerKitOpen(!isDrawerKitOpen);
              }}>
              <EditIconSet />
              <Typography style={{marginLeft: 8, fontWeight: 'bold'}}>
                Edit
              </Typography>
            </Pressable>
            <Divider />
          </Layer>
          <Layer
            data-id="content-open-layer"
            data-name="Layer"
            style={{
              position: 'relative',
              marginLeft: 20,
              marginRight: 20,
            }}
            data-parent="123-456-789-open-layer">
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                marginTop: 16,
                paddingLeft: 10,
              }}
              onPress={() => {
                setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                setDrawerKitOpen(false);
              }}>
              <Trash2Icon color="error.600" />
              <Typography
                color={'error.600'}
                style={{marginLeft: 8, fontWeight: 'bold'}}>
                Delete
              </Typography>
            </Pressable>
          </Layer>
        </Layer>
      </DrawerKit>
      <DrawerKit
        data-id={`delete-drawer-kit-${item?.event?.id}`}
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
          data-parent={`delete-drawer-kit-${item?.event?.id}`}>
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
              Are you sure you want to delete this post?
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
                  setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isLoadingDeleteEvent}
                data-id="delete_btn"
                data-name="Button"
                style={{position: 'relative', borderRadius: 20, width: '45%'}}
                colorScheme="error.500"
                bgColor="error.500"
                variant="solid"
                data-parent="button_box"
                onPress={e => handleDeleteEvent()}>
                Delete
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
    </>
  );
};

export default EventListItem;
