import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {AddIconSet, BackIcon, Typography} from '~/components/elemental';
import AddBoardModal from './Modals/AddBoardModal';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {useNavigation} from '@react-navigation/native';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';

const WishListHeader = () => {
  const navigation = useNavigation();
  const [isAddBoardVisible, setIsAddBoardVisible] = useState(false);
  const user = useAuthStore(state => state?.user);
  const hasProduct = useMemo(() => {
    return isElementInModel('ProductHome');
  }, []);

  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const icons = useMemo(
    () => (
      <TouchableOpacity onPress={() => setIsAddBoardVisible(true)}>
        <AddIconSet />
      </TouchableOpacity>
    ),
    [],
  );

  const {} = useHeader({
    title: {children: 'Wishlist', fontWeight: 'bold'},
    icons: icons,
    hidden: user?.userRole === 'seller' ? false : true,
  });

  return user?.userRole === 'seller' ? (
    <></>
  ) : (
    <View style={styles.container}>
      {!hasProduct && <BackIcon onPress={onBackPress} />}
      <Typography style={hasProduct ? styles.title : styles.socialTitle}>
        {hasProduct ? 'Wishlist' : 'All Saved'}
      </Typography>
      <TouchableOpacity onPress={() => setIsAddBoardVisible(true)}>
        <AddIconSet />
      </TouchableOpacity>
      <AddBoardModal
        entityName={hasProduct ? 'product' : 'post'}
        isVisible={isAddBoardVisible}
        onClose={() => setIsAddBoardVisible(false)}
      />
    </View>
  );
};

export default WishListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  title: {fontSize: 25, fontWeight: '700', lineHeight: 42},
  socialTitle: {fontSize: 18, fontWeight: '600', lineHeight: 24},
});
