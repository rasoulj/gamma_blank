import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Modal, Platform, StyleSheet} from 'react-native';
import {
  Button,
  CustomFormInput,
  Header,
  HighlightCoverSection,
  LoadIndicator,
  VStack,
  View,
} from '~/components';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateHighlightMutation} from './hook';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import {useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {getColor} from '~/utils/helper/theme.methods';

const schema = yup.object().shape({
  title: yup.string(),
});

const HighlightTitleModal = ({
  isVisible,
  onClose,
  items,
}: {
  isVisible: boolean;
  onClose: any;
  items?: any[];
}) => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, control, setValue} = methods;

  const [selectedImage, setSelectedImage] = useState();

  const {mutate, isLoading} = useCreateHighlightMutation();
  const queryClient = useQueryClient();
  const onCreateHighlight = (uploadUrl, formData) => {
    mutate(
      {
        input: {
          name: formData?.title ?? 'Highlight',
          photoUrl: uploadUrl,
          storyIds: items?.map(item => item?.story?.id),
        },
      },
      {
        onSuccess: successData => {
          if (successData?.highlight_createHighlight?.status?.code === 1) {
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
            navigation.goBack();
            onClose();
          }
        },
        onError: errorData => {},
      },
    );
  };

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const navigation = useNavigation();
  const onDonePress = formData => {
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
    let mediaType = items?.[0]?.story?.mediaType;
    if (mediaType === 'VIDEO') {
      setSelectedImage({path: items?.[0]?.story?.thumbnail, isRemote: true});
    } else {
      setSelectedImage({path: items?.[0]?.story?.mediaUrl, isRemote: true});
    }
  };
  useEffect(() => {
    getThumbnail();
  }, [items]);

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        {(isLoading || isUploading) && <LoadIndicator />}
        <Header title="Highlight Title" onClickBack={onClose} />
        <View style={styles.header}>
          <FormProvider {...methods}>
            <VStack space="6">
              <HighlightCoverSection {...{selectedImage, setSelectedImage}} />
              <CustomFormInput name="title" placeholder="Highlights name" />
              <Button onPress={handleSubmit(onDonePress)} marginTop="12">
                Done
              </Button>
            </VStack>
          </FormProvider>
        </View>
      </View>
    </Modal>
  );
};

export default HighlightTitleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: getColor({color: 'background.500'}),
  },

  header: {flex: 1, margin: 20},
});
