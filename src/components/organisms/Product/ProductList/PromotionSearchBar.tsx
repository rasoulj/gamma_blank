import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {getColor} from '~/utils/helper/theme.methods';
import {
  CloseIconSet,
  FilterIconSet,
  SearchNormalIconSet,
} from '~/assets/iconset';
import {Input, Layer, ScrollView, Typography, deviceHeight} from '~/components';
import {useQueryClient} from 'react-query';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
import ItemSearchModal from '~/components/molecules/ItemSearch/Modals/ItemSearchModal';

const PromotionSearchBar = () => {
  const setSearchQuery = useTrackedStates(state => state?.setSearchQuery);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const setToggleFilter = useTrackedStates(state => state?.setToggleFilter);
  const filters = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const submitSearchText = value => {
    setSearchQuery(value);
  };

  useLayoutEffect(() => {
    return () => {
      setFilters({});
      setSearchQuery(null);
    };
  }, []);
  const filterType = key => {
    switch (key) {
      case 'category':
        return `${filters[key]}`;
      case 'rangePrice':
        return `Range: ${filters[key]?.[0]} - ${filters[key]?.[1]}`;
      case 'rate':
        return `${key}: ${filters[key]}`;
      default:
        break;
    }
  };

  return (
    <Layer style={styles.container}>
      <Input
        defaultValue={searchQuery}
        onChangeText={t => (searchQuery ? setSearchQuery(t) : null)}
        placeholder="Search"
        returnKeyLabel="My Custom button"
        onSubmitEditing={event => [submitSearchText(event.nativeEvent.text)]}
        leftElement={
          <SearchNormalIconSet color={'gray.400'} style={styles.searchIcon} />
        }
        rightElement={
          <>
            <TouchableOpacity
              style={styles.filterIconContainer}
              onPress={() => setToggleFilter(true)}>
              <FilterIconSet color={'gray.400'} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView horizontal>
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
      <ItemSearchModal entity="Product" />
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
    position: 'absolute',
    top: 70,
    zIndex: 2,
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
});

export default PromotionSearchBar;
