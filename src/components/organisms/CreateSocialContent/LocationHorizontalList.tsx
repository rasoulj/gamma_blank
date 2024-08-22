import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {
  HStack,
  ArrowRightIconSet,
  Typography,
  VStack,
  Box,
  FlatList,
  FormControl,
} from '~/components';
import {StyleSheet} from 'react-native';
import {useGetUsedLocations} from './hooks';
import LocationOutlineIcon from '~/assets/iconset/Location/location-outline';
import LocationModal from './LocationModal';
import {getColor} from '~/utils/helper/theme.methods';

function LocationHoriztontalList({
  name,
  content,
}: {
  name: string;
  content?: any;
}) {
  const {field} = useController({name});
  const [locationsData, setLocationsData] = useState([]);

  const flatListRef = useRef();

  const {data: locations, fetchNextPage, hasNextPage} = useGetUsedLocations();

  useEffect(() => {
    setLocationsData(
      field?.value
        ? [{data: field.value}, ...locations?.pages]
        : locations?.pages,
    );
    if (locations?.pages?.length > 0 && content?.locations)
      field.onChange(content?.locations);
  }, [locations]);

  const renderLocationItem = useCallback(
    ({item, index}) => {
      const onPress = () => {
        onLocationSelect(item?.data);
      };

      return (
        <VStack
          borderColor="primary.500"
          borderWidth="2"
          bgColor={field.value === item?.data ? 'primary.500' : undefined}
          px="1"
          alignItems="center"
          justifyContent="center"
          height={'9'}
          borderRadius="10">
          <Typography
            onPress={onPress}
            alignSelf="center"
            textAlign="center"
            color={
              field.value === item?.data ? 'background.200' : 'primary.500'
            }
            fontSize="sm"
            fontWeight={700}>
            {item?.data}
          </Typography>
        </VStack>
      );
    },
    [field],
  );

  const keyExtractor = React.useCallback(
    (item: any, index: number) => `location-${item?.data}_${index}`,
    [],
  );

  const [visibleLocationModal, setVisibleLocationModal] = useState(false);

  const onPressAddLocation = () => {
    setVisibleLocationModal(true);
  };

  const onLocationSelect = (data?: string) => {
    let tempLocation = [...locationsData];
    let index = tempLocation?.findIndex(item => item?.data === data);
    if (index > -1) {
      tempLocation?.splice(index, 1);
    }
    setLocationsData([{data}, ...tempLocation]);
    field.onChange(data);
    setTimeout(() => {
      flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
    }, 500);
  };

  const onLocationNextPage = () => {
    hasNextPage && fetchNextPage();
  };

  return (
    <>
      <FormControl w={{base: '100%'}}>
        <VStack flex="1">
          <HStack
            justifyContent="space-between"
            mt="4"
            mb="2"
            flexShrink={1}
            px="5">
            <HStack alignItems="center" space="2">
              <LocationOutlineIcon
                size={24}
                color={getColor({color: 'gray.800'})}
              />
              <Typography
                color="gray.800"
                fontSize="md"
                fontWeight={600}
                w="80%"
                numberOfLines={1}
                onPress={onPressAddLocation}>
                Add a location
              </Typography>
            </HStack>
            <ArrowRightIconSet onPress={onPressAddLocation} color="gray.800" />
          </HStack>
          <FlatList
            horizontal
            data={locationsData ?? []}
            ItemSeparatorComponent={() => <Box w="2" />}
            renderItem={renderLocationItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={onLocationNextPage}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            ref={flatListRef}
          />
        </VStack>
      </FormControl>
      {visibleLocationModal && (
        <LocationModal
          isVisible={visibleLocationModal}
          onClose={() => setVisibleLocationModal(false)}
          onLocationSelect={onLocationSelect}
        />
      )}
    </>
  );
}

export default LocationHoriztontalList;

const styles = StyleSheet.create({
  contentContainerStyle: {paddingHorizontal: 20},
});
