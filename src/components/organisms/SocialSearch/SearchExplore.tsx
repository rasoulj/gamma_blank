import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBox from './SearchBox';
import {Tabs, useNavigate, useRoute} from '~/components';
import ForYou from './Tabs/ForYou';
import AccountsTab from './Tabs/Accounts';
import TagsTab from './Tabs/Tags';
import ReelsTab from './Tabs/Reels';
import useHeader from '~/components/elemental/hooks/use_header';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import {model} from '~/data/model';

const socialsearch = model?.metaData?.configs?.socialsearch ?? {
  accounts: true,
  reels: true,
  isShowExplore: true,
  tags: true,
};

const SearchExplore = () => {
  const params = useRoute().params;
  const {} = useHeader({hidden: true});
  const {socialType, handleCheckElementExist} = useSocialTypesConfig();
  const searchInput = params?.searchInput;

  const {navigateWithName} = useNavigate();

  const tabs = [
    {
      id: 'ForYou',
      label: 'For you',
      component: (
        <ForYou searchInput={searchInput} navigateWithName={navigateWithName} />
      ),
    },
    {
      id: 'Accounts',
      label: 'Accounts',
      component: (
        <AccountsTab
          searchInput={searchInput}
          navigateWithName={navigateWithName}
        />
      ),
    },
    {
      id: 'Tags',
      label: 'Tags',
      component: (
        <TagsTab
          searchInput={searchInput}
          navigateWithName={navigateWithName}
        />
      ),
    },
    {
      id: 'Reels',
      label: 'Reels',
      component: (
        <ReelsTab
          searchInput={searchInput}
          navigateWithName={navigateWithName}
        />
      ),
    },
  ];

  const onPressSearch = () => {
    navigateWithName('SocialSearch', {searchInput}, {push: true});
  };

  const tabItems = useMemo(() => {
    let items = [];
    items?.push(tabs[0]);
    socialsearch?.accounts && items?.push(tabs[1]);
    socialsearch?.tags && items?.push(tabs[2]);
    socialType != 'text' &&
      handleCheckElementExist('reels') &&
      socialsearch?.reels &&
      items.push(tabs[3]);
    return items;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBox
          containerStyle={styles.search}
          defaultValue={searchInput}
          onPress={onPressSearch}
          type="text"
          hasBackIcon
        />
      </View>
      <Tabs tabs={tabItems} activeTab={'ForYou'} />
    </View>
  );
};
export default SearchExplore;

const styles = StyleSheet.create({
  container: {flex: 1, paddingVertical: 13},
  marginTop: {marginTop: 10, marginEnd: 8},
  search: {marginBottom: 16},
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
