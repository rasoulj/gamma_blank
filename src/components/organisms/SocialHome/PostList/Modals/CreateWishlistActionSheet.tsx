import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  CustomFormInput,
  HStack,
  KeyboardAvoidingView,
  Typography,
  VStack,
  useToast,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {
  useAddToWishlistMutation,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
} from '../../hook';
import {useQueryClient} from 'react-query';
import {StyleSheet} from 'react-native';
import {SuccessModal} from '~/components';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Minimum allowed length is 3 chars')
    .required('Required'),
});

const CreateWishlistActionSheet = ({
  isVisible,
  onClose,
  postId,
  postIds,
  boardId,
  type = 'add',
  boardName,
  postAction,
}: {
  isVisible: boolean;
  onClose: () => void;
  postId?: number;
  postIds?: number[];
  boardId?: number;
  type?: 'add' | 'edit';
  boardName?: string;
  postAction?: (data?: any) => void;
}) => {
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      name: boardName,
    },
  });
  const {handleSubmit} = methods;

  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false);

  const {mutate, isLoading} = useCreateWishlistMutation();
  const {mutate: addMutate, isLoading: addIsLoading} =
    useAddToWishlistMutation();
  const {mutate: updateMutate, isLoading: updateLoading} =
    useUpdateWishlistMutation();

  const {toast} = useToast();
  const queryClient = useQueryClient();

  const onPressSave = formData => {
    if (type === 'add')
      mutate(
        {input: {...formData, entityName: 'POST'}},
        {
          onSuccess: data => {
            if (
              data?.wishList_createWishList?.status?.code === 1 &&
              data?.wishList_createWishList?.result?.id
            ) {
              if (postAction) postAction(data?.wishList_createWishList?.result);
              else if (postId || postIds?.length > 0)
                onAddToWishList(data?.wishList_createWishList?.result?.id);
            } else {
              toast({message: data?.wishList_createWishList?.status?.value});
            }
          },
          onError: errorData => {
            toast({message: 'Something went wrong'});
          },
        },
      );
    else {
      if (formData?.name != boardName) {
        updateMutate(
          {input: {name: formData?.name, id: boardId, entityName: 'POST'}},
          {
            onSuccess: data => {
              if (data?.wishList_updateWishList?.status?.code === 1) {
                onClose();
                toast({message: 'Updated', type: 'success'});
                queryClient.invalidateQueries(['post_getWishLists'], {
                  exact: false,
                });
              } else {
                toast({
                  message: data?.wishList_updateWishList?.status?.value,
                  type: 'error',
                });
              }
            },
            onError: errorData => {
              toast({message: 'Something went wrong', type: 'error'});
            },
          },
        );
      }
    }
  };
  const onAddToWishList = id => {
    if (id) {
      addMutate(
        {wishListId: id, entityIdList: postIds ?? [postId]},
        {
          onSuccess: successData => {
            if (successData?.wishList_addToWishList?.code === 1) {
              queryClient.invalidateQueries(['getPosts'], {exact: false});
              queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
                exact: false,
              });
              queryClient.invalidateQueries(['post_getWishLists'], {
                exact: false,
              });
              queryClient.invalidateQueries(['wishList_getWishLists'], {
                exact: false,
              });
              setVisibleSuccessModal(true);
            } else {
              toast({message: successData?.wishList_addToWishList?.value});
            }
          },
          onError: errorData => {
            toast({message: 'Something went wrong'});
          },
        },
      );
    }
  };

  const onCloseSuccessModal = () => {
    setVisibleSuccessModal(false);
    onClose();
  };
  if (visibleSuccessModal)
    return (
      <SuccessModal
        isVisible={visibleSuccessModal}
        onClose={onCloseSuccessModal}
        successTitle="New Board Saved!"
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <FormProvider {...methods}>
        <VStack space={4} w="100%">
          <Typography
            fontWeight={'700'}
            fontSize="lg"
            color={'gray.800'}
            alignSelf="center">
            {type === 'add' ? 'Create new board' : 'Board name'}
          </Typography>
          <KeyboardAvoidingView>
            <CustomFormInput
              name="name"
              label="Board name"
              placeholder="Enter board name here"
            />
          </KeyboardAvoidingView>
          <HStack justifyContent="space-between" space={4} mt={4} h={9}>
            <TouchableOpacity style={{flex: 1}} onPress={onClose}>
              <VStack
                borderWidth={2}
                flex="1"
                borderColor="primary.500"
                alignItems="center"
                justifyContent="center"
                borderRadius={10}>
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
              onPress={handleSubmit(onPressSave)}>
              <VStack
                flex="1"
                backgroundColor="primary.500"
                alignItems="center"
                justifyContent="center"
                borderRadius={10}>
                {isLoading || addIsLoading || updateLoading ? (
                  <ActivityIndicator />
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

export default CreateWishlistActionSheet;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
