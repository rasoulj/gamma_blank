import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  BoldCameraIconSet,
  BoldGalleryIconSet,
  CustomActionSheet,
  getColor,
} from '~/components';
import {Image, Typography} from '~/components/elemental';
import {scale} from '~/utils/methods';
const HighlightCoverSection = ({selectedImage, setSelectedImage}) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const onEditPress = () => setIsSheetVisible(true);
  const onCloseSheet = () => setIsSheetVisible(false);

  return (
    <>
      <VStack space="19px">
        <VStack
          width={scale(88)}
          height={scale(88)}
          borderRadius={15}
          borderWidth={'2px'}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          borderColor={'#006194'}>
          <Image
            style={styles.image}
            src={{uri: selectedImage?.path}}
            resizeMode="cover"
          />
        </VStack>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={onEditPress}>
          <Typography color="info.500" fontWeight="500" fontSize="sm">
            Edit cover
          </Typography>
        </TouchableOpacity>
      </VStack>
      {isSheetVisible && (
        <SelectGalleryActionSheet
          setSelectedImage={setSelectedImage}
          onClose={onCloseSheet}
          isVisible={isSheetVisible}
        />
      )}
    </>
  );
};
export default HighlightCoverSection;

const styles = StyleSheet.create({
  image: {
    width: scale(81),
    height: scale(81),
    borderRadius: 13,
    alignSelf: 'center',
  },
});

const SelectGalleryActionSheet = ({onClose, isVisible, setSelectedImage}) => {
  const onCameraPress = () => {
    ImageCropPicker.openCamera({
      freeStyleCropEnabled: false,
      width: 1080,
      height: 1080,
      cropping: true,
    }).then((image: any) => {
      // onChangeImage?.(image);
      setSelectedImage({...image, isRemote: false});
    });
  };

  const onGalleryPress = () => {
    ImageCropPicker.openPicker({
      freeStyleCropEnabled: false,
      width: 1080,
      height: 1080,
      mediaType: 'photo',
      cropping: true,
    }).then((image: any) => {
      // onChangeImage?.(image);
      onClose();
      setSelectedImage({...image, isRemote: false});
    });
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose} py="56px">
      <HStack
        h="100px"
        alignItems="center"
        justifyContent="center"
        space="72px">
        <TouchableOpacity onPress={onCameraPress}>
          <VStack space="12px" alignItems="center">
            <VStack
              w="50px"
              h="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="25px"
              borderWidth="2px"
              borderColor="primary.500">
              <BoldCameraIconSet color={getColor({color: 'primary.500'})} />
            </VStack>
            <Typography>Camera</Typography>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGalleryPress}>
          <VStack space="12px" alignItems="center">
            <VStack
              w="50px"
              h="50px"
              alignItems="center"
              justifyContent="center"
              borderRadius="25px"
              borderWidth="2px"
              borderColor="primary.500">
              <BoldGalleryIconSet color={getColor({color: 'primary.500'})} />
            </VStack>
            <Typography>Gallery</Typography>
          </VStack>
        </TouchableOpacity>
      </HStack>
    </CustomActionSheet>
  );
};
