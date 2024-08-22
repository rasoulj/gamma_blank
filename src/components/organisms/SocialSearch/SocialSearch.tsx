import React, {useCallback, useState} from 'react';
import {useGetAllUsers, useGetSearchHistories} from './hooks';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import SearchBox from './SearchBox';
import {
  EmptySearchIcon,
  FlatList,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import SearchHistoryItem from './SearchHistoryItem';
import useHeader from '~/components/elemental/hooks/use_header';
import {model} from '~/data/model';
import TagsTab from './Tabs/Tags';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import EmptyResult from './EmptyResult';
import {VStack} from 'native-base';

const socialsearch = model?.metaData?.configs?.socialsearch ?? {
  accounts: true,
  reels: true,
  isShowExplore: true,
  tags: true,
};

const SocialSearch = () => {
  const {} = useHeader({hidden: true});
  const {isStoryOnly} = useSocialTypesConfig();
  const params = useRoute()?.params;
  const [searchInput, setSearchInput] = useState<string | undefined>(
    params?.searchInput,
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBox
          type="input"
          containerStyle={styles.search}
          onChangeText={setSearchInput}
          defaultValue={params?.searchInput}
          hasBackIcon={!isStoryOnly}
        />
      </View>
      {!searchInput ? (
        <RecentSearch />
      ) : socialsearch?.accounts || isStoryOnly ? (
        <SearchResult searchInput={searchInput} />
      ) : (
        <SearchTags searchInput={searchInput} />
      )}
    </View>
  );
};

export default SocialSearch;

const RecentSearch = () => {
  const {data, isLoading, refetch} = useGetSearchHistories({
    order: [{createdDate: 'DESC'}],
    take: 10,
  });

  const renderItem = ({item, index}) => (
    <SearchHistoryItem
      {...{item, index}}
      hasClose
      navigateWithName={navigateWithName}
    />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const {navigateWithName} = useNavigate();
  const onSeeAllPress = () => {
    navigateWithName('AllRecentSearch');
  };
  const Header = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Typography fontSize="md" fontWeight="500" color="gray.800">
          Recent search
        </Typography>
        {data?.pages?.length > 0 && (
          <Typography
            fontSize="xs"
            fontWeight="500"
            color="blue.700"
            onPress={onSeeAllPress}>
            See all
          </Typography>
        )}
      </View>
    );
  }, [data]);

  return (
    <VStack flex="1">
      <FlatList
        ListHeaderComponent={Header}
        data={data?.pages}
        isLoading={isLoading}
        setEmptyComponent
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={refetch}
        refreshing={false}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyResult
              EmptySvg={EmptySearchIcon}
              text="You have no Search History"
            />
          ) : undefined
        }
      />
    </VStack>
  );
};

const SearchResult = ({searchInput}) => {
  const {navigateWithName, navigation} = useNavigate();
  const {isStoryOnly} = useSocialTypesConfig();

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetAllUsers({
    where: {and: [{user: {fullName: {contains: searchInput}}}]},
    enabled: socialsearch?.accounts,
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item, index}) => (
    <SearchHistoryItem
      {...{
        item: {value: JSON.stringify(item?.user), type: 'USER_ACCOUNT'},
        index,
        navigateWithName,
      }}
    />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;
  const HeaderComponent = useCallback(() => {
    const onPress = () => {
      navigation.pop();
      navigateWithName(
        'SearchExplore',
        {
          searchInput,
        },
        {push: true},
      );
    };
    return (
      <View style={styles.marginBottom}>
        <SearchHistoryItem
          {...{
            item: {value: searchInput, type: 'ALL'},
            index: -1,
            onPress,
            navigateWithName,
          }}
        />
      </View>
    );
  }, [searchInput]);

  return (
    <>
      {isLoading && <ActivityIndicator />}
      <FlatList
        ListHeaderComponent={
          socialsearch?.isShowExplore && !isStoryOnly
            ? HeaderComponent
            : undefined
        }
        data={data?.pages}
        onEndReached={onLoadMore}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={refetch}
        refreshing={false}
      />
    </>
  );
};

const SearchTags = ({searchInput}) => {
  const {navigateWithName, navigation} = useNavigate();

  const HeaderComponent = useCallback(() => {
    const onPress = () => {
      navigation.pop();
      navigateWithName(
        'SearchExplore',
        {
          searchInput,
        },
        {push: true},
      );
    };
    return (
      <View style={styles.marginBottom}>
        <SearchHistoryItem
          {...{
            item: {value: searchInput, type: 'ALL'},
            index: -1,
            onPress,
            navigateWithName,
          }}
        />
      </View>
    );
  }, [searchInput]);

  return (
    <TagsTab
      navigateWithName={navigateWithName}
      searchInput={searchInput}
      ListHeaderComponent={
        socialsearch?.isShowExplore ? HeaderComponent : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  separator: {height: 16},
  container: {paddingVertical: 13, flex: 1},
  marginTop: {marginTop: 10, marginEnd: 8},
  search: {marginBottom: 16, flex: 1},
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
  },
  marginBottom: {marginBottom: 16},
});
