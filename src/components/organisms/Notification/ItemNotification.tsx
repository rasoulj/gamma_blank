import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQueryClient} from 'react-query';
import useAuthStore from '~/stores/authStore';
import {applyColorTo} from '~/theme';
import {
  BoxIconSet,
  HeartIconSet,
  Message2Icon,
  PercentageSquareIconSet,
  Typography,
  User2Icon,
  View,
  getColor,
  relativeTimeFromNow,
  scale,
  useNavigate,
} from '../../elemental';
import {
  useAcceptUserMutation,
  useGetUserMutation,
  useRemoveFollowerMutation,
  useSeenNotification,
} from './hooks';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import {
  BookIconSet,
  CustomActionSheet,
  HStack,
  LoadIndicator,
  MedalStarIconSet,
  TaskSquareIconSet,
  TrashIconSet,
  useToast,
} from '~/components';
import StoryModal from '../Chat/Chat/StoryModal';
import {useGetStories} from '../SocialHome/hook';
import {useGetMatchAppointments} from '../DatingCalendar/hooks';
import {AppointmentStatus} from '../DatingCalendar/CalendarTab/CalendarItem';
import useAppointmentStore from '~/stores/appointmentStore';

const defaultIconSize = scale(42);
export interface NotificationProps {
  item: any;
}

enum NotificationType {
  NewMessage = 'NewMessage',
  Like = 'Like',
  NewFollower = 'NewFollower',
  CreateComment = 'CreateComment',
  LikePost = 'LikePost',
  LikeComment = 'LikeComment',
  Traking = 'Traking',
  Off = 'Off',
  OutOfStock = 'OutOfStock',
  ECommerce_PromotionCreated = 'ECommerce_PromotionCreated',
  ECommerce_OrderStatusChanged = 'ECommerce_OrderStatusChanged',
  ECommerce_ProductInWishListIsUnavailable = 'ECommerce_ProductInWishListIsUnavailable',
  ECommerce_ProductInShoppingBasketIsUnavailable = 'ECommerce_ProductInShoppingBasketIsUnavailable',
  ECommerce_BoughtProduct = 'ECommerce_BoughtProduct',
  LiveStarted = 'LiveStarted',
  START_LIVE = 'START_LIVE',
  LikeStory = 'LikeStory',
  FollowRequest = 'FollowRequest',
  Education_CoursePublished = 'Education_CoursePublished',
  Education_EarnBadge = 'Education_EarnBadge',
  Education_ReplyToReview = 'Education_ReplyToReview',
  Education_UpdateDesignOfCourse = 'Education_UpdateDesignOfCourse',
  Education_NewQuesionForTopic = 'Education_NewQuesionForTopic',
  Education_NewReviewForCourse = 'Education_NewReviewForCourse',
  Education_NewFavoriteForTopic = 'Education_NewFavoriteForTopic',
  Matching_CreateAppointment = 'Matching_CreateAppointment',
  Matching_AppointmentTimeModified = 'Matching_AppointmentTimeModified',
  Matching_AppointmentConfirmed = 'Matching_AppointmentConfirmed',
}

