import {yupResolver} from '@hookform/resolvers/yup';
import React, {Fragment, memo, useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import CustomPicker from '~/components/atoms/CustomPicker';
import {
  AddIconSet,
  Button,
  CloseIconSet,
  CustomFormInput,
  HStack,
  Input,
  Layer,
  RadioButton,
  SelectImage,
  Typography,
  View,
  getColor,
  scale,
  useNavigate,
} from '~/components/elemental';
import {useGetCategories} from '~/components/molecules/ItemSearch/hook';

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  category: yup.string().required('Required'),
  photoUrl: yup.string().required('Required'),
  subcategory: yup.string().required('Required'),
  paymentTopicConfiguration: yup.string(),
  price: yup.number(),
  keywords: yup.array(),
  level: yup.string().required('Required'),
});

const levelData = [
  {label: 'Beginner', value: 'BEGINNER'},
  {label: 'Intermediate', value: 'INTERMEDIATE'},
  {label: 'Advanced', value: 'ADVANCED'},
];

const paymentData = [
  {label: 'No free Topics', value: 'NO_FREE_TOPICS'},
  {label: 'The first Topic is free', value: 'FIRST_TOPIC_IS_FREE'},
  {label: 'First 2 Topics are free', value: 'FIRST2_TOPICS_ARE_FREE'},
  {label: 'First 3 Topics are free', value: 'FIRST3_TOPICS_ARE_FREE'},
  {label: 'First 4 Topics are free', value: 'FIRST4_TOPICS_ARE_FREE'},
];

