import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  DropDown,
  Form,
  Input,
  Layer,
  RangeSlider,
  Rating,
  ScrollView,
  Typography,
  VStack,
  deviceHeight,
  deviceWidth,
  getColor,
  isDark,
} from '~/components/elemental';
import {useGetCategories, useGetMAXCoursePrice, useGetMAXPrice} from '../hook';
import useTrackedStates from '../useStates';
import {Center, HStack} from 'native-base';
import Tags from '~/components/atoms/Tags';
import {toSplitWords} from '~/utils/helper';
import CustomPicker from '~/components/atoms/CustomPicker';

const levelData = [
  {label: 'Beginner', value: 'BEGINNER'},
  {label: 'Intermediate', value: 'INTERMEDIATE'},
  {label: 'Advanced', value: 'ADVANCED'},
];

const lessonData = [
  {label: 'Under 10 lessons', value: [0, 10]},
  {label: '10 - 20 lessons', value: [10, 20]},
  {label: 'Over 20 lessons', value: [20, 100]},
];

const durationData = [
  {label: 'Under 3 hours', value: ['PT0H', 'PT3H']},
  {label: '3 - 10 hours', value: ['PT3H', 'PT10H']},
  {label: 'Over 10 hours', value: ['PT10H', 'PT2000H']},
];

const filterType = {
  Product: ['categories', 'brandName', 'price', 'rate'],
  Post: ['categories', 'price', 'rate'],
  Event: ['categories', 'price', 'rate'],
  Service: ['categories', 'price', 'rate'],
  Content: ['categories', 'price', 'rate'],
  Course: [
    'categories',
    'keyword',
    'rate',
    'price',
    'level',
    'numberOfLessons',
    'courseDuration',
  ],
};

const categoryType = {
  Product: 'productCategories',
  Post: 'postCategories',
  Event: 'eventCategories',
  Service: 'serviceCategories',
  Content: 'contentCategories',
  Course: 'educationCategories',
};

