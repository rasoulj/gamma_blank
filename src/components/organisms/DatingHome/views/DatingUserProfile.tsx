import React, {useMemo, useState} from 'react';
import {DatingUserMoreInfo} from './DatingUserMoreInfo';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useGetAllUsers, useGetDatingUsers} from '../hooks/home.query';
import {DatingUserCard} from './DatingUserCard';
import {getDatingUserFromAnswers} from '../hooks/DatingHome.hook';
import {
  LoadIndicator,
  ThreeDotsIcon,
  deviceHeight,
  deviceWidth,
  useRoute,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useHeader from '~/components/elemental/hooks/use_header';
import UserProfileMenu from './UserProfileMenu';

const height = deviceHeight - 220;
const width = deviceWidth - 60;

const DatingUserProfile = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const userId = useRoute()?.params?.userId;
  const auth = useAuthStore(state => state);
  const {data, isLoading} = useGetAllUsers({
    where: {id: {eq: userId}},
    userId: auth.user?.id,
  });
  const user = data?.pages?.[0];
  const itemUser = getDatingUserFromAnswers(user, auth);

  const onOpenMenu = () => setVisibleMenu(true);
  const onCloseMenu = () => setVisibleMenu(false);

  const icons = useMemo(() => {
    return (
      <TouchableOpacity onPress={onOpenMenu}>
        <ThreeDotsIcon
          style={{transform: [{rotate: '90deg'}]}}
          color="gray.800"
        />
      </TouchableOpacity>
    );
  }, []);
  const {} = useHeader({
    title: {children: 'Profile', fontWeight: 'bold'},
    icons,
  });

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {isLoading && <LoadIndicator />}

        <View style={styles.backBox}>
          <DatingUserCard user={itemUser} like={null} disLike={null} />
        </View>

        <DatingUserMoreInfo
          onLike={undefined}
          onDislike={undefined}
          user={itemUser}
          noLike={true}
        />
      </ScrollView>

      <UserProfileMenu
        isVisible={visibleMenu}
        onClose={onCloseMenu}
        item={itemUser}
      />
    </>
  );
};

export default DatingUserProfile;

const styles = StyleSheet.create({
  backBox: {
    flex: 1,
    height,
    width,
  },
});
