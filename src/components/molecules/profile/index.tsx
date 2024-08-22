import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  CallIconSet,
  Center,
  EventLocationIcon,
  HStack,
  Header,
  IMG,
  Layer,
  LoadIndicator,
  RightIcon,
  RoundedEditIcon,
  ScrollView,
  Setting2IconSet,
  ThreeDotsIcon,
  Typography,
  User,
  User2Icon,
  deviceWidth,
  getColor,
  isDark,
  print,
  useAuth,
  useGetCurrentUser,
  useGetPhotoGallery,
  useNavigate,
  useToast,
} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {useGetInterest, useUnmatch} from '../../organisms/Matching/hooks';
import {
  useFollowUserMutate,
  useGetPostUserCount,
  useGetSocialUser,
  useUnfollowUserMutate,
} from './hooks';
import ProfileModal from './Modals/ProfileModal';

const imageSize = (deviceWidth - 60) / 3;

type ProfileProps = {
  images?: boolean;
  bio?: boolean;
  age?: boolean;
  hasEditIcon?: boolean;
  social?: boolean;
  post?: boolean;
  message?: boolean;
  call?: boolean;
  interests?: boolean;
  match?: boolean;
};

export default function Profile({
  bio = true,
  images = true,
  social = true,
  post = false,
  message = false,
  hasEditIcon = true,
  call = false,
  interests = false,
  age = false,
  match = false,
  ...props
}: ProfileProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {toast} = useToast(),
    queryClient = useQueryClient(),
    {setStatus} = useLiveStreamStore(),
    {params} = useRoute<any>(),
    itemId = params?.item?.id,
    {user: currentUser} = useAuth(),
    otherId = currentUser?.id === itemId ? undefined : itemId,
    {data: userData, refetch} = useGetCurrentUser(otherId),
    {data: userPostCount} = useGetPostUserCount(
      {userId: otherId},
      {enabled: social},
    ),
    {navigateWithName, navigation} = useNavigate(),
    {mutate: unmatch, isLoading: isLoadingUnmatch} = useUnmatch(),
    postCount = userPostCount?.post_getUserPostCount?.result,
    data = userData?.user_getCurrentUser?.result || ({} as User),
    user = otherId ? userData?.user_getUsers?.result?.items?.[0] || [] : data,
    {data: galleryData} = useGetPhotoGallery(
      {take: 9, where: {userId: {eq: otherId || currentUser?.id}}},
      {enabled: images},
    ),
    imageList = galleryData?.user_getPhotos?.result?.items,
    {data: userSocial, isLoading} = useGetSocialUser(
      {
        otherId: otherId || currentUser?.id,
      },
      {enabled: social},
    ),
    userSocialData = userSocial?.social_getUser?.result,
    {mutate: userFollowMutate, isLoading: isFollowLoading} =
      useFollowUserMutate(),
    {mutate: userUnfollowMutate, isLoading: isUnfollwLoading} =
      useUnfollowUserMutate();

  const {
    interests: allInterests,
    isLoading: isLoadingIntrest,
    refetch: refechIntrest,
  } = useGetInterest({
    enabled: interests,
    userId: otherId || currentUser?.id,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
      refechIntrest();
    }, [params?.item, currentUser?.id]),
  );

  return (
    <>
      {(isLoading || isLoadingIntrest) && <LoadIndicator />}
      <Header
        hasBack={navigation.canGoBack() ? 'true' : 'false'}
        title="Profile"
        style={{marginHorizontal: 0}}>
        {call && otherId && (
          <Pressable
            onPress={() => [
              navigateWithName('livestream', {item: user}),
              setStatus('wait'),
            ]}>
            <CallIconSet
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={{marginRight: 10}}
            />
          </Pressable>
        )}
        {!otherId ? (
          <Pressable onPress={() => navigateWithName('settings')}>
            <Setting2IconSet style={{marginRight: 5}} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setIsModalVisible(true)}>
            <ThreeDotsIcon
              style={{marginRight: 5, transform: [{rotate: '90deg'}]}}
            />
          </Pressable>
        )}
      </Header>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingBottom: 30,
        }}>
        <View {...props}>
          <Layer style={styles.topPanel}>
            <View style={styles.info}>
              {user.photoUrl ? (
                <IMG style={styles.photoUrl} src={user.photoUrl} />
              ) : (
                <User2Icon style={styles.photoUrl} />
              )}
              <View style={styles.bioContainer}>
                <Layer>
                  <Typography style={{marginLeft: 2}}>
                    {user.fullName}
                  </Typography>

                  <Layer style={styles.locationContainer}>
                    {age && (
                      <Typography marginRight={4} fontSize="sm">
                        {user?.age > 0 && user?.age}
                      </Typography>
                    )}
                    {user.location && (
                      <Layer
                        style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <EventLocationIcon
                          color={isDark('background') ? 'gray.300' : 'gray.500'}
                        />
                        <Typography
                          fontSize="xs"
                          numberOfLines={1}
                          color={isDark('background') ? 'gray.300' : 'gray.500'}
                          style={{width: '70%', marginLeft: 5}}>
                          {user.location}
                        </Typography>
                      </Layer>
                    )}
                  </Layer>
                </Layer>
                {hasEditIcon && !otherId && (
                  <Pressable onPress={() => navigateWithName('profile update')}>
                    <RoundedEditIcon
                      color={isDark() ? 'gray.50' : 'gray.800'}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            {interests && (
              <HStack paddingX={2} mt={4} space={1} flexWrap={'wrap'}>
                {allInterests?.map((interest: any) => (
                  <Center
                    borderRadius={6}
                    py={1}
                    px={4}
                    mt={1}
                    backgroundColor={'primary.100'}>
                    <Typography color={'gray.800'} fontSize="sm">
                      {interest?.text}
                    </Typography>
                  </Center>
                ))}
              </HStack>
            )}
            {bio && user?.about && (
              <Layer style={styles.about}>
                <Typography
                  numberOfLines={4}
                  color={isDark() ? 'gray.300' : 'gray.500'}
                  style={{paddingRight: 20}}>
                  {user.about}
                </Typography>
              </Layer>
            )}

            {!match && (post || social) && (
              <Layer style={styles.spaceAround}>
                {post && (
                  <SocialItem title="Post list" count={postCount ?? 0} />
                )}
                {social && (
                  <>
                    <SocialItem
                      title="Followers"
                      count={userSocialData?.followersCount ?? 0}
                    />
                    <SocialItem
                      title="Followings"
                      count={userSocialData?.followedCount ?? 0}
                    />
                  </>
                )}
              </Layer>
            )}
            {match && itemId && currentUser?.id !== itemId && (
              <HStack space={4} style={styles.spaceAround}>
                <Button
                  style={{flex: 1}}
                  isLoading={isLoadingUnmatch}
                  onPress={() => {
                    unmatch({entityId: user?.id});
                  }}>
                  Unmatch
                </Button>

                {message && (
                  <Button
                    onPress={() =>
                      navigateWithName('chat', {
                        item: user,
                        isProfile: true,
                      })
                    }
                    variant="outline"
                    style={{flex: 1}}>
                    Message
                  </Button>
                )}
              </HStack>
            )}
          </Layer>

          {!match && (social || message) && otherId && (
            <HStack space={4} style={styles.spaceAround}>
              {social && (
                <Button
                  style={{flex: 1}}
                  isLoading={isFollowLoading || isUnfollwLoading}
                  onPress={toggleFollow}>
                  {userSocialData?.isFollowed ? 'Unfollow' : 'Follow'}
                </Button>
              )}
              {message && (
                <Button
                  onPress={() =>
                    navigateWithName('chat', {
                      item: user,
                      isProfile: true,
                    })
                  }
                  variant="outline"
                  style={{flex: 1}}>
                  Messages
                </Button>
              )}
            </HStack>
          )}

          {images && (
            <>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigateWithName('gallery', {
                    item: otherId || currentUser?.id,
                  })
                }>
                <Layer style={styles.galleryNavigate}>
                  <Typography fontWeight={'bold'}>Gallery</Typography>
                  <RightIcon />
                </Layer>
              </TouchableWithoutFeedback>

              <HStack flexWrap="wrap">
                {imageList?.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigateWithName('fullscreen image', {
                        url: image?.photoUrl,
                        id: image?.id,
                      })
                    }
                    style={[
                      styles.imageContainer,
                      {
                        backgroundColor: getColor({
                          color: 'background.400',
                        }),
                      },
                    ]}>
                    <IMG
                      src={image?.photoUrl}
                      style={{
                        height: imageSize,
                        width: imageSize,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </HStack>
            </>
          )}
        </View>
      </ScrollView>
      <ProfileModal
        item={user}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );

  function SocialItem({title, count}) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigateWithName(
            title === 'Post list' ? 'Post list' : 'UserNetwork',
            {item: {userId: user?.id, tab: title.toLowerCase()}},
          )
        }>
        <Layer style={styles.social}>
          <Typography>{count}</Typography>
          <Typography
            color={isDark() ? 'gray.300' : 'gray.500'}
            style={{marginTop: 4}}>
            {title}
          </Typography>
        </Layer>
      </TouchableWithoutFeedback>
    );
  }

  function toggleFollow() {
    if (userSocialData?.isFollowed) {
      userUnfollowMutate(
        {followedId: user?.id},
        {
          onSuccess: async success => {
            toast({message: 'Follow success!'});
            await queryClient.invalidateQueries(['social_getUser']);
          },
          onError: error => {
            toast({message: error.toString()});
          },
        },
      );
    } else {
      userFollowMutate(
        {followedId: user?.id},
        {
          onSuccess: async success => {
            toast({message: 'User success!'});
            await queryClient.refetchQueries({
              queryKey: ['social_getUser'],
            });
          },
          onError: error => {
            toast({message: error.toString()});
          },
        },
      );
    }
  }
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topPanel: {
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: getColor({color: 'background.400'}),
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    padding: 10,
    marginTop: 40,
    paddingBottom: 20,
    borderRadius: 15,
  },
  photoUrl: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginLeft: 6,
  },
  bioContainer: {
    marginTop: 5,
    padding: 0,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 8,
    margin: 0,
  },
  about: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  social: {alignItems: 'center'},
  galleryNavigate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  imageContainer: {
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    marginBottom: 1,
    marginHorizontal: 1,
  },
});