const ItemSearchModal = ({
  entity = 'Product',
}: {
  entity: 'Product' | 'Post' | 'Event' | 'Service' | 'Content' | 'Course';
}) => {
  const toggleFilter = useTrackedStates(state => state?.toggleFilter);
  const setToggleFilter = useTrackedStates(state => state?.setToggleFilter);
  const filters: any = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const [showMore, setShowMore] = useState(false);

  const {data, isLoading}: any = useGetCategories({
    key: categoryType[entity],
  });
  const {data: maxPrice, isLoading: isLoadingMaxPrice}: any = useGetMAXPrice(
    {},
  );

  const {data: maxCoursePrice}: any = useGetMAXCoursePrice({});

  const MaximumPrice =
    entity === 'Course'
      ? maxCoursePrice?.course_getMaxPrice?.result?.data
      : maxPrice?.ecommerce_getMaxPrice?.result?.data;

  const categories = useMemo(() => {
    return data
      ? entity === 'Course'
        ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)?.map(
            item => item?.name,
          )
        : JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
      : [];
  }, [data]);

  const filterItems = {
    categories: (
      <View style={styles.flexWrap}>
        {categories.slice(0, showMore ? 16 : 4)?.map(item => (
          <TouchableOpacity
            onPress={() => setFilters({...filters, category: item})}
            style={[
              styles.tag,
              {
                backgroundColor:
                  filters?.category === item
                    ? getColor({color: 'primary.100'})
                    : getColor({color: 'gray.50'}),
                borderColor:
                  filters?.category === item
                    ? getColor({color: 'primary.500'})
                    : getColor({color: 'gray.300'}),
              },
            ]}>
            <Typography color={'gray.800'} fontWeight={'700'} fontSize="sm">
              {item}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    ),
    price: (
      <RangeSlider
        name=""
        range={[MaximumPrice / 10, (MaximumPrice * 9) / 10]}
        max={MaximumPrice}
        sliderLength={deviceWidth - 75}
        unselectedStyle={{
          backgroundColor: isDark
            ? getColor({color: 'gray.300'})
            : getColor({color: 'primary.300'}),
          height: 3,
        }}
        containerStyle={styles.slider}
        selectedStyle={styles.selectStyle}
        onValuesChange={value => setFilters({...filters, rangePrice: value})}
        customMarkerLeft={e => {
          return (
            <Center style={styles.marker}>
              <Typography
                color={
                  isDark('primary')
                    ? getColor({color: 'gray.100'})
                    : getColor({color: 'gray.800'})
                }
                style={styles.markerTxt}>
                {e?.currentValue}
              </Typography>
            </Center>
          );
        }}
        customMarkerRight={e => {
          return (
            <Center style={styles.marker}>
              <Typography
                color={
                  isDark('primary')
                    ? getColor({color: 'gray.100'})
                    : getColor({color: 'gray.800'})
                }
                style={styles.markerTxt}>
                {e.currentValue}
              </Typography>
            </Center>
          );
        }}
      />
    ),
    brandName: (
      <Input
        placeholder="#Zara"
        value={filters?.brand || ''}
        onChange={(value: string) => setFilters({...filters, brand: value})}
      />
    ),
    rate: (
      <Rating
        onChange={data => setFilters({...filters, rate: data})}
        rating={filters?.rate}
        space={4}
        style={styles.starContainer}
        starStyle={styles.star}
      />
    ),
    keyword: (
      <Input
        placeholder="Ex: #Design"
        value={filters?.keyword || ''}
        onChange={(value: string) => setFilters({...filters, keyword: value})}
      />
    ),
    level: (
      <CustomPicker
        placeholder="Select"
        name={'Level'}
        data={levelData}
        width="91%"
        left="1%"
        titleKey="label"
        onChangeValue={(value: string) =>
          setFilters({...filters, level: value})
        }
      />
    ),
    numberOfLessons: (
      <CustomPicker
        placeholder="Select"
        name={'lessons'}
        data={lessonData}
        titleKey="label"
        width="91%"
        left="1%"
        onChangeValue={(value: string) =>
          setFilters({...filters, lessons: value})
        }
      />
    ),
    courseDuration: (
      <VStack marginBottom={100}>
        <CustomPicker
          placeholder="Select"
          name={'duration'}
          data={durationData}
          width="91%"
          left="1%"
          titleKey="label"
          onChangeValue={(value: string) =>
            setFilters({...filters, duration: value})
          }
        />
      </VStack>
    ),
  };

  return (
    <CustomActionSheet
      title="Filter"
      isVisible={toggleFilter}
      onClose={() => setToggleFilter(false)}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
        maxHeight={deviceHeight / 1.6}>
        <Form>
          {filterType[entity]?.map(item => {
            return (
              <Layer style={styles.filterView}>
                <HStack justifyContent={'space-between'}>
                  <Typography style={styles.title}>
                    {toSplitWords(item)}
                    {item === 'price' && (
                      <Typography color="gray.400" fontSize="xs">
                        {' '}
                        ($)
                      </Typography>
                    )}
                  </Typography>
                  {item === 'categories' && (
                    <Typography
                      color={'secondary.500'}
                      onPress={() => setShowMore(!showMore)}>
                      {showMore ? 'See less' : 'See more'}
                    </Typography>
                  )}
                </HStack>
                {filterItems[item]}
              </Layer>
            );
          })}
        </Form>
      </ScrollView>
      <Layer style={styles.footer}>
        <Button
          variant={'outline'}
          style={styles.resetBtn}
          onPress={() => [setToggleFilter(false), setFilters({})]}>
          <Typography color={'primary.500'} style={styles.btn}>
            Reset
          </Typography>
        </Button>
        <Button style={styles.applyBtn} onPress={() => setToggleFilter(false)}>
          <Typography color={'background.500'} style={styles.btn}>
            Apply
          </Typography>
        </Button>
      </Layer>
    </CustomActionSheet>
  );
};

export default ItemSearchModal;

const styles = StyleSheet.create({
  btn: {fontSize: 14, fontWeight: '700', lineHeight: 16},

  resetBtn: {flex: 1, marginRight: 16, height: 36},

  applyBtn: {flex: 1, height: 36},

  footer: {flexDirection: 'row', marginTop: 24, marginBottom: 12},

  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'capitalize',
  },

  slider: {
    marginHorizontal: 16,
    alignSelf: 'center',
  },

  marker: {
    minWidth: 32,
    height: 32,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 4,
  },

  starContainer: {
    width: '100%',
    alignSelf: 'center',
  },

  star: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
  },

  markerTxt: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  selectStyle: {
    backgroundColor: getColor({color: 'primary.500'}),
    height: 3,
  },

  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    marginBottom: 8,
  },

  tag: {
    marginVertical: 8,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
  },

  scrollViewStyle: {
    flexGrow: 1,
  },

  filterView: {
    marginVertical: 8,
    justifyContent: 'space-between',
  },
});
