import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SwipeList from '../../molecules/SwipeList';
import Typography from '../../atoms/Typography';
import ProductList from '../Product/ProductList';
import {FlatList} from 'native-base';
import Layer from '../../atoms/Layer';
import {getColor} from '../../elemental/helper';
import {model} from '~/data/model';
import {useNavigate} from '~/components/elemental';

const EcommerceHome = ({data}) => {
  const {navigateWithName} = useNavigate();
  const [category, setCategory] = useState('');
  const selected = category === '' ? 'All' : category;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => (item === 'All' ? setCategory('') : setCategory(item))}
        style={{
          marginVertical: 8,
          paddingVertical: 7,
          paddingHorizontal: 16,
          borderRadius: 10,
          borderColor: getColor({color: 'primary.500'}),
          borderWidth: 2,
          marginRight: 8,
          backgroundColor:
            selected === item
              ? getColor({color: 'primary.500'})
              : getColor({color: 'background.500'}),
        }}>
        <Typography
          color={
            selected === item
              ? getColor({color: 'background.500'})
              : getColor({color: 'primary.500'})
          }
          style={{
            fontSize: 14,
            fontWeight: '700',
          }}>
          {item}
        </Typography>
      </TouchableOpacity>
    );
  };

  const productHeaderComponent = () => {
    return (
      <>
        {data && (
          <View style={{marginBottom: 32}}>
            <Typography
              style={{fontSize: 16, fontWeight: '700', marginVertical: 8}}>
              Promotions
            </Typography>
            <SwipeList data={data} variant="medium" />
          </View>
        )}
        <TouchableOpacity onPress={() => navigateWithName('product list')}>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: '700',
              marginVertical: 8,
            }}>
            Products
          </Typography>
        </TouchableOpacity>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={model?.constants?.productCategories}
          ListHeaderComponent={() => renderItem({item: 'All'})}
          renderItem={renderItem}
        />
      </>
    );
  };
  return (
    <View>
      <ProductList
        headerComponent={productHeaderComponent}
        category={category}
      />
    </View>
  );
};

export default EcommerceHome;

const styles = StyleSheet.create({});
