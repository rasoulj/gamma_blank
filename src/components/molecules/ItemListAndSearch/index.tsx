import React, {useState} from 'react';
import {Screen, View} from '~/components/elemental';
import {useGetItems} from './hooks';
import RecentSearch from './RecentSearch';
import SearchBox from './SearchBox';

const ItemListAndSearch = () => {
  const [textSearch, setTextSearch] = useState<string>('');

  const options = {
    where: {
      or: [
        {title: {contains: textSearch}},
        {description: {contains: textSearch}},
      ],
    },
  };

  const {isLoading, data, fetchNextPage, hasNextPage} = useGetItems(options);
  console.log(data);
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Screen isLoading={isLoading}>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <SearchBox onSearchPress={text => setTextSearch(text)} />
        <RecentSearch {...{data, onLoadMore}} />
      </View>
    </Screen>
  );
};

export default ItemListAndSearch;
