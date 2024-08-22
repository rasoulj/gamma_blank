import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductList from '../ProductList';
import ProductListSubCategory from './ProductListSubCategory';
import {useRoute} from '@react-navigation/native';

const ProductCategory = () => {
  const route: any = useRoute();

  const headerComponent = () => {
    return <ProductListSubCategory category={route?.params?.item}/>;
  };
  return (
    <>
      <ProductList
        headerComponent={headerComponent}
        category={route?.params?.item}
      />
    </>
  );
};

export default ProductCategory 

const styles = StyleSheet.create({});
