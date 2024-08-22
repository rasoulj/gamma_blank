import {Center, VStack, Pressable, View} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import React from 'react';
import {Alert, ImagePickerResult} from 'react-native';
import {CameraIcon} from '~/assets';
import {PhotoIcon} from '~/assets';
import {useController} from 'react-hook-form';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import LoadIndicator from '../../atoms/LoadIndicator';
import * as Element from '~/components/elemental';
import Image from '../../atoms/Image';
import theme from '~/theme';

interface IProps extends IViewProps {
  type: 'video' | 'image';
  name: string;
  title: string;
  icon: string;
  iconStyle: any;
  textStyle: any;
  previewStyle: any;
  control?: any;
  showPreview: string;
  isCamera: boolean;
  isGallery: boolean;
}

export default function UploadMedia({
  type = 'image',
  name = 'file',
  control = '',
  title = 'Add/Take photo',
  icon,
  iconStyle,
  showPreview = 'false',
  textStyle,
  previewStyle,
  isCamera = true,
  isGallery = true,
  children,
  ...props
}: Partial<IProps>) {
  const backgroundColor = theme?.components?.UploadMedia?.colorScheme?.default;
  const color = theme?.components?.UploadMedia?.color?.default;
  const borderRadius = theme?.components?.UploadMedia?.borderRadius?.md;
  const borderColor = theme?.components?.UploadMedia?.borderColor?.default;
  const borderWidth =
    props?.style?.borderWidth ||
    theme?.components?.UploadMedia?.borderWidths?.default ||
    1;
  const Icon =
    icon === 'none'
      ? null
      : Element[icon] || (type === 'image' ? PhotoIcon : CameraIcon);
  const {field} = useController({name});
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

  const cameraOptions: Options = {
    mediaType: type === 'image' ? 'photo' : 'video',
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
        setPreview(true);
        field?.onChange(successData?.uploadedUrl);
      },
    });
  };

  const selectImage = async () => {
    setIsLoading(true);
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
  };

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
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

  return (
    <>
      {isUploading || (isLoading && <LoadIndicator />)}
      {showPreview === 'true' && preview ? (
        <VStack space="2">
          <Image style={previewStyle} src={field?.value} />
          <Pressable
            onPress={() => {
              field.onChange('');
              setPreview(false);
            }}>
            <View
              style={{
                marginHorizontal: 32,
                borderRadius: 30,
                borderColor: 'red',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                marginBottom: 10,
              }}>
              <Element.Typography
                style={{
                  color: 'red',
                }}>
                Delete
              </Element.Typography>
            </View>
          </Pressable>
        </VStack>
      ) : (
        <Pressable onPress={onPress}>
          <Center
            borderRadius={borderRadius}
            height="20"
            borderWidth={borderWidth}
            borderColor={borderColor}
            bgColor={backgroundColor}
            {...props}>
            {field?.value && showPreview === 'true' ? (
              <Image style={iconStyle} src={field?.value} />
            ) : (
              Icon && <Icon color={color} style={iconStyle} />
            )}
            {children ||
              (title && (
                <Element.Typography color={color} style={textStyle}>
                  {title}
                </Element.Typography>
              ))}
          </Center>
        </Pressable>
      )}
    </>
  );
}
