import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../atoms/Screen';
import Header from '../../atoms/Header';
import FavoriteItem from './FavoriteItem';
import {useGetFavoriteEvents, useGetFavoriteProducts} from './hook';
import ContentListItem from '~/components/organisms/Content/ContentList/ContentListItem';
import HorizontalProductsList from '~/components/organisms/EducationHome/HorizontalProductsList';
import ProductListItem from '../../organisms/Product/ProductList/ProductListItem';
import {Layer, useNavigate} from '~/components/elemental';

const Favorites = ({
  entity,
}: {
  entity: 'content' | 'product' | 'event' | 'course';
}) => {
  const {navigateWithName} = useNavigate();

  const {data: Favorites, refetch, isRefetching, hasNextPage, fetchNextPage} =
    // entity.toLocaleLowerCase() === 'content' || 'product' ?
    useGetFavoriteProducts({
      where:
        entity.toLocaleLowerCase() === 'content'
          ? {
              isFavorite: {
                eq: true,
              },
              product: {
                productType: {
                  eq: 'content',
                },
              },
            }
          : {
              isFavorite: {
                eq: true,
              },
            },
      order: {
        product: {
          createdDate: 'DESC',
        },
      },
    });
  // : useGetFavoriteEvents();

  const renderItem = ({item, index}: {item: any; index: any}) => {
    switch (entity.toLocaleLowerCase()) {
      case 'content':
        return <ContentListItem item={item} />;
      case 'product':
        return <ProductListItem item={item} />;
      case 'course':
        return (
          <HorizontalProductsList
            title={'Category 1'}
            data={[{}, {}]}
            loading={false}
            style={{paddingVertical: 8}}
            onClickSeeAll={() => {
              navigateWithName('CourseList');
            }}
          />
        );
      default:
        return <ContentListItem item={item} />;
    }
  };
  return (
    <Screen>
      {/* <Header title="Favorites" hasBack={'false'} /> */}
      <FlatList
        data={Favorites?.pages}
        numColumns={entity.toLocaleLowerCase() === 'product' ? 2 : 1}
        refreshing={isRefetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
        }}
        style={{}}
        renderItem={renderItem}
        // ListHeaderComponent={Header}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </Screen>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
