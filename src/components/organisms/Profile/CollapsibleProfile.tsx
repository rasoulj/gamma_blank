import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Platform,
  StatusBar,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import ProfileHeader from './ProfileHeader';
import {useGetPosts} from './hooks';
import {ProfileListItem} from './ProfilePostItem';
import {getColor} from '~/utils/helper/theme.methods';
import {deviceHeight, deviceWidth, useRoute} from '~/components/elemental';
import CustomTabBar from './TabBar';
import useAuthStore from '~/stores/authStore';
import ProfileViewing from './ProfileViewingHeader';
import {ReelsListItem} from './MyReelsList';
import NoPosts from './NoPosts';

const TabBarHeight = 48;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const routes = [
  {key: 'tab1', title: 'Posts'},
  {key: 'tab2', title: 'Reels'},
];

const CollapsibleProfile = () => {
  const route = useRoute();
  const {user} = useAuthStore(state => state);
  const userId = route?.params?.userId ?? route?.params?.item?.id ?? user?.id;
  const [HeaderHeight, setHeaderHeight] = useState(300);
  const [tabIndex, setIndex] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);

  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach(item => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach(item => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const onLayout = event => {
    setHeaderHeight(event?.nativeEvent?.layout?.height);
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[
          styles.header,
          {transform: [{translateY: y}], height: HeaderHeight},
        ]}>
        <View onLayout={onLayout}>
          {userId === user?.id ? (
            <ProfileHeader />
          ) : (
            <ProfileViewing {...{userId}} />
          )}
        </View>
      </Animated.View>
    );
  };

  const renderTabsPadder = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [-70, -70],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, {transform: [{translateY: y}], height: 70}]}>
        <View style={styles.tabsPadder} />
      </Animated.View>
    );
  };

  const rednerTab1Item = ({item, index}) => {
    return <ProfileListItem {...{item, index}} />;
  };

  const rednerTab2Item = ({item, index}) => {
    return (
      <ReelsListItem
        {...{
          item,
          index,
        }}
      />
    );
  };

  const {
    data: postData,
    hasNextPage: postHasNextPage,
    fetchNextPage: postFetchNextPage,
    isLoading: postLoading,
  } = useGetPosts({
    where: {
      and: [
        {post: {posterId: {eq: userId}}},
        {post: {isDraft: {eq: false}}},
        {post: {postType: {eq: 'POST'}}},
      ],
    },
  });
  const onPostEndReached = () => {
    postHasNextPage && postFetchNextPage();
  };

  const {
    data: reelsData,
    hasNextPage: reelsHasNextPage,
    fetchNextPage: reelsFetchNextPage,
    isLoading: reelsLoading,
  } = useGetPosts({
    where: {
      and: [
        {post: {posterId: {eq: userId}}},
        {post: {isDraft: {eq: false}}},
        {post: {postType: {eq: 'REELS'}}},
      ],
    },
  });
  const onReelsEndReached = () => {
    reelsHasNextPage && reelsFetchNextPage();
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols = 3;
    let data;
    let renderItem;
    let onEndReached;
    let EmptyList;
    switch (route.key) {
      case 'tab1':
        data = postData?.pages;
        renderItem = rednerTab1Item;
        onEndReached = onPostEndReached();
        EmptyList = postLoading ? undefined : <NoPosts userId={userId} />;
        break;
      case 'tab2':
        data = reelsData?.pages;
        renderItem = rednerTab2Item;
        onEndReached = onReelsEndReached();
        EmptyList = !reelsLoading ? (
          <NoPosts title="reels" userId={userId} />
        ) : undefined;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: scrollY}},
                  },
                ],
                {useNativeDriver: true},
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
          minHeight: deviceHeight - SafeStatusBar + HeaderHeight,
          alignSelf: 'center',
          width: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
      />
    );
  };

  const renderTabBar = props => (
    <CustomTabBar {...{scrollY, HeaderHeight, isListGliding, props}} />
  );

  const renderTabView = () => {
    const onIndexChange = (id: number) => {
      _tabIndex.current = id;
      setIndex(id);
    };
    return (
      <TabView
        onIndexChange={onIndexChange}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={styles.initialLayout}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
      {renderTabsPadder()}
    </View>
  );
};

export default CollapsibleProfile;

const styles = StyleSheet.create({
  initialLayout: {
    height: 0,
    width: deviceWidth,
  },
  container: {
    flex: 1,
    backgroundColor: getColor({color: 'background.500'}),
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  indicator: {backgroundColor: getColor({color: 'primary.500'})},
  columnWrapperStyle: {justifyContent: 'space-between'},
  itemSeparator: {height: 10},
  footer: {height: 50},
  tabsPadder: {
    height: 70,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: getColor({color: 'background.500'}),
    zIndex: -1000,
  },
});
