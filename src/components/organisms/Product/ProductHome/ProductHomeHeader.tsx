import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Image,
  MenuIconSet,
  NotificationIconSet,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import ProductHomeMenu from './ProductHomeMenu';

const ProductHomeHeader = () => {
  const {navigateWithName} = useNavigate();
  const unreadNotification = useAuthStore(state => state?.unreadNotification);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <ProductHomeMenu
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
      />

      <View style={styles.container}>
        <Image
          source={require('../../../../../icon.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => navigateWithName('notification')}>
            <NotificationIconSet />
            {unreadNotification && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => setShowMenu(!showMenu)}>
            <MenuIconSet />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  logo: {
    width: 56,
    height: 24,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 24,
  },
  notificationBadge: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  menuIcon: {},
});

export default ProductHomeHeader;
