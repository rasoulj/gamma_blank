import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomFormInput,
  HStack,
  Image,
  KeyboardAvoidingView,
  Typography,
  VStack,
  scale,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useCreateHighlightMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import HighlightAddedModal from './HighlightAddedModal';

const schema = yup.object().shape({
  name: yup.string(),
});

const CreateHighlightActionSheet = ({
  isVisible,
  onClose,
  storyItem,
}: {
  isVisible: boolean;
  onClose: () => void;
  storyItem: any;
}) => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, control, getValues} = methods;

  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState();
  const [visibleSuccessModal, setVisibleSuccessMoldal] = useState(false);

  const {mutate: createHighlightMutate, isLoading: createLoading} =
    useCreateHighlightMutation();
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const onCreateHighlight = (uploadUrl, formData) => {
    createHighlightMutate(
      {
        input: {
          photoUrl: uploadUrl,
          name: formData?.name ?? 'Highlight',
          storyIds: [storyItem?.id],
        },
      },
      {
        onSuccess: successData => {
          if (successData?.highlight_createHighlight?.status?.code === 1) {
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
            setVisibleSuccessMoldal(true);
          }
        },
        onError: errorData => {},
      },
    );
  };
  const onCreate = formData => {
    if (selectedImage?.isRemote)
      onCreateHighlight(selectedImage?.path, formData);
    else
      uploadFileMutate(selectedImage, {
        onSuccess: successData => {
          if (successData?.uploadedUrl) {
            onCreateHighlight(successData?.uploadedUrl, formData);
          }
        },
        onError: errorData => {},
      });
  };

  const getThumbnail = () => {
    let mediaType = storyItem?.mediaType;
    if (mediaType === 'VIDEO') {
      if (storyItem?.thumbnail)
        setSelectedImage({path: storyItem?.thumbnail, isRemote: true});
    } else {
      setSelectedImage({path: storyItem?.mediaUrl, isRemote: true});
    }
  };
  useEffect(() => {
    getThumbnail();
  }, []);

  const onCloseSuccessModal = () => {
    setVisibleSuccessMoldal(false);
    onClose();
  };

  if (visibleSuccessModal)
    return (
      <HighlightAddedModal
        isVisible={visibleSuccessModal}
        onClose={onCloseSuccessModal}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <FormProvider {...methods}>
        <VStack space="16px" w="100%">
          <Typography
            fontWeight={'700'}
            fontSize="lg"
            color={'gray.800'}
            alignSelf="center">
            Highlight
          </Typography>
          <Image style={styles.image} src={{uri: selectedImage?.path}} />
          <KeyboardAvoidingView>
            <CustomFormInput
              name="name"
              label="Highlight name"
              placeholder="Enter Highlight name here"
            />
          </KeyboardAvoidingView>
          <HStack
            justifyContent="space-between"
            space="16px"
            mt="16px"
            h="40px">
            <TouchableOpacity style={styles.flex1} onPress={onClose}>
              <VStack
                borderWidth="2px"
                flex="1"
                borderColor="primary.500"
                alignItems="center"
                justifyContent="center"
                borderRadius="10px">
                <Typography
                  fontWeight={'700'}
                  fontSize="sm"
                  color="primary.500"
                  alignSelf="center">
                  Cancel
                </Typography>
              </VStack>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flex1}
              disabled={isUploading || createLoading}
              onPress={handleSubmit(onCreate)}>
              <VStack
                flex="1"
                backgroundColor="primary.500"
                alignItems="center"
                justifyContent="center"
                borderRadius="10px">
                {isUploading || createLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Typography
                    fontWeight={'700'}
                    fontSize="sm"
                    color="gray.50"
                    alignSelf="center">
                    Save
                  </Typography>
                )}
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </FormProvider>
    </CustomActionSheet>
  );
};

export default CreateHighlightActionSheet;

const styles = StyleSheet.create({
  image: {
    width: scale(81),
    height: scale(81),
    borderRadius: scale(81) / 2,
    alignSelf: 'center',
  },
  flex1: {flex: 1},
});
