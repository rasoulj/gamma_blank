import {TouchableOpacity, TextInput} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {
  Layer,
  SearchIcon,
  Typography,
  getColor,
  globalBorderRadius,
  theme,
  verticalScale,
} from '~/components/elemental';

const SearchBox = ({
  setTextSearch,
}: {
  setTextSearch: (text: string) => void;
}) => {
  return (
    <Layer
      style={{
        borderWidth: 1,
        borderRadius: globalBorderRadius?.input,
        height: verticalScale(49),
        borderColor: getColor({color: 'gray.400'}),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
      }}>
      <SearchIcon width={20} height={20} color="#707070" />
      <TextInput
        style={{
          width: '75%',
          height: '100%',
          marginStart: 10,
          fontSize: 17,
          color: theme?.Icon?.color?.default === '#FAFAF9' ? 'white' : 'black',
        }}
        placeholderTextColor={getColor({color: 'gray.400'})}
        onChangeText={txt => setTextSearch(txt)}
        placeholder="Search"
        returnKeyType="search"
      />
    </Layer>
  );
};

export default memo(SearchBox);
