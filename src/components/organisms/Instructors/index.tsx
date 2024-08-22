import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment, useCallback, useState} from 'react';
import {
  EducationEducatorItem,
  FlatList,
  LoadIndicator,
  Typography,
  getColor,
  useNavigate,
} from '~/components';
import ArrowUpSolid from '~/assets/iconset/Arrow/arrow-up-solid';
import useHeader from '~/components/elemental/hooks/use_header';
import {Pressable} from 'react-native';
import {useGetCategories} from '~/components/molecules/ItemSearch/hook';
import {useGetUsers} from '../CourseList/hook';

const RenderItem = ({item, onItemPress}) => (
  <EducationEducatorItem
    item={item}
    onItemPress={onItemPress}
    style={styles.itemContainer}
  />
);

const Instructors = () => {
  const {navigateWithName} = useNavigate();

  const scrollViewRef: any = React.createRef();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  }: any = useGetCategories({
    key: 'educationCategories',
  });

  let category;

  category = JSON.parse(
    data?.staticConfig_getStaticConfig?.result.value || '[]',
  );
  category.unshift({name: 'All'});

  const {data: educatorData, isLoading: educatorLoading}: any = useGetUsers({
    where: {userRole: {eq: 'educator'}},
  });

  const onFilterPress = item => {
    setSelectedFilter(item);
  };

  const {} = useHeader({
    hasBack: true,
    title: {children: 'Instructors', fontWeight: 'bold', fontSize: 'lg'},
  });

  const RenderCategoryItem = useCallback(
    ({item, index}) => (
      <Pressable
        style={[
          styles.button,
          index === 0 && {marginLeft: 20},
          {
            backgroundColor: getColor({
              color:
                selectedFilter === item?.name
                  ? 'primary.500'
                  : 'background.500',
            }),
          },
        ]}
        onPress={() => onFilterPress(item?.name)}>
        <Typography
          fontSize="sm"
          lineHeight={19}
          fontWeight={'500'}
          color={getColor({
            color: selectedFilter === item?.name ? 'gray.50' : 'gray.800',
          })}>
          {item?.name}
        </Typography>
      </Pressable>
    ),
    [onFilterPress],
  );

  return isLoading || educatorLoading ? (
    <LoadIndicator />
  ) : (
    <Fragment>
      <FlatList
        keyExtractor={item => item?.name ?? item}
        data={category ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 24, marginBottom: 16, height: 50}}
        renderItem={RenderCategoryItem}
      />
      <FlatList
        ref={scrollViewRef}
        keyExtractor={item => item?.id}
        numColumns={2}
        style={styles.mx}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        data={educatorData?.pages}
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          if (offsetY > 100) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        }}
        columnWrapperStyle={styles.wapper}
        refreshing={isRefetching}
        onRefresh={refetch}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onItemPress={() =>
              navigateWithName('InstructorProfile', {id: item?.id})
            }
          />
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
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

export default Instructors;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
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

  itemContainer: {width: '46%', marginHorizontal: 8, marginVertical: 6},

  mx: {
    marginHorizontal: 20,
  },

  wapper: {
    justifyContent: 'space-between',
  },
});
