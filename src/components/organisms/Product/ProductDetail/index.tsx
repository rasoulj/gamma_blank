import {useRoute} from '@react-navigation/native';
import {HStack, ThreeDotsIcon} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import UnityIcon from '~/assets/icons/CustomIcons/Unity.icon';
import View360UnityIcon from '~/assets/icons/CustomIcons/View360.icon';
import Progress from '~/components/atoms/Progress';
import useHeader from '~/components/elemental/hooks/use_header';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import {formatPrice} from '~/utils/helper/formatPrice';
import Button from '../../../atoms/Button';
import Image from '../../../atoms/Image';
import Layer from '../../../atoms/Layer';
import Scrollable from '../../../atoms/Scrollable';
import {useToast} from '../../../atoms/Toast';
import Typography from '../../../atoms/Typography';
import {
  AddIconSet,
  ArrowDownIconSet,
  ArrowRightIconSet,
  ArrowUpIconSet,
  Description,
  HeartIcon,
  LoadIndicator,
  PlayIconSet,
  RateReview,
  deviceWidth,
  getColor,
  isDark,
  useNavigate,
} from '../../../elemental';
import Rating from '../../../molecules/Rating';
import WishListBoardModal from '../../WishList/WishlistHome/Modals/WishlistBoardModal';
import {useAddToWishList, useGetWishLists} from '../../WishList/hook';
import {
  useAddToShoppingCard,
  useGetProducts,
  useGetRatingRate,
  useRemoveFromAllWishList,
} from '../hook';
import ProductDetailModal from './Modals/ProductDetailModal';
import ReviewItem from './ReviewItem';
import ReviewSelectedHeader from './ReviewSelectedHeader';
import SelectColor from './SelectColor';

const RateReviewConfig = model?.metaData?.configs?.rateReview;
const productConfig = model?.metaData?.configs?.product;

