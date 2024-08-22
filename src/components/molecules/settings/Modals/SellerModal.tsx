import config from 'config';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useNavigate} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {useOnBoardUserInStripe, useUpdateUser} from '../hook';

const appConfig = require('../../../../../app.json');

const SellerModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state?.user);
  const setUser = useAuthStore(state => state?.setUser);

  const {mutate: mutateOnBoard, isLoading: isLoadingOnBoard} =
    useOnBoardUserInStripe();

  const deepLink = `${config?.baseURL}share?redirecturl=${String(
    appConfig?.name,
  ).toLocaleLowerCase()}://setting/seller`;

  const OnBoardUserHandler = async (role: 'seller' | 'buyer') => {
    if (role === 'seller') {
      mutateOnBoard(
        {returnUrl: deepLink, refreshUrl: deepLink},
        {
          onSuccess(data) {
            if (
              data?.paymentStripe_onboardUserInStripeConnect?.result?.url ===
              null
            ) {
              changeRole('seller');
            } else if (
              data?.paymentStripe_onboardUserInStripeConnect?.status
                ?.description === 'Already Exists'
            ) {
              changeRole('seller');
            } else {
              navigateWithName('Seller');
              onClose();
            }
          },
        },
      );
    } else {
      changeRole('buyer');
    }
  };

  const {mutate, isLoading} = useUpdateUser();
  const changeRole = async (role: 'seller' | 'buyer') => {
    const userInput = {
      userRole: role,
    };

    mutate(
      {userId: user?.id, userInput},
      {
        onSuccess(data) {
          setUser(data?.user_updateUser?.result);
          onClose();
        },
      },
    );
  };
  return (
    <CustomActionSheet
      animationType="none"
      isVisible={isVisible}
      onClose={onClose}>
      <View style={styles.container}>
        <Layer>
          <Typography color={'green.500'} style={styles.titleText}>
            Being a Seller
          </Typography>
          <Typography color={'gray.400'} style={styles.descriptionText}>
            By being a seller, you can create and sell your own products. There
            would be some new features in your profile.
          </Typography>
          <Layer style={styles.buttonContainer}>
            <Button
              isLoading={isLoading || isLoadingOnBoard}
              style={styles.actionButton}
              variant="solid"
              data-parent="button_box"
              onPress={() => OnBoardUserHandler('seller')}>
              <Typography color={'background.500'} style={styles.buttonText}>
                Let’s Start
              </Typography>
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default SellerModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  titleText: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 8,
  },
  descriptionText: {
    position: 'relative',
    marginTop: 43,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  actionButton: {
    position: 'relative',
    width: '47%',
    height: 36,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
