import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Image,
  MoreIconSet,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import WishlistModal from './Modals/WishlistModal';
import {useGetProducts, useGetWishlistPosts} from '../hook';
import {GetWishPostImage} from '../../PostWishList/helper';
import {VStack} from 'native-base';

const WishListItem = ({item}: {item?: any}) => {
  const {navigateWithName} = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const entityName = item?.wishList?.entityName;

  const {data: wishlistProductsData} = useGetProducts({
    where: {
      isInWishList: {
        eq: true,
      },
      wishLists: {
        some: {
          id: {
            eq: item?.wishList?.id,
          },
        },
      },
    },
    enabled: entityName === 'product',
  });

  const {data: wishlistPostsData} = useGetWishlistPosts({
    where: {
      isInWishList: {
        eq: true,
      },
      wishLists: {
        some: {
          id: {
            eq: item?.wishList?.id,
          },
        },
      },
    },
    enabled: entityName?.toLowerCase() === 'post',
  });

  const wishlistProducts = wishlistProductsData?.pages;
  const wishlistPosts = wishlistPostsData?.pages;
  const images = useMemo(() => {
    if (entityName === 'product')
      return wishlistProducts?.map(
        (i: any) => i?.product?.productImages?.[0]?.imageUrl,
      );
    else {
      return wishlistPosts?.map((i: any) => GetWishPostImage(i?.post));
    }
  }, [wishlistProducts, wishlistPosts]);

  const itemCounter =
    entityName?.toLowerCase() === 'post'
      ? wishlistPostsData?.totalCount || 0
      : wishlistProducts?.length || 0;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        entityName === 'product'
          ? navigateWithName('productlist', {
              isWishList: true,
              WishlistId: item?.wishList?.id,
              item,
            })
          : navigateWithName('wishlistdetail', {
              isWishList: true,
              WishlistId: item?.wishList?.id,
              item,
            })
      }>
      <View style={styles.header}>
        <View>
          <Typography style={styles.title}>
            {item?.wishList?.name ? item?.wishList?.name : 'All Items'}
          </Typography>
          <Typography style={styles.subtitle}>
            {itemCounter > 1 ? `${itemCounter} items` : `${itemCounter} item`}
          </Typography>
        </View>
        {item && (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <MoreIconSet style={styles.moreIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.imageContainer}>
        <VStack flex="1">
          <Image
            source={{
              uri: images?.[0] ?? undefined,
            }}
            style={[styles.imageBackground, styles.imageStyle]}
            resizeMode="cover"
          />
        </VStack>
        <VStack flex="1">
          <Image
            source={{
              uri: images?.[1],
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        </VStack>
        <VStack flex="1">
          <Image
            source={{
              uri: images?.[2],
            }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Image
            source={{
              uri: images?.[3],
            }}
            style={[styles.thumbnail, styles.bottomRightRadius]}
            resizeMode="cover"
          />
        </VStack>
      </View>
      <WishlistModal
        dtoItem={item}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default WishListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'background.500'}),
    borderRadius: 15,
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  moreIcon: {
    transform: [{rotate: '90deg'}],
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageBackground: {
    flex: 1,
    height: 160,
    marginRight: 1,
  },
  imageStyle: {
    borderBottomLeftRadius: 15,
  },
  thumbnailContainer: {
    width: '30%',
  },
  thumbnail: {
    flex: 1,
    height: 79,
    marginBottom: 1,
  },
  bottomRightRadius: {
    borderBottomRightRadius: 15,
  },
});
