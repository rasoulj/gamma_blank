import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Tags from '~/components/atoms/Tags';
import {Image, Typography, getColor} from '~/components/elemental';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
import {useGetProductCategories} from '../hook';

const ProductListSubCategory = ({category}) => {
  const [subCategory, setSubCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState('All');
  const filters = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  useLayoutEffect(() => {
    return () => {
      setFilters({});
    };
  }, []);

  const {data: subCategoryData}:any = useGetProductCategories({
    key: `Product${category}SubCategory`,
  });

  const subCategories = subCategoryData?.staticConfig_getStaticConfig?.result
    ?.value
    ? JSON?.parse(subCategoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];

  useEffect(() => {
    if (subCategories?.[0]?.title) {
      setSubCategory(subCategories?.[0]);
      setFilters({subcategory: subCategories?.[0]?.title});
    }
  }, [subCategoryData]);

  const renderSubCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.subCategoryItem,
          borderColor:
            subCategory?.title === item?.title
              ? getColor({color: 'primary.500'})
              : getColor({color: 'background.500'}),
        }}
        onPress={() => [
          setSubCategory(item),
          setFilters({subcategory: item?.title}),
        ]}>
        <Image source={{uri: item?.imageUrl}} style={styles.subCategoryImage} />
        <Typography style={styles.subCategoryTitle}>{item?.title}</Typography>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {subCategories?.length > 0 && (
        <>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={subCategories}
            renderItem={renderSubCategoryItem}
          />
          {subCategory?.tags?.filter(i => i !== '').length > 0 && (
            <Tags
              tags={['All', ...subCategory?.tags.filter(i => i !== '')]}
              selectedTags={selectedTags}
              setSelectedTags={tag => [
                setSelectedTags(tag),
                setFilters(
                  tag === 'All' ? {...filters, tag: null} : {...filters, tag},
                ),
              ]}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ProductListSubCategory;

const styles = StyleSheet.create({
  subCategoryItem: {
    width: 140,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: getColor({color: 'black'}),
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 15,
    padding: 8,
    borderWidth: 1,
  },
  subCategoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    margin: 8,
  },
});
