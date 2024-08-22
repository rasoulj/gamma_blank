import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getColor} from '~/utils/helper/theme.methods';
import {
  CloseIconSet,
  FilterIconSet,
  SearchNormalIconSet,
} from '~/assets/iconset';
import {Input, Layer, ScrollView, Typography, deviceHeight} from '~/components';
import useTrackedStates from './useStates';
import {useCreateSearchHistory, useGetProductsSearch} from './hook';
import {useQueryClient} from 'react-query';
import {useGetCourses} from '~/components/organisms/CourseList/hook';
import {toNumericPart, toPascalCase} from '~/utils/helper';

const SearchBar = ({entity = 'Product'}) => {
  const setSearchQuery = useTrackedStates(state => state?.setSearchQuery);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const setToggleFilter = useTrackedStates(state => state?.setToggleFilter);
  const filters = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const queryClient = useQueryClient();
  const {mutate: mutateCreateSearch, isLoading} = useCreateSearchHistory();

  const [search, setSearch] = useState('');

  const {data: dataProduct} = useGetProductsSearch({
    where: {
      product: {
        title: {
          startsWith: search,
        },
      },
    },
  });

  useEffect(() => {
    setFilters(null);
  }, []);

  const {data: courseData}: any = useGetCourses({
    where: {
      course: {title: {contains: searchQuery || search}},
    },
  });

  const submitSearchText = value => {
    const input = {
      type: entity,
      value,
    };
    mutateCreateSearch(
      {input},
      {
        onSuccess(data: any) {
          if (data?.searchHistory_createSearchHistory?.result?.value) {
            setSearchQuery(
              data?.searchHistory_createSearchHistory?.result?.value,
            );
            queryClient?.invalidateQueries(['getSearchHistory']);
          }
        },
      },
    );
  };

  const filterType = key => {
    switch (key) {
      case 'category':
        return `${filters[key]}`;
      case 'rangePrice':
        return `Range: ${filters[key]?.[0]} - ${filters[key]?.[1]}`;
      case 'level':
        return `level: ${toPascalCase(filters[key])}`;
      case 'duration':
        return `Duration: ${toNumericPart(filters[key]?.[0])} - ${toNumericPart(
          filters[key]?.[1],
        )} H`;
      case 'keyword':
        return `Keyword: ${filters[key]}`;
      case 'rate':
        return `${key}: ${filters[key]}`;
      case 'lesson':
        return `lessons count: ${filters[key]?.[0]} - ${filters[key]?.[1]}`;
      default:
        break;
    }
  };

  return (
    <Layer style={styles.container}>
      <Input
        defaultValue={searchQuery}
        placeholder="Search"
        onChangeText={t => {
          if (searchQuery) {
            setSearchQuery(t), setFilters(null);
          } else {
            setSearch(t);
          }
        }}
        returnKeyLabel="Search"
        onSubmitEditing={event => [
          event.nativeEvent.text && submitSearchText(event.nativeEvent.text),
        ]}
        leftElement={
          <SearchNormalIconSet color={'gray.400'} style={styles.searchIcon} />
        }
        rightElement={
          <>
            {isLoading && (
              <ActivityIndicator
                size={'small'}
                style={styles.activityIndicator}
              />
            )}
            {searchQuery && (
              <TouchableOpacity
                style={styles.filterIconContainer}
                onPress={() => setToggleFilter(true)}>
                <FilterIconSet color={'gray.400'} />
              </TouchableOpacity>
            )}
          </>
        }
      />
      {search && !searchQuery && (
        <Layer style={styles.suggestionsContainer}>
          {entity === 'Course'
            ? courseData?.pages?.map((i: any) => (
                <TouchableOpacity
                  onPress={() => [
                    submitSearchText(i?.course?.title),
                    setSearch(''),
                    setFilters(null),
                  ]}>
                  <Typography style={styles.suggestionTextCourse}>
                    {i?.course?.title}
                  </Typography>
                </TouchableOpacity>
              ))
            : dataProduct?.pages?.map((i: any) => (
                <TouchableOpacity
                  onPress={() => [
                    submitSearchText(i?.product?.title),
                    setSearch(''),
                  ]}>
                  <Typography style={styles.suggestionText}>
                    {i?.product?.title}
                  </Typography>
                </TouchableOpacity>
              ))}
        </Layer>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(filters)?.map(key => {
          return filterType(key) ? (
            <Layer style={styles.filterContainer}>
              <CloseIconSet
                onPress={() => [delete filters[key], setFilters({...filters})]}
              />
              <Typography style={styles.filterText}>
                {filterType(key)}
              </Typography>
            </Layer>
          ) : null;
        })}
      </ScrollView>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
  },
  searchIcon: {
    marginLeft: 16,
  },
  activityIndicator: {
    marginRight: 16,
  },
  filterIconContainer: {
    paddingRight: 16,
  },
  suggestionsContainer: {
    width: '100%',
    height: deviceHeight,
    zIndex: 3,
    backgroundColor: getColor({color: 'background.500'}),
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: getColor({color: 'primary.100'}),
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 16,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  suggestionTextCourse: {
    fontSize: 16,
    marginVertical: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default SearchBar;
