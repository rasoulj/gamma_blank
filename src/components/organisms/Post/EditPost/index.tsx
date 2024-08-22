import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import * as yup from 'yup';
import {
  // useMutation,
  Button,
  CustomFormInput,
  DropDown,
  graphqlFetcher,
  Layer,
  Screen,
  Scrollable,
  Typography,
  useToast,
  useRoute,
  useNavigate,
} from '~/components/elemental';
import AddMedia from '~/components/molecules/CreatePost/AddMedia';
import {model} from '~/data/model';
import {useGetPosts, useUpdatePost} from '../hook';
import {useNavigation} from '@react-navigation/native';

type IEditPost = {
  postId: number;
  navigation: any;
};

const EditPost: React.FC<IEditPost> = ({
  navigation,
  preAction,
  postAction,
}: {
  navigation?: any;
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) => {
  const navigate = useNavigation()
  const {navigateWithName} = useNavigate();

  const [isLoadingPreAction, setIsLoadingPreAction] = useState(false);
  const configs = model?.metaData?.configs.createpost || {
    category: true,
    description: true,
    hashtags: true,
    media: true,
  };

  const route = useRoute();
  const {item} = route?.params as any;

  const schema = yup.object().shape({
    ...(configs?.description ? {description: yup.string().required()} : {}),
    ...(configs?.hashtags ? {usedTags: yup.string()} : {}),
    ...(configs?.media ? {imageUrl: yup.string().nullable()} : {}),
  });

  const {toast} = useToast();
  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    defaultValues: {
      usedTags: [],
    },
  });

  const queryClient = useQueryClient();

  const postId = navigation?.params?.postId || item?.postId;

  const [selected, setSelected] = React.useState(null);

  const {data: data, isLoading}: any = useGetPosts({
    where: {
      id: {eq: postId},
    },
  });

  const postData = data?.pages || [];

  const {handleSubmit, register, setValue, getValues, formState} = methods;

  useEffect(() => {
    setValue('imageUrl', postData[0]?.mediaUrl);
    setValue('description', postData[0]?.content);
    setValue('category', postData[0]?.category);

    setSelected(postData[0]?.category);

    setValue(
      'usedTags',
      postData[0]?.postTags?.map(item => item.title).join(', '),
    );
    console.log(getValues());
  }, [data]);

  const {mutate: updatePost, isLoading: isLoadingUpdate} = useUpdatePost();

  const categories = model?.constants?.postCategories || [];

  const categoryCreator = () => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  };
  const submitForm = async formData => {
    console.log('submit');
    setIsLoadingPreAction(true);
    const result = await preAction?.(formData);
    if (result === false) {
      setIsLoadingPreAction(false);
      return;
    }
    console.log(result);

    let itemInput = {
      id: postId,
      mediaUrl: formData?.imageUrl,
      content: formData?.description,
      category: selected,
      tags: [formData?.usedTags],
    };

    await updatePost(
      {input: itemInput},
      {
        onSuccess: async success => {
          console.log('Success', success);
          setIsLoadingPreAction(false);
          toast({message: 'Update success!'});
          await queryClient.refetchQueries('getPosts');
          postAction?.(formData);
          navigate?.goBack()
          // navigateWithName('post list');
        },
        onError: error => {
          console.log('error', error);
          toast({message: error.toString()});
        },
      },
    );
  };

  return (
    <Screen isLoading={isLoading}>
      <FormProvider {...methods}>
        <Scrollable
          data-id="from-scroll"
          data-name="Scrollable"
          style={{
            position: 'relative',
          }}>
          {configs?.category && (
            <>
              <Typography
                style={{
                  marginTop: 10,
                  // paddingTop: 5,
                  fontSize: 15,
                  fontWeight: '500',
                  marginBottom: 8,
                }}>
                Category
              </Typography>
              <DropDown
                data={categoryCreator()}
                defaultValue={{label: selected, value: selected}}

                name="category"
                onChangeValue={value => setSelected(value)}
              />
              <Layer style={{height: 12}} />
            </>
          )}
          {configs?.description && (
            <>
              <CustomFormInput
                {...register('description')}
                placeholder="description"
                label="Description"
                textArea
              />
              <Layer style={{height: 12}} />
            </>
          )}
          {configs?.hashtags && (
            <>
              <CustomFormInput
                {...register('usedTags')}
                placeholder="#Hashtag #Hashtag #Hashtag"
                label="Add Hashtag"
              />
              <Layer style={{height: 24}} />
            </>
          )}
          {configs?.media && (
            <>
              <Typography
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginBottom: 8,
                }}>
                Add Media
              </Typography>
              <Layer style={{bottom: 0}}>
                <AddMedia
                  {...register('imageUrl')}
                  type="image"
                  title="Add / Take photo"
                />
              </Layer>
            </>
          )}
          <Button
            isLoading={isLoadingUpdate || isLoadingPreAction}
            onPress={handleSubmit(submitForm)}
            style={{
              height: 49,
              width: '100%',
              marginTop: 20,
              marginBottom: 100,
            }}>
            Save
          </Button>
        </Scrollable>
      </FormProvider>
    </Screen>
  );
};

export default EditPost;
