import React, {useMemo, useState} from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FaceBook3Icon from '~/assets/icons/CustomIcons/FaceBook3.icon';
import Instagram3Icon from '~/assets/icons/CustomIcons/Instagram3.icon';
import Twitter3Icon from '~/assets/icons/CustomIcons/Twitter3.icon';
import {
  ArrowRightIconSet,
  Button,
  IMG,
  Layer,
  LoadIndicator,
  RoundedEditIcon,
  ScrollView,
  Typography,
  User2Icon,
  deviceWidth,
  getColor,
  isDark,
  useGetCurrentUser,
  useNavigate,
} from '~/components/elemental';
import {model} from '~/data/model';
import useAuthStore from '~/stores/authStore';
import LogOutModal from './Modals/LogOutModal';
import SellerModal from './Modals/SellerModal';
import {useUpdateUser} from './hook';
import {isElementInModel} from '~/utils/helper/isElementsInModel';

type SettingsItem = {label: string; path?: string};
type LinksProps = {label: string; url?: string};

type SettingsProps = {
  items?: Array<SettingsItem>;
  backgroundColor?: string;
  shadow?: boolean;
  links?: Array<LinksProps>;
};

export const initialSettingItems = [
  {label: 'Terms & Conditions', path: 'terms'},
  {label: 'Privacy Policy', path: 'privacy'},
  {label: 'Support', path: 'support'},
];
export const initialSellerSettingItems = [
  {label: 'My Products', path: 'product list'},
  {label: 'My Promotions', path: 'promotion'},
  {label: 'Wishlist', path: 'wishlist'},
];
export const initialSocialSettingItems = [
  {label: 'Account Setting', path: 'AccountSetting'},
  {label: 'Saved', path: 'wishlist'},
  {label: 'Terms & Conditions', path: 'terms'},
  {label: 'Help & Support', path: 'support'},
];

export const initialEcommerceSettingItems = [];

