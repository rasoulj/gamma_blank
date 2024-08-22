import React, {useEffect, useMemo} from 'react';
import * as Element from '~/components/elemental';
import theme from '~/theme';
import useAuthStore from '~/stores/authStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import {TabsNavigationPathItem} from '~/data/type';
import {
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {View} from 'native-base';
import {getColor} from '../../elemental/helper';
import {useGetShoppingCards} from './hook';
import {useGetNotifications} from '../../organisms/Notification/hooks';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {model} from '~/data/model';
import AvatarManIcon from '~/assets/icons/CustomIcons/AvatarMan.icon';

const defaultRoles = ['buyer', 'student'];

const Tabbar = ({
  style,
  ...rest
}: {
  paths: Array<TabsNavigationPathItem>;
  style: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation<any>();
  const currentRoute = useRoute();
  const user = useAuthStore(state => state?.user);
  const token = useAuthStore(state => state?.token);
  const unreadNotification = useAuthStore(state => state?.unreadNotification);

  const paths =
    model?.metaData?.configs?.tabsNavigation[
      (defaultRoles.includes(user?.userRole?.toLowerCase?.())
        ? 'default'
        : user?.userRole) || 'default'
    ]?.paths || [];

  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );

  const setUnreadNotification = useAuthStore(
    state => state?.setUnreadNotification,
  );

  // @ts-ignore
  const TabsNavigationTheme = theme.components.TabNavigation || {};

  const bgColor = useMemo(() => {
    return getColor({
      color: TabsNavigationTheme.colorScheme.default,
      theme,
    });
  }, []);

  const hoverColor = useMemo(() => {
    return getColor({
      color: TabsNavigationTheme.hover.default,
      theme,
    });
  }, []);

  const iconColor = useMemo(() => {
    return getColor({
      color: TabsNavigationTheme.color.default,
      theme,
    });
  }, []);

  const routeNames = useNavigationState(state => state?.routeNames);
  const allRoutes = routeNames;
  const currentRouteName = currentRoute.name;

  const {data: notifications} = useGetNotifications({
    userId: user?.id,
    where: {isRead: {eq: false}},
  });

  useEffect(() => {
    setUnreadNotification(notifications?.pages.length > 0);
  }, []);

  const {data}: any = useGetShoppingCards({
    where: {
      orderStatus: {
        eq: 'PENDING',
      },
      userId: {eq: user?.id},
    },
  });

  return (
    <View
      flexDir="row"
      width={'100%'}
      bgColor={bgColor}
      borderTopLeftRadius={15}
      borderTopRightRadius={15}
      justifyContent={'space-around'}
      style={[
        style,
        {
          shadowColor: getColor({color: 'gray.500'}),
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 5,
          height: 75,
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
        },
      ]}
      {...rest}>
      {paths.map(({name, icon, fillIcon}, index) => {
        const path = allRoutes.find(routeName => {
          return new RegExp(name.replace(/\s/g, ''), 'i').test(routeName);
        });

        const isFocused = path === currentRouteName;
        const Icon =
          isFocused && fillIcon
            ? Element[fillIcon]
            : Element[icon] || Element.HomeIcon;

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              if (path) {
                navigation.navigate({name: path});
              }
            }}>
            <View style={styles.iconContainer}>
              {name?.toLowerCase?.()?.includes('notification') &&
                unreadNotification && <View style={styles.notifBadge} />}
              {name?.toLowerCase?.()?.includes('shopping') &&
                (token
                  ? data?.pages[0]?.shoppingCardSellers?.length > 0
                  : shoppingBasketList?.length > 0) && (
                  <View style={styles.badge} />
                )}
              {icon?.toLowerCase?.()?.includes('profile') ? (
                user?.photoUrl ? (
                  isFocused ? (
                    <Element.Image
                      source={{uri: user?.photoUrl}}
                      style={styles.avatarSize}
                    />
                  ) : (
                    <ImageBackground
                      source={{uri: user?.photoUrl}}
                      style={styles.avatarSize}
                      imageStyle={styles.borderRadius}>
                      <View style={styles.overlay}></View>
                    </ImageBackground>
                  )
                ) : user ? (
                  <Element.Layer style={styles.AvatarContainder}>
                    <AvatarManIcon isFocused={isFocused} />
                  </Element.Layer>
                ) : (
                  <Element.ProfileIconSet
                    color={isFocused ? hoverColor : iconColor}
                    fill={getColor({
                      color: isFocused ? hoverColor : null,
                    })}
                    style={styles.iconSize}
                  />
                )
              ) : (
                <Icon
                  color={isFocused ? hoverColor : iconColor}
                  fill={isFocused ? getColor({color: 'primary.500'}) : null}
                  style={styles.iconSize}
                />
              )}

              {isFocused ? (
                <View
                  style={[styles.focusedView, {backgroundColor: hoverColor}]}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  AvatarContainder: {
    borderColor: getColor({color: 'gray.800'}),
    borderWidth: 0.5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  focusedView: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 50,
  },

  iconSize: {width: 24, height: 24},

  avatarSize: {height: 24, width: 24, borderRadius: 100},

  badge: {
    width: 10,
    height: 10,
    backgroundColor: getColor({color: 'error.500'}),
    borderRadius: 100,
    position: 'absolute',
    right: -2,
    top: -2,
    zIndex: 2,
  },

  notifBadge: {
    width: 10,
    height: 10,
    backgroundColor: getColor({color: 'error.500'}),
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },

  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    backgroundColor: getColor({color: 'gray.800'}),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 100,
    width: 24,
    height: 24,
    opacity: 0.5,
  },

  borderRadius: {borderRadius: 100},
});
