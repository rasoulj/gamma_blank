import React from 'react';
import Card from '../../atoms/Card';
import {
  deviceWidth,
  shadow,
  IMG,
  Typography,
  getColor,
  Layer,
} from '~/components/elemental';

const ITEM_SIZE = (deviceWidth - 75) / 2;

export default function RenderItem({
  item,
  index,
  onSelect,
  selectedItemIds,
  isSelected,
}) {
  return (
    <Card
      style={{
        height: ITEM_SIZE,
        width: ITEM_SIZE,
        margin: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: isSelected ? 2 : 0,
        borderColor: isSelected
          ? getColor({color: 'primary.400'})
          : 'transparent',
        ...shadow,
      }}
      onPress={() => onSelect(item.id)}>
      <IMG
        src={item?.imageUrl}
        resizeMode="contain"
        style={{
          width: '100%',
          height: 100,
          borderRadius: 11,
        }}
      />
      <Typography
        style={{
          color: '#000',
          fontWeight: '500',
          fontSize: 11,
          marginTop: 13,
          zIndex: 10,
        }}>
        {item?.categoryName}
      </Typography>
    </Card>
  );
}