const CourseInformation = ({productData, setProductData}) => {
  const {navigateWithName} = useNavigate();
  const [text, setText] = useState('');
  const [isFree, setIsFree] = useState(productData?.price === 0 ? true : false);
  const [keywords, setKeywords] = useState(productData?.keywords ?? []);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      title: productData?.title,
      description: productData?.description,
      category: productData?.category,
      photoUrl: productData?.photoUrl,
      subcategory: productData?.subcategory,
      paymentTopicConfiguration: productData?.paymentTopicConfiguration,
      price: productData?.price,
      level: productData?.level,
    },
  });

  const {handleSubmit, register, watch, setValue, reset} = methods;

  const {data: categoryData}: any = useGetCategories({
    key: 'educationCategories',
  });

  const categories = categoryData?.staticConfig_getStaticConfig?.result?.value
    ? JSON?.parse(categoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const subCategories = watch('category')
    ? categories?.find(item => item?.name === watch('category'))
    : [];

  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({
        value: categories[i]?.name ?? categories[i],
        label: categories[i]?.name ?? categories[i],
      });
    }
    return Data;
  }, [categories]);

  const subCategoryCreator = useMemo(() => {
    let Data = [];

    for (let i = 0; i < subCategories?.subCategories?.length; i++) {
      Data.push({
        value: subCategories?.subCategories[i],
        label: subCategories?.subCategories[i],
      });
    }
    return Data;
  }, [subCategories]);

  const removeKetword = t => {
    setKeywords([...keywords.filter(item => item !== t)]);
    setValue('keywords', [...keywords.filter(item => item !== t)]);
  };

  const addKeyword = () => {
    setKeywords([...keywords, text]);
    setValue('keywords', [...keywords, text]);
    setText('');
  };
  return (
    <CustomKeyboardAwareScrollView
      contentContainerStyle={styles.mb}
      showsVerticalScrollIndicator={false}>
      <FormProvider {...methods}>
        <Typography style={styles.info}>Course Information</Typography>
        <Typography style={styles.cover}>
          Cover Photo
          <Typography color={'error.500'} fontSize="lg" fontWeight={'500'}>
            {'*'}
          </Typography>
        </Typography>
        <SelectImage
          title={'Choose Photo'}
          type="simple"
          {...register('photoUrl')}
          hasPlusIcon={true}
        />
        <CustomFormInput
          {...register('title')}
          placeholder="Ex: Human Centered Design"
          required
          label="Course Title"
        />

        <Layer style={styles.rowView}>
          <Layer style={styles.flex}>
            <CustomPicker
              placeholder="Choose"
              name={'category'}
              title={'Category'}
              data={categoryCreator}
              required
              width="89%"
              left="1%"
              titleKey="label"
              onChangeValue={(value: string) => {
                setValue('category', value);
              }}
            />
          </Layer>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => navigateWithName('add category')}>
            <AddIconSet color={'primary.500'} />
          </TouchableOpacity>
        </Layer>

        <Layer style={styles.rowView}>
          <Layer style={styles.flex}>
            <CustomPicker
              placeholder="Choose"
              name={'subcategory'}
              title={'Sub Category'}
              data={subCategoryCreator}
              required
              width="89%"
              left="1%"
              titleKey="label"
              onChangeValue={(value: string) => {
                setValue('subcategory', value);
              }}
            />
          </Layer>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => navigateWithName('AddSubCategory')}>
            <AddIconSet color={'primary.500'} />
          </TouchableOpacity>
        </Layer>

        <CustomPicker
          placeholder="Choose"
          name={'level'}
          title={'Level'}
          data={levelData}
          required
          width="89%"
          left="1%"
          titleKey="label"
          onChangeValue={(value: string) => {
            setValue('level', value);
          }}
        />
        <CustomFormInput
          {...register('description')}
          placeholder="Write something about your course..."
          required
          textArea
          showCharCounter
          maxLength={300}
          label="About this Course"
        />
        <Typography
          fontSize="md"
          fontWeight={'500'}
          color={'gray.800'}
          mb={'1'}
          mt={'4'}>
          Keywords
        </Typography>
        <Input
          value={text}
          placeholder="Ex: #Design"
          onChangeText={t => setText(t.startsWith('#') ? t : '#'.concat(t))}
          returnKeyType="done"
          onSubmitEditing={() => addKeyword()}
        />
        <View style={styles.wrapView}>
          {keywords?.map((item: any) => {
            return (
              <TouchableOpacity key={item?.id} style={styles.keywordContainer}>
                <CloseIconSet onPress={() => removeKetword(item)} />
                <Typography numberOfLines={1}>{item}</Typography>
              </TouchableOpacity>
            );
          })}
        </View>
        <HStack space={'20'} mt="5">
          <RadioButton
            label="All Free"
            checked={isFree}
            onPress={() => {
              setIsFree(true);
              setValue('price', 0);
              setValue('paymentTopicConfiguration', 'NO_FREE_TOPICS');
            }}
          />
          <RadioButton
            label="Paid"
            checked={!isFree}
            onPress={() => setIsFree(false)}
          />
        </HStack>
        {!isFree && (
          <Fragment>
            <CustomFormInput
              {...register('price')}
              placeholder="$0"
              required
              label="Price($)"
              keyboardType="decimal-pad"
            />
            <CustomPicker
              placeholder="Choose"
              name={'paymentTopicConfiguration'}
              title={'Payment Topic Configuration'}
              data={paymentData}
              required
              width="89%"
              left="1%"
              titleKey="label"
              onChangeValue={(value: string) => {
                setValue('paymentTopicConfiguration', value);
              }}
            />
          </Fragment>
        )}
      </FormProvider>
      <Button style={styles.mt} onPress={handleSubmit(setProductData)}>
        Next
      </Button>
    </CustomKeyboardAwareScrollView>
  );
};

export default memo(CourseInformation);

const styles = StyleSheet.create({
  mt: {marginTop: 60},

  plusBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    marginLeft: 10,
    alignSelf: 'flex-end',
  },

  info: {fontSize: 16, fontWeight: '600', marginBottom: 16},

  mb: {paddingBottom: 30},

  keywordContainer: {
    flexDirection: 'row',
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
  },

  wrapView: {flexDirection: 'row', flexWrap: 'wrap'},

  flex: {flex: 1},

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cover: {
    fontSize: scale(14),
    marginBottom: 4,
    fontWeight: '500',
  },
});
