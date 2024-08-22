import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import {useQueryClient} from 'react-query';
import {AddIconSet, CloseIconSet} from '~/assets/iconset';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Image,
  Input,
  Layer,
  Typography,
  deviceWidth,
} from '~/components/elemental';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import {model} from '~/data/model';
import {getColor} from '~/utils/helper/theme.methods';
import {useCreateStaticConfig, useUpdateStaticConfig} from '../../hook';

const SubcategoryAndTagsConfig = model?.metaData?.configs?.subcategoryAndTags;

const AddSubCategoryModal = ({
  subCategories,
  category,
  isVisible,
  onClose,
}: {
  subCategories;
  category: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const queryClinet = useQueryClient();

  const cameraOptions: Options = {
    mediaType: 'photo',
    width: 600,
    height: 600,
    cropping: true,
    includeBase64: true,
    includeExif: true,
  };
  const {mutate, isLoading} = useUpdateStaticConfig();
  const {mutate: createMutate} = useCreateStaticConfig();

  const addCategoryHandler = item => {
    const subCategoryList = [...subCategories, item];
    const input = {
      key: `Product${category}SubCategory`,
      value: JSON.stringify(subCategoryList),
    };

    mutate(
      {input},
      {
        onSuccess(data: any, variables, context) {
          if (data?.staticConfig_updateStaticConfig?.status?.code === 2) {
            createMutate(
              {input},
              {
                onSuccess(data, variables, context) {
                  onClose();
                },
              },
            );
          }
          queryClinet.invalidateQueries([`Product${category}SubCategory`]);
          setText('');
          setTitle('');
          setImageUrl('');
          setTags([]);
          onClose();
        },
      },
    );
  };
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

  const onChangeImage = async (image: any) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        setIsLoadingImage(false);
        setImageUrl(successData?.uploadedUrl);
      },
    });
  };
  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
  };
  const selectImage = async () => {
    setIsLoadingImage(true);
    ImagePicker.openPicker(cameraOptions).then((image: any) => {
      onChangeImage?.(image);
    });
  };
  const onPress = () => {
    Alert.alert('Upload', 'Select a source', [
      {text: 'Camera', onPress: () => onPressOpenCamera()},
      {text: 'Gallery', onPress: () => selectImage()},
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => setIsLoadingImage(false),
      },
    ]);
  };

  const AddPhoto = ({
    size = 'sm',
    style,
  }: {
    size?: 'sm' | 'lg';
    style?: ViewStyle;
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: deviceWidth / 3 - 24,
          height: deviceWidth / 3 - 24,
          backgroundColor: getColor({color: 'primary.200'}),
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1,
          ...style,
        }}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={{
              width: deviceWidth / 3 - 24,
              height: deviceWidth / 3 - 24,
            }}
          />
        ) : (
          <AddIconSet width={42} height={42} color={'gray.50'} />
        )}
      </TouchableOpacity>
    );
  };
  const addTags = () => {
    setTags([...tags, text]);
    setText('');
  };

  const removeTag = t => {
    setTags([...tags.filter(item => item !== t)]);
  };

  return (
    <CustomActionSheet
      title="Add Sub Category"
      isVisible={isVisible}
      onClose={onClose}>
      <AddPhoto style={{alignSelf: 'center'}} />
      <Input
        value={title}
        style={{marginTop: 24}}
        placeholder="Title"
        onChangeText={setTitle}
      />
      {SubcategoryAndTagsConfig?.tags !== false && (
        <Input
          value={text}
          style={{marginTop: 16}}
          placeholder="Add tags"
          onChangeText={setText}
          returnKeyType="done"
          onSubmitEditing={addTags}
        />
      )}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {tags?.map((item: any) => {
          return (
            <TouchableOpacity key={item?.id} style={styles.closeIconContainer}>
              <CloseIconSet onPress={() => removeTag(item)} />
              <Typography numberOfLines={1}>{item}</Typography>
            </TouchableOpacity>
          );
        })}
      </View>
      <Layer style={{flexDirection: 'row', marginVertical: 32}}>
        <Button
          variant={'outline'}
          style={{flex: 1, marginRight: 16}}
          onPress={() => [
            setText(''),
            setTitle(''),
            setImageUrl(''),
            setTags([]),
            onClose(),
          ]}>
          Cancel
        </Button>
        <Button
          isDisabled={!imageUrl || !title}
          isLoading={isLoading}
          style={{flex: 1}}
          onPress={() => [
            addCategoryHandler({title, imageUrl, tags: [...tags, text]}),
          ]}>
          Save
        </Button>
      </Layer>
    </CustomActionSheet>
  );
};

export default AddSubCategoryModal;

const styles = StyleSheet.create({
  closeIconContainer: {
    flexDirection: 'row',
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
  },
});
