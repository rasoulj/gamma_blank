import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '~/components/atoms/Menu';
import {
  ArrowDownIconSet,
  ArrowUpIconSet,
  Divider,
  Image,
  Layer,
  LoginIconSet,
  OgoutIconSet,
  ScrollView,
  Typography,
  User2Icon,
  getColor,
  useAuth,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {deviceWidth} from '~/utils/methods';
import {useGetProductCategories} from '../hook';

const UserInfo = ({user}) => (
  <View style={styles.userInfo}>
    {user?.photoUrl ? (
      <Image source={{uri: user?.photoUrl}} style={styles.userImage} />
    ) : (
      <User2Icon width={36} height={36} />
    )}
    {user?.email ? (
      <View style={styles.userDetails}>
        <Typography style={{fontSize: 14, fontWeight: '700'}}>
          {user?.fullName}
        </Typography>
        <Typography style={{fontSize: 12, fontWeight: '400'}}>
          {user?.email}
        </Typography>
      </View>
    ) : (
      <Typography style={styles.guestText}>Guest User</Typography>
    )}
  </View>
);

const CategoryItem = ({title, onPress, isOpen}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.categoryItem}>
      {isOpen ? (
        <ArrowUpIconSet style={styles.arrowSpace} />
      ) : (
        <ArrowDownIconSet style={styles.arrowSpace} />
      )}
      <Typography style={{fontWeight: isOpen ? '700' : '400'}}>
        {title}
      </Typography>
    </View>
  </TouchableWithoutFeedback>
);

const LogoutLoginItem = ({label, onPress, type}) => (
  <TouchableOpacity style={styles.logoutLoginItem} onPress={onPress}>
    {type === 'login' ? (
      <LoginIconSet style={styles.iconLogin} />
    ) : (
      <OgoutIconSet style={styles.iconLogin} />
    )}
    <Typography>{label}</Typography>
  </TouchableOpacity>
);

const ProductHomeMenu = ({isVisible, onClose}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state?.user);
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);
  const [category, setCategory] = useState('');
  const {logout} = useAuth();

  const {data}: any = useGetProductCategories({key: 'productCategories'});

  const categories = useMemo(() => {
    return data?.staticConfig_getStaticConfig?.result?.value
      ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value).map(
          item => {
            return {title: item, items: []};
          },
        )
      : [];
  }, [data]);

  const {data: subCategoryData}: any = useGetProductCategories({
    key: `Product${category}SubCategory`,
  });

  const subCategories = subCategoryData?.staticConfig_getStaticConfig?.result
    ?.value
    ? JSON?.parse(subCategoryData?.staticConfig_getStaticConfig?.result?.value)
    : [];
  return (
    <Menu isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <>
          <UserInfo user={user} />
          <Divider style={styles.devider} />
        </>

        <ScrollView showsVerticalScrollIndicator={false}>
          {categories?.map(item => (
            <Layer
              key={item?.title}
              style={{
                ...styles.showMore,
                backgroundColor:
                  getColor({
                    color: category === item?.title ? 'gray.50' : 'primary.200',
                  }) + 30,
              }}>
              <CategoryItem
                title={item?.title}
                onPress={() =>
                  category === item?.title
                    ? setCategory('')
                    : setCategory(item?.title)
                }
                isOpen={category === item?.title}
              />
              {category === item?.title &&
                subCategories?.map(item => (
                  <TouchableOpacity
                    key={item?.title}
                    onPress={() =>
                     [ navigateWithName('productcategor', {
                        category: category,
                        subcategory: item?.title,
                      }), onClose()]
                    }>
                    <Typography style={{padding: 8, marginLeft: 40}}>
                      {item?.title}
                    </Typography>
                  </TouchableOpacity>
                ))}
            </Layer>
          ))}

          <>
            <Divider style={styles.devider} />
            {user?.email ? (
              <LogoutLoginItem
                label="Log out"
                onPress={() => logout()}
                type={'logOut'}
              />
            ) : (
              <LogoutLoginItem
                label="Log in"
                onPress={() => setIsUserLoggedIn(false)}
                type={'login'}
              />
            )}
          </>
        </ScrollView>
      </View>
    </Menu>
  );
};

export default ProductHomeMenu;

const styles = StyleSheet.create({
  iconLogin: {marginRight: 16},
  devider: {
    marginVertical: 16,
    backgroundColor: getColor({color: 'gray.500'}),
  },
  container: {
    flex: 2,
    width: (deviceWidth * 2) / 3,
    height: '100%',
    backgroundColor: getColor({color: 'primary.200'}),
    zIndex: 4,
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
  },
  userImage: {
    width: 40,
    height: 40,
    backgroundColor: getColor({color: 'gray.500'}),
    borderRadius: 100,
  },
  userDetails: {
    marginLeft: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  logoutLoginItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  showMore: {
    borderRadius: 8,
  },
  arrowSpace: {marginRight: 8},
  guestText: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
    marginLeft: 8,
  },
});
