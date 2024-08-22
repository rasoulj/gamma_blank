import Clipboard from '@react-native-clipboard/clipboard';
import {useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import {useQueryClient} from 'react-query';
import {Share3Icon} from '~/assets';
import {
  Button,
  CopyIcon,
  DrawerKit,
  FlatList,
  Input,
  isDark,
  Layer,
  Share,
  Pressable,
  RelativeLayout,
  Screen,
  ShareIconSet,
  TrashIconSet,
  Typography,
  useDrawer,
  useNavigate,
  useToast,
  useAuth,
} from '../../elemental';
import Header from '../../atoms/Header';
import {useRemoveUserPhotoGallery} from './hook';
import {shareData} from './shareData';
import useHeader from '~/components/elemental/hooks/use_header';
import {useUpdateProfile} from '../EditProfile/hooks';
import useAuthStore from '~/stores/authStore';

const FullScreenImage = () => {
  const {toast} = useToast();
  const {navigateWithName} = useNavigate();
  const route = useRoute();
  const userId = route?.params?.id;
  const {user} = useAuth();
  const queryClient = useQueryClient();

  const scale = React.useRef(new Animated.Value(1)).current;
  const translateX = React.useRef(new Animated.Value(0)).current;

  const setUser = useAuthStore(state => state?.setUser);

  const handlePinch = Animated.event([{nativeEvent: {scale}}]);

  const {isOpen: isShareDrawerKitOpen, setIsOpen: setIsShareDrawerKitOpen} =
    useDrawer('ShareDrawerKit');
  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer('DeleteDrawerKit');

  const icons = useMemo(() => {
    return (
      <>
        {!route?.params?.isEditProfile && (
          <TouchableOpacity
            onPress={() => {
              setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
            }}>
            <Share3Icon
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={styles.margin}
            />
          </TouchableOpacity>
        )}
        {userId === user?.id && (
          <TrashIconSet
            color={isDark() ? 'gray.50' : 'gray.800'}
            style={{marginRight: 5, marginLeft: 15}}
            onPress={() => {
              setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
            }}
          />
        )}
      </>
    );
  }, []);
  const {} = useHeader({icons: icons});

  const {
    mutate: removeUserPhoto,
    isLoading,
  } = useRemoveUserPhotoGallery();

  const {mutateAsync: updateProfile, isLoading: isLoadingProfile} =
    useUpdateProfile();

  const onDelete = id => {
    return new Promise((resolve, reject) => {
      try {
        if (route?.params?.isEditProfile) {
          const input = {
            userId: user?.id,
            userInput: {
              ...user,
              photoUrl: '',
            },
          };
          delete input?.userInput?.id;
          updateProfile(input, {
            onSuccess(data) {
              if (data?.user_updateUser?.status?.code === 1) {
                toast({message: 'Your image deleted!'});
                queryClient.invalidateQueries(['getCurrentUser']);
                setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                setUser(data?.user_updateUser?.result);
                navigateWithName('EditProfile');
              }
            },
          });
        } else {
          removeUserPhoto(
            {photoGalleryId: id},
            {
              onSuccess: data => {
                console.log(data);
                toast({message: 'Your image deleted!'});
                navigateWithName('profile');
                setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                queryClient.invalidateQueries(['user_getPhotos']);

                resolve(data);
              },
              onError: error => {
                console.log(error);
                toast({message: error.toString()});
              },
            },
          );
        }
      } catch (error) {
        reject(new Error('the operation has failed'));
      }
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(route?.params?.url);
    toast({message: 'Image copied to clipboard.'});
    setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
  };

  const navigateTo = (path: string) => {
    Clipboard.setString(route?.params?.url);
    navigateWithName(path);
    setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
  };

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <PinchGestureHandler onGestureEvent={handlePinch}>
          <Animated.Image
            source={{uri: route?.params?.url}}
            resizeMode={'contain'}
            style={[styles.image, {transform: [{scale}, {translateX}]}]}
          />
        </PinchGestureHandler>
      </GestureHandlerRootView>
      <DrawerKit
        data-id="delete-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-delete-layer"
          data-name="RelativeLayout"
          style={styles.container}
          data-parent="delete-drawer-kit">
          <Layer
            data-id="content-delete-layer"
            data-name="Layer"
            style={styles.content}
            data-parent="123-456-789-delete-layer">
            <Typography
              data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
              data-name="Typography"
              style={styles.confirmation}
              data-parent="content-delete-layer">
              Confirmation
            </Typography>
            <Typography
              data-id="532f9254-679b-458d-afae-6fb62c9f191e"
              data-name="Typography"
              style={styles.title}
              data-parent="content-delete-layer">
              Are you sure you want to delete this photo?
            </Typography>
            <Layer
              data-id="button_box"
              data-name="Layer"
              style={styles.footer}
              data-parent="content-delete-layer">
              <Button
                data-id="cancel_btn"
                data-name="Button"
                style={styles.btn}
                variant="outline"
                _text={styles.textBtn}
                data-parent="button_box"
                onPress={() => {
                  setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading || isLoadingProfile}
                data-id="delete_btn"
                data-name="Button"
                style={styles.btn}
                colorScheme="error.500"
                _text={styles.textBtn}
                bgColor="error.500"
                variant="solid"
                data-parent="button_box"
                onPress={() => onDelete(route?.params?.id)}>
                Delete
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
      <DrawerKit
        data-id="share-drawer-kit"
        data-name="DrawerKit"
        style={styles.modal}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-share-layer"
          data-name="RelativeLayout"
          style={styles.relativeLayout}
          data-parent="delete-drawer-kit">
          <Layer
            data-id="content-share-layer"
            data-name="Layer"
            style={styles.contentShareLayer}
            data-parent="123-456-789-delete-layer">
            <Typography style={styles.txt}>Share with</Typography>
            <FlatList
              data={shareData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Layer style={styles.layer}>
                  <RelativeLayout style={styles.shareView2}>
                    {item?.isNativeShare ? (
                      <Share
                        type={item?.type}
                        data={{
                          title: route?.params?.url,
                          url: route?.params?.url,
                          isNativeShare: item?.isNativeShare,
                        }}
                      />
                    ) : (
                      <Share
                        type={item?.type}
                        data={{
                          title: route?.params?.url,
                          url: route?.params?.url,
                          social: item?.social,
                        }}
                        navigate={navigateTo}
                      />
                    )}
                  </RelativeLayout>
                  <Typography style={styles.shareTitle}>
                    {item?.title}
                  </Typography>
                </Layer>
              )}
            />
            <RelativeLayout style={styles.shareView}>
              <Typography>or share with link</Typography>
              <Input
                placeholder="https://www.Social.com/NlfVhYy"
                defaultValue={route?.params?.url}
                style={styles.input}
                InputRightElement={
                  <Pressable onPress={copyToClipboard}>
                    <CopyIcon style={{marginRight: 15}} />
                  </Pressable>
                }
              />
            </RelativeLayout>
          </Layer>
        </View>
      </DrawerKit>
    </>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({
  btn: {position: 'relative', borderRadius: 10, width: '48%', height: 36},
  textBtn: {
    lineHeight: 17,
    fontWeight: '700',
  },
  margin: {marginRight: 15},
  image: {
    flex: 1,
    width: '100%',
    height: 250,
    alignSelf: 'center',
    zIndex: 2,
  },
  footer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },
  confirmation: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  content: {position: 'relative', marginLeft: 20, marginRight: 20},
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  modal: {position: 'relative', zIndex: 5},
  input: {width: '100%', marginTop: 18},
  shareView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  shareTitle: {
    marginTop: 8,
    fontSize: 11,
  },
  shareView2: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'primary.400',
    marginLetf: 5,
  },
  layer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 6,
    marginLeft: 6,
  },
  txt: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  contentShareLayer: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  relativeLayout: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
});
