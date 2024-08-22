import {ActivityIndicator, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Button from '../../atoms/Button';
import {getColor} from '~/utils/helper/theme.methods';
import Typography from '../../atoms/Typography';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
import {useController} from 'react-hook-form';
import Image from '../../atoms/Image';
import Video from 'react-native-video';
import {useEffect} from 'react';
import {isUrlImage} from '../../elemental/hooks/use_is_image';

const AddMedia = ({
  name,
}: {
  name: any;
  type: 'image' | 'video' | 'file';
  title: string;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingImage, setIsLoadingImage] = React.useState(false);
  const [play, setPlay] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const {field} = useController({name});
  const isImageHanddler = (value?: string) => setIsImage(isUrlImage(value));
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const Options: Options = {mediaType: 'any'};

  useEffect(() => {
    isImageHanddler(field?.value);
  }, [field?.value]);

  console.log(isImage);

  const onDeletePress = () => {
    setPlay(false);
    setTimeout(() => {
      field.onChange(null);
    }, 0);
  };

  const onChangeImage = async (image: any) => {
    isImageHanddler(image?.path);
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        setIsLoading(false);
        console.log(successData?.uploadedUrl);

        field.onChange(successData?.uploadedUrl);
      },
    });
  };

  const selectImage = async () => {
    setIsLoading(true);
    ImagePicker.openPicker(Options).then((image: any) => {
      onChangeImage?.(image);
    });
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(Options).then((image: any) => {
      onChangeImage?.(image);
    });
  };

  const onPress = () => {
    Alert.alert('Upload', 'Select a source', [
      {text: 'Camera', onPress: () => onPressOpenCamera()},
      {text: 'Gallery', onPress: () => selectImage()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: getColor({color: 'background.400'}),
          height: 48,
          borderColor: getColor({color: 'primary.400'}),
          borderWidth: 2,
        }}
        color={'#222'}
        onPress={play ? () => null : onPress}>
        {isUploading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <Typography
            color={getColor({color: 'primary.400'})}
            style={{fontSize: 16, fontWeight: '600'}}>
            Add Photo / Video
          </Typography>
        )}
      </Button>
      {field?.value && (
        <>
          {isImage ? (
            <Image
              source={{uri: field?.value}}
              onLoadStart={() => setIsLoadingImage(true)}
              onLoadEnd={() => setIsLoadingImage(false)}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 15,
                resizeMode: 'cover',
                marginTop: 5,
              }}
            />
          ) : (
            <Video
              source={{
                uri: field?.value,
              }}
              style={styles.video}
              resizeMode="cover"
              muted={false}
              repeat={false}
              onLoadError={er => console.log('errrrrr', er)}
              controls
            />
          )}
          <Button
            style={{
              backgroundColor: getColor({color: 'background.400'}),
              height: 48,
              borderColor: getColor({color: 'error.500'}),
              borderWidth: 2,
              marginVertical: 10,
            }}
            color={'#222'}
            onPress={onDeletePress}>
            <Typography
              color={getColor({color: 'error.400'})}
              style={{fontSize: 16, fontWeight: '600'}}>
              Delete
            </Typography>
          </Button>
        </>
      )}
    </>
  );
};

export default AddMedia;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
    marginTop: 5,
  },
});
