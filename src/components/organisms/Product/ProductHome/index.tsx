import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {LoadIndicator, SwipeList} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {model} from '~/data/model';
import {useGetProductCategories, useGetPromotion} from '../hook';
import ProductHomeCategory from './ProductHomeCategory';
import ProductHomeHeader from './ProductHomeHeader';
import useIterestStore from '~/stores/interestStore';

const ProductHomeConfig = model?.metaData?.configs?.productHome;
const ProductHome = () => {
  const {data, isLoading}: any = useGetProductCategories({
    key: 'productCategories',
  });
  const selectedCategorys = useIterestStore(state => state?.selectedCategorys);
  const renderCategory = ({item}) => {
    return item && <ProductHomeCategory item={item} />;
  };
  const categories = useMemo(() => {
    return data?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
      : [];
  }, [data]);

  const {} = useHeader({hidden: true});

  const {data: promotions} = useGetPromotion({
    where: {
      promotionProducts: {
        some: {
          productId: {
            gt: 1,
          },
        },
      },
    },
    order: {
      createdDate: 'DESC',
    },
  });

  const headerComponent = () => (
    <>
      {ProductHomeConfig?.promotions && (
        <SwipeList
          variant="medium"
          data={promotions?.pages
            ?.map((promotion: any) => {
              if (promotion?.promotionProducts?.length > 0) {
                return {
                  title: promotion?.title,
                  discount: promotion?.discount,
                  image: promotion?.photoUrl,
                  navigate: 'product list',
                  params: {promotionId: promotion?.id, promotion},
                };
              }
            })
            .filter(i => i !== undefined)
            .slice(0, 6)}
        />
      )}
      {selectedCategorys?.length > 0 && ProductHomeConfig?.foryou && (
        <ProductHomeCategory item={selectedCategorys} />
      )}
    </>
  );
  return (
    <>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <>
          <ProductHomeHeader />
          {ProductHomeConfig?.categories !== false && (
            <FlatList
              data={categories || model?.constants?.productCategories}
              renderItem={renderCategory}
              ListHeaderComponent={headerComponent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductHome;
