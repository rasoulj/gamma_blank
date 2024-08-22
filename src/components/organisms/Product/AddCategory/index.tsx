import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  CloseIconSet,
  Input,
  LoadIndicator,
  Typography,
  getColor,
  useNavigate,
  useToast,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import {
  useCreateStaticConfig,
  useGetProductCategories,
  useUpdateStaticConfig,
} from '../hook';
import {isElementInModel} from '~/utils/helper/isElementsInModel';

const AddCategory = () => {
  const user = useAuthStore(state => state?.user);

  const {toast} = useToast();

  const {} = useHeader({
    title: {
      children: 'Add Category',
      fontWeight: 'bold',
    },
  });

  const [tags, setTags] = useState([]);
  const {navigation} = useNavigate();
  const queryClinet = useQueryClient();
  const [text, setText] = useState('');

  const {
    data,
    isLoading: isLoadingGetProduct,
    refetch,
  }: any = useGetProductCategories({
    key: isElementInModel('EducationHome')
      ? 'educationCategories'
      : 'productCategories',
  });

  const {
    data: dataUserCategory,
    isLoading: isLoadingGetProductUser,
    refetch: refetchUserCategory,
  }: any = useGetProductCategories({
    key: isElementInModel('EducationHome')
      ? `educationCategories-${user?.id}`
      : `productCategories-${user?.id}`,
  });

  const categories = useMemo(() => {
    return data?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
      : [];
  }, [data]);

  const UserCategories = useMemo(() => {
    return dataUserCategory?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(
          dataUserCategory?.staticConfig_getStaticConfig?.result?.value,
        )
      : [];
  }, [dataUserCategory]);

  useEffect(() => {
    if (data) {
      setTags(categories);
    }
  }, [data]);

  const {mutate: mutateUpdate, isLoading: isLoadingUpdate} =
    useUpdateStaticConfig();
  const {mutate: mutateCreate, isLoading: isLoadingCreate} =
    useCreateStaticConfig();

  const addCategoryHandler = ({
    type,
    t,
  }: {
    type: 'Add' | 'Remove';
    t: string;
  }) => {
    let found = false;

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].name) {
        if (tags[i].name.toLowerCase() === t.toLowerCase()) {
          found = true;
          break;
        }
      } else {
        if (tags[i]?.toLowerCase() === t.toLowerCase()) {
          found = true;
          break;
        }
      }
    }

    if (found && type === 'Add') {
      toast({message: 'Category with this name is available', type: 'error'});
      return;
    } else {
      const tagList =
        type === 'Add'
          ? [...tags, text].filter(i => i !== '')
          : [
              ...tags.filter(item =>
                item?.name ? item?.name !== t : item !== t,
              ),
            ];

      const tagListUser =
        type === 'Add'
          ? [...UserCategories, text].filter(i => i !== '')
          : [
              ...UserCategories.filter(item =>
                item?.name ? item?.name !== t : item !== t,
              ),
            ];

      const input = {
        key: isElementInModel('EducationHome')
          ? 'educationCategories'
          : 'productCategories',
        value: JSON.stringify(tagList),
      };
      const inputUserCategory = {
        key: isElementInModel('EducationHome')
          ? `educationCategories-${user?.id}`
          : `productCategories-${user?.id}`,
        value: JSON.stringify(tagListUser),
      };

      const updateQuerysForAllCategories = () => {
        if (
          data?.staticConfig_getStaticConfig?.result?.value !==
          undefined
        ) {
          mutateUpdate(
            {input},
            {
              onSuccess(s) {
                updateQuerysForUserCategories();
              },
            },
          );
        } else {
          mutateCreate(
            {input},
            {
              onSuccess(s) {
                updateQuerysForUserCategories();
              },
            },
          );
        }
        queryClinet.invalidateQueries([`productCategories-${user?.id}`]);
        queryClinet.invalidateQueries([`educationCategories-${user?.id}`]);
        queryClinet.invalidateQueries(['getCategories']);
        refetchUserCategory();
      };
      const updateQuerysForUserCategories = () => {
        setTags(tagList);
        setText('');
        queryClinet.refetchQueries(['productCategories']);
        queryClinet.invalidateQueries(['educationCategories']);
        queryClinet.invalidateQueries(['getCategories']);
        refetch();
      };

      if (dataUserCategory?.staticConfig_getStaticConfig?.result?.value !== undefined) {
        mutateUpdate(
          {input: inputUserCategory},
          {
            onSuccess(d) {
              updateQuerysForAllCategories();
            },
          },
        );
      } else {
        mutateCreate(
          {input: inputUserCategory},
          {
            onSuccess(d) {
              updateQuerysForAllCategories();
            },
          },
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoadingGetProduct && <LoadIndicator />}
      <Typography style={styles.title}>Category</Typography>
      <Input
        value={text}
        placeholder="Input Text Here"
        onChangeText={setText}
        returnKeyType="done"
        onSubmitEditing={() => addCategoryHandler({type: 'Add', t: text})}
        rightElement={
          (isLoadingUpdate || isLoadingCreate || isLoadingGetProductUser) && (
            <ActivityIndicator style={styles.mr} size={'small'} />
          )
        }
      />

      <View style={styles.rowView}>
        {tags?.map((item: any) => {
          const categoryNames = UserCategories.map(
            category => category?.name ?? category,
          );
          return (
            <TouchableOpacity key={item?.id} style={styles.closeIconContainer}>
              {(categoryNames?.includes(item?.name ?? item) ||
                user?.userType === 'OWNER') && (
                <CloseIconSet
                  onPress={() =>
                    addCategoryHandler({type: 'Remove', t: item?.name ?? item})
                  }
                />
              )}
              <Typography numberOfLines={1}>{item?.name ?? item}</Typography>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button style={styles.saveButton} onPress={() => navigation.goBack()}>
        Save
      </Button>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  closeIconContainer: {
    flexDirection: 'row',
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
  },

  saveButton: {width: '100%', position: 'absolute', bottom: 10},

  title: {marginVertical: 8, fontSize: 16, fontWeight: '500'},

  rowView: {flexDirection: 'row', flexWrap: 'wrap'},

  mr: {marginRight: 10},

  container: {flexGrow: 1},
});
