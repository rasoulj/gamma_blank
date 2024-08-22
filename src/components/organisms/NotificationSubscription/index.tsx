import {useQueryClient} from 'react-query';
import {useAuth} from '../../elemental';
import {useEffect, useRef} from 'react';
import {subscribe} from '~/utils/subscription';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import useAppointmentStore from '~/stores/appointmentStore';

const subscriptionDoc = `
subscription notificationAdded($userId: Int!) {
  notificationAdded(userId: $userId) {
    userId
    user {
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      location
      age
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    notificationType
    relatedEntityId
    relatedEntity
    relatedUser {
      id
      fullName
      photoUrl
    }
    isRead
    id
    isDeleted
    createdDate
    lastModifiedDate
  }
}
`;

export default function NotificationSubscription() {
  const {user} = useAuth();
  const setRefreshNumber = useLiveStreamStore(state => state.setRefreshNumber);
  const userId = user?.id;
  const {setIsOpen, setRelatedEntity, setRelatedUser} = useAppointmentStore();

  const ref = useRef(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(subscriptionDoc, {userId}, listener);
    function listener(e) {
      try {
        const data = JSON.parse(e.data);

        const notification = data?.payload?.data?.notificationAdded;

        if (notification === undefined) {
          return;
        }

        queryClient.invalidateQueries(['notification_getNotifications']);

        if (
          notification?.notificationType === 'LiveStarted' ||
          notification?.notificationType === 'END_LIVE'
        ) {
          queryClient.invalidateQueries(['vonage_getAllSessions'], {
            exact: false,
          });
          setRefreshNumber();
        }

        if (notification?.notificationType === 'NewMessage') {
          queryClient.invalidateQueries(
            ['notification_getUnreadMessageNotifications'],
            {exact: false},
          );
        }

        if (
          notification?.notificationType === 'Matching_CreateAppointment' ||
          notification?.notificationType === 'Matching_AppointmentTimeModified'
        ) {
          if (userId != notification?.relatedUser?.id) {
            setRelatedEntity(
              notification?.relatedEntity
                ? JSON.parse(notification?.relatedEntity)
                : {},
            );
            setRelatedUser(notification?.relatedUser);
            setIsOpen(true);
          }
        }

        const key = ['getNotifications', {userId}];

        const allData: any = queryClient.getQueryData(key);

        if (!allData) return;

        allData?.pages?.[0]?.notification_getNotifications?.result?.items?.unshift(
          notification,
        );
        queryClient.setQueryData(key, JSON.parse(JSON.stringify(allData)));
      } catch (e) {}
    }
    return () => {
      unsbscribe();
    };
  }, [userId]);

  return null;
}
