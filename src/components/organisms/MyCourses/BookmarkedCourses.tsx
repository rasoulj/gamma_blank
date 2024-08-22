import React, {useCallback, useRef} from 'react';
import {FlatList} from 'react-native';
import styles from './styles';
import {LoadIndicator, useNavigate} from '~/components/elemental';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from './ListEmptyComponent';
import BookmarkCourseCard from '~/components/molecules/BookmarkCourseCard';
import {useFaviriteLessons} from '../CourseList/hook';

export default function BookmarkedCourses() {
  const listRef = useRef<FlatList>();

  const {navigateWithName} = useNavigate();

  const {data, isLoading} = useFaviriteLessons({
    order: [{createdDate: 'DESC'}],
  });

  const renderItem = useCallback(
    ({item}) => (
      <BookmarkCourseCard
        course={item}
        onCoursePress={() =>
          navigateWithName('LessonDetails', {id: item?.topicId})
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
      contentContainerStyle={styles.tabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
}
