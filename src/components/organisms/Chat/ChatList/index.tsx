import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useGetChatList} from '../../../elemental/hooks/use_get_chat';
import ChatListItem from './ChatListItem';
import {
  isDark,
  Typography,
  Button,
  ContactIcon,
  useNavigate,
  LoadIndicator,
  SearchBox,
  Layer,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {getColor} from '~/utils/helper/theme.methods';
import useAuthStore from '~/stores/authStore';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {useGetMatches} from '../../DatingLikes/hooks';

const ChatList = () => {
  const [searchText, setSearchText] = useState<any>();
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state.user);

  const {} = useHeader({
    title: {children: 'Messages', fontSize: 'md', fontWeight: 'bold'},
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
    data: getUserMessages,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetChatList({
    order: {
      latestMessageDate: 'DESC',
    },
    where:
      searchText?.trim()?.length > 0
        ? hasMatched
          ? {
              and: [
                {receiver: {all: {fullName: {contains: searchText}}}},
                {receiver: {some: {id: {in: matchIds}}}},
              ],
            }
          : {receiver: {all: {fullName: {contains: searchText}}}}
        : hasMatched
        ? {receiver: {some: {id: {in: matchIds}}}}
        : undefined,
  });

  const renderItem = ({item, index}: any) => {
    return (
      <Layer
        style={{
          ...styles.itemContainer,
          borderBottomColor: getColor({
            color: isDark() ? 'gray.500' : 'gray.300',
          }),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigateWithName('chat', {
              item: item,
              isProfile: true,
            })
          }>
          <ChatListItem item={item} />
        </TouchableOpacity>
      </Layer>
    );
  };

  const emptyComponent = () => {
    return getUserMessages?.pages?.length === 0 ? (
      <Layer style={styles.emptyContainer}>
        <ContactIcon />
        <Layer>
          <Typography color={'primary.400'} style={styles.emptyText}>
            You have no messages yet
          </Typography>
          <Button
            style={styles.startBtn}
            onPress={() => {
              navigateWithName('chat', {route: 'contact'});
            }}>
            Start Chat
          </Button>
        </Layer>
      </Layer>
    ) : (
      <LoadIndicator />
    );
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <SearchBox type="input" onChangeText={setSearchText} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={getUserMessages?.pages || []}
        contentContainerStyle={{flexGrow: 1}}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
      />
    </>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  messageIcon: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: getColor({color: 'primary.400'}),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 50,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  startBtn: {
    marginHorizontal: 32,
    height: 49,
    width: 198,
    marginTop: 22,
  },

  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
  },

  itemContainer: {
    borderBottomWidth: 1,
  },
});
