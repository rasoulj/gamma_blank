import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Button,
  CloseIconSet,
  Input,
  Typography,
  getColor,
  useNavigate,
  useToast,
} from '~/components';
import * as yup from 'yup';
import {useQueryClient} from 'react-query';
import {yupResolver} from '@hookform/resolvers/yup';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetCategories} from '~/components/molecules/ItemSearch/hook';
import {
  useCreateStaticConfig,
  useGetProductCategories,
  useUpdateStaticConfig,
} from '../../Product/hook';
import {FormProvider, useForm} from 'react-hook-form';
import CustomPicker from '~/components/atoms/CustomPicker';
import useAuthStore from '~/stores/authStore';

const schema = yup.object().shape({
  category: yup.string().required('Required'),
  subcategory: yup.string().required('Required'),
});

const EducatorAddSubCategory = () => {
  const {} = useHeader({
    title: {
      children: 'Add Sub Category',
      fontWeight: 'bold',
    },
  });

  const user = useAuthStore(state => state?.user);

  const {navigation} = useNavigate();
  const {toast} = useToast();
  const queryClinet = useQueryClient();
  const [text, setText] = useState('');

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {watch} = methods;

  const {data, refetch}: any = useGetCategories({
    key: 'educationCategories',
  });
  const {data: dataUserCategory, refetch: refetchUserCategory}: any =
    useGetProductCategories({
      key: `educationCategories-${user?.id}`,
    });

  const categories = data?.staticConfig_getStaticConfig?.result?.value
    ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
    : [];

  const userCategories = useMemo(() => {
    return dataUserCategory?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(
          dataUserCategory?.staticConfig_getStaticConfig?.result?.value,
        )
      : [];
  }, [dataUserCategory]);

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

  const subCategories = watch('category')
    ? categories?.find(
        item => item?.name === watch('category') || item === watch('category'),
      )
    : [];

  const subCategoriesUser = watch('category')
    ? userCategories?.find(
        item => item?.name === watch('category') || item === watch('category'),
      )
    : [];

  const subCategoryCreator = useMemo(() => {
    return subCategories?.subCategories ?? [];
  }, [subCategories]);

  const subCategoryUser = useMemo(() => {
    return subCategoriesUser?.subCategories ?? [];
  }, [subCategoriesUser]);

  const isCategoryExist =
    dataUserCategory?.staticConfig_getStaticConfig?.result?.value &&
    data?.staticConfig_getStaticConfig?.result?.value;

  const {mutate, isLoading} = !isCategoryExist
    ? useCreateStaticConfig()
    : useUpdateStaticConfig();

  const transformedArray = useMemo(() => {
    return categories?.map(item => {
      return {
        name: item?.name ?? item,
        subCategories: item?.subCategories ?? [],
      };
    });
  }, [categories]);

  const transformedArrayUser = useMemo(() => {
    return userCategories?.map(item => {
      return {
        name: item?.name ?? item,
        subCategories: item?.subCategories ?? [],
      };
    });
  }, [userCategories]);

  const addCategoryHandler = ({
    type,
    t,
  }: {
    type: 'Add' | 'Remove';
    t: string;
  }) => {
    let found = false;

    const categoryIndex = categories.findIndex(
      item => item?.name === watch('category') || item === watch('category'),
    );

    const categoryInUserIndex = userCategories.findIndex(
      item => item?.name === watch('category') || item === watch('category'),
    );

    for (let i = 0; i < transformedArray.length; i++) {
      if (
        transformedArray[categoryIndex].subCategories[i]?.toLowerCase() ===
        t.toLowerCase()
      ) {
        found = true;
        break;
      }
    }

    if (found && type === 'Add') {
      toast({
        message: 'SubCategory with this name is available',
        type: 'error',
      });
      return;
    } else {
      if (categoryIndex !== -1) {
        if (type === 'Add') {
          transformedArray[categoryIndex]?.subCategories.push(t);
        } else {
          transformedArray[categoryIndex].subCategories = transformedArray[
            categoryIndex
          ]?.subCategories.filter(subCat => subCat !== t);
        }
      }

      if (categoryInUserIndex !== -1) {
        if (type === 'Add') {
          transformedArrayUser[categoryInUserIndex].subCategories.push(t);
        } else if (type === 'Remove') {
          transformedArrayUser[categoryInUserIndex].subCategories =
            transformedArrayUser[categoryInUserIndex]?.subCategories.filter(
              subCat => subCat !== t,
            );
        }
      } else if (type === 'Add') {
        transformedArrayUser.push({
          name: watch('category'),
          subCategories: [t],
        });
      }

      const input = {
        key: 'educationCategories',
        value: JSON.stringify(transformedArray),
      };

      const inputUserCategory = {
        key: `educationCategories-${user?.id}`,
        value: JSON.stringify(transformedArrayUser),
      };

      mutate(
        {input: inputUserCategory},
        {
          onSuccess(d) {
            queryClinet.invalidateQueries([`educationCategories-${user?.id}`]);
            queryClinet.invalidateQueries(['getCategories']);

            refetchUserCategory();
            mutate(
              {input},
              {
                onSuccess() {
                  refetch();
                  queryClinet.invalidateQueries(['getCategories']);
                  setText('');
                },
              },
            );
          },
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <CustomPicker
          placeholder="Choose"
          name={'category'}
          title={'Category'}
          data={categoryCreator}
          width="89%"
          left="1%"
          titleKey="label"
          onChangeValue={(value: string) => {
            () => addCategoryHandler({type: 'Add', t: text});
          }}
        />

        <Typography
          fontSize="md"
          fontWeight={'500'}
          color={'gray.800'}
          mb={'1'}
          mt={'4'}>
          Sub Category
        </Typography>
        <Input
          value={text}
          placeholder="Ex: #Design"
          onChangeText={setText}
          returnKeyType="done"
          onSubmitEditing={() => addCategoryHandler({type: 'Add', t: text})}
        />

        <View style={styles.wrapView}>
          {subCategoryCreator?.map((item: any, index) => {
            const categoryNames = subCategoryUser.map(category => category);

            return (
              <TouchableOpacity
                key={item?.id ?? index}
                style={styles.tagContainer}>
                {categoryNames?.includes(item) && (
                  <CloseIconSet
                    onPress={() =>
                      addCategoryHandler({type: 'Remove', t: item})
                    }
                  />
                )}
                <Typography numberOfLines={1}>{item}</Typography>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          style={styles.footer}
          onPress={() => navigation.goBack()}
          isLoading={isLoading}>
          Save
        </Button>
      </FormProvider>
    </View>
  );
};

export default EducatorAddSubCategory;

const styles = StyleSheet.create({
  footer: {width: '100%', position: 'absolute', bottom: 10},

  tagContainer: {
    flexDirection: 'row',
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
  },

  container: {flexGrow: 1},

  wrapView: {flexDirection: 'row', flexWrap: 'wrap'},
});
