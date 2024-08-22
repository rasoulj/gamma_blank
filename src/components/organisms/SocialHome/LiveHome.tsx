import {VStack} from 'native-base';
import React, {useCallback} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import {StyleSheet, View} from 'react-native';
import {deviceWidth} from '~/utils/methods';
import LiveUser from '../Live/LiveUser';
import useUpdateVonageData from './UpdateVonageData';
import {BackgroundContentUploaderUI} from './BackgroundContentUploader';
import HomeSectionStory from './HomeSectionStory';
import EmptyState from './PostList/EmptyState';

const LiveHome = () => {
  const {vonageSessions, isLoading} = useUpdateVonageData({enabled: true});

  return (
    <VStack flex="1">
      <HomeSectionStory vonageData={vonageSessions} />
      <BackgroundContentUploaderUI />
      {vonageSessions?.length > 0 && !isLoading ? (
        <VStack alignItems={'center'} justifyContent={'center'}>
          <MemoLive vonageSessions={vonageSessions} />
        </VStack>
      ) : (
        <EmptyState />
      )}
    </VStack>
  );
};

export default LiveHome;

const LiveList = ({vonageSessions}) => {
  const renderItem = useCallback(({index, item}) => {
    return (
      <View style={styles.sliderItem}>
        <LiveUser
          {...{
            user: item?.creator,
            id: item?.id,
            liveItem: item,
            type: 'viewer',
            hasBottomOptions: false,
          }}
        />
      </View>
    );
  }, []);

  return (
    <Carousel
      data={vonageSessions}
      renderItem={renderItem}
      sliderWidth={deviceWidth * 0.9}
      itemWidth={deviceWidth * 0.9}
      vertical={false}
      slideStyle={styles.slideStyle}
      containerCustomStyle={styles.containerCustomStyle}
    />
  );
};

const MemoLive = React.memo(LiveList);

const styles = StyleSheet.create({
  slideStyle: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  sliderItem: {
    width: '100%',
    height: '90%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  containerCustomStyle: {height: '80%'},
});
