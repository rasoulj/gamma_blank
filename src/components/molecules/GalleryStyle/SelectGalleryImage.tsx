import {AddIcon, CloseIcon, HStack, VStack} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  ConfirmationActionSheet,
  Typography,
  deviceWidth,
  getColor,
  useToast,
  Image,
} from '~/components';
import ImagePicker from 'react-native-image-crop-picker';
import {useController} from 'react-hook-form';
import {useUploadFile} from '../../elemental/hooks/useUploadFile';
const miniItemSize = 0.29 * deviceWidth;
const largeItemSize = 0.58 * deviceWidth;
const SelectGalleryImage = ({
  name,
  coverName,
}: {
  name: string;
  coverName: string;
}) => {
  const {field} = useController({name});
  const {field: coverField} = useController({name: coverName});
  const onImageSelected = (photoIndex: number, path: string) => {
    console.log('on image selected', {path}, {photoIndex});
    if (photoIndex === 0) {
      coverField.onChange(path);
    } else {
      let foundIndex = field.value?.findIndex(
        (item, index) => item?.index === photoIndex,
      );
      let values = Array.isArray(field?.value) ? [...field?.value] : [];
      if (foundIndex > -1) {
        let currentValue = values[foundIndex];
        values[foundIndex] = {
          path,
          index: photoIndex,
          deleteId: currentValue?.id ?? currentValue?.deleteId,
        };
      } else values.push({path, index: photoIndex});
      field.onChange(values);
    }
  };
  const getDefaultValue = photoIndex => {
    let foundIndex = field.value?.findIndex(
      (item, index) => item?.index === photoIndex,
    );
    if (foundIndex > -1) return field?.value[foundIndex]?.path;
  };
  return (
    <VStack space="2px">
      <HStack justifyContent="space-between">
        <ClickableArea
          width={largeItemSize}
          height={0.59 * deviceWidth - 1}
          text="Cover photo"
          index={0}
          defaultValue={coverField?.value}
          onImageSelected={onImageSelected}
        />
        <VStack justifyContent="space-between">
          {[1, 2].map(item => (
            <ClickableArea
              index={item}
              onImageSelected={onImageSelected}
              key={`${item}`}
              defaultValue={getDefaultValue(item)}
            />
          ))}
        </VStack>
      </HStack>
      <HStack justifyContent="space-between">
        {[3, 4, 5].map(item => (
          <ClickableArea
            width={item != 5 ? miniItemSize - 2 : undefined}
            index={item}
            onImageSelected={onImageSelected}
            key={`${item}`}
            defaultValue={getDefaultValue(item)}
          />
        ))}
      </HStack>
    </VStack>
  );
};
export default memo(SelectGalleryImage);
const ClickableArea = ({
  width = miniItemSize,
  height = miniItemSize,
  text,
  index,
  onImageSelected,
  defaultValue,
}: {
  width?: number | string;
  height?: number | string;
  text?: string;
  index: number;
  onImageSelected?: (index: number, path: string) => void;
  defaultValue?: string;
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [image, setImage] = useState(
    defaultValue ? {path: defaultValue} : undefined,
  );
  const [visibleDelete, setVisibleDelete] = useState(false);
  useEffect(() => {
    setImage(defaultValue ? {path: defaultValue} : undefined);
  }, [defaultValue]);
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {toast} = useToast();
  const onPress = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 1080,
      height: 1080,
    }).then((image: any) => {
      setImage?.(image);
      uploadImage(image);
    });
  };
  const uploadImage = image => {
    uploadFileMutate(image, {
      onSuccess: (successData, variables, context) => {
        // for get variables change the useMutation import from elemental to react-query in useUploadFile hook
        if (successData?.uploadedUrl && variables?.path === image?.path)
          onImageSelected(index, successData?.uploadedUrl);
        else if (!successData?.uploadedUrl)
          toast({
            message: 'Something went wrong',
            style: {
              backgroundColor: getColor({color: 'error.500'}),
              textColor: 'white',
            },
          });
      },
      onError: data => {
        console.log('ERROR', {data});
        toast({
          message: 'Something went wrong',
          style: {
            backgroundColor: getColor({color: 'error.500'}),
            textColor: 'white',
          },
        });
      },
    });
  };
  const onDeletePress = () => setIsOpenConfirm(true);
  const onDeleteItem = () => {
    setImage(undefined);
    setVisibleDelete(false);
    onImageSelected(index, undefined);
    onClose();
  };
  const onClose = () => setIsOpenConfirm(false);
  const onImageLongPress = () => setVisibleDelete(true);
  const onHideDelete = () => setVisibleDelete(false);
  return (
    <>
      {image ? (
        <VStack w={width} h={height} shadow="4">
          <TouchableOpacity
            onLongPress={onImageLongPress}
            activeOpacity={0.9}
            onPress={visibleDelete ? onHideDelete : undefined}>
            <Image
              source={{uri: image?.path}}
              style={{
                width,
                height,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
          {isUploading && (
            <VStack
              alignItems="center"
              justifyContent="center"
              style={{
                width,
                height,
                position: 'absolute',
              }}>
              <ActivityIndicator
                size="large"
                color={getColor({color: 'primary.400'})}
              />
            </VStack>
          )}
          {visibleDelete && (
            <VStack mt="10px" px="8px" alignSelf="flex-end" position="absolute">
              <TouchableOpacity onPress={onDeletePress}>
                <VStack
                  w="24px"
                  h="24px"
                  bg="#0A8080"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="12px">
                  <CloseIcon color="#fff" size={'12px'} />
                </VStack>
              </TouchableOpacity>
            </VStack>
          )}
        </VStack>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <VStack
            shadow={0.5}
            w={width}
            h={height}
            borderWidth="1"
            borderColor="#9DCCCC"
            alignItems="center"
            pt={width != largeItemSize ? 0 : '95px'}
            justifyContent={width != largeItemSize ? 'center' : undefined}>
            <AddIcon
              color="#0A8080"
              size={width != largeItemSize ? '20px' : '28px'}
            />
            {text && (
              <VStack
                borderRadius="6px"
                backgroundColor="#D8FFF5"
                alignItems="center"
                mt="54px"
                h="25px"
                w="104px">
                <Typography style={{}}>{text}</Typography>
              </VStack>
            )}
          </VStack>
        </TouchableOpacity>
      )}
      <ConfirmationActionSheet
        isOpen={isOpenConfirm}
        onClose={onClose}
        onConfirmPress={onDeleteItem}
      />
    </>
  );
};
