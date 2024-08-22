import ProfileViewing from './ProfileViewingHeader';
import React, {useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useRoute} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import MyPostList from './MyPostList';
import {useGetUserByIdQuery, useIsAccountPrivate} from './hooks';
import ProfileReelsList from './MyReelsList';
import ProfileTextPostList from './ProfileTextPostList';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import ProfileHeader from './ProfileHeader';
import CollapsibleProfile from './CollapsibleProfile';
import PrivateAccount from './PrivateAccount';
import profileStore from '~/stores/profileStore';

const Profile = ({
  gender = true,
  contactOption = true,
  highlight = true,
  about = true,
  shareProfile = true,
  showReels = true,
  showPosts = true,
}: {
  gender?: boolean;
  contactOption?: boolean;
  highlight?: boolean;
  about?: boolean;
  shareProfile?: boolean;
  showReels?: boolean;
  showPosts?: boolean;
}) => {
  const route = useRoute();
  const {user, setUser} = useAuthStore(state => state);
  const userId = route?.params?.userId ?? route?.params?.item?.id ?? user?.id;

  const setProfileConfigs = profileStore(state => state.setProfileConfigs);
  useEffect(() => {
    setProfileConfigs({
      gender,
      contactOption,
      highlight,
      about,
      shareProfile,
      showReels,
      showPosts,
    });
  }, [
    gender,
    contactOption,
    highlight,
    about,
    shareProfile,
    showPosts,
    showReels,
  ]);

  const {data} = useGetUserByIdQuery({entityId: userId});
  const currentUser =
    userId === user?.id && !data
      ? user
      : data?.user_getUsers?.result?.items?.[0];

  const isMyUser = user?.id === currentUser?.id;

  useEffect(() => {
    if (isMyUser) setUser({...user, ...currentUser});
  }, []);
  const TabsHeader = useCallback(
    () => (isMyUser ? <ProfileHeader /> : <ProfileViewing userId={userId} />),
    [currentUser],
  );

  const {socialType, handleCheckElementExist} = useSocialTypesConfig();
  const isTextual = socialType === 'text';

  const {isLoading, isPrivate} = useIsAccountPrivate({userId});

  return (
    <>
      {isPrivate || isLoading ? (
        <ScrollView>
          {TabsHeader()}
          {!isLoading && isPrivate && <PrivateAccount />}
        </ScrollView>
      ) : isTextual ? (
        <>
          {showPosts && (
            <ProfileTextPostList userId={userId} listHeader={TabsHeader} />
          )}
        </>
      ) : handleCheckElementExist('post') &&
        handleCheckElementExist('reels') &&
        showPosts &&
        showReels ? (
        <CollapsibleProfile />
      ) : handleCheckElementExist('post') && showPosts ? (
        <MyPostList
          userId={userId}
          hasTabView={false}
          listHeader={TabsHeader}
        />
      ) : handleCheckElementExist('reels') && showReels ? (
        <ProfileReelsList
          userId={userId}
          hasTabView={false}
          listHeader={TabsHeader}
        />
      ) : (
        <>{TabsHeader()}</>
      )}
    </>
  );
};
export default Profile;
