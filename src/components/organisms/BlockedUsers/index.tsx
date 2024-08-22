import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ConfirmationActionSheet,
  FlatList,
  HStack,
  Typography,
  UserAvatar,
} from '~/components';
import {getColor, scale} from '~/components/elemental';
import {useGetBlockedUsers, useUserUnBlockMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {Box} from 'native-base';

const BlockedUsers = () => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useGetBlockedUsers();
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = useCallback(({item, index}) => {
    return <BlockUserItem {...{item, index}} />;
  }, []);

  return (
    <View>
      <FlatList
        data={data?.pages}
        renderItem={renderItem}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        setEmptyComponent
        onRefresh={refetch}
        refreshing={false}
        onEndReached={onLoadMore}
        ItemSeparatorComponent={() => <Box h="2" />}
      />
    </View>
  );
};

export default BlockedUsers;

const BlockUserItem = ({item, index}) => {
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const onUnblockPress = () => setVisibleConfirm(true);
  const onCloseConfirm = () => setVisibleConfirm(false);
  const queryClient = useQueryClient();
  const {mutate: unblockMutate, isLoading: unblocking} =
    useUserUnBlockMutation();
  const onUnblock = () => {
    unblockMutate(
      {input: {blockedUserId: item?.id}},
      {
        onSuccess(data, variables, context) {
          if (data?.blockUser_unblock?.code === 1) {
            queryClient.invalidateQueries(['blockUser_getBlockedUsers'], {
              exact: false,
            });
          }
        },
      },
    );
  };

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center">
        <UserAvatar
          avatarSize={scale(54)}
          user={item}
          hasShadow={false}
          extraData={item?.username}
          fullNameFontSize="md"
          extraDataFontSize="sm"
        />
        <TouchableOpacity onPress={onUnblockPress} style={styles.touchable}>
          {unblocking ? (
            <ActivityIndicator />
          ) : (
            <Typography color="gray.50" fontWeight="700" fontSize="sm">
              Unblock
            </Typography>
          )}
        </TouchableOpacity>
      </HStack>
      {visibleConfirm && (
        <ConfirmationActionSheet
          isOpen={visibleConfirm}
          onClose={onCloseConfirm}
          onConfirmPress={onUnblock}
          isLoading={unblocking}
          confirmBtnColor="primary.500"
          confirmButtonText="Unblock"
          title={`Unblock ${item?.fullName} ?`}
          description={`${item?.fullName} and other accounts they may have or create will now be able to see your posts, follow and message you.`}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColor({color: 'primary.500'}),
    paddingHorizontal: 23,
    paddingVertical: 11,
    borderRadius: 10,
  },
});