const Product = () => {
  const {navigateWithName} = useNavigate();
  const setShoppingBasketList = useShoppingBasketStore(
    state => state?.setShoppingBasketList,
  );
  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );
  const route = useRoute();

  const item = route?.params as any;

  const productId = item?.productId || Number(item?.id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showReviewDetail, setShowReviewDetail] = useState(false);
  const [selectAttributes, setselectAttributes] = useState([]);

  const queryClient = useQueryClient();

  const user = useAuthStore(state => state?.user);
  const token = useAuthStore(state => state?.token);
  const setIsModalUserLoggedInVisible = useAuthStore(
    state => state?.setIsModalUserLoggedInVisible,
  );

  const {toast} = useToast();

  const [addedToCard, setAddToCard] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedReview, setSelectReview] = useState(null);
  const [isWishListVisible, setIsWishListVisible] = useState(false);

  const {data, isLoading}: any = useGetProducts({
    where: {
      product: {
        id: {
          eq: productId,
        },
      },
    },
  });

  const productDetail = data?.pages?.[0]?.product || [];
  const findAlternates = productDetail?.alternates?.filter(i => {
    return i?.attributes === JSON.stringify(selectAttributes);
  });

  const isOwner = productDetail?.userId === user?.id;
  const outOfStock =
    findAlternates?.[0]?.outOfStock ||
    findAlternates?.[0]?.quantity === 0 ||
    data?.pages?.[0]?.soldOut ||
    productDetail?.soldOut;

  const featureData = useMemo(() => {
    return productDetail?.productFeatures?.map(item => {
      return {title: item?.title, value: item?.description};
    });
  }, [data]);

  const {mutate, isLoading: isLoadingAddToShop} = useAddToShoppingCard();

  const {
    data: reviews,
    hasNextPage,
    fetchNextPage,
  } = useGetRatingRate({
    where: {
      review: {
        productId: {
          eq: productId,
        },
      },
    },
    order: {
      review: {
        createdDate: 'DESC',
      },
    },
    take: 10,
  });

  const addToCard = () => {
    if (token) {
      const input = {
        productId: productId,
        alternateId: findAlternates?.[0]?.id,
      };
      mutate(
        {input},
        {
          onSuccess(data: any, variables, context) {
            queryClient.invalidateQueries(['getShoppingCards']);
            if (data?.ecommerce_addToShoppingCard?.[0]?.code === 1) {
              setAddToCard(true);
            } else if (
              data?.ecommerce_addToShoppingCard?.value === 'NotFound'
            ) {
              toast({
                message: 'This product already removed',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else if (
              data?.ecommerce_addToShoppingCard?.value === 'AlternateNotFound'
            ) {
              toast({
                message: 'This product already removed',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else if (
              data?.ecommerce_addToShoppingCard?.value === 'OutOfStock'
            ) {
              toast({
                message: 'This product already Out Of Stock',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else if (data?.ecommerce_addToShoppingCard?.[0]?.code !== 1) {
              toast({
                message: data?.ecommerce_addToShoppingCard?.[0]?.description,
              });
            }
          },
        },
      );
    } else {
      const currentItem = shoppingBasketList?.filter(
        i => i?.productId === productId,
      )?.[0];
      const input = {
        productId: productId,
        alternateId: null,
        quantity: currentItem ? currentItem?.quantity + 1 : 1,
        product: productDetail,
      };
      setShoppingBasketList([
        ...shoppingBasketList.filter(i => i?.productId !== productId),
        input,
      ]);
      setAddToCard(true);
    }
  };

  useEffect(() => {
    if (productDetail?.alternates?.[0]?.attributes) {
      setselectAttributes(
        JSON?.parse(productDetail?.alternates?.[0]?.attributes),
      );
    }
  }, [data]);

  const {mutate: mutateRemoveAllWishlist, isLoading: isLoadingRemoveWishlist} =
    useRemoveFromAllWishList();
  const removeProductFromAllWishlist = () => {
    mutateRemoveAllWishlist(
      {entityName: 'product', entityIdList: [productId]},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getProducts']);
        },
      },
    );
  };

  const productImages = productDetail?.productImages?.filter(
    item => item?.imageUrl !== '',
  );

  const productVideos = productDetail?.productVideos;

  const {data: wishlistData}: any = useGetWishLists({
    entityName: 'product',
    entityId: productId,
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
      {wishListId: wishlistAllItemsId, entityIdList: [productId]},
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

  const Header = () => {
    return (
      <>
        <Layer>
          {productImages?.[0] ? (
            <>
              {productImages?.[0]?.imageUrl && (
                <Image
                  source={{uri: productImages?.[0]?.imageUrl}}
                  style={styles.imageContainer}
                  resizeMode="cover"
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:
                    productImages?.length + productVideos?.length > 3
                      ? 'space-between'
                      : 'flex-start',
                }}>
                {[1, 2, 3]?.map((item, index) => {
                  return productImages?.[item] ? (
                    <TouchableOpacity
                      key={`index-${index}`}
                      disabled={index !== 2}
                      onPress={() =>
                        navigateWithName('Gallery', {
                          item: {
                            images: productDetail?.productImages.filter(
                              i => i?.imageUrl !== '',
                            ),
                            videos:
                              productVideos?.[
                                item - (4 - productImages?.length)
                              ],
                          },
                        })
                      }>
                      <View
                        style={{
                          ...styles.imageView,
                          marginHorizontal: index === 1 ? 10 : 0,
                        }}>
                        <Image
                          source={{
                            uri: productImages?.[item]?.imageUrl,
                          }}
                          style={{
                            ...styles.imageThumbnail,
                            opacity:
                              index === 2 && productImages?.[item] ? 0.5 : 1,
                          }}
                          resizeMode="cover"
                        />
                        {index === 2 && productImages?.[item] ? (
                          <Typography style={styles.thumbnailText}>
                            See more
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    productVideos?.[item - (4 - productImages?.length)] && (
                      <TouchableOpacity
                        style={{
                          ...styles.thumbnailVideo,
                          opacity:
                            index === 2 &&
                            productVideos?.[item - (4 - productImages?.length)]
                              ? 0.5
                              : 1,
                        }}
                        onPress={() =>
                          index === 2 &&
                          productVideos?.[item - (4 - productImages?.length)]
                            ? navigateWithName('Gallery', {
                                item: {
                                  images: productDetail?.productImages.filter(
                                    i => i?.imageUrl !== '',
                                  ),
                                  videos: productVideos,
                                },
                              })
                            : navigateWithName('video player', {
                                url: productVideos?.[
                                  item - (4 - productImages?.length)
                                ]?.videoUrl,
                              })
                        }>
                        <PlayIconSet
                          fill={getColor({color: 'gray.50'})}
                          color={getColor({color: 'gray.50'})}
                        />
                        {index === 2 &&
                        productVideos?.[item - (4 - productImages?.length)] ? (
                          <Typography
                            color={'gray.50'}
                            style={styles.thumbnailText}>
                            See more
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </TouchableOpacity>
                    )
                  );
                })}
              </View>
            </>
          ) : (
            <Layer style={styles.emptyContainer}></Layer>
          )}
          <TouchableOpacity
            onPress={() =>
              token
                ? data?.pages?.[0]?.isInWishList
                  ? removeProductFromAllWishlist()
                  : addToAllItems()
                : setIsModalUserLoggedInVisible(true)
            }
            style={styles.heartButton}>
            {isLoadingRemoveWishlist || addLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <HeartIcon
                fill={
                  data?.pages?.[0]?.isInWishList
                    ? getColor({color: 'error.500'})
                    : getColor({color: 'gray.400'})
                }
                width={15}
                height={15}
                isLiked={data?.pages?.[0]?.isInWishList}
                onPress={() =>
                  token
                    ? data?.pages?.[0]?.isInWishList
                      ? removeProductFromAllWishlist()
                      : addToAllItems()
                    : setIsModalUserLoggedInVisible(true)
                }
              />
            )}
          </TouchableOpacity>
          <View style={styles.arrowRightContainer}>
            <Layer style={styles.arrowContianer}>
              <TouchableOpacity
                onPress={() =>
                  navigateWithName('productList', {
                    item: item?.item?.product?.category,
                    category: item?.item?.product?.category,
                  })
                }>
                <Typography color={'gray.400'} style={styles.headerText}>
                  {productDetail?.category}
                </Typography>
              </TouchableOpacity>
              <ArrowRightIconSet />
              <Typography style={styles.subcategoryText}>
                {productDetail?.subcategory}
              </Typography>
            </Layer>
            <View style={styles.arrowContianer}>
              {productDetail?.objectUrl && productConfig?.ar !== false && (
                <TouchableOpacity
                  onPress={() =>
                    navigateWithName('unity screen', {
                      url: productDetail?.objectUrl,
                      type: '360View',
                      mainColor: getColor({color: 'gray.500'}),
                    })
                  }
                  style={styles.unityButton}>
                  <View360UnityIcon width={32} height={32} />
                </TouchableOpacity>
              )}
              {productDetail?.objectUrl && productConfig?.ar !== false && (
                <TouchableOpacity
                  onPress={() =>
                    navigateWithName('unity screen', {
                      url: productDetail?.objectUrl,
                      type: productDetail?.objectType || 'player2',
                    })
                  }>
                  <UnityIcon width={26} height={26} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={5}
            flexWrap={'wrap'}>
            <Typography
              style={{
                ...styles.titleText,
                marginRight:
                  user?.id === productDetail?.userId ||
                  user?.userType === 'OWNER'
                    ? 100
                    : 50,
              }}>
              {productDetail?.title}
            </Typography>
          </HStack>
          <View style={styles.rateContainer}>
            {RateReviewConfig?.rate !== false && (
              <Rating
                type="numberic"
                rating={productDetail?.rateAverage}
                onChange={() => {}}
                style={styles.ratingStyle}
              />
            )}
            {RateReviewConfig?.review !== false && (
              <Typography style={styles.reviewText}>
                {' '}
                (
                {productDetail?.rateCount === 1
                  ? `${productDetail?.rateCount} Review`
                  : `${productDetail?.rateCount} Reviews`}
                )
              </Typography>
            )}
          </View>
          <HStack>
            {!outOfStock && <Typography style={styles.usText}>US</Typography>}
            <Typography
              color={data?.pages[0]?.promotion?.discount ? '' : 'primary.500'}
              style={{
                ...styles.outOfStackText,
                textDecorationLine:
                  !outOfStock && data?.pages[0]?.promotion?.discount
                    ? 'line-through'
                    : 'none',
              }}>
              {outOfStock
                ? 'Sold out'
                : ` $${formatPrice(productDetail?.price)}`}
            </Typography>
            {data?.pages[0]?.promotion?.discount && !outOfStock && (
              <Typography color={'error.500'} style={styles.discountPrice}>
                ${formatPrice(data?.pages[0]?.finalPrice)}
              </Typography>
            )}
          </HStack>

          {productDetail?.attributes?.map(i => {
            const selectedAtt = selectAttributes?.filter(
              val => val?.Name === i?.name,
            )?.[0]?.Value;

            return (
              i?.values !==
                'System.Collections.Generic.List`1[System.String]' && (
                <>
                  <Typography color={'gray.500'} style={styles.featureName}>
                    {i?.name}
                  </Typography>
                  {i?.name === 'Color' ? (
                    <SelectColor
                      data={JSON.parse(i?.values)}
                      color={selectedAtt}
                      setColor={a =>
                        setselectAttributes([
                          ...selectAttributes?.filter(
                            it => it?.Name !== i?.name,
                          ),
                          {Name: i?.name, Value: a},
                        ])
                      }
                    />
                  ) : (
                    <ScrollView horizontal>
                      {JSON.parse(i?.values)?.map?.(a => (
                        <TouchableOpacity
                          key={a}
                          style={{
                            backgroundColor:
                              selectedAtt === a
                                ? getColor({color: 'background.500'})
                                : getColor({color: 'primary.100'}),

                            borderWidth: selectedAtt === a ? 1 : 0,
                            ...styles.selectedContainer,
                          }}
                          onPress={() =>
                            setselectAttributes([
                              ...selectAttributes?.filter(
                                it => it?.Name !== i?.name,
                              ),
                              {Name: i?.name, Value: a},
                            ])
                          }>
                          <Typography>{a}</Typography>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </>
              )
            );
          })}

          <Typography style={styles.aboutProductText}>About Product</Typography>
          <Description
            style={styles.descriptionStyle}
            onPressNavigate={(name, params) => navigateWithName(name, params)}>
            {productDetail?.description}
          </Description>
          {productDetail?.brand && (
            <Typography style={styles.brandText}>
              Brand: {productDetail?.brand}
            </Typography>
          )}
          {productDetail?.quality && (
            <Typography style={styles.conditionText}>
              Condition: {productDetail?.quality?.replace('_', ' ')}
            </Typography>
          )}
          {productDetail?.legalDisclaimer && (
            <Typography style={styles.disclaimerText}>
              Legal Disclaimer: {productDetail?.legalDisclaimer}
            </Typography>
          )}

          {featureData?.length > 0 && (
            <>
              <Typography style={styles.featureText}>Features</Typography>
              <Layer style={styles.feature}>
                {featureData.map(item => {
                  return (
                    item?.value && (
                      <HStack justifyContent={'space-between'} m={2}>
                        <Typography
                          numberOfLines={1}
                          style={styles.featureTitle}>
                          {item?.title}
                        </Typography>
                        <Typography
                          numberOfLines={1}
                          style={styles.featureValue}>
                          {item?.value}
                        </Typography>
                      </HStack>
                    )
                  );
                })}
              </Layer>
            </>
          )}
        </Layer>
        <Layer style={styles.rateReview}>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            mx={1}
            style={{}}>
            <TouchableOpacity
              onPress={() => [
                setShowReviewDetail(!showReviewDetail),
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                ),
              ]}
              style={styles.rateContainer}>
              {showReviewDetail ? (
                <ArrowUpIconSet style={styles.arrowIcon} />
              ) : (
                <ArrowDownIconSet style={styles.arrowIcon} />
              )}
              <Typography style={styles.rateReviewText}>
                Rate & Review
              </Typography>
            </TouchableOpacity>
          </HStack>
          {showReviewDetail && (
            <View style={styles.rateContainer}>
              {RateReviewConfig?.rate !== false && (
                <Rating
                  type="numberic"
                  rating={productDetail?.rateAverage}
                  onChange={() => {}}
                  style={styles.ratingStyle}
                />
              )}
              {RateReviewConfig?.review !== false && (
                <Typography style={styles.rateText}>
                  {' '}
                  (
                  {productDetail?.rateCount === 1
                    ? `${productDetail?.rateCount} Review`
                    : `${productDetail?.rateCount} Reviews`}
                  )
                </Typography>
              )}
            </View>
          )}
          {showReviewDetail && RateReviewConfig?.rate !== false && (
            <View style={styles.ratePercentContainer}>
              {[5, 4, 3, 2, 1].map(item => {
                const ratePercent = {
                  1: productDetail?.ratePercent_1,
                  2: productDetail?.ratePercent_2,
                  3: productDetail?.ratePercent_3,
                  4: productDetail?.ratePercent_4,
                  5: productDetail?.ratePercent_5,
                };
                return (
                  <HStack flex={1} justifyContent={'space-between'}>
                    <Rating
                      type="numberic"
                      rating={item}
                      style={styles.ratingStyle}
                    />
                    <Progress progress={ratePercent[item]} />
                  </HStack>
                );
              })}
            </View>
          )}
        </Layer>
        <TouchableOpacity
          onPress={() =>
            token
              ? setIsReviewModalVisible(true)
              : setIsModalUserLoggedInVisible(true)
          }
          style={styles.writeReviewButton}>
          <AddIconSet color={getColor({color: 'primary.400'})} style={{}} />
          <Typography
            color={'primary.400'}
            style={styles.writeReviewButtonText}>
            {RateReviewConfig?.review !== false
              ? 'Write a Review'
              : 'Leave a Rate'}
          </Typography>
        </TouchableOpacity>
      </>
    );
  };
  const renderItem = ({item}) => {
    return (
      item !== undefined && (
        <TouchableOpacity
          style={{
            backgroundColor:
              item?.review?.id === selectedReview?.id
                ? isDark()
                  ? getColor({color: 'primary.800'})
                  : getColor({color: 'primary.100'})
                : getColor({color: 'background.500'}),
            // borderRadius:10
          }}
          onLongPress={() => setSelectReview(item?.review)}>
          <ReviewItem item={item} productId={productId} />
        </TouchableOpacity>
      )
    );
  };

  const icons = useMemo(() => {
    return (
      <Pressable onPress={() => setIsModalVisible(true)}>
        <ThreeDotsIcon style={styles.threeDots} />
      </Pressable>
    );
  }, []);
  const {} = useHeader({
    hidden: selectedReview ? true : false,
    icons: icons,
  });

  return (
    <View>
      {selectedReview && (
        <ReviewSelectedHeader
          isAdmin={
            user?.id === productDetail?.userId || user?.userType === 'OWNER'
          }
          item={{...selectedReview, productId}}
          onClose={() => setSelectReview(null)}
        />
      )}
      {!isLoading && !isOwner && (
        <Button
          style={styles.addToCard}
          onPress={() => addToCard()}
          variant={addedToCard ? 'outline' : 'solid'}
          isLoading={isLoadingAddToShop}
          backgroundColor={
            outOfStock
              ? getColor({color: 'primary.200'})
              : addedToCard
              ? getColor({color: 'background.500'})
              : data?.pages[0]?.promotion?.discount
              ? getColor({color: 'error.500'})
              : getColor({color: 'primary.500'})
          }
          borderColor={
            data?.pages[0]?.promotion?.discount
              ? getColor({color: 'error.500'})
              : getColor({color: 'primary.500'})
          }
          disabled={outOfStock}>
          <Typography
            color={
              addedToCard
                ? data?.pages[0]?.promotion?.discount
                  ? getColor({color: 'error.500'})
                  : getColor({color: 'primary.500'})
                : isDark()
                ? 'gray.800'
                : 'background.100'
            }
            style={styles.AddToCartText}>
            {outOfStock ? 'Sold out!' : addedToCard ? 'Added!' : 'Add to Cart'}
          </Typography>
        </Button>
      )}
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <Scrollable style={styles.scrollableStyle}>
          <RateReview
            id={productId}
            targetName="Product"
            itemName={productDetail?.title}
            isOpen={isReviewModalVisible}
            onClose={() => setIsReviewModalVisible(false)}
            hasReview={RateReviewConfig?.review !== false}
            hasTitle={true}
            hasRate={RateReviewConfig?.rate !== false}
          />
          <FlatList
            keyExtractor={(_, index) => `index-${index}`}
            data={RateReviewConfig?.review !== false ? reviews?.pages : []}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
            }}
            style={styles.flatlist}
            ItemSeparatorComponent={() => <View style={styles.seprate} />}
            renderItem={renderItem}
            ListHeaderComponent={Header}
            ListFooterComponent={() => {
              return <View style={styles.footer} />;
            }}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </Scrollable>
      )}
      <ProductDetailModal
        item={productDetail}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <WishListBoardModal
        entityName="product"
        item={data?.pages?.[0]}
        isVisible={isWishListVisible}
        onVisible={() => setIsWishListVisible(true)}
        onClose={() => setIsWishListVisible(false)}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  footer: {height: 200},
  seprate: {width: 10, height: 10},
  toastContainer: {top: 70},
  usText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  rateContainer: {flexDirection: 'row', alignItems: 'center'},
  emptyContainer: {
    width: '100%',
    height: 180,
    backgroundColor: getColor({color: 'gray.50'}),
    alignSelf: 'center',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeDots: {transform: [{rotate: '90deg'}], marginHorizontal: 5},
  addToCard: {
    width: '100%',
    marginTop: 40,
    height: 49,
    position: 'absolute',
    zIndex: 5,
    bottom: 10,
  },
  scrollableStyle: {
    zIndex: 2,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 4,
  },
  AddToCartText: {
    fontWeight: '700',
  },
  flatlist: {overflow: 'visible'},
  feature: {
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 5,
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  rateReview: {
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9,
    padding: 10,
    borderRadius: 15,
    margin: 5,
    marginTop: 24,
    marginBottom: 8,
    elevation: 5,
  },
  featureTitle: {flex: 1, fontSize: 15, fontWeight: '600'},
  featureValue: {flex: 2.2, fontSize: 15, fontWeight: '600'},
  ratingStyle: {alignSelf: 'flex-start'},
  container: {
    flex: 1,
  },
  imageView: {justifyContent: 'center'},
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: getColor({color: 'gray.50'}),
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageThumbnail: {
    width: deviceWidth / 3 - 25,
    height: deviceWidth / 3 - 25,
    backgroundColor: getColor({color: 'gray.50'}),
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailText: {
    zIndex: 2,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  thumbnailVideo: {
    width: deviceWidth / 3 - 25,
    height: deviceWidth / 3 - 25,
    backgroundColor: getColor({color: 'gray.800'}),
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailVideoText: {
    zIndex: 2,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: getColor({color: 'background.500'}),
    padding: 10,
    borderRadius: 100,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  unityButton: {
    marginLeft: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  subcategoryText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  aboutProductText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  conditionText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  disclaimerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  featureContainer: {
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 5,
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
  rateReviewContainer: {
    backgroundColor: getColor({color: 'background.400'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9,
    padding: 10,
    borderRadius: 15,
    margin: 5,
    marginTop: 24,
    marginBottom: 8,
    elevation: 5,
  },
  rateReviewText: {
    fontSize: 18,
    fontWeight: '700',
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '400',
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: getColor({color: 'primary.400'}),
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 16,
  },
  writeReviewButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  reviewItemContainer: {
    backgroundColor: getColor({color: 'background.500'}),
  },
  loadIndicatorContainer: {
    height: 200,
  },
  arrowRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  arrowContianer: {flexDirection: 'row'},
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  selectedContainer: {
    padding: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 10,
    borderColor: getColor({color: 'primary.500'}),
  },
  descriptionStyle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
  unityButton: {marginRight: 10},
  rateText: {fontSize: 14, fontWeight: '400'},
  ratePercentContainer: {marginVertical: 12, marginTop: 16},
  titleText: {fontSize: 20, fontWeight: '600', textTransform: 'capitalize'},
  outOfStackText: {fontSize: 18, fontWeight: '700', marginTop: 10},

  arrowIcon: {marginRight: 10},
});
