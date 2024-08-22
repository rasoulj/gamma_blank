import {Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  Screen,
  verticalScale,
  CloseIcon,
  ArrowBackIcon,
  PlusIcon,
  useMutation,
  graphqlFetcher,
  useToast,
  scale,
  Scrollable,
  View,
  Text,
  Button,
  HStack,
  Center,
  VStack,
} from '~/components/elemental';
import styles from './styles';
import {useGetItems} from './hooks';
import {gql} from 'graphql-request';
import {useQueryClient} from 'react-query';

const features = [
  {
    title: 'Energy',
    desc: 'A+++',
  },
  {
    title: 'Capacity',
    desc: '230',
  },
  {
    title: 'Dimention',
    desc: '1950*650*700',
  },
  {
    title: 'Digital panel',
    desc: 'No',
  },
  {
    title: 'Floors',
    desc: '4',
  },
  {
    title: 'Drawer',
    desc: '2',
  },
  {
    title: 'Product ID',
    desc: '12345678',
  },
];

const shipping = [
  {
    title: 'Ruturns',
    desc: 'Not accepted',
  },
  {
    title: 'Warranty',
    desc: '3 years',
  },
  {
    title: 'after sales service',
    desc: '6 month',
  },
];

const ItemDetails = ({
  id,
  isAddToFavorite = false,
  isAddToCard = false,
}: {
  id: number;
  isAddToFavorite: boolean;
  isAddToCard: boolean;
}) => {
  const {toast} = useToast();
  const queryClient = useQueryClient();

  const {isLoading, error, data: data1} = useGetItems({itemId: id});
  const {mutate, isLoading: isLoadingAddToCard} = useMutation(args => {
    return graphqlFetcher(ADD_TO_CARD, args);
  });
  const item = data1?.ecommerce_getItem?.result;

  console.log(item, error);
  let totalPrice = 0;
  item?.shoppingCardDetails?.forEach(el => {
    totalPrice += el?.item?.price;
  });

  const addToCardPress = () => {
    let cardInput = {
      itemId: item?.id,
      quantity: 1,
    };

    mutate(
      {cardInput},
      {
        onSuccess: success => {
          console.log('Success', success);
          queryClient.invalidateQueries('getItems');
          toast({message: 'Add to Shop card success!'});
        },
        onError: error => {
          console.log('error', error);

          toast({message: error.toString()});
        },
      },
    );
  };

  const ItemShopCard = ({el}: {el: any}) => {
    return (
      <View style={[styles.commonView]}>
        <Text fontWeight="500">{el?.key}</Text>
        <Text fontWeight="500">{el?.value || 0}</Text>
      </View>
    );
  };

  return (
    <Screen isLoading={isLoading || isLoadingAddToCard}>
      <Scrollable
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              position: 'relative',
              borderRadius: 15,
              alignItems: 'flex-start',
              display: 'flex',
              margin: 15,
              // padding: 15,
              // shadowOffset: {width: 1, height: 1},
              // shadowColor: 'rgb(0,0,0)',
              // shadowOpacity: 0.3,
              // shadowRadius: 5,
              // elevation: 15,
              // backgroundColor: 'white',
              width: '90%',
            }}>
            <Image
              source={{uri: item?.imageUrl || ''}}
              style={{
                width: '100%',
                height: verticalScale(190),
                backgroundColor: 'gray',
                // borderTopLeftRadius: 15,
                // borderTopRightRadius: 15,
                borderRadius: 15,
              }}
            />
            <Text pt="4" fontSize={16}>
              {item?.title}
            </Text>
            <Text
              style={[
                styles.title,
                {justifyContent: 'flex-end', marginTop: 8},
              ]}>
              US ${item?.price}
            </Text>
            {/* <StarRating
              rating={5}
              starSize={25}
              style={{marginTop: 10}}
              starStyle={{width: '4%', marginLeft: '-0.5%'}}
              onChange={() => null}
            /> */}
            <VStack space="3" h={90} mt="4">
              <Text>Select color</Text>
              <ScrollView
                contentContainerStyle={{paddingEnd: 30}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                <HStack space="2">
                  {item?.sectionValues?.map(
                    el =>
                      el?.section?.name === 'colors' && (
                        <View
                          size="10"
                          bg={el?.value}
                          borderWidth="0.5"
                          borderRadius="full"
                          borderColor="gray.400"
                        />
                      ),
                  )}
                </HStack>
              </ScrollView>
            </VStack>
            <VStack alignSelf="center" width="100%">
              {isAddToCard ? (
                <Button
                  onPress={addToCardPress}
                  style={{width: '100%', height: verticalScale(40)}}>
                  <Center>
                    <Text color="white" fontWeight="700" fontSize={17}>
                      Add to cart
                    </Text>
                  </Center>
                </Button>
              ) : null}

              {isAddToFavorite ? (
                <TouchableOpacity
                  style={{
                    borderColor: '#1DE9B6',
                    borderWidth: 1,
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: verticalScale(40),
                    borderRadius: 30,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{color: '#1DE9B6'}}
                    fontWeight="700"
                    fontSize={17}>
                    Add to favorites
                  </Text>
                </TouchableOpacity>
              ) : null}
            </VStack>

            <View
              style={{
                marginTop: 35,
              }}>
              <Text style={{width: '85%'}} fontSize={17} fontWeight="600">
                About product
              </Text>

              <Text style={{marginTop: 5}}>{item?.description}</Text>
            </View>
          </View>

          <Center
            style={{
              // margin: 15,
              width: '100%',
            }}>
            <Text alignSelf="flex-start" fontSize={17} fontWeight="600" px={18}>
              Features
            </Text>
            <View
              style={{
                position: 'relative',
                borderRadius: 15,
                width: '90%',
                display: 'flex',
                marginVertical: 15,
                padding: 15,
                shadowOffset: {width: 1, height: 1},
                shadowColor: 'rgb(0,0,0)',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 15,
              }}>
              {item?.sectionValues?.map(
                el =>
                  el?.section?.name === 'features' && (
                    <ItemShopCard {...{el}} />
                  ),
              )}
            </View>
            <Text alignSelf="flex-start" px={18} fontSize={17} fontWeight="600">
              Shipping , returns & payments
            </Text>
            <View
              style={{
                position: 'relative',
                borderRadius: 15,
                width: '90%',
                display: 'flex',
                margin: 15,
                padding: 15,
                shadowOffset: {width: 1, height: 1},
                shadowColor: 'rgb(0,0,0)',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 15,
              }}>
              {item?.sectionValues?.map(
                el =>
                  el?.section?.name === 'shipping' && (
                    <ItemShopCard {...{el}} />
                  ),
              )}
            </View>
          </Center>
        </View>
      </Scrollable>
    </Screen>
  );
};

export default ItemDetails;

export const ADD_TO_CARD = gql`
  mutation ecommerce_addToShoppingCard($cardInput: ShoppingCardInput!) {
    ecommerce_addToShoppingCard(cardInput: $cardInput) {
      status
    }
  }
`;
