import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ContentList from '../ContentList';
import {FlatList, Typography, getColor} from '~/components/elemental';
import {model} from '~/data/model';
import {TouchableOpacity} from 'react-native';
import useIterestStore from '~/stores/interestStore';

const ContentHome = () => {
  const {selectedCategorys} = useIterestStore()
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

  const contentHeaderComponent = () => {
    return (
      <>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: '700',
            marginVertical: 8,
          }}>
          For You
        </Typography>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={selectedCategorys || model?.constants?.contentCategories}
          ListHeaderComponent={() => renderItem({item: 'All'})}
          renderItem={renderItem}
        />
      </>
    );
  };
  return (
    <View>
      <ContentList
        isSeller={false}
        headerComponent={contentHeaderComponent}
        category={category}
      />
    </View>
  );
};

export default ContentHome;

const styles = StyleSheet.create({});
