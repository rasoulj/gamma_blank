import {gql} from 'graphql-request';
import {useQuery} from 'react-query';
import {graphqlFetcher} from '~/components';

export const useGetUnreadNotifQuery = (options = {}) => {
  return useQuery(
    ['notification_getNotifications', options],
    () => graphqlFetcher(UNREAD_NOTIF, options),
    options,
  );
};
export const useGetUnreadMessageQuery = () => {
  return useQuery({
    queryKey: ['notification_getUnreadMessageNotifications'],
    queryFn: async () => await graphqlFetcher(UNREAD_MESSAGE),
  });
};

const UNREAD_NOTIF = gql`
  query notification_getNotifications($where: NotificationFilterInput) {
    notification_getNotifications {
      result(where: $where) {
        totalCount
      }
      status
    }
  }
`;
const UNREAD_MESSAGE = gql`
  query notification_getUnreadMessageNotifications {
    message_getUserMessages {
      result(where: {unreadCount: {gt: 0}}) {
        totalCount
      }
      status
    }
  }
`;
