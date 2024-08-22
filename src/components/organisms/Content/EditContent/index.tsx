import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {
  Button,
  CustomColorPicker,
  CustomFormInput,
  CustomSwitch,
  Layer,
  Scrollable,
  SelectImage,
  Typography,
  useToast,
  useNavigate,
  DropDown,
  LoadIndicator,
  UploadFile,
  useRoute,
  getColor,
  TrashIconSet,
  AddIconSet,
} from '~/components/elemental';
import {model} from '~/data/model';
import {useCreateProduct, useGetProductDetail, useUpdateProduct} from '../hook';
import CustomPriceInput from '~/components/atoms/CustomPriceInput';
import Pagination from '~/components/atoms/Pagination';
import useUploadFilesStore from '~/stores/uploadFilesStore';
import {TouchableOpacity} from 'react-native';

const schema = yup.object().shape({
  imageUrl: yup.string().required('Required'),
  price: yup.string().required('Required'),
  colors: yup.array(),
});

const configs: any = model?.metaData?.configs?.content || [];
const categories = model?.metaData?.constants?.contentCategories || [];

const EditContent = ({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) => {
  const route: any = useRoute();
  const item = route?.params?.item;

  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const {toast} = useToast();
  const {attachedFiles, setAttachedFiles} = useUploadFilesStore();

  const contentDuration = [
    {label: 'Under 4 minutes', value: 'Under 4 minutes'},
    {label: '4 - 20 minutes', value: '4 - 20 minutes'},
    {label: 'Over 20 minutes', value: 'Over 20 minutes'},
    {label: 'Over 1 hour', value: 'Over 1 hour'},
  ];

  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(contents?.length + 1);
  const [category, setCategory] = useState(null);
  const [duration, setDuration] = useState('');

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      price: item?.price,
      title: item?.pages?.[0]?.title,
      description: item?.pages?.[0]?.description,
      imageUrl: item?.productImages?.[0],
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    clearErrors,
    getValues,
  } = methods;

  const {data: product, isLoading: isLoadingProduct}: any = useGetProductDetail(
    {
      productId: item?.id,
    },
  );
  const productDetail = product?.ecommerce_getProduct?.result;

  useEffect(() => {
    if (productDetail) {
      setValue('title', productDetail?.title);
      setValue('description', productDetail?.description);
      setValue('imageUrl', productDetail?.productImages[0]?.imageUrl);
      setValue('price', productDetail?.price);
      setValue('category', productDetail?.category);
      setValue('duration', productDetail?.contentDuration);
      setCategory(productDetail?.category);
      setContents(productDetail?.pages ? JSON.parse(productDetail?.pages) : []);
      setTotalPages(JSON.parse(productDetail?.pages)?.length);
      setDuration(productDetail?.contentDuration);
    }
  }, [productDetail]);
  const {mutate, isLoading} = useUpdateProduct();


  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  }, []);

  const submitForm = async formData => {
    const result = await preAction?.(formData);
    if (result === false) {
      return;
    }
    const newContents = [...contents];

    newContents[currentPage - 1] = {
      id: currentPage - 1,
      title: getValues('title'),
      description: getValues('description'),
      files: attachedFiles,
    };

    let input: any = {
      id: item?.id,
      title: newContents?.[0]?.title,
      images: [formData?.imageUrl],
      description: newContents?.[0]?.description,
      price: parseFloat(formData?.price),
      productType: 'content',
      contentDuration: duration,
      category: category,
      pages: JSON.stringify(newContents),
    };
    console.log('des', input);

    mutate(
      {input},
      {
        onSuccess: (data: any) => {
          if (data?.ecommerce_updateProduct?.status?.value === 'Success') {
            toast({message: 'Create success!'});
            navigateWithName('home');
            setValue('imageUrl', '');
            setValue('title', '');
            setValue('description', '');
            setValue('price', '');
            setValue('category', '');
            setValue('duration', '');
            setValue('files', '');
            clearErrors();
            setContents([]);
            setAttachedFiles([]);
            setCurrentPage(1);
            postAction?.(formData);
          }
          queryClient.invalidateQueries(['getContentProducts']);
        },
        onError: error => {
          console.log('error', error);

          toast({message: error.toString()});
        },
      },
    );
  };

  const onPageChange = pageNum => {
    const newContents = [...contents];

    newContents[currentPage - 1] = {
      id: currentPage - 1,
      title: getValues('title'),
      description: getValues('description'),
      files: attachedFiles,
    };
    setContents(newContents);

    setCurrentPage(pageNum);
    setValue('title', contents?.[pageNum - 1]?.title);
    setValue('description', contents?.[pageNum - 1]?.description);
    setValue('files', contents?.[pageNum - 1]?.files);
    setAttachedFiles(contents?.[pageNum - 1]?.files);
  };

  const nextContent = data => {
    console.log(data);
    setCurrentPage(totalPages + 1);
    setTotalPages(totalPages + 1);
    if (totalPages !== contents.length) {
      setContents([
        ...contents,
        {
          id: totalPages,
          title: data?.title,
          description: data?.description,
          files: attachedFiles,
        },
      ]);
    }

    setValue('title', '');
    setValue('description', '');
    setAttachedFiles([]);
    setValue('files', '');
    clearErrors();
  };
  const deleteContent = () => {
    setContents([...contents.filter((i, index) => index !== currentPage - 1)]);
    setValue('title', contents?.[currentPage - 2]?.title);
    setValue('description', contents?.[currentPage - 2]?.description);
    setAttachedFiles(contents?.[currentPage - 2]?.files);
    setCurrentPage(currentPage - 1);
    setTotalPages(contents.length);
  };
  return (
    <Layer style={{paddingHorizontal: 5, flex: 1}}>
      {isLoading && <LoadIndicator height="100%" />}
      <Scrollable
        data-id="from-scroll"
        data-name="Scrollable"
        contentContainerStyle={{paddingBottom: 10}}
        style={{position: 'relative', margin: 0, flex: 1}}>
        <FormProvider {...methods}>
          {currentPage === 1 && (
            <SelectImage
              {...register('imageUrl')}
              title="Choose Cover Photo"
              style={{width: '100%', height: 180}}
            />
          )}
          <Layer style={{height: 10}} />
          <CustomFormInput
            {...register('title')}
            placeholder="A short description"
            label="Title"
          />
          {configs?.description && (
            <>
              <Layer style={{height: 10}} />
              <CustomFormInput
                {...register('description')}
                placeholder="Input Text Here"
                label="Description"
                textArea
              />
            </>
          )}
          {currentPage === 1 && configs?.category && (
            <>
              <Typography
                style={{fontWeight: '500', marginTop: 15, marginBottom: 8}}>
                Category
              </Typography>
              <Layer
                style={{
                  width: '100%',
                  height: 45,
                  alignSelf: 'center',
                  zIndex: 3,
                }}>
                <DropDown
                  data={categoryCreator}
                  style={{zIndex: 3}}
                  defaultValue={{label: category, value: category}}
                  name="category"
                  onChangeValue={value => setCategory(value)}
                />
              </Layer>
            </>
          )}

          {currentPage === 1 ? (
            <>
              <Layer style={{height: 10}} />
              <Typography
                style={{fontWeight: '500', marginTop: 15, marginBottom: 8}}>
                Content duration
              </Typography>
              <Layer
                style={{
                  width: '100%',
                  height: 45,
                  alignSelf: 'center',
                  zIndex: 3,
                }}>
                <DropDown
                  data={contentDuration}
                  style={{zIndex: 3}}
                  defaultValue={{label: duration, value: duration}}
                  name="duration"
                  onChangeValue={value => setDuration(value)}
                />
              </Layer>
              {configs?.price && (
                <>
                  <Layer style={{height: 10}} />
                  <CustomPriceInput
                    {...register('price')}
                    placeholder=""
                    label="Price ($)"
                  />
                </>
              )}
            </>
          ) : (
            <>
              <UploadFile multiple name={'files'} />
            </>
          )}
          <Layer style={{height: 8}} />
        </FormProvider>
        <Layer style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {currentPage > 1 && (
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                padding: 5,
                backgroundColor: getColor({color: 'background.500'}),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: getColor({color: 'error.500'}),
                marginRight: 20,
              }}
              onPress={() => deleteContent()}>
              <TrashIconSet color={getColor({color: 'error.500'})} />
            </TouchableOpacity>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              padding: 5,
              backgroundColor: getColor({color: 'background.500'}),
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: getColor({color: 'primary.500'}),
              marginLeft: 20,
            }}
            onPress={handleSubmit(nextContent)}>
            <Layer
              style={{
                width: 20,
                height: 20,
                backgroundColor: getColor({color: 'primary.500'}),
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AddIconSet color={getColor({color: 'background.500'})} />
            </Layer>
          </TouchableOpacity>
        </Layer>

        <Button
          style={{flex: 1, height: 49, marginTop: 20}}
          onPress={handleSubmit(submitForm)}>
          Done
        </Button>
      </Scrollable>
    </Layer>
  );
};

export default EditContent;
