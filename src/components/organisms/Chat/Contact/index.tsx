import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {isDark, useNavigate} from '../../../elemental';
import {getColor} from '../../../elemental/helper';
import {useGetUserList} from '../../../elemental/hooks/use_get_chat';
import Layer from '../../../atoms/Layer';
import ContactItem from './ContactItem';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {useGetMatches} from '../../DatingLikes/hooks';

const Contact = () => {
  const user = useAuthStore(state => state.user);
  const {navigateWithName} = useNavigate();

  const {} = useHeader({
    title: {children: 'Contact', fontSize: 'md', fontWeight: 'bold'},
    onBack() {
      navigateWithName('chat', {route: 'messages'});
    },
  });

  const hasMatched = isElementInModel('DatingLikes');

  const {data: matchData} = useGetMatches({
    enabled: !!hasMatched,
    where: {matchStatus: {eq: 'ACCEPTED'}},
  });

  const matchIds = matchData?.pages?.map(item => {
    const currentUser =
      item?.targetUserId === user?.id
        ? item?.requestedByUser
        : item?.targetUser;
    return currentUser?.id;
  });

  const {
    data: getUserList,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetUserList({
    take: 10,
    where: hasMatched ? {id: {in: matchIds}} : undefined,
  });

  const renderItem = ({item}) => {
    return (
      <Layer
        style={{
          borderBottomColor: getColor({
            color: isDark() ? 'gray.500' : 'gray.300',
          }),
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigateWithName('chat', {isProfile: true, item})}>
          <ContactItem item={item} />
        </TouchableOpacity>
      </Layer>
    );
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles?.FlatListContentContainer}
        data={getUserList?.pages || []}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        renderItem={renderItem}
      />
    </>
  );
};

export default Contact;

const styles = StyleSheet.create({
  FlatListContentContainer: {
    flexGrow: 1,
    paddingTop: 20,
  },
});
