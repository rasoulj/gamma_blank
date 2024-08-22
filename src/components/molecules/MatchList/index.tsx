import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import PersonListItem from './PersonListItem';
import {
  Divider,
  FlatList,
  RelativeLayout,
  Typography,
  useAuth,
  useNavigate,
} from '~/components/elemental';
import {useGetMatches} from '../../organisms/Matching/hooks';

interface IProps {
  filters?: any;
}

const MatchList = ({filters}: IProps) => {
  const {navigateWithName} = useNavigate();
  const {user: currentUser} = useAuth();
  const userId = currentUser?.id;

  const {matches, isLoading, fetchNextPage, hasNextPage} = useGetMatches({
    take: 50,
    where: {
      matchStatus: {eq: 'ACCEPTED'},
    },
  });

  const users = matches.map(item => {
    return item.targetUserId === userId
      ? item.requestedByUser
      : item.targetUser;
  });

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <PersonListItem {...{item, navigation: navigateWithName}} />;
  };

  return (
    <FlatList
      data={users}
      px="4"
      keyExtractor={(_, index) => `key${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
      ListEmptyComponent={() => {
        return (
          <RelativeLayout
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable>
              <Typography>
                {isLoading
                  ? 'Loading ...'
                  : users?.length === 0
                  ? 'No data'
                  : ''}
              </Typography>
            </Pressable>
          </RelativeLayout>
        );
      }}
      contentContainerStyle={[styles.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.9}
      onEndReached={() => {
        onLoadMore?.();
      }}
    />
  );
};

export default MatchList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  contentContainerStyle: {
    paddingTop: 10,
    flexGrow: 1,
    paddingBottom: 32,
  },
});
