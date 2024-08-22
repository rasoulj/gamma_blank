import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {
  AddIconSet,
  CloseIconSet,
  DropDown,
  FlatList,
  Image,
  Layer,
  LoadIndicator,
  Typography,
  deviceWidth,
  getColor,
  useRoute,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import EducatorAddSubCategory from '../../Educator/EducatorAddSubCategory';
import {
  useCreateStaticConfig,
  useGetProductCategories,
  useUpdateStaticConfig,
} from '../hook';
import AddSubCategoryModal from './Modals/AddSubCategoryModal';

const schema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.string().required('Required'),
  brandName: yup.string().required('Required'),
});

const AddSubCategory = () => {
  const queryClinet = useQueryClient();

  const route: any = useRoute();

  const user = useAuthStore(state => state?.user);

  const {} = useHeader({
    title: {
      children: 'Add Sub Category',
      fontWeight: 'bold',
    },
  });

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const [isAddSubCategoryModalVisible, setIsAddSubCategoryModalVisible] =
    useState(false);
  const [category, setCategory] = useState(route?.params?.category || '');

  const {
    data: SubCategoryData,
    isLoading: isLoadingGetSubCategory,
    refetch,
  }: any = useGetProductCategories({
    key: `Product${category}SubCategory`,
  });

  const {data, isLoading: isLoadingGetCategory}: any = useGetProductCategories({
    key: 'productCategories',
  });

  const subCategories = useMemo(() => {
    return SubCategoryData?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(
          SubCategoryData?.staticConfig_getStaticConfig?.result?.value,
        )
      : [];
  }, [SubCategoryData]);

  const categories = data?.staticConfig_getStaticConfig?.result?.value
    ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const categoryCreator = useMemo(() => {
    let Data = [];
    for (let i = 0; i < categories.length; i++) {
      Data.push({value: categories[i], label: categories[i]});
    }
    return Data;
  }, [categories]);

  const {
    data: dataUserCategory,
    isLoading: isLoadingGetProductUser,
    refetch: refetchUserCategory,
  }: any = useGetProductCategories({
    key: `productCategories-${user?.id}`,
  });

  const UserCategories = useMemo(() => {
    return dataUserCategory?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(
          dataUserCategory?.staticConfig_getStaticConfig?.result?.value,
        )
      : [];
  }, [dataUserCategory]);

  const isStaticConfigExist = data?.staticConfig_getStaticConfig?.result?.value;

  const {mutate, isLoading} = !isStaticConfigExist
    ? useCreateStaticConfig()
    : useUpdateStaticConfig();

  const removeCategoryHandler = title => {
    const subCategoryList = subCategories?.filter(
      item => item?.title !== title,
    );
    const input = {
      key: `Product${category}SubCategory`,
      value: JSON.stringify(subCategoryList),
    };
    mutate(
      {input},
      {
        onSuccess() {
          queryClinet.invalidateQueries(`Product${category}SubCategory`);
          refetch();
        },
      },
    );
  };
  const renderItem = item => {
    return (
      <Layer style={subCategoryItemStyles.layer}>
        <Image
          source={{uri: item?.imageUrl}}
          style={subCategoryItemStyles.image}>
            <TouchableOpacity
              style={subCategoryItemStyles.closeIconContainer}
              onPress={() => removeCategoryHandler(item?.title)}>
              <CloseIconSet width={16} color={'error.500'} />
            </TouchableOpacity>
        </Image>
        <Typography
          numberOfLines={1}
          style={subCategoryItemStyles.renderItemTitle}>
          {item?.title}
        </Typography>
      </Layer>
    );
  };

  const ListFooterComponent = () => {
    return (
      <Layer style={styles.addIconContainer}>
        <TouchableOpacity
          style={styles.addTochable}
          onPress={() => setIsAddSubCategoryModalVisible(true)}>
          <AddIconSet color={'primary.500'} />
        </TouchableOpacity>
      </Layer>
    );
  };
  return isElementInModel('EducationHome') ? (
    <EducatorAddSubCategory />
  ) : (
    <View style={styles.container}>
      {(isLoadingGetCategory || isLoadingGetSubCategory || isLoading) && (
        <LoadIndicator />
      )}
      <FormProvider {...methods}>
        <DropDown
          name={'category'}
          data={categoryCreator}
          defaultValue={category}
          onChangeValue={text => setCategory(text)}
          label={'Category'}
        />
      </FormProvider>
      <FlatList
        numColumns={3}
        columnWrapperStyle={styles.mt}
        contentContainerStyle={styles.mt2}
        data={[...subCategories, {}]}
        renderItem={({item, index}) => {
          if (index === subCategories?.length) {
            return category ?
               ListFooterComponent()
              : null;
          }
          return renderItem(item);
        }}
      />

      <AddSubCategoryModal
        category={category}
        subCategories={subCategories}
        isVisible={isAddSubCategoryModalVisible}
        onClose={() => [setIsAddSubCategoryModalVisible(false), refetch()]}
      />
    </View>
  );
};

export default AddSubCategory;

const styles = StyleSheet.create({
  container: {flexGrow: 1},

  btn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconContainer: {
    width: (deviceWidth - 45) / 3,
    height: (deviceWidth - 45) / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTochable: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mt: {marginTop: 3},

  mt2: {marginTop: 10},
});

export const subCategoryItemStyles = StyleSheet.create({
  layer: {
    width: (deviceWidth - 45) / 3,
    marginRight: 2,
  },

  image: {
    width: (deviceWidth - 45) / 3,
    height: (deviceWidth - 45) / 3,
    backgroundColor: getColor({color: 'gray.800'}),
  },

  closeIconContainer: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 100,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  renderItemTitle: {
    textAlign: 'center',
    margin: 4,
    fontSize: 16,
    fontWeight: '600',
  },
});