const Messages = {
  [NotificationType.LiveStarted]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username} <Typography style={styles.textItem}> start live</Typography>
    </Typography>
  ),
  [NotificationType.START_LIVE]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username} <Typography style={styles.textItem}> start live</Typography>
    </Typography>
  ),
  [NotificationType.NewMessage]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username}{' '}
      <Typography style={styles.textItem}> sent a message to you</Typography>
    </Typography>
  ),
  [NotificationType.CreateComment]: (text?: any) => (
    <Typography color={'gray.800'} fontWeight="bold">
      Commented
      <Typography style={styles.textItem}> liked your comment</Typography>
    </Typography>
  ),
  [NotificationType.LikePost]: username => (
    <Typography style={styles.textItem}> liked your post</Typography>
  ),
  [NotificationType.LikeComment]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username}{' '}
      <Typography style={styles.textItem}> liked your comment</Typography>
    </Typography>
  ),
  [NotificationType.NewFollower]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username}{' '}
      <Typography color="gray.500" style={styles.textItem}>
        {' '}
        followed you
      </Typography>
    </Typography>
  ),
  [NotificationType.FollowRequest]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username}{' '}
      <Typography color="gray.500" style={styles.textItem}>
        {' '}
        requested to follow you
      </Typography>
    </Typography>
  ),
  [NotificationType.Like]: username => (
    <Typography color={'gray.800'} fontWeight="bold">
      {username}{' '}
      <Typography color="gray.500" style={styles.textItem}>
        {' '}
        liked your{' '}
        <Typography color={'gray.800'} fontWeight="bold">
          {' '}
          Social post
        </Typography>
      </Typography>
    </Typography>
  ),
  [NotificationType.Traking]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Order 0123456
      <Typography style={styles.textItem}> has been </Typography>
      ordered.
    </Typography>
  ),
  [NotificationType.OutOfStock]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Zara Bag
      <Typography style={styles.textItem}> in your Wishlist is </Typography>
      out of stock.
    </Typography>
  ),
  [NotificationType.Off]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Adidas
      <Typography style={styles.textItem}> new collection is in </Typography>
      off 10%.
    </Typography>
  ),
  [NotificationType.ECommerce_PromotionCreated]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      <Typography style={styles.textItem}>
        Your Exclusive E-Commerce Promotion is{' '}
      </Typography>
      Now Live!
    </Typography>
  ),
  [NotificationType.ECommerce_OrderStatusChanged]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Order Update:{' '}
      <Typography style={styles.textItem}>
        Your E-Commerce Purchase Status{' '}
      </Typography>
      Has Changed!
    </Typography>
  ),
  [NotificationType.ECommerce_ProductInWishListIsUnavailable]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Attention:{' '}
      <Typography style={styles.textItem}>
        Product in Your Wishlist is Currently{' '}
      </Typography>
      Unavailable
    </Typography>
  ),
  [NotificationType.ECommerce_ProductInShoppingBasketIsUnavailable]:
    username => (
      <Typography color={'gray.800'} style={styles.boldTextItem}>
        Alert:{' '}
        <Typography style={styles.textItem}>
          Product in Your Shopping Basket is Currently{' '}
        </Typography>
        Unavailable
      </Typography>
    ),
  [NotificationType.ECommerce_BoughtProduct]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      Order {username},{' '}
      <Typography style={styles.textItem}>has been ordered. </Typography>
    </Typography>
  ),
  [NotificationType.LikeStory]: username => (
    <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
      Liked your Story.
    </Typography>
  ),
  [NotificationType.Education_ReplyToReview]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        replied to your Comment.
      </Typography>
    </Typography>
  ),
  [NotificationType.Education_CoursePublished]: username => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        published a new course.
      </Typography>
    </Typography>
  ),
  [NotificationType.Education_UpdateDesignOfCourse]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {' '}
      {entity?.Title}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        Course has been updated.
      </Typography>
    </Typography>
  ),
  [NotificationType.Education_EarnBadge]: () => (
    <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
      You earned the Starter Badge.
    </Typography>
  ),
  [NotificationType.Education_NewFavoriteForTopic]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        bookmarked your{' '}
      </Typography>
      <Typography color={'gray.800'} style={styles.boldTextItem}>
        {entity?.topic}
      </Typography>
    </Typography>
  ),
  [NotificationType.Education_NewQuesionForTopic]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        asked a question for{' '}
      </Typography>
      <Typography color={'gray.800'} style={styles.boldTextItem}>
        {entity?.topic}
      </Typography>
    </Typography>
  ),
  [NotificationType.Education_NewReviewForCourse]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        commented on your{' '}
      </Typography>
      <Typography color={'gray.800'} style={styles.boldTextItem}>
        {entity?.Entity?.Title}
      </Typography>
    </Typography>
  ),
  [NotificationType.Matching_CreateAppointment]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        has scheduled a new date with you. Go to the app to confirm.
      </Typography>
    </Typography>
  ),
  [NotificationType.Matching_AppointmentTimeModified]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        has scheduled a new date with you. Go to the app to confirm.
      </Typography>
    </Typography>
  ),
  [NotificationType.Matching_AppointmentConfirmed]: (username, entity) => (
    <Typography color={'gray.800'} style={styles.boldTextItem}>
      {username}{' '}
      <Typography color={'gray.800'} fontSize="sm" fontWeight="400">
        has confirmed your appointment.
      </Typography>
    </Typography>
  ),
};

