import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  Center,
  HeartIcon,
  Image,
  Layer,
  Rating,
  TickIconSet,
  Typography,
  View,
  deviceWidth,
  getColor,
  useNavigate,
  useRoute,
  useToast,
  verticalScale,
} from '~/components/elemental';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import {getTextColor} from '~/theme';
import {formatPrice} from '~/utils/helper/formatPrice';
import {useAddToPromotion, useRemoveFromPromotion} from '../../Promotion/hook';
import WishListBoardModal from '../../WishList/WishlistHome/Modals/WishlistBoardModal';
import {useAddToWishList, useGetWishLists} from '../../WishList/hook';
import {useAddToShoppingCard, useRemoveFromAllWishList} from '../hook';

const ProductHomeConfig = model?.metaData?.configs?.productHome;
const RateReviewConfig = model?.metaData?.configs?.rateReview;

const ProductListItem = ({
  item,
  onPress,
  isAddToCartEnabled = false,
  size = 'l',
  removeFromWishlist,
  selectable,
  select,
  setSelect,
}: {
  onPress?: any;
  item: any;
  isAddToCartEnabled?: boolean;
  size?: 's' | 'l';
  removeFromWishlist?: (productId) => void;
  selectable?: boolean;
  select?: any;
  setSelect?: (id) => void;
}) => {
  const {navigateWithName} = useNavigate();
  const token = useAuthStore(state => state?.token);
  const setIsModalUserLoggedInVisible = useAuthStore(
    state => state?.setIsModalUserLoggedInVisible,
  );
  const queryClient = useQueryClient();
  const route: any = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [isWishListVisible, setIsWishListVisible] = useState(false);
  const [addedToCard, setAddToCard] = useState(false);

  const productId = item?.product?.id;

  const {mutate, isLoading: isLoadingAddToShop} = useAddToShoppingCard();

  const {toast} = useToast();

  const addToCard = () => {
    const input = {
      productId: productId,
      alternateId: item?.product?.alternates?.[0]?.id,
    };
    mutate(
      {input},
      {
        onSuccess(data: any, variables, context) {
          if (data?.ecommerce_addToShoppingCard?.[0]?.code === 1) {
            setAddToCard(true);
            queryClient.invalidateQueries(['getShoppingCards']);
            setTimeout(() => {
              setAddToCard(false);
            }, 3000);
          } else if (data?.ecommerce_addToShoppingCard?.[0]?.code !== 1) {
            toast({
              message: data?.ecommerce_addToShoppingCard?.[0]?.description,
            });
          }
        },
      },
    );
  };

  const {mutate: mutateRemoveAllWishlist, isLoading: isLoadingRemoveWishlist} =
    useRemoveFromAllWishList();
  const removeProductFromAllWishlist = () => {
    if (removeFromWishlist) {
      removeFromWishlist({entityName: 'product', entityIdList: [productId]});
    } else {
      mutateRemoveAllWishlist(
        {entityName: 'product', entityIdList: [productId]},
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['getProducts']);
            queryClient.invalidateQueries(['getShoppingCards'], {exact: false});
            queryClient.invalidateQueries(['getWishLists'], {exact: false});
          },
        },
      );
    }
  };

  const {mutate: mutateAddToPromotion, isLoading: isLoadingAddToPromotion} =
    useAddToPromotion();
  const {
    mutate: mutateRemoveFromPromotion,
    isLoading: isLoadingRemoveFromPromotion,
  } = useRemoveFromPromotion();

  const addToList = id => {
    if (select?.includes(id)) {
      mutateRemoveFromPromotion(
        {promotionId: route?.params?.item?.id, productId: id},
        {
          onSuccess(data) {
            if (data?.ecommerce_removeFromPromotion?.code === 1) {
              setSelect(select?.filter(item => item !== id));
              queryClient.invalidateQueries(['getPromotionProducts']);
            }
          },
        },
      );
    } else {
      mutateAddToPromotion(
        {promotionId: route?.params?.item?.id, productId: id},
        {
          onSuccess(data) {
            if (data?.ecommerce_addToPromotion?.status?.code === 1) {
              setSelect([...select, id]);
              queryClient.invalidateQueries(['getPromotionProducts']);
            } else if (
              data?.ecommerce_addToPromotion?.status?.value === 'AlreadyExists'
            ) {
              toast({
                message: 'This product already exists in this promotion',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else if (
              data?.ecommerce_addToPromotion?.status?.value === 'NotFound'
            ) {
              toast({
                message: 'This promotion already removed',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            }
          },
        },
      );
    }
  };

  const {data: wishlistData}: any = useGetWishLists({
    entityName: 'product',
    entityId: item?.product?.id,
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
      {wishListId: wishlistAllItemsId, entityIdList: [item?.product?.id]},
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
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          navigateWithName('product detail', {
            productId: item?.product?.id,
            item,
          })
        }>
        <Layer style={styles.container}>
          <Layer
            style={{
              ...styles.itemContainer,
              width: size === 'l' ? deviceWidth / 2 - 30 : deviceWidth / 2 - 65,
            }}>
            {isLoading ? (
              <Center zIndex={2} position="absolute" width="100%" height="100%">
                <ActivityIndicator size="small" />
              </Center>
            ) : (
              false
            )}

            <Image
              style={{
                ...styles.image,
                height:
                  size === 'l' ? deviceWidth / 2 - 45 : deviceWidth / 2 - 90,
              }}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              source={{
                uri: item?.product?.productImages?.[0]?.imageUrl,
              }}
            />
            {ProductHomeConfig?.wishlist !== false && (
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() =>
                  token
                    ? selectable
                      ? setSelect(productId)
                      : setSelect
                      ? addToList(productId)
                      : item?.isInWishList
                      ? removeProductFromAllWishlist()
                      : addToAllItems()
                    : setIsModalUserLoggedInVisible(true)
                }>
                {setSelect ? (
                  isLoadingAddToPromotion || isLoadingRemoveFromPromotion ? (
                    <ActivityIndicator size={'small'} />
                  ) : (
                    <Layer
                      style={{
                        ...styles.tickIcon,
                        backgroundColor: getColor({
                          color: select?.includes(productId)
                            ? 'primary.500'
                            : 'background.500',
                        }),
                      }}>
                      {select?.includes(productId) && (
                        <TickIconSet
                          width={12}
                          height={12}
                          color={getColor({color: 'gray.50'})}
                        />
                      )}
                    </Layer>
                  )
                ) : isLoadingRemoveWishlist || addLoading ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  <HeartIcon
                    fill={
                      item?.isInWishList && token
                        ? getColor({color: 'error.500'})
                        : getColor({color: 'gray.400'})
                    }
                    onPress={() =>
                      token
                        ? item?.isInWishList
                          ? removeProductFromAllWishlist()
                          : addToAllItems()
                        : setIsModalUserLoggedInVisible(true)
                    }
                    isLiked={item?.isInWishList && token}
                    width={15}
                    height={15}
                    color={getColor({color: 'gray.400'})}
                  />
                )}
              </TouchableOpacity>
            )}
            <Typography
              color={'gray.800'}
              style={styles.title}
              numberOfLines={1}>
              {item?.product?.title}
            </Typography>
            <View style={styles.detailsContainer}>
              <Typography color={'gray.500'} style={styles.category}>
                {item?.product?.category}
              </Typography>
              {item?.product?.rateAverage !== 0 &&
              RateReviewConfig?.homeRate !== false ? (
                <Rating rating={item?.product?.rateAverage} type="numberic" />
              ) : (
                <View style={styles.emptyRating} />
              )}
            </View>
            <View style={styles.priceContainer}>
              <Typography
                color={
                  item?.promotion?.id
                    ? getTextColor(getColor({color: 'background.500'}))
                    : 'primary.500'
                }
                numberOfLines={1}
                style={{
                  ...styles.price,
                  textDecorationLine: item?.promotion?.id
                    ? 'line-through'
                    : 'none',
                }}>
                ${formatPrice(item?.product?.price)}{' '}
              </Typography>
              {item?.promotion?.id && (
                <Typography
                  color={'error.500'}
                  numberOfLines={1}
                  style={styles.discountedPrice}>
                  ${formatPrice(item?.finalPrice)}
                </Typography>
              )}
            </View>
            {isAddToCartEnabled && (
              <Button
                style={styles.addToCartButton}
                backgroundColor={getColor({
                  color: item?.soldOut
                    ? getColor({color: 'red.200'})
                    : addedToCard
                    ? 'white'
                    : item?.promotion?.id
                    ? 'error.500'
                    : 'primary.500',
                })}
                isLoading={isLoadingAddToShop}
                variant={addedToCard ? 'outline' : 'solid'}
                onPress={() => addToCard()}
                borderColor={item?.promotion?.id ? 'error.500' : 'primary.500'}
                disabled={item?.soldOut}>
                <Typography
                  color={
                    addedToCard
                      ? item?.promotion?.id
                        ? 'error.500'
                        : 'primary.500'
                      : '#fff'
                  }>
                  {item?.soldOut
                    ? 'Sold out!'
                    : addedToCard
                    ? 'Added!'
                    : 'Add to Cart'}
                </Typography>
              </Button>
            )}
          </Layer>
        </Layer>
      </TouchableWithoutFeedback>
      {isWishListVisible && (
        <WishListBoardModal
          entityName="product"
          onVisible={() => setIsWishListVisible(true)}
          item={item}
          isVisible={isWishListVisible}
          onClose={() => setIsWishListVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container: {
    flex: 1,
  },
  itemContainer: {
    width: deviceWidth / 2 - 30,
    minHeight: verticalScale(180),
    padding: 8,
    borderRadius: 15,
    backgroundColor: getColor({color: 'background.400'}),
    borderWidth: 0,
    margin: 4,
    shadowColor: getColor({color: 'gray.500'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: deviceWidth / 2 - 45,
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: getColor({color: 'background.400'}),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'gray.300'}),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyRating: {
    height: 33,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  discountedPrice: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  addToCartButton: {
    height: 40,
  },
});

export default ProductListItem;
