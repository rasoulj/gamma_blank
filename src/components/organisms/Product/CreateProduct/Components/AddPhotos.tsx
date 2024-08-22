import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AddIconSet,
  CloseIconSet,
  Image,
  Layer,
  Typography,
  deviceWidth,
  getColor,
} from '~/components/elemental';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {model} from '~/data/model';

const ProductConfig = model?.metaData?.configs?.product;

const AddPhotos = ({
  productData,
  onChange,
  hideTitles,
}: {
  productData: any;
    onChange: (list) => void;
    hideTitles?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [photoList, setPhotoList] = useState(['', '', '', '', '', '']);

  const cameraOptions: Options = {
    mediaType: 'photo',
    width: 600,
    height: 600,
    cropping: true,
    includeBase64: true,
    includeExif: true,
  };

  useEffect(() => {
    if (productData?.images) {
      setPhotoList(productData?.images);
    }
  }, []);

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

  const onChangeImage = async (image: any, index) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        setIsLoading(false);
        let pL = photoList;
        pL[index] = successData?.uploadedUrl;

        setPhotoList(pL);
        onChange(pL);
      },
    });
  };
  const onPressOpenCamera = index => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image, index);
    });
  };
  const selectImage = async index => {
    setIsLoading(true);
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image, index);
    });
  };
  const onPress = index => {
    Alert.alert('Upload', 'Select a source', [
      {text: 'Camera', onPress: () => onPressOpenCamera(index)},
      {text: 'Gallery', onPress: () => selectImage(index)},
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => [setIsLoading(false), setPhotoIndex(null)],
      },
    ]);
  };
  const AddPhoto = ({
    index,
    size = 'sm',
    style,
  }: {
    index;
    size?: 'sm' | 'lg';
    style?: ViewStyle;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => [setPhotoIndex(index), onPress(index)]}
        style={{
          width:
            size === 'sm' ? deviceWidth / 3 - 24 : (deviceWidth * 2) / 3 - 48,
          height:
            size === 'sm' ? deviceWidth / 3 - 24 : (deviceWidth * 2) / 3 - 48,
          backgroundColor: getColor({color: 'primary.200'}),
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1,
          ...style,
        }}>
        {photoList?.[index] && (
          <TouchableOpacity
            onPress={() => {
              let PL = photoList;
              PL[index] = '';
              setPhotoList(PL.filter(i => i !== ""));
              setPhotoIndex(null);
            }}
            style={{
              width: 32,
              height: 32,
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: getColor({color: 'background.500'}),
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 3,
            }}>
            <CloseIconSet width={20} height={20} color={'error.500'} />
          </TouchableOpacity>
        )}
        {isLoading && photoIndex === index && (
          <ActivityIndicator size={'small'}  style={styles.isLoading}/>
        )}
        {photoList?.[index] !== '' && (
          <Image
            source={{uri: photoList[index]}}
            style={{
              width:
                size === 'sm'
                  ? deviceWidth / 3 - 24
                  : (deviceWidth * 2) / 3 - 48,
              height:
                size === 'sm'
                  ? deviceWidth / 3 - 24
                  : (deviceWidth * 2) / 3 - 48,
            }}
          />
        )}
        {photoIndex !== index && !photoList?.[index] && (
          <AddIconSet
            width={42}
            height={42}
            color={'gray.50'}
            style={styles.addIcon}
          />
        )}
        {size === 'lg' && (
          <Layer
            style={{
              position: 'absolute',
              bottom: 16,
              backgroundColor: getColor({color: 'primary.100'}),
              padding: 5,
              borderRadius: 10,
              paddingHorizontal: 16,
            }}>
            <Typography style={{fontSize: 12, fontWeight: '500'}}>
              Cover Photo
            </Typography>
          </Layer>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <Layer>
      {!hideTitles && <><Typography style={{ fontSize: 18, fontWeight: '500' }}>
        Add Photos
        {ProductConfig?.photoIsRequired !== false && (
          <Typography color={'error.500'}>*</Typography>
        )}
      </Typography>
      <Typography style={{fontSize: 14, fontWeight: '400'}}>
        </Typography>
      </>}
      {!hideTitles && <Typography style={{fontSize: 14, fontWeight: '400'}}>
        Size of images should be at least: 600*800
      </Typography>}
      <Layer style={{flexDirection: 'row', marginTop: 8}}>
        <AddPhoto index={0} size="lg" style={{margin: 2}} />
        <Layer>
          <AddPhoto index={1} />
          <AddPhoto index={2} />
        </Layer>
      </Layer>
      <Layer style={{flexDirection: 'row'}}>
        <AddPhoto index={3} />
        <AddPhoto index={4} />
        <AddPhoto index={5} />
      </Layer>
    </Layer>
  );
};

export default AddPhotos;

const styles = StyleSheet.create({
  addIcon: {position: 'absolute'},
  isLoading: {position:"absolute"}
});
