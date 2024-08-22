import React, {useCallback, useRef} from 'react';
import {FlatList} from 'react-native';
import styles from './styles';
import {LoadIndicator, useNavigate} from '~/components/elemental';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from './ListEmptyComponent';
import CompletedCourseCard from '~/components/molecules/CompletedCourseCard';
import {useGetMyCourses} from '../CourseList/hook';

export default function CompletedCourses() {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  const {data, isLoading, fetchNextPage, hasNextPage, isRefetching, refetch} =
    useGetMyCourses({
      where: {status: {eq: 'COMPLETED'}},
    });

  const renderItem = useCallback(
    ({item}) => (
      <CompletedCourseCard
        item={item}
        onCoursePress={() =>
          navigateWithName('CourseDetails', {id: item?.courseId})
        }
      />
    ),
    [],
  );

  return isLoading ? (
    <LoadIndicator style={styles.tabStyle} />
  ) : (
    <Tabs.FlatList
      ref={listRef}
      keyExtractor={item => item?.id}
      data={data?.pages}
      refreshing={isRefetching}
      onRefresh={refetch}
      contentContainerStyle={styles.tabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
}
