import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography, deviceWidth, useNavigate} from '~/components/elemental';
import ProductListItem from '../ProductList/ProductListItem';
import {useGetProducts} from '../hook';

const ProductHomeCategory = ({item}) => {
  const {navigateWithName} = useNavigate();
  const {data} = useGetProducts({
    where: {
      product: {
        ...(item && {
          category: {
            in: item,
          },
        }),
        productType: {
          eq: null,
        },
      },
    },
    order: {
      product: {
        createdDate: 'DESC',
      },
    },
  });

  const renderProductListItem = ({item}) => (
    <View key={item?.product?.id} style={styles.productListItemContainer}>
      <ProductListItem item={item} size="s" />
    </View>
  );

  return (
    data?.pages?.length > 0 && (
      <>
        <View style={styles.container}>
          {data?.pages?.length > 0 && (
            <Typography style={styles.text}>
              {typeof item === 'string' ? item : 'For You'}
            </Typography>
          )}
          <TouchableOpacity
            onPress={() => navigateWithName('ProductCategor', {item})}>
            <Typography style={styles.seeAllText}>
              {data?.pages?.length > 3 && 'See all'}
            </Typography>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `key${index}`}
          data={data?.pages}
          renderItem={renderProductListItem}
          ListHeaderComponent={<View style={styles.space} />}
          ListFooterComponent={<View style={styles.space} />}
        />
      </>
    )
  );
};

export default ProductHomeCategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'secondary.500',
  },
  productListItemContainer: {
    width: deviceWidth / 2 - 65,
    marginRight: 8,
  },
  space: {
    width: 10,
  },
});
