import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import Typography from '../Typography';

const Tags = ({
  tags,
  setSelectedTags,
  selectedTags,
  hasAll,
}: {
  tags: Array<any>;
  setSelectedTags: (item) => void;
  selectedTags: string;
  hasAll?: boolean;
}) => {

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item === 'All' ? setSelectedTags('All') : setSelectedTags(item)
        }
        style={{
          marginVertical: 8,
          paddingVertical: 7,
          paddingHorizontal: 16,
          borderRadius: 10,
          borderColor: getColor({color: 'primary.500'}),
          borderWidth: 2,
          marginRight: 8,
          backgroundColor:
            selectedTags === item
              ? getColor({color: 'primary.500'})
              : getColor({color: 'background.500'}),
        }}>
        <Typography
          color={
            selectedTags === item
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
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tags}
        ListHeaderComponent={() => (hasAll ? renderItem({item: 'All'}) : <></>)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({});
