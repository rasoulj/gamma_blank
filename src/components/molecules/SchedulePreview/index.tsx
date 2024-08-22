import React, {useCallback} from 'react';
import {FlatList, View} from 'native-base';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {
  Typography,
  Header,
  PlusIcon,
  useNavigate,
  isDark,
  SchedulePreviewItem,
} from '~/components/elemental';
import {useGetWorkingSchedules} from './hook';
import useAuthStore from '~/stores/authStore';

const SchedulePreview = () => {
  const {navigateWithName} = useNavigate();
  const {user} = useAuthStore();
  const {
    data: workingSchedules,
    hasNextPage,
    fetchNextPage,
    refetch,
    isLoading,
  } = useGetWorkingSchedules({
    order: [
      {
        createdDate: 'DESC',
      },
    ],
    userId: user?.id,
  });
  const onAddSchedule = () => navigateWithName('WorkingSchedule');
  const renderItem = useCallback(
    ({item, index}) => <SchedulePreviewItem {...{item, index}} />,
    [],
  );
  const ListEmptyComponent = useCallback(
    () => (
      <Typography style={styles.text}>
        No plan has been scheduled yet
      </Typography>
    ),
    [],
  );
  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };
  return (
    <>
      <Header title={'Schedule preview'} style={{marginHorizontal: 0}}>
        <PlusIcon
          color={isDark() ? 'gray.50' : 'gray.800'}
          style={{marginRight: 5}}
          onPress={onAddSchedule}
        />
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={isLoading ? undefined : ListEmptyComponent}
          data={workingSchedules?.pages}
          renderItem={renderItem}
          onEndReached={onEndReached}
          refreshing={false}
          onRefresh={refetch}
        />
        {isLoading && <ActivityIndicator />}
      </ScrollView>
    </>
  );
};
export default SchedulePreview;
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 10,
    marginBottom: 15,
    alignSelf: 'center',
    top: '100%',
  },
  container: {paddingHorizontal: 20, paddingVertical: 16},
  divider: {
    height: 1,
    backgroundColor: '#D4D4D8',
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  time: {
    marginBottom: 8,
  },
  contentContainerStyle: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
