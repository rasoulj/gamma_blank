import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  ArrowDownIconSet,
  ArrowUp1IconSet,
  ArrowUpIconSet,
  Layer,
  Typography,
  getColor,
} from '~/components/elemental';
import useTrackedStates from './useStates';

const sortbyItems = [
  {value: 'Low to High Price', label: 'Low to High Price'},
  {value: 'High to Low Price', label: 'High to Low Price'},
  {value: 'Most Popular', label: 'Most Popular'},
];

const SortBy = () => {
  const filters: any = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!filters?.sort) {
      setTimeout(() => {
        setFilters({...filters, sort: sortbyItems[0]?.value});
      }, 1000);
    }

    return () => {
      setFilters({...filters, sort: null});
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{...styles.shadowContainer, width: '100%', margin: 8}}
        onPress={() => [
          setFilters({...filters, sort: item?.value}),
          setIsOpen(false),
        ]}>
        <Typography numberOfLines={1} style={{fontSize: 12, fontWeight: '400'}}>
          {item?.label}
        </Typography>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: getColor({color: 'gray.300'}),
        }}
      />
    );
  };
  return (
    <Layer
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3,
        marginVertical: 8,
      }}>
      <Typography style={{fontSize: 16, fontWeight: '500'}}>Sort by</Typography>
      <TouchableOpacity
        style={{
          ...styles.shadowContainer,
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: getColor({color: 'gray.50'}),
          borderRadius: 10,
          width: 160,
          justifyContent: 'space-between',
        }}
        onPress={() => setIsOpen(!isOpen)}>
        <Typography style={{marginRight: 10, fontSize: 12, fontWeight: '400'}}>
          {filters?.sort || sortbyItems[0]?.label}
        </Typography>
        {isOpen ? (
          <ArrowUpIconSet width={20} height={20} />
        ) : (
          <ArrowDownIconSet width={20} height={20} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          style={{
            alignSelf: 'center',
            position: 'absolute',
            top: 45,
            right: 0,
            backgroundColor: getColor({color: 'gray.50'}),
            borderRadius: 10,
            padding: 8,
            width: 160,
            zIndex: 2,
          }}
          data={sortbyItems}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
        />
      )}
    </Layer>
  );
};

export default SortBy;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
});
