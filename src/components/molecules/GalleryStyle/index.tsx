import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  CustomFormInput,
  Header,
  LoadIndicator,
  Scrollable,
  SelectGalleryImage,
  VStack,
  useGetCurrentUser,
  useNavigate,
  useToast,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import useAuthStore from '~/stores/authStore';
import {
  useAddPhotosUser,
  useGetUserPhotos,
  useRemovePhotosUser,
  useUpdateUser,
} from './hooks';
import {useQueryClient} from 'react-query';
const schema = yup.object().shape({
  fullName: yup.string().typeError('Required').required('Required'),
  email: yup.string(),
  images: yup.array(
    yup.object({
      path: yup.string().nullable(),
      index: yup.number(),
      id: yup.number().nullable(),
      deleteId: yup.number().nullable(),
    }),
  ),
  photoUrl: yup.string().nullable(),
});
const GalleryStyle = () => {
  const {user, setUser} = useAuthStore();
  const {toast} = useToast();
  const {data, isLoading: isCurrentUserLoading} = useGetCurrentUser(null);
  const {isLoading: isPhotosLoading, data: photos} = useGetUserPhotos({
    userId: user?.id,
  });
  const currentUser = data?.user_getCurrentUser?.result ?? user;
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {email: currentUser?.email, fullName: currentUser?.fullName},
  });
  const {register, handleSubmit, setValue} = methods;
  useEffect(() => {
    currentUser && setUser(currentUser);
    setValue('fullName', currentUser?.fullName);
    setValue('photoUrl', currentUser?.photoUrl);
    setValue(
      'images',
      photos?.pages?.map((item, index) => {
        return {index: index + 1, path: item?.photoUrl, id: item?.id};
      }),
    );
  }, [currentUser, photos]);
  const queryClient = useQueryClient();
  const {mutate: updateMutate, isLoading: isUpdatingUser} = useUpdateUser();
  const {mutateAsync: addPhotoMutate, isLoading: isAddingPhoto} =
    useAddPhotosUser();
  const {mutateAsync: removePhotoMutate, isLoading: isRemovingPhoto} =
    useRemovePhotosUser();
  const onSave = async formData => {
    let userInput = {
      photoUrl: formData?.photoUrl,
      fullName: formData?.fullName,
      about: currentUser?.about,
      city: currentUser?.city,
      age: currentUser?.age,
      dateOfBirth: currentUser?.dateOfBirth,
      gender: currentUser?.gender,
      location: currentUser?.location,
      phoneNumber: currentUser?.phoneNumber,
      state: currentUser?.state,
      streetAddress: currentUser?.streetAddress,
      unitNumber: currentUser?.unitNumber,
      userRole: currentUser?.userRole,
      userType: currentUser?.userType,
      zipCode: currentUser?.zipCode,
    };
    if (
      currentUser?.fullName != userInput?.fullName ||
      currentUser?.photoUrl != userInput?.photoUrl
    )
      updateMutate(
        {
          userId: user?.id,
          userInput,
        },
        {
          onSuccess: data => {
            if (data?.user_updateUser?.status?.code === 1) {
            } else {
              toast({message: data?.user_updateUser?.status?.value});
            }
          },
          onError: errorData => {
            console.log('**********', {errorData});
            toast({message: 'Something went wrong'});
          },
        },
      );
    if (formData?.images?.length < 1) onGoBack();
    else {
      let addUrls: any[] = [];
      let removeIds: any[] = [];
      formData?.images?.forEach(image => {
        if (image?.path && (!image?.id || image?.deleteId))
          addUrls.push(image?.path);
        if (image?.deleteId) removeIds.push(image?.deleteId);
      });
      if (addUrls?.length > 0) {
        await addPhotoMutate(
          {input: addUrls},
          {
            onSuccess: data => {
              onGoBack();
            },
            onError: errorData => {
              console.log({errorData});
              toast({message: 'Something went wrong'});
            },
          },
        );
      }
      if (removeIds?.length > 0) {
        await removePhotoMutate(
          {input: removeIds},
          {
            onSuccess: data => {
              console.log(JSON.stringify({removeData: data}));
              if (data?.user_removePhotos?.code === 1) {
                onGoBack();
              }
            },
            onError: errorData => {
              console.log(JSON.stringify({removeErrorData: errorData}));
              toast({message: 'Something went wrong'});
              onGoBack();
            },
          },
        );
      }
      if (addUrls?.length === 0 && removeIds?.length === 0) onGoBack();
    }
  };
  const {navigation} = useNavigate();
  const onGoBack = () => {
    queryClient.invalidateQueries(['current_user'], {exact: false});
    queryClient.invalidateQueries(['user_getPhotos'], {
      exact: false,
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <>
      <Header title={'Edit profile'} style={{marginHorizontal: 0}}></Header>
      <Scrollable>
        {(isUpdatingUser ||
          isAddingPhoto ||
          isRemovingPhoto ||
          isPhotosLoading) && <LoadIndicator />}
        <FormProvider {...methods}>
          <VStack space="16px" py="24px">
            <SelectGalleryImage name="images" coverName="photoUrl" />
            <CustomFormInput
              {...register('fullName')}
              style={styles.input}
              placeholder="fullname"
              label="Full name"
            />
            <CustomFormInput
              {...register('email')}
              style={styles.input}
              disabled
              label="Email"
            />
            <Button onPress={handleSubmit(onSave)} marginTop="30px">
              Save
            </Button>
          </VStack>
        </FormProvider>
      </Scrollable>
    </>
  );
};
export default GalleryStyle;
const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
  },
});
