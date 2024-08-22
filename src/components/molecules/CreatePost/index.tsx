import React, {useState} from 'react';
import AddMedia from './AddMedia';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {gql} from 'graphql-request';
import {FormProvider, useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {model} from '~/data/model';
import {
  Button,
  CustomFormInput,
  DropDown,
  graphqlFetcher,
  Layer,
  print,
  Screen,
  Scrollable,
  Typography,
  useMutation,
  useNavigate,
  useToast,
  VStack,
} from '~/components/elemental';

const configs = model?.metaData?.configs.createpost || {
  category: true,
  description: true,
  hashtags: true,
  media: true,
};

const schema = yup.object().shape({
  ...(configs?.description ? {description: yup.string().required()} : {}),
  ...(configs?.hashtags ? {usedTags: yup.string()} : {}),
  ...(configs?.media ? {imageUrl: yup.string().nullable()} : {}),
});

function CreatePost({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) {
  const [isLoadingPreAction, setIsLoadingPreAction] = useState(false);

  const {toast} = useToast(),
    {...methods} = useForm<Record<string, any>, object>({
      resolver: yupResolver<yup.AnyObjectSchema>(schema),
      mode: 'onChange',
      defaultValues: {
        usedTags: '',
      },
    }),
    {handleSubmit, register} = methods,
    {mutate, isLoading} = useMutation(args =>
      graphqlFetcher(CREATE_POST, args),
    ),
    queryClient = useQueryClient(),
    {navigateWithName} = useNavigate(),
    [selected, setSelected] = useState(null),
    categories = model?.constants?.postCategories || [],
    configs = model?.metaData?.configs.createpost || {
      category: true,
      description: true,
      hashtags: true,
      media: true,
    };

  return (
    <Screen isLoading={isLoading}>
      <Scrollable data-id="from-scroll" data-name="Scrollable">
        <FormProvider {...methods}>
          <VStack>
            {configs?.category && (
              <>
                <Typography
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    fontWeight: '500',
                    marginBottom: 8,
                  }}>
                  Category
                </Typography>
                <DropDown
                  data={categoryCreator()}
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
                  placeholder="#Hashtag"
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
          </VStack>
          <Button
            onPress={handleSubmit(submitForm)}
            isLoading={isLoading || isLoadingPreAction}
            style={{
              height: 49,
              width: '100%',
              marginTop: 20,
              marginBottom: 100,
            }}>
            Create
          </Button>
        </FormProvider>
      </Scrollable>
    </Screen>
  );

  function categoryCreator() {
    let Data = [];

    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }

    return Data;
  }

  async function submitForm(formData) {
    setIsLoadingPreAction(true);
    const result = await preAction?.(formData);

    if (result === false) {
      setIsLoadingPreAction(false);
      return;
    }

    let itemInput = {
      mediaUrl: formData.imageUrl,
      content: formData.description,
      tags: [formData.usedTags ? addHash(formData.usedTags) : null],
      category: selected,
    };

    mutate(
      {input: itemInput},
      {
        onSuccess: () => {
          toast({message: 'Create success!'});
          queryClient.refetchQueries('getPosts');
          postAction?.(formData);
          navigateWithName('postlist');
        },
        onError: error => {
          console.log('error', error);
          toast({message: error.toString()});
        },
      },
    );
  }

  function addHash(inputString) {
    const words = inputString.split(' ');

    const hashWords = words.map(word => {
      if (word.charAt(0) !== '#') return '#' + word;

      return word;
    });

    return hashWords.join(' ');
  }
}

export default CreatePost;

export const CREATE_POST = gql`
  mutation post_createPost($input: PostInput) {
    post_createPost(input: $input) {
      status
    }
  }
`;
