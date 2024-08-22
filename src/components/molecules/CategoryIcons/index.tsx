import React, {useState, useEffect} from 'react';
import {Button, Header, useNavigate, Screen} from '../../elemental';
import {FlatList} from 'native-base';
import RenderItem from './RenderItem';

import {useQuery, graphqlFetcher} from '~/components/elemental';

interface IProps {
  multiSelect: boolean;
  navigateTo: string;
  isTitleHeader: boolean;
  titleText: string;
  subTitleText: string;
}

export default function CategoryIcons({
  multiSelect,
  navigateTo,
  isTitleHeader = true,
}: Partial<IProps>) {
  const {navigateWithName} = useNavigate();
  const {
    data: getCategories,
    isLoading,
    error,
  } = useQuery(['getCategories'], () => {
    return graphqlFetcher(
      'query postDefaultCategory_getPostDefaultCategories  { postDefaultCategory_getPostDefaultCategories  { status, result  { items { id, categoryName, imageUrl } } } }',
      {},
    );
  });

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const onSelect = id => {
    setSelectedItemIds(prev => {
      if (multiSelect) {
        const isExist = prev?.findIndex(i => i == id);
        if (isExist !== -1) {
          prev.splice(isExist, 1);

          return [...prev];
        } else {
          return [...prev, id];
        }
      } else {
        const isExist = prev?.findIndex(i => i == id);
        if (isExist !== -1) {
          prev.splice(isExist, 1);
          return [...prev];
        } else {
          return [id];
        }
      }
    });
  };

  const data =
    getCategories?.postDefaultCategory_getPostDefaultCategories?.result?.items;

  return (
    <Screen isLoading={isLoading}>
      {/* {isTitleHeader && <Header title="Category" hasBack="false" />} */}
      <FlatList
        bounces={false}
        data={data}
        renderItem={({item, index}) => (
          <RenderItem
            isSelected={selectedItemIds.includes(item?.id)}
            item={item}
            index={index}
            onSelect={onSelect}
            selectedItemIds={selectedItemIds}
          />
        )}
        numColumns={3}
        columnWrapperStyle={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 32,
        }}
      />
      {/* <Button
        onPress={() =>
          navigateWithName(navigateTo, {categoryIds: selectedItemIds})
        }
        style={{
          marginHorizontal: 32,
        }}>
        Continue
      </Button> */}
    </Screen>
  );
}
