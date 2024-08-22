import React, {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  getColor,
  HStack,
  Layer,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
  Typography,
  VStack,
  useToast,
  isDark,
  MarketPlusIcon,
  CloseIconSet,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import ShoppingBasketIcon from '~/assets/icons/CustomIcons/ShoppingBasket.icon';

const OrderItem = ({
  item,
  type = 'order',
}: {
  item: any;
  type: 'tracking' | 'order';
}) => {
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const [isWishListVisible, setIsWishListVisible] = useState(false);
  const [count, setCount] = useState(1);
  const {toast} = useToast();
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

  const currentItem = shoppingBasketList?.filter(
    i => i?.productId === item?.product?.id,
  )?.[0];

  console.log(item?.alternateId);

  return (
    <HStack
      bg={getColor({color: 'background.400'})}
      borderWidth={0}
      borderRadius="xl"
      justifyContent={'space-between'}
      style={{
        width: '100%',
        backgroundColor: getColor({color: 'background.400'}),
        shadowColor: '#0002',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        padding: 16,
        elevation: 5,
      }}>
      <HStack flex={1} alignItems={'center'}>
        {item?.product?.productImages[0]?.imageUrl ? (
          <Image
            source={{uri: item?.product?.productImages[0]?.imageUrl}}
            style={{
              width: 77,
              height: 104,
              alignSelf: 'center',
              borderRadius: 8,
              backgroundColor: getColor({color: 'gray.400'}),
            }}
            resizeMode="cover"
          />
        ) : (
          <ShoppingBasketIcon width={65} />
        )}
        <VStack ml={2}>
          <Typography style={{fontWeight: '500', fontSize: 14}}>
            {item?.product?.title}
          </Typography>
          <Layer style={{flexDirection: 'row'}}>
            {item?.alternate?.attributes &&
              JSON?.parse(item?.alternate?.attributes)?.map((i, index) => {
                return (
                  <>
                    {index === 0 ? null : (
                      <Typography
                        color={'gray.500'}
                        style={{fontSize: 12, fontWeight: '500'}}>
                        {' '}
                        -{' '}
                      </Typography>
                    )}
                    {i?.Name === 'Color' ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Typography
                          color={'gray.500'}
                          style={{fontSize: 12, fontWeight: '500'}}>
                          {i?.Value?.split('- ')?.[1]}
                        </Typography>
                        {/* <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: i?.Value?.split('- ')?.[1],
                        borderRadius: 100,
                      }}
                    /> */}
                      </View>
                    ) : (
                      <Typography
                        color={'gray.500'}
                        style={{fontSize: 12, fontWeight: '500'}}>
                        {i?.Value}
                      </Typography>
                    )}
                  </>
                );
              })}
          </Layer>
          <Typography style={{fontWeight: '700', fontSize: 16}}>
            ${item?.product?.price}
          </Typography>
          <View style={{height: 16}} />
          <TouchableOpacity
            onPress={() =>
              token
                ? type === 'tracking'
                  ? navigateWithName('Return')
                  : setIsWishListVisible(true)
                : setIsModalUserLoggedInVisible(true)
            }>
            <Typography
              color={'secondary.500'}
              style={{
                fontWeight: '600',
                fontSize: 15,
                textDecorationLine: 'underline',
              }}>
              {type === 'tracking'
                ? 'Return this product'
                : item?.product?.wishLists?.length > 0
                ? 'Added to wishlist'
                : 'Add to wishlist'}
            </Typography>
          </TouchableOpacity>
        </VStack>
      </HStack>
      {/* <VStack justifyContent={'space-between'}>
        {type !== 'tracking' ? (
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => Remover()}>
            <Trash2Icon color={'primary.500'} onPress={() => Remover()} />
          </TouchableOpacity>
        ) : (
          <Layer />
        )}
        <HStack
          alignSelf={'flex-end'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {type !== 'tracking' && (
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => ShoppingCardCounter(-1)}>
              <MinusIcon
                color={getColor({color: count > 1 ? 'error.500' : '#999'})}
              />
            </TouchableOpacity>
          )}
          {isLoading || isLoadingRemove ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Typography
              style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 16}}>
              {item?.quantity || count}
            </Typography>
          )}
          {type !== 'tracking' && (
            <CloseIconSet
              style={{padding: 5, transform: [{rotate: '45deg'}]}}
              onPress={() => ShoppingCardCounter(1)}
              color={getColor({color: 'primary.400'})}
            />
          )}
        </HStack>
      </VStack> */}
    </HStack>
  );
};

export default OrderItem;
