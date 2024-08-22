import {VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {
  Button,
  CustomFormInput,
  HighlightCoverSection,
  LoadIndicator,
  Screen,
  Tabs,
  useNavigate,
  useRoute,
  useToast,
} from '~/components';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import useHeader from '~/components/elemental/hooks/use_header';
import SelectedStories from './SelectedStories';
import {useGetHighlights, useUpdateHighlight} from './hooks';
import {useUploadFile} from '~/components/elemental/hooks/useUploadFile';
import useAuthStore from '~/stores/authStore';

const schema = yup.object().shape({
  title: yup.string(),
});

const EditHighlight = () => {
  const route = useRoute();
  const user = useAuthStore(state => state.user);
  const highlightId = route?.params?.highlightId;
  const {data} = useGetHighlights({
    where: {
      highlight: {id: {eq: highlightId ?? route?.params?.item?.highlight?.id}},
    },
    userId: user?.id,
  });
  const item = data?.pages?.[0] ?? route?.params?.item;
  const [selectedImage, setSelectedImage] = useState({
    path: item?.highlight?.photoUrl,
    isRemote: true,
  });

  const selectedItems = useRef<any[]>([]);
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      title: item?.highlight?.name,
    },
  });
  const {handleSubmit, register, control, setValue} = methods;
  useEffect(() => {
    if (item) {
      setSelectedImage({
        path: item?.highlight?.photoUrl,
        isRemote: true,
      });
      setValue('title', item?.highlight?.name);
    }
  }, [item]);

  const tabs = [
    {
      id: 'selectedStories',
      label: 'Selected',
      component: (
        <SelectedStories
          highlightId={item?.highlight?.id}
          isSelected={true}
          selectedItems={selectedItems}
        />
      ),
    },
    {
      id: 'allStories',
      label: 'Stories',
      component: (
        <SelectedStories
          isSelected={false}
          highlightId={item?.highlight?.id}
          selectedItems={selectedItems}
        />
      ),
    },
  ];

  const queryClient = useQueryClient();
  const {} = useHeader({
    title: {
      children: 'Edit Highlight',
      fontWeight: 'bold',
    },
    hasTitle: true,
  });

  const {mutate, isLoading} = useUpdateHighlight();
  const {toast} = useToast();
  const {navigation} = useNavigate();
  const onCreateHighlight = (uploadUrl, formData) => {
    if (selectedItems?.current?.length < 1) {
      toast({message: 'At least select one item'});
      return;
    }
    mutate(
      {
        input: {
          name: formData?.title ?? 'Highlight',
          photoUrl: uploadUrl,
          storyIds: selectedItems?.current
            ?.filter(n => n)
            ?.map(item => item?.story?.id),
          id: item?.highlight?.id,
        },
      },
      {
        onSuccess: data => {
          if (data?.highlight_updateHighlight?.status?.code === 1) {
            queryClient.invalidateQueries(['getHighlights'], {exact: false});
            queryClient.invalidateQueries(['getStories'], {exact: false});
            queryClient.invalidateQueries(['getHighlightStories'], {
              exact: false,
            });
            toast({message: 'Success update'});
            navigation.goBack();
          } else {
            toast({message: data?.highlight_updateHighlight?.status?.value});
          }
        },
        onError: errorData => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
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

  return (
    <Screen>
      <VStack bgColor="background.200" flex="1">
        {(isLoading || isUploading) && <LoadIndicator />}
        <FormProvider {...methods}>
          <VStack space="24px" flex="1" marginBottom="20px">
            <HighlightCoverSection {...{selectedImage, setSelectedImage}} />
            <CustomFormInput name="title" placeholder="Highlights name" />
            <Tabs activeTab={'selectedStories'} tabs={tabs} />
            <Button onPress={handleSubmit(onDonePress)}>Done</Button>
          </VStack>
        </FormProvider>
      </VStack>
    </Screen>
  );
};
export default EditHighlight;
