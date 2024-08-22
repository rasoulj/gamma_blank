import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import ShoppingBasketIcon from '~/assets/icons/CustomIcons/ShoppingBasket.icon';
import {
  ArrowRightIconSet,
  CloseIconSet,
  HStack,
  Layer,
  MinusIcon,
  MoreIconSet,
  Trash2Icon,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import {formatPrice} from '~/utils/helper/formatPrice';
import WishListBoardModal from '../WishList/WishlistHome/Modals/WishlistBoardModal';
import {useAddToWishList, useGetWishLists} from '../WishList/hook';
import DeleteItemConfirmModal from './Modals/DeleteItemConfirmModal';
import TrackingOrderItemModal from './Modals/TrackingOrderItemModal';
import {useAddToShoppingCard, useRemoveFromAllWishList} from './hooks';

const OrderItem = ({
  item,
  trackingId,
  hasAddress,
  hasErorr,
}: {
  item: any;
  trackingId?: number;
  hasAddress?: boolean;
  hasErorr?: boolean;
}) => {
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [isWishListVisible, setIsWishListVisible] = useState(false);
  const [isTrackingOrderItemModalVisible, setIsTrackingOrderItemModalVisible] =
    useState(false);
  const [count, setCount] = useState(1);
  const [productId, setProductId] = useState(0);

  const setShoppingBasketList = useShoppingBasketStore(
    state => state?.setShoppingBasketList,
  );
  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );

  const setIsModalUserLoggedInVisible = useAuthStore(
    state => state?.setIsModalUserLoggedInVisible,
  );
  const token = useAuthStore(state => state?.token);
  const {mutate, isLoading} = useAddToShoppingCard();

  const currentItem = shoppingBasketList?.filter(
    i => i?.productId === item?.product?.id,
  )?.[0];

  const [addToWishListPrId, setAddToWishListPrId] = useState(false);

  const {mutate: mutateRemoveAllWishlist, isLoading: isLoadingRemoveWishlist} =
    useRemoveFromAllWishList();
  const removeProductFromAllWishlist = productId => {
    setAddToWishListPrId(productId);
    mutateRemoveAllWishlist(
      {entityName: 'product', entityIdList: [productId]},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getShoppingCards']);
        },
      },
    );
  };

  const ShoppingCardCounter = (
    number: number,
    alternateId,
    productId,
    quantity,
  ) => {
    setProductId(productId);
    if (token) {
      if (quantity > 1 || number === 1) {
        const input: any = {
          productId: productId,
          alternateId: alternateId,
          quantity: number,
        };
        mutate(
          {input},
          {
            onSuccess(data: any, variables, context) {
              if (data?.ecommerce_addToShoppingCard?.[0]?.code === 1) {
                queryClient.invalidateQueries(['getShoppingCards'], {
                  exact: false,
                });
                setCount(count + number);
              }
            },
          },
        );
      }
    } else {
      if (currentItem?.quantity > 1 || number > 0) {
        const input = {
          productId: productId,
          alternateId: null,
          quantity: currentItem ? currentItem?.quantity + number : 1,
          product: item?.product,
        };
        setShoppingBasketList(
          [
            ...shoppingBasketList.filter(i => i?.productId !== productId),
            input,
          ].sort((a, b) => a.productId - b.productId),
        );
        setCount(currentItem?.quantity + number);
      }
    }
  };

  const {data: wishlistData}: any = useGetWishLists({
    entityName: 'product',
    entityId: item?.shoppingCardDetails?.[0]?.productId,
    wishList: {
      name: {
        eq: 'All Items',
      },
    },
  });

  const wishlistAllItemsId = useMemo(() => {
    return wishlistData?.pages?.[0]?.wishList?.id;
  }, [wishlistData]);

  const {mutate: mutateAddToWishList, isLoading: addLoading} =
    useAddToWishList();

  const addToAllItems = () => {
    mutateAddToWishList(
      {
        wishListId: wishlistAllItemsId,
        entityIdList: [item?.shoppingCardDetails?.[0]?.productId],
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['getShoppingCards']);
          queryClient.refetchQueries(['getProducts']);
          queryClient.refetchQueries(['getWishLists']);
          setIsWishListVisible(true);
        },
      },
    );
  };
  const chooseShippingMethods = () => {
    if (hasAddress) {
      navigateWithName('choose shipping', {item});
    }
  };

  return (
    <VStack style={styles.container}>
      {item?.shoppingCardDetails?.map(itemDetail => {
        return (
          <View style={styles?.productContainer}>
            <HStack flex={1} alignItems={'center'}>
              {itemDetail?.product?.productImages[0]?.imageUrl ? (
                <Image
                  source={{
                    uri: itemDetail?.product?.productImages[0]?.imageUrl,
                  }}
                  style={styles.imageContainer}
                  resizeMode="cover"
                />
              ) : (
                <ShoppingBasketIcon width={77} height={104} />
              )}
              <VStack style={styles.detailsContainer}>
                <Typography style={styles?.productTitle}>
                  {itemDetail?.product?.title}
                </Typography>
                <Layer style={styles.alternateContainer}>
                  {itemDetail?.alternate?.attributes &&
                    JSON?.parse(itemDetail?.alternate?.attributes)?.map(
                      (i, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index === 0 ? null : (
                              <Typography
                                color={'gray.500'}
                                style={styles.featureText}>
                                {' '}
                                -{' '}
                              </Typography>
                            )}
                            {i?.Name === 'Color' ? (
                              <View
                                style={{
                                  ...styles.featureColor,
                                  backgroundColor: i?.Value?.split('- ')?.[1],
                                }}></View>
                            ) : (
                              <Typography
                                color={'gray.500'}
                                style={styles.featureText}>
                                {i?.Value}
                              </Typography>
                            )}
                          </React.Fragment>
                        );
                      },
                    )}
                </Layer>

                {trackingId && (
                  <Typography style={styles.counterText}>
                    {itemDetail?.quantity || count}x
                  </Typography>
                )}
                <View style={styles?.rowCounter}>
                  <Typography numberOfLines={1} style={styles.priceContainer}>
                    <Typography
                      numberOfLines={1}
                      style={{
                        ...styles.price,
                        textDecorationLine:
                          Number(itemDetail?.finalPrice) !==
                          Number(itemDetail?.priceSum)
                            ? 'line-through'
                            : 'none',
                      }}>
                      ${formatPrice(itemDetail?.priceSum)}{" "}
                    </Typography>
                    {itemDetail?.finalPrice !== itemDetail?.priceSum && (
                      <Typography
                        numberOfLines={1}
                        color={'error.500'}
                        style={styles.discountedPrice}>
                        ${formatPrice(itemDetail?.finalPrice)}
                      </Typography>
                    )}
                  </Typography >

                  {!trackingId ? (
                    <VStack style={styles.counterContainer}>
                      <TouchableOpacity
                        disabled={isLoading}
                        style={styles.counterButton}
                        onPress={() =>
                          ShoppingCardCounter(
                            -1,
                            itemDetail?.alternateId,
                            itemDetail?.product?.id,
                            itemDetail?.quantity,
                          )
                        }>
                        <MinusIcon
                          color={getColor({
                            color:
                              itemDetail?.quantity || count > 1
                                ? 'error.500'
                                : 'gray.800',
                          })}
                        />
                      </TouchableOpacity>

                      {isLoading && productId == itemDetail?.product?.id ? (
                        <ActivityIndicator size={'small'} />
                      ) : (
                        <Typography style={styles.counterText}>
                          {itemDetail?.quantity || count}
                        </Typography>
                      )}
                      {!trackingId ? (
                        <TouchableOpacity
                          disabled={isLoading}
                          style={styles.counterButton}
                          onPress={() =>
                            ShoppingCardCounter(
                              1,
                              itemDetail?.alternateId,
                              itemDetail?.product?.id,
                              itemDetail?.quantity,
                            )
                          }>
                          <CloseIconSet
                            style={styles.closeIcon}
                            onPress={() =>
                              ShoppingCardCounter(
                                1,
                                itemDetail?.alternateId,
                                itemDetail?.product?.id,
                                itemDetail?.quantity,
                              )
                            }
                            color={getColor({color: 'primary.400'})}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </VStack>
                  ) : null}
                </View>
              </VStack>
            </HStack>
            <Layer style={styles.trackingContainer}>
              {!trackingId ? (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setIsDeleteModalVisible(true)}>
                  <Trash2Icon
                    color={'primary.500'}
                    onPress={() => setIsDeleteModalVisible(true)}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setIsTrackingOrderItemModalVisible(true)}>
                  <MoreIconSet
                    style={styles.rotateIcon}
                    onPress={() => setIsTrackingOrderItemModalVisible(true)}
                  />
                </TouchableOpacity>
              )}
            </Layer>

            <WishListBoardModal
              entityName="product"
              item={{product: itemDetail?.product}}
              isVisible={isWishListVisible}
              onClose={() => setIsWishListVisible(false)}
            />
            <TrackingOrderItemModal
              item={itemDetail}
              trackingId={trackingId}
              shoppingCardSellerId={item?.id}
              orderStatus={item?.shoppingCard?.orderStatus}
              isVisible={isTrackingOrderItemModalVisible}
              onClose={() => setIsTrackingOrderItemModalVisible(false)}
            />
            <DeleteItemConfirmModal
              item={itemDetail}
              isVisible={isDeleteModalVisible}
              onClose={() => setIsDeleteModalVisible(false)}
            />
          </View>
        );
      })}
      <TouchableOpacity
        disabled={trackingId || !hasAddress ? true : false}
        style={styles?.methodsContainer}
        onPress={chooseShippingMethods}>
        <Typography
          color={
            item?.shipEngineRateInfo
              ? null
              : hasErorr
              ? 'error.500'
              : 'gray.400'
          }
          numberOfLines={1}
          style={styles?.methodsText}>
          {item?.shipEngineRateInfo || 'Choose Shipping Method'}
        </Typography>
        <ArrowRightIconSet />
      </TouchableOpacity>
    </VStack>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 16,
    elevation: 4,
    borderRadius: 15,
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  imageContainer: {
    width: 77,
    height: 89,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: getColor({color: 'gray.400'}),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  priceContainer: {
    flex:1,
    flexDirection: 'row',
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'none',
    marginRight: 4,
  },
  discountedPrice: {
    fontWeight: '700',
    fontSize: 16,
  },
  wishlistText: {
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterButton: {
    padding: 5,
  },
  counterText: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },

  actionButton: {
    alignSelf: 'flex-end',
  },
  rotateIcon: {
    transform: [{rotate: '90deg'}],
  },
  productTitle: {fontWeight: '500', fontSize: 14},
  alternateContainer: {flexDirection: 'row'},
  productContainer: {
    flex:1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: getColor({color: 'gray.300'}),
    paddingBottom: 8,
    marginBottom: 16,
  },
  methodsContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodsText: {
    flex:1,
    width: 300,
    fontSize: 16,
    fontWeight: '500',
  },
  rowCounter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureColor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 21,
    height: 21,
    borderRadius: 100,
    margin: 3,
  },
  featureText: {fontSize: 12, fontWeight: '500'},
  closeIcon: {padding: 5, transform: [{rotate: '45deg'}]},
  trackingContainer: {position: 'absolute', right: 10, top: 10},
});
