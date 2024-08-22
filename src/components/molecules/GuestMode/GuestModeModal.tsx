import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  ActionSheet,
  Button,
  DrawerKit,
  Typography,
  getColor,
  theme,
  useDrawer,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';

const GuestModeModal = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    isModalUserLoggedInVisible,
    setIsModalUserLoggedInVisible,
  } = useAuthStore();
  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsFeatureDrawerKitOpen} =
    useDrawer('FeatureLoginDrawerKit');

  useEffect(() => {
    setIsFeatureDrawerKitOpen(true);
  }, []);

  const backgroundColor = getColor({
    color: theme?.components?.Select?.colorScheme?.default,
  });

  return (
    <ActionSheet
      isOpen={isModalUserLoggedInVisible}
      onClose={() => setIsModalUserLoggedInVisible(false)}>
      <ActionSheet.Content
        _dragIndicator={{
          width: 70,
          height: 1.5,
          borderRadius: 50,
          backgroundColor: '#e3e3e3',
        }}
        style={{
          backgroundColor,
        }}>
        <View
          data-id="123-456-789-Feature-layer"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
            minHeight: 180,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-parent="Feature-Login-drawer-kit">
          <Typography style={{marginVertical: 46}}>
            Please log in to use the app full features.
          </Typography>
          <Button
            style={{marginBottom: 40, width: 100}}
            onPress={() => [
              setIsUserLoggedIn(false),
              setIsModalUserLoggedInVisible(false),
            ]}>
            Log in
          </Button>
        </View>
      </ActionSheet.Content>
    </ActionSheet>
    // <DrawerKit
    //   data-id="Feature-Login-drawer-kit"
    //   data-name="DrawerKit"
    //   style={{position: 'relative', zIndex: 5}}
    //   position="bottom"
    //   data-parent="screen">
    //   <View
    //     data-id="123-456-789-Feature-layer"
    //     data-name="RelativeLayout"
    //     style={{
    //       position: 'relative',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       borderRadius: 10,
    //       width: '100%',
    //       minHeight: 180,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //     data-parent="Feature-Login-drawer-kit">
    //     <Typography style={{marginVertical: 46}}>
    //       Please log in to use the app full features.
    //     </Typography>
    //     <Button
    //       style={{marginBottom: 40, width: 100}}
    //       onPress={() => [
    //         setIsUserLoggedIn(false),
    //         setIsFeatureDrawerKitOpen(false),
    //       ]}>
    //       Log in
    //     </Button>
    //   </View>
    // </DrawerKit>
  );
};

export default GuestModeModal;

const styles = StyleSheet.create({});