const generateMessage = (item, notificationType) => {
  if (notificationType === NotificationType.CreateComment) {
    const relatedEntityJSON = JSON.parse(item?.relatedEntity);
    return (
      <Typography color={'gray.800'} fontWeight="400" fontSize="sm">
        Commented
        <Typography fontWeight="500" fontSize="sm">
          {' '}
          {relatedEntityJSON?.Text}
        </Typography>
      </Typography>
    );
  }

  if (NotificationType?.[notificationType])
    return Messages?.[notificationType](
      item?.relatedUser?.fullName,
      JSON.parse(item?.relatedEntity),
    );
};

const notificationIcons = ({
  notificationType,
  image,
}: {
  notificationType: NotificationType;
  image?: string;
}) => {
  switch (notificationType) {
    case NotificationType.Off:
      return (
        <View style={styles.offContainer}>
          <PercentageSquareIconSet color={'primary.500'} />
        </View>
      );
    case NotificationType.Traking:
      return (
        <View style={styles.trackingContainer}>
          <BoxIconSet color={'primary.500'} />
        </View>
      );
    case NotificationType.Education_CoursePublished:
    case NotificationType.Education_NewQuesionForTopic:
    case NotificationType.Education_UpdateDesignOfCourse:
    case NotificationType.Education_NewReviewForCourse:
      return (
        <View style={styles.trackingContainer}>
          <BookIconSet color={'primary.500'} />
        </View>
      );
    case NotificationType.Education_EarnBadge:
      return (
        <View style={styles.trackingContainer}>
          <MedalStarIconSet color={'primary.500'} />
        </View>
      );
    case NotificationType.Education_ReplyToReview:
    case NotificationType.Education_NewFavoriteForTopic:
      return (
        <View style={styles.trackingContainer}>
          <TaskSquareIconSet color={'primary.500'} />
        </View>
      );
    case NotificationType.OutOfStock:
      return <Image source={{uri: image}} style={styles.defaultImageIcon} />;
    case NotificationType.LikeStory:
    case NotificationType.CreateComment:
    case NotificationType.LikePost: {
      return (
        <View style={styles.likePostContainer}>
          {image && (
            <Image source={{uri: image}} style={styles.likePostImage} />
          )}
          <View style={styles.heartIcon}>
            {notificationType != NotificationType.CreateComment ? (
              <HeartIconSet
                color={'gray.50'}
                width={scale(7)}
                height={scale(7)}
              />
            ) : (
              <Message2Icon
                color={getColor({color: 'gray.50'})}
                width={scale(7)}
                height={scale(7)}
              />
            )}
          </View>
        </View>
      );
    }
    default:
      return image ? (
        <Image style={styles.defaultImageIcon} source={{uri: image}} />
      ) : (
        <User2Icon width={defaultIconSize} height={defaultIconSize} />
      );
  }
};

