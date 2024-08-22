import Clipboard from '@react-native-clipboard/clipboard';
import {useRoute} from '@react-navigation/native';
import {Checkbox, FlatList} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {Share3Icon} from '~/assets';
import {
  ActionSheet,
  Button,
  CopyIcon,
  DrawerKit,
  Form,
  IMG,
  Input,
  Layer,
  NCameraIcon,
  NPhotoIcon,
  PlayIconSet,
  PlusIcon,
  RelativeLayout,
  Share,
  Trash2Icon,
  Typography,
  deviceWidth,
  getColor,
  isDark,
  useAuth,
  useDrawer,
  useGetPhotoGallery,
  useNavigate,
  useRemoveUserPhotoGallery,
  useToast,
  useUploadUserGallery,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {shareData} from '~/components/molecules/gallery/shareData';
import useAuthStore from '~/stores/authStore';
import {getTextColor} from '~/theme';
import useUploader from '../../elemental/hooks/useUploader';

const imageSize = (deviceWidth - 60) / 3;

export default function Gallery({
  share = true,
  camera = true,
}: {
  share?: Boolean;
  camera?: Boolean;
}) {
  const {params} :any= useRoute();
  const {toast} = useToast();
  const {navigateWithName} = useNavigate();

  const {user} = useAuthStore();
  const queryClient = useQueryClient();

  const {
    onPress: onPressGallery,
    values: galleryValues,
    isLoading: galleryUploadLoading,
  } = useUploader({
    type: 'photo',
    name: 'photo',
    isGallery: true,
  });

  const {
    onPress: onPressCamera,
    values: cameraValues,
    isLoading: cameraUploadLoading,
  } = useUploader({
    type: 'photo',
    name: 'photo',
    isCamera: true,
  });
  const {mutate: uploadUserGallery} = useUploadUserGallery();
  const {user: currentUser} = useAuth();
  const {
    data: galleryData,
    isLoading: galleryIsLoading,
    error: galleryError,
  } = useGetPhotoGallery({
    take: 50,
    where: {userId: {eq: params?.item ? params?.item : user?.id}},
  });

  const imageList =
    galleryData?.user_getPhotos?.result?.items ||
    params?.item?.images?.map(item => item);

  const videoList = params?.item?.videos
    ? params?.item?.videos?.map(item => item?.videoUrl)
    : [];

  const [selected, setSelected] = useState([]);
  const [selectable, setSelectable] = useState(false);

  const {isOpen: isShareDrawerKitOpen, setIsOpen: setIsShareDrawerKitOpen} =
    useDrawer('ShareDrawerKit');

  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer('DeleteDrawerKit');

  const [isCameraDrawerKitOpen, setIsCameraDrawerKitOpen] = useState(false);

  const photoGalleryID = selected?.map(id => id);
  const shareGalleryData = imageList
    ?.filter(item => selected.includes(item?.id))
    ?.map(item => item.photoUrl);

  const icons = useMemo(() => {
    return selectable ? (
      <>
        {share && (
          <TouchableOpacity
            onPress={() => {
              if (selected.length) {
                setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
              } else {
                Alert.alert('You should at least select an item.');
              }
            }}>
            <Share3Icon
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <Trash2Icon
          color={isDark() ? 'gray.50' : 'gray.800'}
          style={styles.trashIcon}
          onPress={() => {
            if (selected.length) {
              setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
            } else {
              Alert.alert('You should at least select an item.');
            }
          }}
        />
      </>
    ) : (
      params?.item === currentUser?.id && (
        <PlusIcon
          color={isDark() ? 'gray.50' : 'gray.800'}
          style={styles.plusIcon}
          onPress={() => setIsCameraDrawerKitOpen(!isCameraDrawerKitOpen)}
        />
      )
    );
  }, []);
  const {} = useHeader({
    icons: icons,
    onBack: selectable
      ? () => {
          setSelectable(false);
          setSelected([]);
        }
      : undefined,
    title: selectable ? 'Select' : 'Gallery',
  });

  const onDelete = id => {
    return new Promise((resolve, reject) => {
      try {
        removeUserPhoto(
          {photoGalleryId: id},
          {
            onSuccess: data => {
              toast({message: 'Your image deleted!'});
              queryClient.invalidateQueries(['user_getPhotos']);
              setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
              resolve(data);
            },
            onError: error => {
              toast({message: error.toString()});
            },
          },
        );
      } catch (error) {
        reject(new Error('the operation has failed'));
      }
    });
  };
  const {
    mutate: removeUserPhoto,
  } = useRemoveUserPhotoGallery();

  const copyToClipboard = () => {
    Clipboard.setString(shareGalleryData?.join('\n'));
    toast({message: 'Image(s) copied to clipboard.'});
    setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
  };

  const navigateTo = (path: string) => {
    Clipboard.setString(shareGalleryData?.join('\n'));
    navigateWithName(path);
    setIsShareDrawerKitOpen(!isShareDrawerKitOpen);
  };

  useEffect(() => {
    if (
      (cameraValues || galleryValues) &&
      (cameraValues.photo || galleryValues.photo)
    ) {
      uploadUserGallery(
        {
          photo: galleryValues?.photo || cameraValues?.photo,
        },
        {
          onSuccess: success => {
            navigateWithName('profile');
            queryClient.invalidateQueries(['user_getPhotos']);
            setIsCameraDrawerKitOpen(!isCameraDrawerKitOpen);
          },
          onError: error => {
            toast({message: error.toString()});
          },
        },
      );
    }
  }, [cameraValues.photo, galleryValues.photo]);

  return (
    <>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          imageList?.length > 0 &&
          !params?.item.images && (
            <Typography style={styles.text}>
              Hold & select each photo to edit.
            </Typography>
          )
        }
        numColumns={3}
        data={[...imageList, ...videoList]}
        renderItem={({item, index}) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              if (item?.photoUrl || item?.imageUrl) {
                if (!selectable) {
                  navigateWithName('fullscreen image', {
                    url: item?.photoUrl || item?.imageUrl,
                    id: item?.id,
                  });
                } else {
                  setSelected(
                    selected.includes(item?.id)
                      ? selected.filter(_id => _id !== item?.id)
                      : [...selected, item?.id],
                  );
                }
              } else {
                navigateWithName('video player', {
                  url: item,
                });
              }
            }}
            onLongPress={() => {
              !params?.item.images && setSelectable(true),
                setSelected([item?.id]);
            }}>
            <View
              style={[
                styles.imageContainer,
                {
                  backgroundColor: getColor({color: 'background.400'}),
                },
              ]}>
              {selectable && (
                <View
                  style={styles.checkBoxContainer}>
                  <Checkbox
                    aria-label="aria-label"
                    isChecked={selected.includes(item?.id)}
                    value={item?.id?.toString()}
                    onChange={value => {
                      if (!selectable) return;

                      if (value) {
                        setSelected(selected => [...selected, item?.id]);
                      } else {
                        setSelected(selected =>
                          selected.filter(_id => _id !== item?.id),
                        );
                      }
                    }}
                    style={styles.checkBox}
                  />
                </View>
              )}
              {item?.photoUrl || item?.imageUrl ? (
                <IMG
                  src={item?.photoUrl || item?.imageUrl}
                  style={styles.image}
                />
              ) : (
                <Layer style={styles?.videoStyle}>
                  <PlayIconSet fill={'#999'} />
                </Layer>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <DrawerKit
        data-id="delete-drawer-kit"
        data-name="DrawerKit"
        style={styles.deleteModal}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-delete-layer"
          data-name="RelativeLayout"
          style={styles.deleteDrawerContainer}
          data-parent="delete-drawer-kit">
          <Layer
            data-id="content-delete-layer"
            data-name="Layer"
            style={styles.deleteDrawerContent}
            data-parent="123-456-789-delete-layer">
            <Typography
              data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
              data-name="Typography"
              style={styles.deleteDrawerText}
              data-parent="content-delete-layer">
              Confirmation
            </Typography>
            <Typography
              data-id="532f9254-679b-458d-afae-6fb62c9f191e"
              data-name="Typography"
              style={styles.deleteDrawerText}
              data-parent="content-delete-layer">
              Are you sure you want to delete these photos?
            </Typography>
            <Layer
              data-id="button_box"
              data-name="Layer"
              style={styles.deleteDrawerButtonContainer}
              data-parent="content-delete-layer">
              <Button
                data-id="cancel_btn"
                data-name="Button"
                style={styles.deleteDrawerCancelButton}
                variant="outline"
                data-parent="button_box"
                onPress={() => {
                  setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                }}>
                Cancel
              </Button>
              <Button
                data-id="delete_btn"
                data-name="Button"
                style={styles.deleteDrawerCancelButton}
                colorScheme="error.500"
                bgColor="error.500"
                variant="solid"
                data-parent="button_box"
                onPress={e => {
                  const removePhoto = photoGalleryID?.map(
                    async item => await onDelete(item),
                  );

                  Promise.all(removePhoto)
                    .then(() =>
                      queryClient.invalidateQueries(['user_getPhotos']),
                    )
                    .catch(err => console.log(err));
                }}>
                Delete
              </Button>
            </Layer>
          </Layer>
        </View>
      </DrawerKit>
      <DrawerKit
        data-id="share-drawer-kit"
        data-name="DrawerKit"
        style={{position: 'relative', zIndex: 5}}
        position="bottom"
        data-parent="screen">
        <View
          data-id="123-456-789-share-layer"
          data-name="RelativeLayout"
          style={styles.deleteDrawerContainer}
          data-parent="delete-drawer-kit">
          <Layer
            data-id="content-share-layer"
            data-name="Layer"
            style={styles.shareDrawerContent}
            data-parent="123-456-789-delete-layer">
            <Typography
              style={styles.shareDrawerTitle}>
              Share with
            </Typography>
            <FlatList
              data={shareData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Layer
                  style={styles.shareDrawerItemContainer}>
                  <RelativeLayout
                    style={styles.shareDrawerItem}>
                    {item?.isNativeShare ? (
                      <Share
                        type={item?.type}
                        data={{
                          title: item?.title,
                          url: shareGalleryData?.join('\n'),
                          isNativeShare: item?.isNativeShare,
                        }}
                      />
                    ) : (
                      <Share
                        type={item?.type}
                        data={{
                          title: item?.title,
                          url: shareGalleryData?.join('\n'),
                          social: item?.social,
                        }}
                        navigate={navigateTo}
                      />
                    )}
                  </RelativeLayout>
                  <Typography
                    style={styles.shareDrawerItemText}>
                    {item?.title}
                  </Typography>
                </Layer>
              )}
            />
            <RelativeLayout
              style={styles.shareDrawerLinkContainer}>
              <Typography>or share with link</Typography>
              <Input
                placeholder="https://www.Social.com/NlfVhYy"
                defaultValue={shareGalleryData?.join(',')}
                style={styles.shareDrawerLinkInput}
                InputRightElement={
                  <Pressable onPress={copyToClipboard}>
                    <CopyIcon style={styles.iconCopy} />
                  </Pressable>
                }
              />
            </RelativeLayout>
          </Layer>
        </View>
      </DrawerKit>
      <ActionSheet
        isOpen={isCameraDrawerKitOpen}
        onClose={() => setIsCameraDrawerKitOpen(false)}>
        <ActionSheet.Content
          backgroundColor={getColor({color: 'background.400'})}>
          <Form style={styles.cameraDrawerForm}>
            {!!camera && (
              <Layer
                style={styles.cameraDrawerItem}>
                <Pressable onPress={onPressCamera}>
                  <RelativeLayout
                    borderColor="primary.400"
                    style={styles.cameraIconContainer}>
                    <NCameraIcon />
                  </RelativeLayout>
                </Pressable>

                <Typography
                  color={getTextColor(getColor({color: 'background.500'}))}
                  style={styles.cameraText}>
                  Camera
                </Typography>
              </Layer>
            )}
            <Layer
              style={{
                ...styles.cameraDrawerItem,
                marginLeft: camera ? 30 : 0,
              }}>
              <Pressable onPress={onPressGallery}>
                <RelativeLayout
                  borderColor="primary.400"
                  style={styles.cameraIconContainer}>
                  <NPhotoIcon />
                </RelativeLayout>
              </Pressable>

              <Typography
                color={getTextColor(getColor({color: 'background.500'}))}
                style={styles.galleryText}>
                Gallery
              </Typography>
            </Layer>
          </Form>
        </ActionSheet.Content>
      </ActionSheet>
    </>
  );

}

const styles = StyleSheet.create({
  text: {
    marginBottom: 15,
  },
  wrapper: {
    marginHorizontal: 25,
    marginVertical: 10,
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
  videoStyle: {
    height: imageSize,
    width: imageSize,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryText:{marginTop: 8},
  cameraText:{marginTop: 8},
  cameraIconContainer:{
    borderRadius: 50,
    borderStyle: 'solid',
    height: 60,
    width: 60,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  icon:{marginRight:15},
  deleteModal:{position: 'relative', zIndex: 5},
  image:{
    height: imageSize,
    width: imageSize,
  },
  checkBox:{
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 50,
  },
  checkBoxContainer:{
    zIndex: 10,
    width: imageSize,
  },
  deleteDrawerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  deleteDrawerContent: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  deleteDrawerTitle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  deleteDrawerText: {
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },
  deleteDrawerButtonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  deleteDrawerCancelButton: {
    position: 'relative',
    borderRadius: 20,
    width: '45%',
  },
  deleteDrawerDeleteButton: {
    position: 'relative',
    borderRadius: 20,
    width: '45%',
  },
  shareDrawerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  shareDrawerContent: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  shareDrawerTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  shareDrawerItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 6,
    marginLeft: 6,
  },
  shareDrawerItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'primary.400',
    marginLetf: 5,
  },
  shareDrawerItemText: {
    marginTop: 8,
    fontSize: 11,
  },
  shareDrawerLinkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  shareDrawerLinkInput: {
    width: '100%',
    marginTop: 18,
  },
  cameraDrawerForm: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraDrawerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    marginRight: 30,
  },
  cameraDrawerItemText: {
    marginTop: 8,
  },
  trashIcon:{marginRight: 5, marginLeft: 15},
  plusIcon:{marginRight: 5},
  flatListContainer:{
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
  }
});
