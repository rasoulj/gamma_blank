import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  FlatList,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import ProductListItem from '../../Product/ProductList/ProductListItem';
import {useGetProducts} from '../hook';

const SelectProduct = () => {
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const [select, setSelect] = useState([]);
  const userId = useAuthStore(state => state?.user?.id);
  const route: any = useRoute();
  const {toast} = useToast();

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetProducts({
    where: {
      or: [
        {promotion: {id: {eq: route?.params?.item?.id}}},
        {hasPromotion: {eq: false}},
      ],
      product: {
        userId: {
          eq: userId,
        },
      },
    },
    order: {
      product: {
        createdDate: 'DESC',
      },
    },
  });

  useEffect(() => {
    setSelect(
      products?.pages
        ?.map((item: any) => (item?.promotion?.id ? item?.product?.id : null))
        .filter(item => item !== undefined),
    );
  }, [products]);

  const renderItem = ({item}) => {
    return (
      <>
        <ProductListItem
          item={item}
          select={select}
          setSelect={setSelect}
          isAddToCartEnabled={false}
        />
      </>
    );
  };
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const {} = useHeader({hasBack: false});

  const confirm = () => {
    if (select?.filter(i => i !== null)?.length > 0) {
      queryClient.invalidateQueries(['getPromotion']),
        navigateWithName('promotion list');
    } else {
      toast({
        message: 'To proceed, please pick a product from the list.',
        type: 'error',
        containerStyle: styles.toastContainer,
      });
    }
  };

  return (
    <>
      <FlatList
        data={products?.pages}
        keyExtractor={(_, index) => `key${index}`}
        numColumns={2}
        refreshing={isRefetching}
        onRefresh={refetch}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.9}
        ListFooterComponent={<View style={styles.space} />}
        onEndReached={() => {
          onLoadMore?.();
        }}
      />
      <Button
        style={styles.button}
        onPress={confirm}>
        Confirm
      </Button>
    </>
  );
};

export default SelectProduct;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  contentContainerStyle: {
    paddingTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button:{width: '100%', height: 49, position: 'absolute', bottom: 20},
  space:{height: 100}
});