const ItemNotification = ({item}: NotificationProps) => {
  const [visibleStory, setVisibleStory] = useState(false);
  const [followInfo, setFollowInfo] = useState<any>();
  const queryClient = useQueryClient();
  const {mutate} = useSeenNotification();
  const {navigateWithName} = useNavigate();
  const relatedEntityJSON = JSON.parse(item?.relatedEntity);
  const {toast} = useToast();
  const {setIsOpen, setRelatedEntity, setRelatedUser} = useAppointmentStore();

  const {mutate: userMutate} = useGetUserMutation();
  const setUnreadNotification = useAuthStore(
    state => state?.setUnreadNotification,
  );

  const openStory = () => setVisibleStory(true);
  const onCloseStory = () => setVisibleStory(false);

  const {data: matchData, isLoading: matchLoading} = useGetMatchAppointments({
    where: {id: {eq: relatedEntityJSON?.Id}},
    enable:
      item?.notificationType === NotificationType.Matching_CreateAppointment ||
      item?.notificationType ===
        NotificationType.Matching_AppointmentTimeModified,
  });
  const appointment = matchData?.pages?.[0];

  useEffect(() => {
    if (
      item?.notificationType === NotificationType.NewFollower ||
      item?.notificationType === NotificationType.FollowRequest
    ) {
      fetchFollowData();
    }
    if (!item?.isRead) {
      mutate(
        {notificationId: item?.id},
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['getNotifications']);
            queryClient.invalidateQueries(['notification_getNotifications']);
            setUnreadNotification(false);
          },
        },
      );
    }
  }, []);

  const iconImage = useMemo(() => {
    const relatedEntityJSON = JSON.parse(item?.relatedEntity);
    switch (item.notificationType) {
      case NotificationType.LikePost:
      case NotificationType.CreateComment: {
        const entityJson = relatedEntityJSON?.Entity ?? relatedEntityJSON?.Post;
        if (entityJson?.Thumbnail) return entityJson?.Thumbnail;
        const postItemsJson = entityJson?.MediaGalleryUrl
          ? JSON.parse(entityJson?.MediaGalleryUrl)
          : {};
        if (postItemsJson?.[0]?.type === 'IMAGE')
          return postItemsJson?.[0]?.url;
        else if (postItemsJson?.[0]?.thumbnailUrl)
          return postItemsJson?.[0]?.thumbnailUrl;
        return undefined;
      }
      case NotificationType.LikeStory: {
        return relatedEntityJSON?.Entity?.MediaType != 'IMAGE'
          ? relatedEntityJSON?.Entity?.Thumbnail
          : relatedEntityJSON?.Entity?.MediaUrl;
      }
      default:
        return item?.relatedUser?.photoUrl;
        break;
    }
  }, [item]);

  const onItemPress = () => {
    const relatedEntityJSON = JSON.parse(item?.relatedEntity);
    const entityJson = relatedEntityJSON?.Entity ?? relatedEntityJSON?.Post;
    switch (item?.notificationType) {
      case NotificationType.NewMessage: {
        navigateWithName('chat', {
          item: item?.relatedUser,
          isProfile: true,
        });
        break;
      }
      case NotificationType.CreateComment: {
        navigateWithName('post detail', {
          postId: relatedEntityJSON?.PostId,
          postType: entityJson?.Thumbnail ? 'reels' : 'post',
        });
        break;
      }
      case NotificationType.LikePost: {
        navigateWithName('post detail', {
          postId: relatedEntityJSON?.EntityId,
          postType: entityJson?.Thumbnail ? 'reels' : 'post',
        });
        break;
      }
      case NotificationType.LikeStory: {
        openStory();
        break;
      }
      case NotificationType.FollowRequest:
      case NotificationType.NewFollower: {
        navigateWithName('profile', {item: item?.relatedUser});
        break;
      }
      case NotificationType.Education_CoursePublished:
      case NotificationType.Education_UpdateDesignOfCourse: {
        navigateWithName('CourseDetails', {
          id: item?.relatedEntityId,
        });
        break;
      }

      case NotificationType.Education_NewReviewForCourse:
      case NotificationType.Education_ReplyToReview: {
        navigateWithName('CourseDetails', {
          id: item?.relatedEntityId,
          initialTabName: 'Review',
        });
        break;
      }
      case NotificationType.Education_NewQuesionForTopic: {
        navigateWithName('ViewQuestions', {id: item?.relatedEntityId});
        break;
      }
      case NotificationType.Matching_AppointmentConfirmed:
      case NotificationType.Matching_AppointmentTimeModified:
      case NotificationType.Matching_CreateAppointment: {
        if (appointment?.appointmentStatus === AppointmentStatus.REJECTED) {
          toast({message: 'This request was rejected'});
        } else if (
          appointment?.appointmentStatus === AppointmentStatus.PENDING
        ) {
          setRelatedEntity(relatedEntityJSON);
          setRelatedUser(item?.relatedUser);
          setIsOpen(true);
        } else if (
          appointment?.appointmentStatus === AppointmentStatus.CONFIRMED
        ) {
          toast({message: 'This request was accepted'});
          navigateWithName('DatingCalendar');
        }
        break;
      }
    }
  };

  const fetchFollowData = () => {
    userMutate(
      {otherId: item?.relatedUser?.id},
      {
        onSuccess(data, variables, context) {
          setFollowInfo(data?.social_getUser?.result);
        },
      },
    );
  };
  const {mutate: acceptMutate, isLoading: followLoading} =
    useAcceptUserMutation();
  const {mutate: removeMutate, isLoading: removeLoading} =
    useRemoveFollowerMutation();
  const onFollowPress = () => {
    if (followInfo) {
      acceptMutate(
        {followerId: item?.relatedUser?.id},
        {
          onSuccess: data => {
            queryClient.invalidateQueries(['getUser']);
            queryClient.invalidateQueries(['social_getUserFollowInfo']);
            queryClient.invalidateQueries(['getNotifications'], {exact: false});
            fetchFollowData();
            onCloseRemoveFollower();
          },
        },
      );
    }
  };

  const onRemoveFollower = () => {
    removeMutate(
      {followerId: item?.relatedUser?.id},
      {
        onSuccess: data => {
          queryClient.invalidateQueries(['getUser']);
          queryClient.invalidateQueries(['social_getUserFollowInfo']);
          queryClient.invalidateQueries(['getNotifications'], {exact: false});
          fetchFollowData();
          onCloseRemoveFollower();
        },
      },
    );
  };

  const [visibleRemoveFollower, setVisibleRemoveFollower] = useState(false);
  const onFollowLongPress = () => {
    setVisibleRemoveFollower(true);
  };
  const onCloseRemoveFollower = () => setVisibleRemoveFollower(false);

  const {socialType} = useSocialTypesConfig();

  const parsedEntity = useMemo(() => {
    if (item?.notificationType === NotificationType.LikeStory)
      return JSON.parse(item?.relatedEntity ?? {});
  }, [item]);

  const {data, isLoading}: any = useGetStories({
    enabled: item?.notificationType === NotificationType.LikeStory,
    where: {story: {id: {eq: parsedEntity?.EntityId}}},
  });

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onItemPress}
          style={styles.itemTouchable}
          onLongPress={
            item?.notificationType === NotificationType.NewFollower ||
            item?.notificationType === NotificationType.FollowRequest
              ? onFollowLongPress
              : undefined
          }>
          {((item?.notificationType != NotificationType.LikePost &&
            item?.notificationType != NotificationType.CreateComment) ||
            socialType != 'text') &&
            notificationIcons({
              notificationType: item?.notificationType,
              image: iconImage,
            })}
          <View style={styles.body}>
            {item?.notificationType === NotificationType.LikePost ||
            item?.notificationType === NotificationType.CreateComment ||
            item?.notificationType === NotificationType.LikeStory ? (
              <View>
                <View style={styles.socialInnerView}>
                  <Image
                    style={styles.likeAvatar}
                    source={{uri: item?.relatedUser?.photoUrl}}
                  />
                  <Typography
                    fontWeight={'500'}
                    fontSize="sm"
                    color="gray.800"
                    marginLeft={1}>
                    {item?.relatedUser?.fullName}
                  </Typography>
                </View>
                <View>
                  <Typography>
                    {generateMessage(item, item?.notificationType)}
                    <Typography color="gray.400" fontSize="xs" fontWeight="400">
                      {' '}
                      {relativeTimeFromNow(item?.createdDate) || 'just now'}
                    </Typography>
                  </Typography>
                </View>
              </View>
            ) : (
              <View flexShrink={1}>
                <Typography>
                  {generateMessage(item, item?.notificationType)}
                </Typography>
                <Typography color="gray.400" fontSize="xs" fontWeight="400">
                  {relativeTimeFromNow(item?.createdDate) || 'just now'}
                </Typography>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {(item?.notificationType === NotificationType.NewFollower ||
          item?.notificationType === NotificationType.FollowRequest) && (
          <>
            {followInfo?.requestReceived && (
              <TouchableOpacity
                onPress={onFollowPress}
                style={
                  followInfo?.isFollower ? styles.outlineBtn : styles.boldBtn
                }
                disabled={followInfo?.isFollower}>
                {followLoading || removeLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Typography
                    fontSize="sm"
                    fontWeight="700"
                    color={followInfo?.isFollower ? 'primary.500' : 'gray.50'}>
                    {followInfo?.isFollower ? 'Accepted' : 'Accept'}
                  </Typography>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
        {!item?.isRead && <View style={styles.readView} />}
      </View>
      <CustomActionSheet
        isVisible={visibleRemoveFollower}
        onClose={onCloseRemoveFollower}>
        <TouchableOpacity onPress={onRemoveFollower}>
          <HStack space="2" alignItems="center" padding="4">
            <TrashIconSet color="error.500" />
            <Typography color="error.500" fontWeight="700">
              Delete notification
            </Typography>
          </HStack>
        </TouchableOpacity>
      </CustomActionSheet>

      {visibleStory && (
        <>
          {isLoading && !data && <LoadIndicator />}
          <StoryModal {...{visibleStory, onCloseStory, data: data?.pages}} />
        </>
      )}
    </>
  );
};

export default ItemNotification;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', width: '100%'},
  likeAvatar: {width: scale(20), height: scale(20), borderRadius: 50},
  readView: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: getColor({color: 'error.500'}),
    borderRadius: 100,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: getColor({color: 'background.500'}),
  },
  textItem: {
    fontWeight: '400',
    fontSize: 14,
    color: applyColorTo(['modern', 'mystery'], {
      trueColor: getColor({color: 'gray.300'}),
      falseColor: getColor({color: 'gray.700'}),
    }),
  },
  boldTextItem: {
    fontWeight: '600',
    fontSize: 14,
  },
  likePostContainer: {width: defaultIconSize, height: defaultIconSize},
  likePostImage: {width: scale(37), height: scale(37), marginTop: 4},
  heartIcon: {
    backgroundColor: getColor({color: 'primary.500'}),
    width: scale(16),
    height: scale(16),
    borderRadius: scale(16) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  itemTouchable: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: applyColorTo(['modern', 'mystery'], {
      trueColor: getColor({color: 'gray.700'}),
      falseColor: getColor({color: 'gray.300'}),
    }),
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  defaultImageIcon: {
    width: defaultIconSize,
    height: defaultIconSize,
    backgroundColor: '#898C8D',
    borderRadius: defaultIconSize / 2,
  },
  offContainer: {
    width: defaultIconSize,
    height: defaultIconSize,
    borderRadius: 100,
    backgroundColor: getColor({color: 'primary.200'}),
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingContainer: {
    width: defaultIconSize,
    height: defaultIconSize,
    borderRadius: 100,
    backgroundColor: getColor({color: 'primary.200'}),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  boldBtn: {
    backgroundColor: getColor({color: 'primary.500'}),
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  outlineBtn: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 2,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
