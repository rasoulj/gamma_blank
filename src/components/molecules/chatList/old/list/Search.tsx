import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Icon as NativeBaseIcon} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Search.styles';

export interface SearchProps {
  className?: string;
  onClickSearch: (searchKey: string) => void;
  onClickBack?: () => void;
}

const Search = ({onClickSearch, onClickBack}: SearchProps) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.Container}>
      <Input
        InputLeftElement={
          <NativeBaseIcon
            onPress={() => {
              if (onClickBack) {
                onClickBack();
              }
            }}
            as={<Icon name="chevron-left" size={20} color="#000" />}
            ml="2"
          />
        }
        variant="unstyled"
        InputRightElement={
          <NativeBaseIcon
            onPress={() => onClickSearch(value)}
            as={<Icon name="search" size={20} color="#000" />}
            ml="2"
          />
        }
        placeholder="Search"
        textAlign={'center'}
        onChangeText={text => setValue(text)}
        value={value}
        padding={1.5}
        isFullWidth={true}
      />
    </View>
  );
};

export default Search;
