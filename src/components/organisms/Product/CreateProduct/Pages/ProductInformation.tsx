import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import {
  AddIconSet,
  Button,
  CustomFormInput,
  DropDown,
  Layer,
  Scrollable,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {model} from '~/data/model';
import {useGetProductCategories} from '../../hook';

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.string().required('Required'),
  brandName: yup.string().required('Required'),
});

const SubcategoryAndTagsConfig = model?.metaData?.configs?.subcategoryAndTags;
const ProductConfig = model?.metaData?.configs?.product;

const ProductInformation = ({productData, setProductData}) => {
  const {navigateWithName} = useNavigate();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      title: productData?.title,
      description: productData?.description,
      price: productData?.price || "",
      brandName: productData?.brandName,
      legalDisclaimer: productData?.legalDisclaimer,
      handlingPrice: productData?.handlingPrice,
    },
  });

  const {handleSubmit, register, setValue} = methods;

  const {data: categoryData}: any = useGetProductCategories({
    key: 'productCategories',
  });
  const {data: subCategoryData}: any = useGetProductCategories({
    key: `Product${category || productData?.category}SubCategory`,
  });

  const categories = categoryData?.staticConfig_getStaticConfig?.result?.value
    ? JSON?.parse(categoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const subCategories = subCategoryData?.staticConfig_getStaticConfig?.result
    ?.value
    ? JSON?.parse(subCategoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  }, [categories]);

  const subCategoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < subCategories.length; i++) {
      Data.push({
        value: subCategories[i]?.title,
        label: subCategories[i]?.title,
      });
    }
    return Data;
  }, [subCategories]);

  const tagsBuilder = useMemo(() => {
    let Data = [];
    const tags = subCategories.filter(item => item?.title === subcategory)?.[0]
      ?.tags;
    for (let i = 0; i < tags?.length; i++) {
      Data.push({
        value: tags[i],
        label: tags[i],
      });
    }
    return Data;
  }, [subcategory]);

  return (
    <Scrollable
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      <FormProvider {...methods}>
        <Typography style={styles.titleText}>Product Information</Typography>
        <Layer style={styles.addContainer}>
          <Layer style={styles.dropDownContainer}>
            <DropDown
              name={'category'}
              required
              data={categoryCreator}
              defaultValue={productData?.category}
              onChangeValue={text => [setCategory(text),setSubcategory(""), setValue("subcategory","")]}
              label={'Category'}
            />
          </Layer>
          <TouchableOpacity
            style={styles.addIconText}
            onPress={() => navigateWithName('add category')}>
            <AddIconSet color={'primary.500'} />
          </TouchableOpacity>
        </Layer>
        {SubcategoryAndTagsConfig?.subCategories !== false && (
          <Layer style={styles.addContainer}>
            <Layer style={styles.dropDownContainer}>
              <DropDown
                name={'subcategory'}
                required
                defaultValue={category ? subcategory : productData?.subcategory}
                data={subCategoryCreator}
                onChangeValue={text => setSubcategory(text)}
                label={'Sub Category'}
              />
            </Layer>
            <TouchableOpacity
              style={styles.addIconText}
              onPress={() =>
                navigateWithName('addsubcategory', {
                  category: category,
                })
              }>
              <AddIconSet color={'primary.500'} />
            </TouchableOpacity>
          </Layer>
        )}
        {SubcategoryAndTagsConfig?.tags !== false && (
          <DropDown
            name={'tag'}
            data={tagsBuilder}
            defaultValue={productData?.tag}
            label={'Choose Tag'}
          />
        )}
        <CustomFormInput
          {...register('title')}
          placeholder="Input Text Here"
          required
          label="Product Name"
        />
        <CustomFormInput
          {...register('price')}
          placeholder="Input Text Here"
          required
          label="Price($)"
        />
        <CustomFormInput
          {...register('description')}
          placeholder="Input Text Here"
          required
          maxLength={300}
          showCharCounter
          textArea
          label="Description"
        />
        <CustomFormInput
          {...register('brandName')}
          placeholder="Input Text Here"
          required
          label="Brand Name"
        />
        {ProductConfig?.secondHand !== false && (
          <DropDown
            data={[
              {value: 'BRAND_NEW', label: 'Brand New'},
              {value: 'SECOND_HAND', label: 'Second Hand'},
            ]}
            required
            style={{zIndex: 3}}
            label={'Condition'}
            defaultValue={productData?.condition}
            name="condition"
          />
        )}
        <CustomFormInput
          {...register('legalDisclaimer')}
          placeholder="Ex: over 15, only adults, etc"
          label="Legal Disclaimer"
        />
        <CustomFormInput
          {...register('handlingPrice')}
          placeholder="0%"
          keyboardType="number-pad"
          label="Handling Price"
        />
      </FormProvider>
      <Button style={styles.nextButton} onPress={handleSubmit(setProductData)}>
        Next
      </Button>
    </Scrollable>
  );
};

export default ProductInformation;

const styles = StyleSheet.create({
  contentContainer: {paddingBottom: 10},
  container: {position: 'relative', margin: 0, flex: 1},
  titleText: {fontSize: 16, fontWeight: '600'},
  addContainer: {flexDirection: 'row'},
  dropDownContainer: {flex: 1},
  addIconText: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    marginLeft: 10,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  nextButton:{marginTop: 60}
});
