import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layer from '../../../atoms/Layer';
import {getColor} from '../../../elemental/helper';
import Typography from '../../../atoms/Typography';
import {
  RoundedEditIcon,
  useNavigate,
  isDark,
  LoadIndicator,
  TreeDotIcon,
  DrawerKit,
  Button,
  useDrawer,
  useRoute,
} from '../../../elemental';
import useAuthStore from '~/stores/authStore';
import {useQueryClient} from 'react-query';
import {
  useEditShopingAddress,
  useRemoveAddress,
  useUpdateProfile,
  useUpdateShoppingCard,
} from '../hook';
import OptionsActionSheet from './OptionsActionSheet';
import useHeader from '~/components/elemental/hooks/use_header';
import DeleteConfirmModal from './Modals/DeleteConfirmModal';

const ListShippingAddressItem = ({item}) => {
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();
  const route: any = useRoute();

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const user = useAuthStore(state => state?.user);
  const {mutate: updateUserMutate, isLoading} = useUpdateProfile();
  const {mutate: editMutate, isLoading: isLoadingShipping} =
    useEditShopingAddress();

  const {mutate: mutateUpdateShoppingCard, isLoading: isLoadingShoppingCard} =
    useUpdateShoppingCard();
  const {} = useHeader({
    title: {children: 'Addresses', fontSize: 'md', fontWeight: 'bold'},
  });

  const updateUser = () => {
    const userInput = {
      state: item?.state,
      zipCode: item?.zipcode,
      city: item?.city,
      streetAddress: item?.street,
      phoneNumber: item?.phoneNumber,
      location:
        item?.street +
        ' ' +
        item?.city +
        ' ' +
        item?.state +
        ' ' +
        item?.country +
        ' ' +
        item?.zipcode,
    };

    const input = {
      id: item?.id,
      isDefault: true,
    };
    editMutate(
      {input},
      {
        onSuccess(data: any, variables, context) {
          queryClient.invalidateQueries(['getOrderAddress']);
          if (
            data?.shippingAddress_updateShippingAddress?.status?.value ===
            'Success'
          ) {
            const inputShopping = {
              id: route?.params?.item?.id,
              shippingAddressId: item?.id,
            };

            if (route?.params?.item?.id) {
              mutateUpdateShoppingCard(
                {input: inputShopping},
                {
                  onSuccess(data, variables, context) {
                    queryClient.refetchQueries(['getShoppingCards']);
                  },
                },
              );
            }

            updateUserMutate(
              {
                userId: user?.id,
                userInput,
              },
              {
                onSuccess(data, variables, context) {
                  queryClient.refetchQueries(['current_user']);
                },
              },
            );
          }
        },
      },
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          minHeight: 73,
          marginVertical: 4,
          borderRadius: 15,
          backgroundColor: getColor({color: 'background.400'}),
          shadowColor: '#0002',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.5,
          shadowRadius: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderWidth: 1,
          borderColor: item?.isDefault
            ? getColor({color: 'primary.500'})
            : getColor({color: 'background.500'}),
          elevation: 5,
        }}
        onPress={() => updateUser()}>
        {isLoading || isLoadingShipping || isLoadingShoppingCard ? (
          <ActivityIndicator style={{margin: 2}} />
        ) : (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 100,
              borderColor: item?.isDefault
                ? getColor({color: 'primary.500'})
                : isDark()
                ? getColor({color: 'gray.500'})
                : getColor({color: 'gray.300'}),
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item?.isDefault && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: getColor({color: 'primary.500'}),
                  borderRadius: 100,
                }}
              />
            )}
          </View>
        )}
        <Layer style={{flex: 1, alignItems: 'flex-start', marginHorizontal: 8}}>
          <Typography style={{fontSize: 14, fontWeight: '700'}}>
            {item?.addressName}
          </Typography>
          <Typography
            numberOfLines={1}
            style={{fontSize: 14, fontWeight: '400'}}>
            {item?.street}, {item?.city}, {item?.state}, {item?.country}{' '}
            {item?.zipcode}, {item?.number}
          </Typography>
        </Layer>
        <TouchableOpacity
          onPress={() => setIsOpenOptions(true)}
          style={{
            paddingRight: 5,
            zIndex: 2,
          }}>
          <TreeDotIcon />
        </TouchableOpacity>
      </TouchableOpacity>
      <OptionsActionSheet
        hasEdit={true}
        isOpen={isOpenOptions}
        onClose={() => setIsOpenOptions(false)}
        onPressEdit={() => [
          setIsOpenOptions(false),
          navigateWithName('ShippingAddress', {route: 'edit', item}),
        ]}
        onPressDelete={() => setIsDeleteModalVisible(true)}
      />
      <DeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </>
  );
};

export default ListShippingAddressItem;

const styles = StyleSheet.create({});
