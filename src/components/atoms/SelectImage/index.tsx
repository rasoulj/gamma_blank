import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import theme from '~/theme';
import {
  Button,
  HStack,
  Typography,
  Text,
  getColor,
  PlusIcon,
  Layer,
  IMG,
  User2Icon,
  useNavigate,
} from '../../elemental';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
import EmptyPictureIcon from '~/assets/icons/EmptyPicture.icon';

export default React.forwardRef(
  (
    {
      name,
      style,
      title,
      type = 'simple',
      id,
      hasPlusIcon,
    }: {
      name: any;
      style?: ViewStyle;
      title?: String;
      type?: 'simple' | 'profile';
      id?: number;
      hasPlusIcon?: Boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    const {navigateWithName} = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = React.useState(false);

    const cameraOptionsProfile: Options = {
      mediaType: 'photo',
      width: 600,
      height: 600,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    };

    const cameraOptionsSimple: Options = {
      mediaType: 'photo',
      width: 400,
      height: 200,
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
      ImagePicker.openCamera(
        type === 'profile' ? cameraOptionsProfile : cameraOptionsSimple,
      ).then((image: any) => {
        onChangeImage?.(image);
      });
    };
    const selectImage = async () => {
      setIsLoading(true);
      ImagePicker.openPicker(
        type === 'profile' ? cameraOptionsProfile : cameraOptionsSimple,
      ).then((image: any) => {
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
          type === 'profile' ? (
            <Pressable
              onPress={() =>
                navigateWithName('fullscreen image', {
                  url: field?.value,
                  id: id,
                  isEditProfile: true,
                })
              }>
              <Image src={field?.value} style={styles.profileImg} />
            </Pressable>
          ) : (
            <IMG src={field?.value} resizeMode="cover" style={styles.img} />
          )
        ) : type === 'profile' ? (
          <Layer style={styles.centerView}>
            <User2Icon width={80} height={80} />
          </Layer>
        ) : (
          <Layer style={styles.emptyPic}>
            <Layer style={{width: 200}}>
              <EmptyPictureIcon />
            </Layer>
          </Layer>
        )}

        <Button onPress={onPress} style={styles.btn}>
          {isUploading ? (
            <ActivityIndicator
              color={getColor({color: 'primary.300'})}
              size="small"
            />
          ) : (
            <HStack justifyContent="center" alignItems="center">
              {hasPlusIcon && (
                <View style={styles.plusView}>
                  <PlusIcon color="primary.500" style={styles.icon} />
                </View>
              )}
              <Text
                color={getColor({color: 'primary.400'})}
                fontSize={16}
                fontWeight={'600'}>
                {title || 'Choose photo'}
              </Text>
            </HStack>
          )}
        </Button>
        {fieldState?.error && (
          <Typography color={'error.500'} fontSize="xs">
            {fieldState?.error?.message}
          </Typography>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  plusView: {
    borderRadius: 100,
    width: 20,
    height: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {width: 10, height: 10},
  btn: {
    alignSelf: 'center',
    height: 49,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: getColor({color: 'primary.400'}),
  },
  emptyPic: {
    borderWidth: 1,
    height: 167,
    borderColor: getColor({color: 'gray.300'}),
    borderRadius: 5,
    alignItems: 'center',
  },
  centerView: {alignItems: 'center'},
  img: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 5,
  },
  profileImg: {
    borderRadius: 100,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});
