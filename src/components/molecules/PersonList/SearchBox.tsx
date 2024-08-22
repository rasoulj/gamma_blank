import {TouchableOpacity, TextInput} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {SearchIcon, verticalScale, View, Text} from '~/components/elemental';
import theme from '~/theme';

const SearchBox = ({
  onSearchPress,
}: {
  onSearchPress: (text: string) => void;
}) => {
  const [textSearch, setTextSearch] = useState<string>('');

  useEffect(() => {
    if (textSearch?.length === 0) {
      onSearchPress?.('');
    }
  }, [textSearch]);

  return (
    <View
      mx="4"
      style={{
        borderWidth: 1,
        borderRadius: 25,
        height: verticalScale(40),
        borderColor: '#72D4BA',
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
          color: theme?.Icon?.color?.default === '#FAFAF9' ? 'white' : 'black',
        }}
        value={textSearch}
        onChangeText={txt => setTextSearch(txt)}
        placeholder="Search"
        returnKeyType="search"
        placeholderTextColor={'gray'}
        onSubmitEditing={() => onSearchPress?.(textSearch)}
      />
      {textSearch?.length > 0 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSearchPress?.(textSearch)}>
          <Text style={{color: '#72D4BA'}}>Submit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(SearchBox);
