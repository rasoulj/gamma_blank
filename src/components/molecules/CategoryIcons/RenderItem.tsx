import React from 'react';
import Card from '../../atoms/Card';
import * as Element from '~/components/elemental';
import {deviceWidth, shadow} from '~/components/elemental';

const ITEM_SIZE = (deviceWidth - 90) / 3;

export default function RenderItem({
  item,
  index,
  onSelect,
  selectedItemIds,
  isSelected,
}) {
  const Icon = Element[item?.imageUrl || 'CHome'];

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
          ? Element.getColor({color: 'primary.400'})
          : 'transparent',
        ...shadow,
      }}
      onPress={() => onSelect(item.id)}>
      {/* <Icon /> */}
      <Element.CHome />
      <Element.Typography
        style={{color: '#000', fontWeight: '500', fontSize: 11, marginTop: 13}}
        mt={4}>
        {item?.categoryName}
      </Element.Typography>
    </Card>
  );
}
