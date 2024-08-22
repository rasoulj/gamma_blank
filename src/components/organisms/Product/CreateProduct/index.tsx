import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Layer,
  LoadIndicator,
  Typography,
  deviceWidth,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {useCreateProduct, useUpdateProduct} from '../hook';
import CreationStep from './Components/CreationStep';
import ProductAddMedia from './Pages/ProductAddMedia';
import ProductAlternative from './Pages/ProductAlternative';
import ProductAttribute from './Pages/ProductAttribute';
import ProductFeatures from './Pages/ProductFeatures';
import ProductInformation from './Pages/ProductInformation';

const CreateProduct = ({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) => {
  const [page, setPage] = useState(1);
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const route: any = useRoute();

  const informationInput = {
    title: route?.params?.item?.title,
    price: Number(route?.params?.item?.price),
    description: route?.params?.item?.description,
    category: route?.params?.item?.category,
    subcategory: route?.params?.item?.subcategory,

    condition: route?.params?.item?.quality,
    handlingPrice: route?.params?.item?.handlingPrice,
    brandName: route?.params?.item?.brand,
    legalDisclaimer: route?.params?.item?.legalDisclaimer,
    tag: route?.params?.item?.tag,
  };

  const featureInput = {
    weight: Number(route?.params?.item?.weight) || '',
    length: Number(route?.params?.item?.length) || '',
    width: Number(route?.params?.item?.width) || '',
    height: Number(route?.params?.item?.height) || '',
    features: route?.params?.item?.productFeatures,
  };

  const addMediaInput = {
    images: route?.params?.item?.productImages?.map(i => i?.imageUrl) || [],
    videos: route?.params?.item?.productVideos?.map(i => i?.videoUrl) || [],
    objectUrl: route?.params?.item?.objectUrl?.[0],
  };
  const attributeInput = {
    attribute: route?.params?.item?.attributes,
  };
  const alternateInput = {
    alternates: route?.params?.item?.alternates,
  };

  const [productData, setProductData]: any = useState(null);

  const {} = useHeader({
    title: {
      children: route?.params?.item ? 'Edit product' : 'Create product',
      fontWeight: 'bold',
      fontSize: 'lg',
      lineHeight: 'md',
    },
    hasBack: false,
  });
  const {mutate, isLoading} = route?.params?.item
    ? useUpdateProduct()
    : useCreateProduct();

  const submitForm = async () => {
    const result = await preAction?.(productData);
    if (result === false) {
      return;
    }
    const submitInput = {
      id: route?.params?.item?.id || null,
      title: productData?.title,
      price: Number(productData?.price),
      description: productData?.description,
      images: productData?.images?.filter((i) => i !== null),
      videos: productData?.videos,
      features: productData?.features,
      category: productData?.category?.value,
      subcategory:
        productData?.subcategory?.value?.value ||
        productData?.subcategory?.value,
      quality: productData?.condition?.value,
      brand: productData?.brandName,
      objectUrl: productData?.objectUrl?.[0],
      weight: Number(productData?.weight),
      length: Number(productData?.length),
      width: Number(productData?.width),
      height: Number(productData?.height),
      legalDisclaimer: productData?.legalDisclaimer,
      handlingPrice: Number(productData?.handlingPrice),
      attributeList: productData?.attribute,
      alternateList: productData?.alternates,
      tag: productData?.tag?.value,
    };

    mutate(
      {input: submitInput},
      {
        onSuccess: (data: any) => {
          if (
            data?.ecommerce_createProduct?.status?.value ||
            data?.ecommerce_updateProduct?.status?.value === 'Success'
          ) {
            toast({
              message: route?.params?.item ? 'Edit success' : 'Create success!',
            });
            postAction?.(productData);
            setProductData({});
            navigateWithName('home');
          } else if (
            data?.ecommerce_createProduct?.status?.value === 'Failed'
          ) {
            toast({
              message: 'Your product was not registered, please try again',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else if (
            data?.ecommerce_updateProduct?.status?.value === 'NotAllowd'
          ) {
            toast({
              message: 'You do not have access to update product',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else if (
            data?.ecommerce_updateProduct?.status?.value === 'NotFound'
          ) {
            toast({
              message: 'This product already removed',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          }
          queryClient.invalidateQueries(['getProducts']);
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <ProductInformation
            productData={
              productData?.category
                ? productData
                : {...productData, ...informationInput}
            }
            setProductData={d => [
              setProductData({...d, ...productData}),
              setPage(2),
            ]}
          />
        );
      case 2:
        return (
          <ProductFeatures
            productData={
              productData?.weight
                ? productData
                : {...productData, ...featureInput}
            }
            setProductData={d => [
              setProductData({...d, ...productData}),
              setPage(3),
            ]}
          />
        );
      case 3:
        return (
          <ProductAttribute
            productData={
              productData?.attribute
                ? productData
                : {...productData, ...attributeInput}
            }
            setProductData={d => [
              setProductData({...d, ...productData}),
              setPage(4),
            ]}
          />
        );
      case 4:
        return (
          <ProductAlternative
            productData={
              productData?.alternates
                ? productData
                : {...productData, ...alternateInput}
            }
            setProductData={d => [
              setProductData({...productData, ...d}),
              setPage(5),
            ]}
          />
        );
      case 5:
        return (
          <ProductAddMedia
            productData={
              productData?.images
                ? productData
                : {...productData, ...addMediaInput}
            }
            setProductData={d => setProductData({...productData, ...d})}
            submit={submitForm}
          />
        );
      default:
        return <Typography>no page</Typography>;
    }
  };

  return (
    <Layer style={styles.container}>
      <CreationStep page={page} setPage={setPage} />
      {isLoading && (
        <LoadIndicator height="100%" style={styles.loader} />
      )}
      {renderPage()}
    </Layer>
  );
};

export default CreateProduct;
const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container:{paddingHorizontal: 5, flex: 1},
  loader:{width: deviceWidth}
});
