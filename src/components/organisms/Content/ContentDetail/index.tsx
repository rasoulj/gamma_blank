import {useRoute} from '@react-navigation/native';
import {HStack, ThreeDotsIcon} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import useAuthStore from '~/stores/authStore';
import {
  AddIconSet,
  Button,
  Description,
  Header as HeaderScreen,
  HeartIcon,
  IMG,
  Image,
  Layer,
  LoadIndicator,
  RateReview,
  Rating,
  Scrollable,
  Typography,
  User2Icon,
  getColor,
  isDark,
  useNavigate,
} from '../../../elemental';

import Pagination from '~/components/atoms/Pagination';
import DownloadFile from '~/components/molecules/DownloadFile';
import {
  useAddToFavorite,
  useCreateBlockUser,
  useCreateViolationReport,
  useGetProducts,
  useGetRatingRate,
  useRemoveFavorite,
} from '../hook';
import ContentDetailModal from './Modals/ContentDetailModal';
import ReviewItem from './ReviewItem';
import ReviewSelectedHeader from './ReviewSelectedHeader';

const ContentDetail = () => {
  const {navigateWithName} = useNavigate();
  const route = useRoute();
  const {item} = route?.params as any;
  const productId = item?.id;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const {user, token, setIsModalUserLoggedInVisible} = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCard, setAddToCard] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedReview, setSelectReview] = useState(null);

  const {data, isLoading}: any = useGetProducts({
    where: {
      product: {
        id: {
          eq: productId,
        },
      },
    },
  });
  const [isLiked, setIsLiked] = useState(data?.pages?.[0]?.isFavorite);

  useEffect(() => {
    setIsLiked(data?.pages?.[0]?.isFavorite);
  }, [data?.pages?.[0]?.isFavorite]);

  const productDetail = data?.pages?.[0]?.product || [];

  const pages = useMemo(() => {
    return item?.pages ? JSON.parse(item?.pages) : [];
  }, [item]);

  const {mutate: mutateAddToFavorite} = useAddToFavorite();
  const {mutate: mutateRemoveFavorite} = useRemoveFavorite();

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
    navigateWithName('Payment', productDetail);

    // const input = {
    //   productId: productId,
    //   color: color,
    // };
    // mutate(
    //   {input},
    //   {
    //     onSuccess(data: any, variables, context) {
    //       if (data?.ecommerce_addToShoppingCard?.status?.value === 'Success') {
    //         // setAddToCard(true);
    //         setTimeout(() => {
    //           setAddToCard(false);
    //         }, 3000);
    //       }
    //     },
    //   },
    // );
  };

  const AddToFavorite = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      mutateRemoveFavorite(
        {productId: productId},
        {
          onSuccess(data, variables, context) {
            console.log(data);
            if (data) {
              setIsLiked(false);
              queryClient.invalidateQueries('getContentProducts');
            }
          },
        },
      );
    } else {
      const input = {
        productId: productId,
      };
      mutateAddToFavorite(input, {
        onSettled(data: any, error, variables, context) {
          console.log(data);
          if (
            data?.ecommerceFavorite_createFavorite?.status?.value === 'Success'
          ) {
            setIsLiked(true);
            queryClient.invalidateQueries('getContentProducts');
          }
        },
      });
    }
  };

  const onPageChange = numPage => {
    setCurrentPage(numPage);
  };

  console.log('contnet render');

  const Header = () => {
    return (
      <>
        <Layer style={{margin: 5}}>
          <Layer
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 16,
            }}>
            <Layer style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigateWithName('profile', {item: item?.user})}>
                {item?.user?.photoUrl ? (
                  <IMG
                    src={item?.user?.photoUrl}
                    style={{width: 38, height: 38, borderRadius: 50}}
                  />
                ) : (
                  <User2Icon width={38} height={38} />
                )}
              </TouchableOpacity>
              <Typography
                style={{marginLeft: 8, fontSize: 14, fontWeight: '500'}}>
                {item?.user?.fullName}
              </Typography>
            </Layer>
            {/* {user?.id === productDetail?.userId ? (
              <Pressable onPress={() => setIsModalVisible(true)}>
                <ThreeDotsIcon
                  style={{transform: [{rotate: '90deg'}], marginHorizontal: 5}}
                />
              </Pressable>
            ) : ( */}
              <TouchableOpacity
                onPress={() =>
                  token ? AddToFavorite() : setIsModalUserLoggedInVisible(true)
                }
                style={{
                  backgroundColor: getColor({
                    color: isLiked ? 'primary.500' : 'background.500',
                  }),
                  padding: 10,
                  borderRadius: 100,
                }}>
                <HeartIcon
                  isLiked={isLiked}
                  onPress={() =>
                    token
                      ? AddToFavorite()
                      : setIsModalUserLoggedInVisible(true)
                  }
                  style={{width: 20, height: 20}}
                  color="gray.50"
                  borderColor="primary.500"
                />
              </TouchableOpacity>
            {/* )} */}
          </Layer>
          {productDetail?.productImages?.[0] && currentPage === 1 && (
            <Image
              source={{uri: productDetail?.productImages?.[0]?.imageUrl}}
              style={{
                width: '100%',
                height: 180,
                backgroundColor: '#EBEBEB',
                alignSelf: 'center',
                borderRadius: 11,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              resizeMode="cover"
            />
          )}
          {currentPage !== 1 && (
            <DownloadFile files={pages?.[currentPage - 1]?.files} />
          )}

          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={5}
            flexWrap={'wrap'}>
            <Typography
              style={{
                fontSize: 18,
                fontWeight: '700',
                textTransform: 'capitalize',
                marginRight: user?.id === productDetail?.userId ? 100 : 50,
              }}>
              {pages?.[currentPage - 1]?.title || productDetail?.title}
            </Typography>
          </HStack>

          <Rating
            rating={productDetail?.rateAverage || 0}
            onChange={() => {}}
            style={{alignSelf: 'flex-start'}}
          />
          <Layer
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography
              color={'gray.500'}
              style={{
                fontSize: 12,
                fontWeight: '500',
                textTransform: 'capitalize',
                marginRight: user?.id === productDetail?.userId ? 100 : 50,
              }}>
              {productDetail?.category}
            </Typography>
            {user?.id !== productDetail?.userId && (
              <Typography
                color={'secondary.500'}
                style={{fontSize: 22, fontWeight: '700'}}>
                ${productDetail?.price}
              </Typography>
            )}
          </Layer>
          {user?.id !== productDetail?.userId && (
            <Button
              style={{marginTop: 40, height: 49}}
              onPress={() =>
                token ? addToCard() : setIsModalUserLoggedInVisible(true)
              }
              variant={'solid'}
              backgroundColor={getColor({color: 'primary.500'})}
              disabled={productDetail?.soldOut}>
              <Typography
                color={'background.500'}
                style={{
                  fontWeight: '700',
                }}>
                Pay
              </Typography>
            </Button>
          )}
          <Typography style={{fontSize: 18, fontWeight: '700', marginTop: 30}}>
            Descriptions
          </Typography>
          <Description
            color={'gray.800'}
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginTop: 8,
            }}
            onPressNavigate={(name, params) => navigateWithName(name, params)}>
            {pages[currentPage - 1]?.description || productDetail?.description}
          </Description>
          <View style={{height: 10}} />
          <Pagination
            totalPages={pages?.length}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </Layer>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          mx={1}
          style={{marginTop: 24, marginBottom: 8}}>
          <Typography style={{fontSize: 18, fontWeight: '700'}}>
            Reviews
          </Typography>
          <TouchableOpacity
            onPress={() =>
              token
                ? setIsReviewModalVisible(true)
                : setIsModalUserLoggedInVisible(true)
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: getColor({color: 'primary.400'}),
              borderWidth: 2,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <AddIconSet color={getColor({color: 'primary.400'})} style={{}} />
            <Typography
              color={'primary.400'}
              style={{fontSize: 14, fontWeight: '700'}}>
              Write a Review
            </Typography>
          </TouchableOpacity>
        </HStack>
      </>
    );
  };
  const renderItem = ({item}) => {
    return (
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
        <ReviewItem item={item} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {selectedReview ? (
        <ReviewSelectedHeader
          isAdmin={user?.id === productDetail?.userId}
          item={selectedReview}
          onClose={() => setSelectReview(null)}
        />
      ) : (
        <HeaderScreen title="Content" style={{marginHorizontal: 5}}>
          {/* {user?.id !== productDetail?.userId && ( */}
          <Pressable onPress={() => setIsModalVisible(true)}>
            <ThreeDotsIcon
              style={{transform: [{rotate: '90deg'}], marginHorizontal: 5}}
            />
          </Pressable>
          {/* )} */}
        </HeaderScreen>
      )}

      {isLoading ? (
        <LoadIndicator />
      ) : (
        <Scrollable style={{}}>
          <RateReview
            id={productId}
            targetName="Content"
            itemName={productDetail?.title}
            isOpen={isReviewModalVisible}
            onClose={() => setIsReviewModalVisible(false)}
            hasReview={true}
          />
          <FlatList
            data={reviews?.pages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
            }}
            ItemSeparatorComponent={() => (
              <View style={{width: 10, height: 10}} />
            )}
            renderItem={renderItem}
            ListHeaderComponent={Header}
            ListFooterComponent={() => {
              return <View style={{height: 100}} />;
            }}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </Scrollable>
      )}
      <ContentDetailModal
        item={productDetail}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default ContentDetail;

const styles = StyleSheet.create({});
