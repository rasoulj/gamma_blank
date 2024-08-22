import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import React from 'react';
import {Alert} from 'react-native';
import {useController, useForm} from 'react-hook-form';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
interface IProps extends IViewProps {
  type: 'video' | 'photo' | 'any';
  name: string;
  isCamera: boolean;
  isGallery: boolean;
}

export default function useUploader({
  type,
  name = 'uploadMedia',
  isCamera = false,
  isGallery = false,
  ...props
}: Partial<IProps>) {
  const {control} = useForm({mode: 'onChange'});

  const {field} = useController({name, control});
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState('');
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

  const cameraOptions: Options = {
    mediaType: type,
    width: 600,
    height: 600,
    cropping: true,
    includeBase64: true,
    includeExif: true,
  };

  const onChangeImage = async (image: any) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        setIsLoading(false);
        setPreview(successData?.uploadedUrl);
        field.onChange(successData?.uploadedUrl);
      },
    });
  };

  const selectImage = async () => {
    setIsLoading(true);
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    }).catch((err) => {
      setIsLoading(false)
    })
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    }).catch((err) => {
      setIsLoading(false)
    })
  };

  const onPress = () => {
    Alert.alert(
      'Upload',
      'Select a source',
      [
        isCamera && {text: 'Camera', onPress: () => onPressOpenCamera()},
        isGallery && {text: 'Gallery', onPress: () => selectImage()},
        {text: 'Cancel', style: 'cancel'},
      ]?.filter(Boolean) as any,
    );
  };

  const cleanImage = () => {
    field.onChange(undefined);
  };

  return {
    onPress,
    cleanImage,
    isLoading,
    preview,
    isUploading,
    values: {[name]: field.value},
  };
}
