import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from '../../atoms/Typography';
import {Layer, getColor} from '../../elemental';
import Image from '../../atoms/Image';

const CategoryTypeTwoItem = ({
  item,
  selecetedItems,
  setSelectedItems,
  onPress,
}: {
  item: any;
  selecetedItems: any;
  setSelectedItems: (item: any) => void;
  onPress?: (item: any) => void;
}) => {
  const onPressItem = (id: any) => {
    if (selecetedItems?.includes(id)) {
      setSelectedItems(selecetedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selecetedItems, id]);
    }
    onPress?.(item);
  };
  return (
    <TouchableOpacity
      onPress={() => onPressItem(item.id ?? item?.name)}
      style={[
        styles.container,
        {
          borderColor: selecetedItems?.includes(item.id ?? item?.name)
            ? getColor({color: 'primary.400'})
            : getColor({color: 'background.400'}),
        },
      ]}>
      {item?.photoUrl && (
        <Layer style={{margin: 17}}>
          <Image
            source={{uri: item?.photoUrl}}
            style={styles.img}
            resizeMode="cover"
          />
        </Layer>
      )}
      <Typography style={styles.title} numberOfLines={1}>
        {item?.name}
      </Typography>
    </TouchableOpacity>
  );
};

export default CategoryTypeTwoItem;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 16,
  },
  container: {
    width: '30%',
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginHorizontal: 4,
    marginTop: 3,
    borderRadius: 6,
    borderWidth: 2,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 5,
  },
});
