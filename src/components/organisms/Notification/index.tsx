import React, {useCallback} from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';
import {
  Center,
  ScrollView,
  Typography,
  VStack,
  deviceHeight,
} from '~/components/elemental';
import ItemNotification from './ItemNotification';
import {useGetNotifications} from './hooks';
import {getColor} from '~/utils/helper/theme.methods';
import EmptyNotification from '~/assets/icons/CustomIcons/EmptyNotification';

const groupNotificationsByDate = notifications => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);
  const thisMonth = new Date(today);
  thisMonth.setDate(thisMonth.getDate() - 1000);

  const groupedNotifications = [];
  if (
    notifications.some(item => isSameDate(new Date(item.createdDate), today))
  ) {
    groupedNotifications.push({
      title: 'Today',
      data: notifications.filter(item =>
        isSameDate(new Date(item.createdDate), today),
      ),
    });
  }

  if (
    notifications.some(item =>
      isSameDate(new Date(item.createdDate), yesterday),
    )
  ) {
    groupedNotifications.push({
      title: 'Yesterday',
      data: notifications.filter(item =>
        isSameDate(new Date(item.createdDate), yesterday),
      ),
    });
  }

  if (
    notifications.some(item => isSameDate(new Date(item.createdDate), thisWeek))
  ) {
    groupedNotifications.push({
      title: 'This Week',
      data: notifications.filter(
        item =>
          new Date(item.createdDate) > thisWeek &&
          !isSameDate(new Date(item.createdDate), today),
      ),
    });
  }

  groupedNotifications.push({
    title: 'Other',
    data: notifications.filter(
      item =>
        new Date(item.createdDate) > thisMonth &&
        new Date(item.createdDate) < thisWeek,
    ),
  });

  return groupedNotifications;
};

const isSameDate = (date1, date2) =>
  new Date(date1).getDate() === new Date(date2).getDate() &&
  new Date(date1).getMonth() === new Date(date2).getMonth() &&
  new Date(date1).getFullYear() === new Date(date2).getFullYear();

const Notification = ({
  search,
  type,
}: {
  search?: any;
  type?: 'BoughtProduct' | '';
}) => {
  const {isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetNotifications({
      where: {
        ...(type && {
          notificationType: {
            eq: type || '',
          },
        }),
        ...(search && {
          relatedEntity: {
            contains: search,
          },
        }),

        notificationType: {
          neq: 'END_LIVE',
        },
      },
    });

  const notificationsData = data?.pages || [];
  const renderItem = useCallback(
    ({item}) => {
      return <ItemNotification item={item} />;
    },
    [type],
  );
  const renderSectionHeader = ({section}) => {
    return (
      section?.data?.length > 0 && (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )
    );
  };

  const ListEmptyComponent = () => (
    <Center style={styles.emptyContainer}>
      {isLoading ? (
        <Typography>Loading ...</Typography>
      ) : (
        <VStack>
          <EmptyNotification />
          <Typography
            color="gray.400"
            fontSize="xl"
            alignSelf={'center'}
            mt="8">
            No notifications yet!
          </Typography>
        </VStack>
      )}
    </Center>
  );
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const groupedNotifications =
    groupNotificationsByDate(notificationsData)[0]?.data?.length === 0
      ? []
      : groupNotificationsByDate(notificationsData);

  return (
    <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
      <SectionList
        sections={groupedNotifications}
        keyExtractor={item => `key${item?.id}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={onLoadMore}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={false}
      />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  sectionHeader: {
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
    color: getColor({color: 'gray.800'}),
  },

  emptyContainer: {
    width: '100%',
    height: deviceHeight / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  contentContainerStyle: {
    paddingHorizontal: 12,
    paddingBottom: 60,
  },

  flex1: {flex: 1},
});
