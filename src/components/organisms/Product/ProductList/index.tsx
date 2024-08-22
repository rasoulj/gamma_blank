import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useQueryClient} from 'react-query';
import NoResultIcon from '~/assets/icons/CustomIcons/NoResult.icon';
import Pagination from '~/components/atoms/Pagination';
import {
  ArrowUpIconSet,
  Button,
  Layer,
  LoadIndicator,
  MoreIconSet,
  PercentageSquareIconSet,
  Typography,
  View,
  getColor,
  useDebounce,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import useTrackedStates from '../../../molecules/ItemSearch/useStates';
import WishListBoardModal from '../../WishList/WishlistHome/Modals/WishlistBoardModal';
import WishlistModal from '../../WishList/WishlistHome/Modals/WishlistModal';
import {useAddToWishList} from '../../WishList/hook';
import {useGetPaginatedProducts} from '../hook';
import ConfirmDeleteWishlistItem from './Modals/ConfirmDeleteWishlistItem';
import PromotionModal from './Modals/PromotionModal';
import ProductListItem from './ProductListItem';
import PromotionSearchBar from './PromotionSearchBar';

const ITEMS_PER_PAGE = 10;
const SCROLL_TO_TOP_THRESHOLD = 200;

const ProductHomeConfig = model?.metaData?.configs?.productHome;

const ProductList = ({
  headerComponent,
  category,
  isPromotion,
  isAddToCartEnabled = false,
}: {
  headerComponent?: any;
  category?: string;
  isPromotion?: boolean;
  isAddToCartEnabled?: boolean;
}) => {
  const route: any = useRoute();
  const scrollViewRef: any = useRef();
  const queryClient = useQueryClient();
  const {navigation} = useNavigate();

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [page, setPage] = useState(1);
  const [isPromotionModalVisible, setIsPromotionModalVisible] = useState(false);
  const [isWishListModalVisible, setIsWishListModalVisible] = useState(false);
  const [isWishListRemoveModalVisible, setIsWishListRemoveModalVisible] =
    useState(false);
  const [isWishListBoardModalVisible, setIsWishListBoardModalVisible] =
    useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const categoryName = category || route?.params?.category;
  const user = useAuthStore(state => state?.user);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const filters: any = useTrackedStates(state => state?.filters);
  const setFilters: any = useTrackedStates(state => state?.setFilters);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const {data, isLoading, refetch, isRefetching}: any = useGetPaginatedProducts(
    {
      where: {
        ...(debouncedQuery && {
          or: [
            {
              product: {
                title: {
                  contains: debouncedQuery,
                },
              },
            },
            {
              product: {
                description: {
                  contains: debouncedQuery,
                },
              },
            },
            {
              product: {
                category: {
                  contains: debouncedQuery,
                },
              },
            },
          ],
        }),
        ...(route?.params?.promotion?.id && {
          promotion: {
            id: {
              eq: route?.params?.promotion?.id,
            },
          },
        }),
        ...(route?.params?.isWishList &&
          (route?.params?.WishlistId && !route?.params?.isAddToBorad
            ? {
                wishLists: {
                  some: {
                    id: {
                      eq: route?.params?.WishlistId,
                    },
                  },
                },
              }
            : {
                isInWishList: {
                  eq: true,
                },
                wishLists: {
                  all: {
                    name: {
                      neq: route?.params?.item?.name,
                    },
                  },
                },
              })),
        ...(filters?.rangePrice && {
          and: [
            {
              finalPrice: {
                gte: filters?.rangePrice?.[0],
              },
            },
            {
              finalPrice: {
                lt: filters?.rangePrice?.[1],
              },
            },
          ],
        }),
        product: {
          ...(route?.params?.userId && {
            userId: {
              eq: route?.params?.userId,
            },
          }),

          ...(categoryName && {
            category: {
              in: categoryName,
            },
          }),
          ...(filters?.category && {
            category: {
              contains: filters?.category,
            },
          }),
          ...(filters?.brand && {
            brand: {
              contains: filters?.brand,
            },
          }),
          ...(filters?.tag && {
            tag: {
              contains: filters?.tag,
            },
          }),
          ...(filters?.subcategory && {
            subcategory: {
              contains: filters?.subcategory,
            },
          }),
          productType: {
            eq: null,
          },
          ...(filters?.rate && {
            rateAverage: {
              gte: filters?.rate,
            },
          }),
        },
      },
      order: {
        ...(filters?.sort === 'Most Popular' && {
          product: {
            rateAverage: 'DESC',
          },
        }),
        ...(!filters?.sort && {
          product: {
            createdDate: 'DESC',
          },
        }),
        ...(filters?.sort === 'Low to High Price' && {
          finalPrice: 'ASC',
        }),
        ...(filters?.sort === 'High to Low Price' && {
          finalPrice: 'DESC',
        }),
        ...(filters?.sort === 'Cheapest' && {
          product: {
            price: 'ASC',
          },
        }),
      },
    },
    page - 1,
  );

  const products = data?.ecommerce_getProducts?.result?.items || [];

  const {mutate: mutateAddToWishList, isLoading: addLoading} =
    useAddToWishList();
  const addToWishList = () => {
    mutateAddToWishList(
      {wishListId: route?.params?.WishlistId, entityIdList: selectedIds},
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['getShoppingCards']);
          queryClient.refetchQueries(['getProducts']);
          queryClient.refetchQueries(['getWishLists']);
          navigation?.goBack();
        },
      },
    );
  };
  const availbleCategories = useMemo(() => {
    const uniqueCategories = new Set(
      products?.map(i => i?.product?.category).filter(i => i !== null),
    );
    return Array.from(uniqueCategories);
  }, [products]);
  const totalCount = data?.ecommerce_getProducts?.result?.totalCount;

  useEffect(() => {
    if (products?.length > 0) {
      setFilters({...filters, haveProduct: true, availbleCategories});
    } else if (products?.length === 0 && !isLoading) {
      setFilters({...filters, haveProduct: false, availbleCategories: []});
    }
  }, [products]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const renderItem = ({item}: {item: any}) => (
    <ProductListItem
      {...{item}}
      selectable={route?.params?.selectable}
      select={selectedIds}
      setSelect={
        route?.params?.selectable
          ? id =>
              selectedIds?.includes(id)
                ? setSelectedIds(selectedIds.filter(i => i !== id))
                : setSelectedIds([...selectedIds, id])
          : null
      }
      isAddToCartEnabled={
        ProductHomeConfig?.card !== false
          ? route?.params?.promotionId &&
            route?.params?.promotion?.userId !== user?.id
            ? true
            : false
          : false
      }
    />
  );

  const renderHeader = () => (
    <>
      {route?.params?.promotionId && (
        <>
          <PromotionSearchBar />
          <View style={styles.headerContainer}>
            <PercentageSquareIconSet
              fill={getColor({color: 'error.500'})}
              color={getColor({color: 'gray.50'})}
            />
            <Typography color={'error.500'} style={styles.discountContainer}>
              <Typography color={'error.500'} style={styles.discountText}>
                {' '}
                {route?.params?.promotion?.discount}%{' '}
              </Typography>
              Discount
            </Typography>
          </View>
        </>
      )}
      {isLoading && <LoadIndicator height="100%" />}
    </>
  );

  const icons = useMemo(
    () => (
      <>
        {(route?.params?.promotion?.userId === user?.id ||
          (route?.params?.WishlistId &&
            route?.params?.item?.name !== 'All Items')) && (
          <TouchableOpacity
            onPress={() =>
              route?.params?.WishlistId
                ? setIsWishListModalVisible(true)
                : setIsPromotionModalVisible(true)
            }>
            <MoreIconSet style={styles.moreIcon} />
          </TouchableOpacity>
        )}
      </>
    ),
    [],
  );

  const getTitle = () => {
    if (route?.params?.userId) {
      return 'My Products';
    } else if (route?.params?.promotionId) {
      return route?.params?.promotion?.userId === user?.id
        ? 'My Promotions'
        : route?.params?.promotion?.title || 'Promotions';
    } else if (route?.params?.isWishList) {
      return route?.params?.item?.wishList?.name || 'All Item';
    } else if (route?.params?.item) {
      return typeof route?.params?.item === 'string'
        ? route?.params?.item
        : 'For You';
    } else if (categoryName) {
      return categoryName;
    } else {
      return null;
    }
  };

  const {} = useHeader({
    title: {
      children: getTitle() || 'Product List',
      fontSize: 'md',
      fontWeight: 'bold',
    },
    hidden: !getTitle(),
    icons,
  });
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(offsetY > SCROLL_TO_TOP_THRESHOLD);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const renderScrollToTopButton = () => (
    <TouchableOpacity onPress={scrollToTop} style={styles.scrollToTopButton}>
      <ArrowUpIconSet />
    </TouchableOpacity>
  );

  const renderPromotionModal = () => (
    <PromotionModal
      item={route?.params?.promotion}
      isVisible={isPromotionModalVisible}
      onClose={() => setIsPromotionModalVisible(false)}
    />
  );

  const renderWishListModal = () => (
    <WishlistModal
      dtoItem={route?.params?.item}
      isVisible={isWishListModalVisible}
      onClose={() => setIsWishListModalVisible(false)}
    />
  );
  const renderWishListBoradModal = () => (
    <WishListBoardModal
      ids={selectedIds}
      entityName="product"
      item={route?.params?.item}
      isVisible={isWishListBoardModalVisible}
      onClose={() => setIsWishListBoardModalVisible(false)}
    />
  );

  const renderWishListRemoveBoradModal = () => (
    <ConfirmDeleteWishlistItem
      selectedIds={selectedIds}
      isVisible={isWishListRemoveModalVisible}
      onClose={() => setIsWishListRemoveModalVisible(false)}
    />
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      <Pagination
        totalPages={Math?.round(Number(totalCount) / ITEMS_PER_PAGE) + 1}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </View>
  );

  const emptyComponent = () => {
    return (
      !isLoading && (
        <Layer style={styles.noHistoryContainer}>
          <NoResultIcon />
          <Typography color={'gray.300'} style={styles.noHistoryText}>
            No result!
          </Typography>
        </Layer>
      )
    );
  };

  const renderFooter = () => <View style={styles.space} />;
  return (
    <>
      {renderHeader()}
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={products}
          keyExtractor={(_, index) => `key${index}`}
          numColumns={2}
          refreshing={isRefetching}
          onRefresh={refetch}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.9}
          ListEmptyComponent={emptyComponent}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={
            totalCount > ITEMS_PER_PAGE ? renderPagination : renderFooter
          }
        />
        {route?.params?.selectable &&
          (!route?.params?.isAddToBorad ? (
            <Layer style={styles.buttonContainer}>
              <Button
                variant={'outline'}
                style={styles.unSave}
                onPress={() => setIsWishListRemoveModalVisible(true)}>
                Remove
              </Button>
              <Button
                disabled={selectedIds?.length === 0}
                style={styles.addToBoard}
                onPress={() => setIsWishListBoardModalVisible(true)}>
                Add to Board
              </Button>
            </Layer>
          ) : (
            <Button
              isLoading={addLoading}
              disabled={selectedIds?.length === 0}
              style={styles.addButton}
              onPress={addToWishList}>
              Add
            </Button>
          ))}
      </ScrollView>
      {showScrollToTop && renderScrollToTopButton()}
      {renderPromotionModal()}
      {renderWishListModal()}
      {renderWishListBoradModal()}
      {renderWishListRemoveBoradModal()}
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  addButton: {marginBottom: 10},
  contentContainerStyle: {
    paddingTop: 10,
  },
  moreIcon: {transform: [{rotate: '90deg'}]},
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollToTopButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 0,
    bottom: 30,
    borderRadius: 100,
    shadowColor: getColor({color: 'gray.900'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: getColor({color: 'background.500'}),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {flexDirection: 'row', position: 'absolute', bottom: 10},
  addToBoard: {flex: 2, marginLeft: 10, marginBottom: 10},
  unSave: {flex: 1, backgroundColor: getColor({color: 'gray.50'})},
  scrollContainer: {
    flex: 1,
  },
  noHistoryContainer: {
    flexGrow: 1,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHistoryText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: getColor({color: 'error.100'}),
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  discountContainer: {
    fontSize: 14,
    fontWeight: '400',
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  pagination: {marginVertical: 30, marginBottom: 100},
  space: {height: 100},
});
