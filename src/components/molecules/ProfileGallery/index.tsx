import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {
  Center,
  HStack,
  Screen,
  Scrollable,
  VStack,
  Button,
  useMutation,
  graphqlFetcher,
} from '~/components/elemental';
import ImageCard from './ImageCard';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
import {Alert} from 'react-native';
import {useGetCurrentUser, USER_ADD_PHOTO, USER_REMOVE_PHOTO} from './hooks';
import {useQueryClient} from 'react-query';

const ProfileGallery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const cameraOptions: Options = {
    mediaType: 'photo',
    width: 600,
    height: 600,
    cropping: true,
    includeBase64: true,
    includeExif: true,
  };
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {isLoading: isLoadingUser, data} = useGetCurrentUser();
  const {mutate: mutateAdd, isLoading: isLoadingAdd} = useMutation(args => {
    return graphqlFetcher(USER_ADD_PHOTO, args);
  });
  const {mutate: mutateRemove, isLoading: isLoadingRemove} = useMutation(
    args => {
      return graphqlFetcher(USER_REMOVE_PHOTO, args);
    },
  );
  const images = data?.user_getCurrentUser?.result?.userGallery || [];
  console.log(images);

  const onChangeImage = async (image: any) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        const photo = successData?.uploadedUrl;
        mutateAdd(
          {photo},
          {
            onSuccess: success => {
              queryClient.invalidateQueries('getCurrentUser');
            },
          },
        );
        setIsLoading(false);
      },
    });
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
  };
  const selectImage = async () => {
    setIsLoading(true);
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
  };
  const onRemovePress = photoGalleryId => {
    mutateRemove(
      {photoGalleryId},
      {
        onSuccess: success => {
          queryClient.invalidateQueries('getCurrentUser');
        },
      },
    );
  };

  const openImagePicker = photoGalleryId => {
    if (photoGalleryId) {
      Alert.alert('Upload', 'Select a source', [
        {text: 'Camera', onPress: () => onPressOpenCamera()},
        {text: 'Gallery', onPress: () => selectImage()},
        {text: 'Remove', onPress: () => onRemovePress(photoGalleryId)},
        {text: 'Cancel', style: 'cancel', onPress: () => setIsLoading(false)},
      ]);
    } else {
      Alert.alert('Upload', 'Select a source', [
        {text: 'Camera', onPress: () => onPressOpenCamera()},
        {text: 'Gallery', onPress: () => selectImage()},
        {text: 'Cancel', style: 'cancel', onPress: () => setIsLoading(false)},
      ]);
    }
  };

  return (
    <Screen isLoading={isUploading || isLoadingUser || isLoadingAdd}>
      <Scrollable flex={1}>
        <HStack
          height="350"
          space="2"
          mt="8"
          justifyContent="center"
          alignItems="center"
          px="6">
          <VStack space="2" flex={0.7}>
            <Center flex={0.7}>
              <ImageCard
                source={images?.[0]?.photoUrl}
                onPress={() => openImagePicker(images?.[0]?.id)}
              />
            </Center>
            <HStack space="2" flex={0.34}>
              <ImageCard
                source={images?.[3]?.photoUrl}
                onPress={() => openImagePicker(images?.[3]?.id)}
              />
              <ImageCard
                source={images?.[4]?.photoUrl}
                onPress={() => openImagePicker(images?.[4]?.id)}
              />
            </HStack>
          </VStack>
          <VStack space="2" flex={0.34}>
            <ImageCard
              source={images?.[1]?.photoUrl}
              onPress={() => openImagePicker(images?.[1]?.id)}
            />
            <ImageCard
              source={images?.[2]?.photoUrl}
              onPress={() => openImagePicker(images?.[2]?.id)}
            />
            <ImageCard
              source={images?.[5]?.photoUrl}
              onPress={() => openImagePicker(images?.[5]?.id)}
            />
          </VStack>
        </HStack>
      </Scrollable>
      <Button style={{width: '90%', alignSelf: 'center'}}>Save</Button>
    </Screen>
  );
};

export default ProfileGallery;
