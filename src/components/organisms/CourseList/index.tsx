import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment, useCallback, useState} from 'react';
import {
  EducationVerticalItem,
  FlatList,
  LoadIndicator,
  Typography,
  VStack,
  getColor,
  useNavigate,
  useRoute,
} from '~/components';
import HorizontalProductsList from '../EducationHome/HorizontalProductsList';
import ArrowUpSolid from '~/assets/iconset/Arrow/arrow-up-solid';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetCourses} from './hook';
import EducationEmptyState from '~/assets/icons/CustomIcons/EducationEmptyState.icon';

const RenderItem = ({item, onCoursePress, hasMargin}) => (
  <EducationVerticalItem
    course={item}
    onCoursePress={() => onCoursePress()}
    style={{marginHorizontal: hasMargin ? 20 : 2}}
  />
);

const ListEmptyComponent = () => (
  <VStack
    justifyContent={'center'}
    alignItems={'center'}
    mt="48"
    alignSelf={'center'}>
    <EducationEmptyState />
    <Typography style={styles.title} color={'gray.400'}>
      No Course Yet!
    </Typography>
  </VStack>
);

const CourseList = () => {
  const {navigateWithName} = useNavigate();

  const {params} = useRoute();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const scrollViewRef: any = React.createRef();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const {
    data: courseData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }: any = useGetCourses(
    params?.hasHeader
      ? {
          where: {
            and: [
              {
                course: {
                  category: {eq: params?.data?.name ?? params?.data},
                  isDraft: {eq: false},
                },
              },
              selectedFilter !== 'All'
                ? {
                    course: {
                      subcategory: {eq: selectedFilter},
                      isDraft: {eq: false},
                    },
                  }
                : {},
            ],
          },
        }
      : params?.filter,
  );

  const {data: topRateData}: any = useGetCourses({
    where: {
      and: [
        {
          course: {
            category: {eq: params?.data?.name ?? params?.data},
            isDraft: {eq: false},
          },
        },
        selectedFilter !== 'All'
          ? {course: {subcategory: {eq: selectedFilter}, isDraft: {eq: false}}}
          : {},
      ],
    },
    order: [{course: {rateAverage: 'DESC'}}],
  });

  const onFilterPress = item => {
    setSelectedFilter(item);
  };

  const {} = useHeader({
    hasBack: true,
    title: {
      children: params?.data?.name ?? params?.data,
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  const renderCategoryItem = useCallback(
    ({item}) => (
      <Pressable
        style={[
          styles.button,

          {
            backgroundColor: getColor({
              color: selectedFilter === item ? 'primary.500' : 'background.500',
            }),
          },
        ]}
        onPress={() => onFilterPress(item)}>
        <Typography
          fontSize="md"
          lineHeight={19}
          fontWeight={'500'}
          color={getColor({
            color: selectedFilter === item ? 'gray.50' : 'gray.800',
          })}>
          {item}
        </Typography>
      </Pressable>
    ),
    [onFilterPress],
  );

  const ListHeaderComponent = () => (
    <Fragment>
      <FlatList
        data={params?.data?.subCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.mt}
        renderItem={renderCategoryItem}
        ListHeaderComponent={() => (
          <Pressable
            style={[
              styles.button,

              {
                marginLeft: 20,
                backgroundColor: getColor({
                  color:
                    selectedFilter === 'All' ? 'primary.500' : 'background.500',
                }),
              },
            ]}
            onPress={() => onFilterPress('All')}>
            <Typography
              fontSize="md"
              lineHeight={19}
              fontWeight={'500'}
              color={getColor({
                color: selectedFilter === 'All' ? 'gray.50' : 'gray.800',
              })}>
              All
            </Typography>
          </Pressable>
        )}
      />
      {topRateData?.pages?.length > 0 && (
        <HorizontalProductsList
          title="Top Rated Courses"
          data={topRateData?.pages}
          loading={false}
          onClickSeeAll={() => {
            navigateWithName('CourseList', {
              data: 'Top Rated Courses',
              filter: `{
            order: [{rateAverage: 'DESC'}],
          }`,
            });
          }}
        />
      )}
      <Typography
        fontSize="md"
        lineHeight={22}
        fontWeight={'700'}
        color={'black'}
        ml={'5'}
        mb="2"
        mt="4">
        Other Courses
      </Typography>
    </Fragment>
  );

  return (
    <Fragment>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <FlatList
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          data={courseData?.pages}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY > 100) {
              setShowScrollToTop(true);
            } else {
              setShowScrollToTop(false);
            }
          }}
          scrollEventThrottle={16}
          ListHeaderComponent={() =>
            params?.hasHeader ? ListHeaderComponent() : null
          }
          renderItem={({item}) => (
            <RenderItem
              item={item}
              onCoursePress={() =>
                navigateWithName('CourseDetails', {id: item?.course?.id})
              }
              hasMargin={!!params?.data}
            />
          )}
          ListEmptyComponent={() => <ListEmptyComponent />}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}

      {showScrollToTop && (
        <TouchableOpacity
          onPress={() => {
            if (scrollViewRef.current) {
              scrollViewRef?.current?.scrollToIndex({
                animated: true,
                index: 0,
                viewPosition: 1,
              });
            }
          }}
          style={styles.upArrow}>
          <ArrowUpSolid />
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    marginRight: 8,
  },

  upArrow: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 30,
    borderRadius: 100,
    shadowColor: getColor({color: 'gray.400'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: getColor({color: 'background.500'}),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    marginTop: 20,
  },

  mt: {marginTop: 24},
});
