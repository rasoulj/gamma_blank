import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
import {useController} from 'react-hook-form';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {PlusIcon} from '../../elemental';
import {deviceHeight} from '../../elemental';

export default React.forwardRef(
  (
    {
      name,
    }: {
      name: any;
    },
    ref: any,
  ) => {
    const {field} = useController({name});

    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = React.useState(false);

    const cameraOptions: Options = {
      mediaType: 'photo',
      width: 600,
      height: 600,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    };
    const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

    const onChangeImage = async (image: any) => {
      uploadFileMutate(image, {
        onSuccess: (successData: any) => {
          setIsLoading(false);
          setPreview(true);
          field.onChange(successData?.uploadedUrl);
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
    const onPress = () => {
      Alert.alert('Upload', 'Select a source', [
        {text: 'Camera', onPress: () => onPressOpenCamera()},
        {text: 'Gallery', onPress: () => selectImage()},
        {text: 'Cancel', style: 'cancel', onPress: () => setIsLoading(false)},
      ]);
    };

    return (
      <>
        {field?.value ? (
          <Image
            source={{uri: field?.value}}
            style={{
              width: 140,
              height: 140,
              alignSelf: 'center',
              borderRadius: 1000,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('./woman.png')}
            resizeMode="cover"
            style={{width: 170, height: 170, alignSelf: 'center'}}
          />
        )}

        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            alignSelf: 'center',
            borderRadius: 25,
            marginTop: field?.value ? 20 : 0,
          }}>
          {isUploading ? (
            <ActivityIndicator color="#006194" size="small" />
          ) : (
            <>
              <Text style={{color: '#006194'}}>Change profile picture</Text>
            </>
          )}
        </TouchableOpacity>
      </>
    );
  },
);
