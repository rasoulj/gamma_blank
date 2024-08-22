import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, LoadIndicator} from '~/components/elemental';
import {Box} from 'native-base';
import CalendarItem from './CalendarItem';
import {useGetMatchAppointments} from '../hooks';
import CalendarEmtpyState from './CalendarEmtpyState';
import useAuthStore from '~/stores/authStore';
import {appFormatDate} from '~/utils/helper';

const CalendarTab = ({navigateWithName}) => {
  const user = useAuthStore(state => state.user);
  const renderItem = useCallback(
    ({item, index}) => (
      <CalendarItem
        {...{item, index, navigateWithName, currentUserId: user?.id}}
      />
    ),
    [user],
  );

  const ItemSeparatorComponent = () => <Box h="6" />;

  const date = useMemo(() => {
    return new Date();
  }, []);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetMatchAppointments({
    where: {
      and: [
        {isDeleted: {eq: false}},
        {dateAndTime: {gte: appFormatDate(date, 'YYYY/MM/DD')}},
      ],
    },
    order: [{createdDate: 'DESC'}],
  });

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  const isEmpty = !isLoading && (!data?.pages || data?.pages?.length == 0);

  return (
    <>
      {isLoading && !data && <LoadIndicator />}
      <FlatList
        data={data?.pages}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={
          isEmpty ? styles.emptyContainer : styles.flatListContainer
        }
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onEndReached}
        onRefresh={refetch}
        refreshing={false}
        ListEmptyComponent={isEmpty ? <CalendarEmtpyState /> : undefined}
      />
    </>
  );
};
export default CalendarTab;

const styles = StyleSheet.create({
  flatListContainer: {marginTop: 32, paddingBottom: 100},
  emptyContainer: {marginTop: 32, flex: 1},
});
