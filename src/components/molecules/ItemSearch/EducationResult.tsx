import {StyleSheet} from 'react-native';
import React, {Fragment, memo, useCallback, useMemo} from 'react';
import {
  EducationVerticalItem,
  FlatList,
  Layer,
  LoadIndicator,
  Tags,
  Typography,
  useNavigate,
} from '~/components';
import {useGetCourses} from '~/components/organisms/CourseList/hook';
import useTrackedStates from './useStates';
import NoResultIcon from '~/assets/icons/CustomIcons/NoResult.icon';
import {useGetCategories} from './hook';

const EducationResult = ({recentSearch}: {recentSearch?: any}) => {
  const {navigateWithName} = useNavigate();

  const filters: any = useTrackedStates(state => state?.filters);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const {data}: any = useGetCategories({
    key: 'educationCategories',
  });

  const {
    data: courseData,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  }: any = useGetCourses({
    where: {
      and: [
        {course: {title: {contains: searchQuery ?? ''}}},
        {
          ...(filters?.category && {
            course: {category: {eq: filters?.category}},
          }),
          ...(filters?.keyword && {
            course: {keywords: {contains: filters?.keyword}},
          }),
          ...(filters?.level && {
            course: {level: {eq: filters?.level}},
          }),
          ...(filters?.rate && {
            course: {rateAverage: {gte: filters?.rate}},
          }),
          ...(filters?.rangePrice && {
            course: {
              price: {gte: filters?.rangePrice[0], lte: filters?.rangePrice[1]},
            },
          }),
          ...(filters?.duration && {
            course: {
              duration: {gte: filters?.duration[0], lte: filters?.duration[1]},
            },
          }),
          ...(filters?.lessons && {
            course: {
              lessonCount: {gte: filters?.lessons[0], lte: filters?.lessons[1]},
            },
          }),
        },
      ],
    },
  });

  const categories = useMemo(() => {
    return data
      ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)?.map(
          item => item?.name,
        )
      : [];
  }, [data]);

  const renderItem = useCallback(
    ({item}) => (
      <EducationVerticalItem
        course={item}
        style={{marginHorizontal: 2}}
        onCoursePress={() =>
          navigateWithName('CourseDetails', {id: item?.course?.id})
        }
      />
    ),
    [],
  );
  const emptyComponent = () => {
    return (
      !isLoading && (
        <Layer style={styles.noHistoryContainer}>
          <NoResultIcon />
          <Typography color={'gray.400'} style={styles.noHistoryText}>
            No result!
          </Typography>
        </Layer>
      )
    );
  };

  const headerComponent = () => (
    <Tags
      tags={categories}
      selectedTags={filters?.category ? filters?.category : 'All'}
      setSelectedTags={item => [
        item === 'All'
          ? setFilters({...filters, category: null})
          : setFilters({...filters, category: item}),
      ]}
    />
  );

  return (
    <Fragment>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={courseData?.pages}
          scrollEventThrottle={16}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
          ListHeaderComponent={recentSearch ? recentSearch : headerComponent}
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </Fragment>
  );
};

export default memo(EducationResult);

const styles = StyleSheet.create({
  noHistoryContainer: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHistoryText: {
    marginTop: 32,
    fontSize: 20,
    fontWeight: '500',
  },
});
