import {HStack, VStack} from 'native-base';
import React, {useCallback} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import LocationOutlineIcon from '~/assets/iconset/Location/location-outline';
import {ArrowLeft1IconSet, Typography, getColor} from '~/components/elemental';

const SearchLocationList = ({
  onItemSelect,
  onClickBack,
}: {
  onItemSelect?: (data) => any;
  onClickBack?: any;
}) => {
  const renderRow = useCallback((data: GooglePlaceData, index: number) => {
    const onPress = () => {
      onItemSelect?.(data.description);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <HStack space="2" alignItems="center">
          <VStack
            w="54"
            h="54"
            borderRadius="27"
            alignItems="center"
            justifyContent="center"
            borderColor="gray.800"
            borderWidth="1">
            <LocationOutlineIcon color={getColor({color: 'gray.800'})} />
          </VStack>
          <Typography color="gray.800">{data?.description}</Typography>
        </HStack>
      </TouchableOpacity>
    );
  }, []);

  const renderLeftButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={onClickBack}>
        <ArrowLeft1IconSet
          size={'24'}
          style={styles.arrowLeft}
          color="gray.800"
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <VStack p="5" h={'100%'} flex="1">
      <GooglePlacesAutocomplete
        listLoaderComponent={<ActivityIndicator />}
        placeholder="Search"
        keyboardShouldPersistTaps="always"
        renderRow={renderRow}
        renderLeftButton={onClickBack ? renderLeftButton : undefined}
        styles={styles}
        query={{
          key: 'AIzaSyCbfzgUBB1l7qOu7spJC_JhmVIlg13To6g',
          language: 'en',
        }}
        fetchDetails
      />
    </VStack>
  );
};

export default SearchLocationList;
const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
    alignItems: 'center',
    zIndex: 2,
  },

  listView: {backgroundColor: getColor({color: 'background.200'})},

  container: {backgroundColor: getColor({color: 'background.200'})},

  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    padding: 6,
    alignItems: 'center',
  },

  arrowLeft: {marginRight: 9},

  row: {backgroundColor: getColor({color: 'background.200'})},

  poweredContainer: {backgroundColor: getColor({color: 'background.200'})},

  powered: {color: getColor({color: 'gray.200'})},
});
