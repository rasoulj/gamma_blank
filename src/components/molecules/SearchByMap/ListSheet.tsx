import {TouchableWithoutFeedback} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  ActionSheet,
  ArrowDownIcon,
  Center,
  GpsIconSet,
  HStack,
  Location2Icon,
  SectionList,
  Typography,
  View,
  calculateDistance,
  deviceHeight,
  deviceWidth,
  getColor,
  print,
} from '~/components/elemental';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import RenderItem from './RenderItem';
import {useFocusEffect} from '@react-navigation/native';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
export default function ListSheet({
  eventWithLocation,
  userCoordinate,
  setOpenBottomSheet,
  openBottomSheet,
  onPressCard,
  showDetail,
  flyToUserLocation,
  selectedLocation,
  nearByEvents,
  debouncedQuery,
}) {
  const [expand, setExpand] = useState(false);

  const onArrowClick = () => {
    setExpand(!expand);
  };

  const rotateArrow = useAnimatedStyle(() => {
    return {
      transform: [{rotate: withSpring(expand ? '0deg' : '180deg')}],
    };
  }, [expand]);

  const maxHeight = useAnimatedStyle(() => {
    return {
      width: deviceWidth,
      ...(eventWithLocation.length > 2 && {
        maxHeight: withSpring(
          expand ? deviceHeight * 0.7 : deviceHeight * 0.33,
        ),
      }),
    };
  }, [expand]);

  useFocusEffect(
    useCallback(() => {
      setOpenBottomSheet(true);
    }, []),
  );

  const DATA = useMemo(
    () => [
      {
        title: '',
        data: eventWithLocation?.filter(
          item =>
            parseFloat(
              calculateDistance(
                userCoordinate?.lat,
                userCoordinate?.long,
                item?.event?.latitude,
                item?.event?.longitude,
              ).toFixed(2),
            ) < 2,
        ),
      },
      {
        title: 'Other events',
        data: eventWithLocation?.filter(
          item =>
            parseFloat(
              calculateDistance(
                userCoordinate?.lat,
                userCoordinate?.long,
                item?.event?.latitude,
                item?.event?.longitude,
              ).toFixed(2),
            ) > 2,
        ),
      },
    ],
    [eventWithLocation],
  );

  const onRenderItem = useCallback(
    ({item, index}) => (
      <RenderItem
        {...{
          item,
          index,
          onPress: () => onPressCard(item),
          showDetail: () => showDetail(item),
          distance: calculateDistance(
            userCoordinate?.lat,
            userCoordinate?.long,
            item?.event?.latitude,
            item?.event?.longitude,
          ),
        }}
      />
    ),
    [eventWithLocation.length],
  );

  print(!!!debouncedQuery && selectedLocation);
  return (
    <ActionSheet
      isOpen={openBottomSheet}
      disableOverlay={true}
      hideDragIndicator>
      <TouchableWithoutFeedback onPress={flyToUserLocation}>
        <Center
          alignSelf={'flex-end'}
          mr={4}
          borderRadius={50}
          height={'10'}
          width={'10'}
          background={'primary.500'}>
          <GpsIconSet color={'#ffffff'} />
        </Center>
      </TouchableWithoutFeedback>
      <View
        backgroundColor={'primary.100'}
        width="100%"
        zIndex={-1}
        borderTopRightRadius={30}
        borderTopLeftRadius={30}
        px={5}
        height={60}
        top={3}>
        <HStack
          alignItems={'center'}
          space={2}
          mt={3}
          justifyContent={'space-between'}>
          <HStack space={2} alignItems={'center'}>
            <Location2Icon />
            <Typography color="white" fontWeight={'bold'}>
              {selectedLocation
                ? calculateDistance(
                    userCoordinate?.lat,
                    userCoordinate?.long,
                    selectedLocation?.event?.latitude,
                    selectedLocation?.event?.longitude,
                  ).toFixed(2) + ' KM AWAY'
                : nearByEvents?.length + '  Place found near you'}
            </Typography>
          </HStack>
          {eventWithLocation?.length > 2 && (
            <TouchableWithoutFeedback onPress={onArrowClick}>
              <Animated.View style={rotateArrow}>
                <ArrowDownIcon />
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
        </HStack>
      </View>
      <ActionSheet.Content px={6} bgColor={getColor({color: 'background.500'})}>
        <AnimatedSectionList
          sections={
            !!!debouncedQuery && selectedLocation
              ? [{title: '', data: [selectedLocation]}]
              : DATA
          }
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
          style={maxHeight}
          decelerationRate={0.1}
          renderItem={onRenderItem}
          renderSectionHeader={({section: {title}}: any) => (
            <Typography>{title}</Typography>
          )}
          keyExtractor={(item: any) =>
            item.event.id + Math.floor(Math.random())
          }
          maxToRenderPerBatch={10}
        />
      </ActionSheet.Content>
    </ActionSheet>
  );
}
