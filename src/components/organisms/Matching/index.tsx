import LinearGradient from 'react-native-linear-gradient';
import React, {memo, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  GET_MATCHES,
  UsersType,
  useBlockUser,
  useCreateMatch,
  useCreateUserSeen,
  useGetMatches,
  useGetUsers,
  useUpdateMatch,
} from './hooks';
import {HStack, View} from 'native-base';
import Image from '../../atoms/Image';
import {
  ArrowDownIconSet,
  Center,
  CloseIconSet,
  FilterIconSet,
  HeartIconSet,
  LoadIndicator,
  Typography,
  deviceHeight,
  deviceWidth,
  getColor,
  print,
  useAuth,
  useNavigate,
} from '../../elemental';
import {
  LayoutAnimation,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useQueryClient} from 'react-query';
import FilterActionSheet from './components/FilterActionSheet';
import useMatchAcceptedStore from '~/stores/matchAcceptedStore';

function Matching() {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const {navigateWithName} = useNavigate();
  const {matchingFilter} = useMatchAcceptedStore();

  const whereFilter = {
    take: 1,
    where: {
      user: {
        and: [
          {
            age: {gte: matchingFilter.age.start, lt: matchingFilter.age.end},
          },
          {
            gender: {eq: matchingFilter.gender?.toUpperCase()},
          },
        ],
      },
    },
  };

  const {mutate: blockUser, isLoading: blockUserIsLoading} = useBlockUser();
  const {users, isLoading} = useGetUsers(whereFilter);

  const {mutate: createMatch, isLoading: createMatchIsLoading} =
    useCreateMatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [completeScrollBarHeight] = useState(150);
  const visibleScrollBarHeight = useSharedValue(0);
  const [photoHeight, setPhotoHeight] = useState(0);
  const translateY = useSharedValue(0);
  const {user: currentUser} = useAuth();
  const userId = currentUser?.id;
  const {mutate: matchUserSeen, isLoading: isLoadingMatchUserSeen} =
    useCreateUserSeen();

  const {mutate: updateMatch, isLoading: updateMatchIsLoading} =
    useUpdateMatch();

  const result: UsersType = users?.[0];

  useEffect(() => {
    if (result?.user.userPhotos?.length > 1) {
      visibleScrollBarHeight.value =
        completeScrollBarHeight / result?.user?.userPhotos?.length;
    }
  }, [result]);

  const photos = result?.user?.userPhotos;

  const heightStyle = useAnimatedStyle(() => {
    if (photos?.length > 1) {
      const input = [...new Array(photos?.length).keys()].map((_, index) => {
        return index * photoHeight;
      });
      const output = [...new Array(photos?.length).keys()].map((_, index) => {
        return (index * completeScrollBarHeight) / photos?.length;
      });

      const translate_y = interpolate(translateY.value, input, output);

      return {
        height: visibleScrollBarHeight.value,
        transform: [{translateY: translate_y}],
      };
    } else {
      return {};
    }
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateY.value = event.contentOffset.y;
    },
  });

  const invalidateQuery = () => {
    const key = ['match_get_users', JSON.stringify(whereFilter)];
    queryClient.invalidateQueries(key);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const onNext = () => {
    const match = result?.match;
    if (match) {
      updateMatch(
        {
          input: {
            id: match.id,
            matchStatus: 'ACCEPTED',
          },
        },
        {
          onSuccess: () => {
            invalidateQuery();
          },
        },
      );

      return;
    }

    createMatch(
      {input: {targetUserId: result?.user?.id}},
      {
        onSuccess: (data: any) => {
          const isSuccess =
            data?.match_createMatch?.status?.value === 'Success' ||
            data?.match_createMatch?.status?.value === 'AlreadyExists';
          print({isSuccess});
          if (isSuccess) {
            invalidateQuery();
          }
        },
      },
    );
  };

  const onDislike = () => {
    matchUserSeen(
      {targetUserId: result?.user?.id},
      {
        onSuccess: () => {
          invalidateQuery();
        },
      },
    );
  };

  return (
    <>
      {isLoading && <LoadIndicator />}
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={async event => {
            if (event.nativeEvent.state === State.END) {
              if (index < users.length - 1 && !isLoading) {
                await onNext();
              }
            }
          }}>
          <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={event => {
              if (event.nativeEvent.state === State.END) {
                if (index >= 0) {
                  onDislike();
                }
              }
            }}>
            <View
              style={{
                flex: 1,
                ...(!result && {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
              }}>
              <Center
                position={'absolute'}
                top={4}
                right={4}
                zIndex={10}
                backgroundColor={'primary.100'}
                width={12}
                height={12}
                borderRadius={50}>
                <Pressable onPress={() => setOpenFilter(!openFilter)}>
                  <FilterIconSet color={'#000'} />
                </Pressable>
              </Center>

              {result?.user ? (
                <>
                  <Animated.FlatList
                    bounces={false}
                    data={
                      result
                        ? result?.user?.userPhotos?.length !== 0
                          ? result?.user?.userPhotos
                          : [{photoUrl: result?.user?.photoUrl}]
                        : []
                    }
                    style={{
                      flex: 1,
                    }}
                    contentContainerStyle={{
                      flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    onLayout={e => setPhotoHeight(e.nativeEvent.layout.height)}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    snapToInterval={deviceHeight}
                    keyExtractor={(item: any) => `item-${item?.id}`}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {isLoading ? (
                          <LoadIndicator />
                        ) : (
                          result?.user?.userPhotos?.length === 0 && (
                            <Typography>There is no photo</Typography>
                          )
                        )}
                      </View>
                    )}
                    decelerationRate={'fast'}
                    renderItem={({item}: any) => (
                      <Pressable
                        onPress={() =>
                          navigateWithName('full screen image', {
                            url: item?.photoUrl,
                            id: result?.user?.id,
                          })
                        }>
                        <Image
                          style={{
                            height: deviceHeight,
                            width: deviceWidth,
                          }}
                          resizeMode="cover"
                          src={item?.photoUrl}
                        />
                      </Pressable>
                    )}
                  />
                  {result?.user?.userPhotos?.length > 1 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 120,
                        right: 10,
                        height: 150,
                        width: 6,
                        backgroundColor: getColor({color: 'primary.200'}),
                        borderRadius: 8,
                      }}>
                      <Animated.View
                        style={[
                          {
                            width: 6,
                            borderRadius: 8,
                            backgroundColor: getColor({color: 'primary.100'}),
                          },
                          heightStyle,
                        ]}
                      />
                    </View>
                  )}
                  <LinearGradient
                    colors={['transparent', '#21212199', '#212121', '#000000']}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      paddingTop: 48,
                      paddingBottom: 16,
                      paddingHorizontal: 20,
                    }}>
                    <Typography
                      color={'#fff'}
                      style={{
                        fontSize: 24,
                        lineHeight: 24,
                        fontWeight: 'bold',
                      }}>
                      {result?.user?.fullName} . {result?.user?.age}
                    </Typography>
                    {result?.user?.userInterests?.length !== 0 && (
                      <HStack space={1} my={2} flexWrap={'wrap'}>
                        {result?.user?.userInterests
                          ?.slice(0, 5)
                          ?.map((item: any) => (
                            <Center
                              key={item?.id?.toString()}
                              mb={2}
                              background={getColor({color: 'primary.100'})}
                              py={1}
                              px={4}
                              borderRadius={8}>
                              <Typography color={'gray.800'}>
                                {item?.text}
                              </Typography>
                            </Center>
                          ))}
                      </HStack>
                    )}
                    <Typography
                      numberOfLines={5}
                      ellipsizeMode="tail"
                      color={'#fff'}>
                      {result?.user?.about}
                    </Typography>
                    <HStack
                      justifyContent={'center'}
                      alignItems={'center'}
                      space={6}
                      mt={6}
                      mb={result?.user?.userPhotos?.length - 1 > 0 ? 0 : 4}>
                      <Pressable
                        onPress={() => {
                          onDislike();
                        }}>
                        <Center
                          width={12}
                          height={12}
                          backgroundColor={'red.500'}
                          borderRadius={50}>
                          <Center
                            width={5}
                            height={5}
                            backgroundColor={'#fff'}
                            borderRadius={50}>
                            {isLoadingMatchUserSeen ? (
                              <ActivityIndicator />
                            ) : (
                              <CloseIconSet
                                width={15}
                                height={15}
                                color={'red.500'}
                              />
                            )}
                          </Center>
                        </Center>
                      </Pressable>
                      <Pressable onPress={onNext}>
                        <Center
                          width={12}
                          height={12}
                          backgroundColor={'primary.500'}
                          borderRadius={50}>
                          {updateMatchIsLoading || createMatchIsLoading ? (
                            <ActivityIndicator />
                          ) : (
                            <HeartIconSet
                              width={15}
                              height={15}
                              color={'background.500'}
                              fill={'#fff'}
                            />
                          )}
                        </Center>
                      </Pressable>
                    </HStack>
                    {result?.user?.userPhotos?.length > 1 && (
                      <TouchableWithoutFeedback
                        onPress={() => setIndex(prev => prev + 1)}>
                        <ArrowDownIconSet
                          color={'#fff'}
                          style={{alignSelf: 'center', marginVertical: 8}}
                        />
                      </TouchableWithoutFeedback>
                    )}
                  </LinearGradient>
                </>
              ) : (
                <Typography>No new people around you</Typography>
              )}
              <FilterActionSheet
                isOpen={openFilter}
                onClose={() => setOpenFilter(false)}
                onApply={e => {
                  setOpenFilter(false);
                }}
              />
            </View>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </GestureHandlerRootView>
    </>
  );
}

export default memo(Matching);
