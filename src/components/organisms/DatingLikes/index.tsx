import React from 'react';

import {deviceWidth, getColor, useDisclose} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {FilterIconButton} from '../DatingHome/views/DatingHomeHeader';
import {DatingFilter} from '../DatingHome/views/DatingFilter';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {StyleSheet} from 'react-native';
import {useDatingLikesFilter} from './hooks';
import UserGrid from './views/UserGrid';

function TabBarComponent(props: any) {
  return (
    <MaterialTabBar
      width={deviceWidth}
      {...props}
      activeColor={getColor({color: 'primary.500'})}
      inactiveColor={getColor({color: 'gray.500'})}
      indicatorStyle={styles.indicator}
      contentContainerStyle={styles.tabContent}
      labelStyle={styles.tabLabel}
      scrollEnabled
    />
  );
}

function DatingLikes(): JSX.Element {
  const filterDisclose = useDisclose(false);
  const {applyFilter, filterHook} = useDatingLikesFilter();

  useHeader({
    title: {children: 'Likes', fontSize: 'lg', fontWeight: 'bold'},
    hasBack: false,
    icons: <FilterIconButton onPress={() => filterDisclose.onOpen()} />,
  });

  return (
    <>
      <Tabs.Container
        headerContainerStyle={styles.tabContainer}
        renderTabBar={TabBarComponent}>
        <Tabs.Tab name="all" label="All">
          <Tabs.ScrollView>
            <UserGrid type="all" />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="new" label="New">
          <Tabs.ScrollView>
            <UserGrid type={'new'} />
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="matched" label="Matched">
          <Tabs.ScrollView>
            <UserGrid type="matched" />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>

      <DatingFilter
        filterHook={filterHook}
        disclose={filterDisclose}
        onApply={applyFilter}
      />
    </>
  );
}

export default DatingLikes;

const width = (deviceWidth - 62) / 2;
const height = 1.5 * width;

const styles = StyleSheet.create({
  tabContainer: {
    shadowOpacity: 0,
    elevation: 0,
    paddingHorizontal: 20,
    width: deviceWidth,
  },

  tabLabel: {
    marginStart: 0,
    fontSize: 14,
    fontWeight: '500',
    width: (2 * width) / 5,
    textAlign: 'left',
  },

  tabContent: {
    flex: 1,
    marginBottom: 8,
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 1,
  },

  indicator: {
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 1,
  },

  grad: {
    width: '100%',
    height: height,
    borderRadius: 15,
  },
});