export default function Settings({
  items,
  shadow = true,
  backgroundColor,
  links,
  ...props
}: SettingsProps) {
  const {navigateWithName} = useNavigate();
  const hasProfile = useMemo(() => {
    const isInTheComponents = model.screens.some(screen =>
      screen.metaData.components.some(
        component => component === 'Profile screen',
      ),
    );
    return isInTheComponents;
  }, []);
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);

  const token = useAuthStore(state => state?.token);

  const {data: userData, isLoading} = useGetCurrentUser(undefined);
  const user = userData?.user_getCurrentUser?.result;
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isSellerModalVisible, setIsSellerModalVisible] = useState(false);
  const setUser = useAuthStore(state => state?.setUser);
  const userLocal = useAuthStore(state => state?.user);

  const {mutate, isLoading: isLoadingRole} = useUpdateUser();
  const changeRole = (role: 'seller' | 'buyer') => {
    const userInput = {
      userRole: role,
    };
    mutate(
      {userId: user?.id, userInput},
      {
        onSuccess(data) {
          setUser(data?.user_updateUser?.result);
        },
      },
    );
  };
  const filterInterest = items.filter(item => item.label !== 'Interests');
  const initialEducatorSettingItems = filterInterest?.map(item =>
    item.label === 'Edit Profile' && item.path === 'ProfileUpdate'
      ? {...item, path: 'EducatorEditProfile'}
      : item.label === 'Payment Methods'
      ? {...item, params: {isSetting: true}}
      : item,
  );

  const socialMedia = [
    {
      icon: <Twitter3Icon />,
      onPress: () => Linking.openURL(links?.[0]?.url || 'https://x.com'),
    },
    {
      icon: <FaceBook3Icon />,
      onPress: () => Linking.openURL(links?.[0]?.url || 'https://facebook.com'),
    },
    {
      icon: <Instagram3Icon />,
      onPress: () =>
        Linking.openURL(links?.[0]?.url || 'https://instagram.com'),
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading && <LoadIndicator />}

      {!token && (
        <>
          <Typography style={styles.welcomeBackText}>Welcome Back</Typography>
          <Layer style={styles.descriptionContainer}>
            <Typography style={styles.descriptionText}>
              Please log in to use the app’s full features.
            </Typography>
            <Button
              style={styles.loginButton}
              onPress={() => setIsUserLoggedIn(false)}>
              Log in
            </Button>
          </Layer>
        </>
      )}
      {token &&
        !hasProfile &&
        user &&
        !isElementInModel('EducationHome') &&
        !isElementInModel('SocialHome') && (
          <Layer style={styles.topPanel}>
            <Layer style={styles.container}>
              {user?.photoUrl ? (
                <IMG style={styles.photoUrl} src={user?.photoUrl} />
              ) : (
                <User2Icon style={styles.photoUrl} />
              )}

              <Layer style={styles.photoContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigateWithName('profile update')}>
                  <RoundedEditIcon color={isDark() ? 'gray.50' : 'gray.800'} />
                </TouchableOpacity>
                <Typography
                  numberOfLines={1}
                  color={'gray.800'}
                  style={styles.fullName}>
                  {user?.fullName}
                </Typography>
                <Typography
                  numberOfLines={1}
                  color={'gray.500'}
                  style={styles.email}>
                  {user?.email}
                </Typography>
                {isLoadingRole ? (
                  <Typography
                    numberOfLines={1}
                    color={'secondary.500'}
                    style={styles.roleSwitching}
                    onPress={() => changeRole('buyer')}>
                    Switching...
                  </Typography>
                ) : userLocal?.userRole === 'seller' ? (
                  <Typography
                    numberOfLines={1}
                    color={'secondary.500'}
                    style={styles.roleSwitching}
                    onPress={() => changeRole('buyer')}>
                    Switch to Buyer
                  </Typography>
                ) : (
                  <Typography
                    numberOfLines={1}
                    color={'secondary.500'}
                    style={styles.roleSwitching}
                    onPress={() => setIsSellerModalVisible(true)}>
                    Switch to Seller
                  </Typography>
                )}
              </Layer>
            </Layer>
          </Layer>
        )}
      <View
        {...props}
        style={[
          styles.wrapper,
          {
            backgroundColor: isDark()
              ? getColor({color: 'background.400'})
              : getColor({color: 'background.500'}),
          },
          shadow ? styles.shadow : {},
        ]}>
        {[
          ...(token
            ? isElementInModel('SocialHome')
              ? [...initialSocialSettingItems]
              : userLocal?.userRole === 'seller'
              ? [...initialSellerSettingItems, ...items]
              : !isElementInModel('EducationHome') &&
                !isElementInModel('SocialHome')
              ? [...initialEcommerceSettingItems, ...items]
              : userLocal?.userRole === 'educator'
              ? initialEducatorSettingItems
              : items
            : []),
        ].map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigateWithName(item.path || item.label?.toLowerCase?.(), {
                userId: user?.id,
                ...item?.params,
                ...(item.label === 'Interests' && {
                  buttonTitle: 'save',
                  entity: 'educationCategories',
                  multiSelect: true,
                }),
              });
            }}>
            <Layer key={index} style={styles.item}>
              <Typography>{item.label}</Typography>
              <ArrowRightIconSet />
            </Layer>
          </TouchableWithoutFeedback>
        ))}

        {token && (
          <>
            <TouchableWithoutFeedback
              onPress={e => {
                setIsLogoutModalVisible(true);
              }}>
              <Layer style={{...styles.item, borderBottomWidth: 0}}>
                <Typography>Log out</Typography>
              </Layer>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
      {!isElementInModel('SocialHome') &&
        !isElementInModel('EducationHome') && (
          <Layer style={styles.socialMediaContainer}>
            {socialMedia?.map(i => {
              return (
                <TouchableOpacity
                  style={styles.socialMediaItem}
                  onPress={i.onPress}>
                  {i.icon}
                </TouchableOpacity>
              );
            })}
          </Layer>
        )}
      <LogOutModal
        isVisible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}
      />
      <SellerModal
        isVisible={isSellerModalVisible}
        onClose={() => setIsSellerModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginButton: {marginTop: 40, width: 189},

  descriptionText: {fontSize: 14, fontWeight: '500'},

  descriptionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: deviceWidth / 5,
  },

  welcomeBackText: {fontSize: 25, fontWeight: '700', lineHeight: 40},

  wrapper: {
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomColor: isDark()
      ? getColor({color: 'gray.500'})
      : getColor({color: 'gray.300'}),
    borderBottomWidth: 0.5,
    backgroundColor: getColor({color: 'background.700'}),
  },

  shadow: {
    shadowColor: getColor({color: 'gray.400'}),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: getColor({color: 'background.700'}),
  },

  topPanel: {
    flexDirection: 'row',
    shadowColor: getColor({color: 'gray.400'}),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    marginHorizontal: 5,
    elevation: 5,
    marginTop: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: getColor({color: 'background.400'}),
  },

  photoUrl: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },

  bioContainer: {
    marginLeft: 110,
    marginTop: 5,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  about: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 24,
    marginHorizontal: 16,
  },

  photoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },

  editButton: {
    alignSelf: 'flex-end',
  },

  fullName: {
    width: '90%',
    marginLeft: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },

  email: {
    width: '90%',
    marginLeft: 2,
    fontSize: 14,
  },

  roleSwitching: {
    width: '90%',
    marginLeft: 2,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },

  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },

  socialMediaItem: {
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
