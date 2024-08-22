import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  CustomFormInput,
  Notification,
  useDebounce,
} from '~/components/elemental';
import SearchBox from './SearchBox';

const Transaction = () => {
  const [textSearch, setTextSearch] = useState<string>('');
  const debouncedQuery = useDebounce(textSearch, 500);

  return (
    <View>
      <SearchBox setTextSearch={text => setTextSearch(text)} />
      <Notification search={debouncedQuery} type="BoughtProduct" />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
