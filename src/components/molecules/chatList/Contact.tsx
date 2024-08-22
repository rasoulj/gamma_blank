import React from 'react';
import {FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import {
  Header,
  Screen,
  Typography,
  Card,
  Layer,
  IMG,
  deviceHeight,
  getColor,
  User2Icon,
} from '~/components/elemental';
import {useGetUserList} from '../../elemental/hooks/use_get_chat';

const ContactList = ({navigation}) => {
  const {
    data: getUserList,
    isLoading: getUserListLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetUserList({take: 10});

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Screen isLoading={getUserListLoading}>
      <Header
        title="Contact"
        onClickBack={navigation.goBack}
        style={{marginHorizontal: 5}}
      />
      <FlatList
        data={getUserList?.pages || []}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          onLoadMore?.();
        }}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate({
                name: 'DirectMessage',
                params: {item: item?.user},
              })
            }>
            <Card style={styles.card}>
              <Layer style={styles.box}>
                <Layer>
                  {item?.user?.photoUrl ? (
                    <IMG
                      src={item?.user?.photoUrl}
                      style={styles.photo}
                      alt="profile"
                    />
                  ) : (
                    <User2Icon width={54} height={54} />
                  )}
                </Layer>
                <Layer style={styles.boxText}>
                  <Layer>
                    <Typography style={{fontWeight: '600'}}>
                      {item?.user?.fullName}
                    </Typography>
                  </Layer>
                </Layer>
              </Layer>
            </Card>
          </TouchableHighlight>
        )}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 6,
        }}
        ListEmptyComponent={
          <>
            <Layer style={styles.emptyList}>
              <Typography>There is no contact list</Typography>
            </Layer>
          </>
        }
        keyExtractor={(item, index) => `${index}_${item?.id}`}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: getColor({color: 'background.600'}),
  },

  box: {
    flexDirection: 'row',
    marginVertical: 8,
  },

  photo: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },

  boxText: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  howText: {
    marginTop: 10,
    color: 'dark.300',
  },

  button: {
    marginHorizontal: 32,
    height: 55,
  },

  emptyList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - 200,
  },
});

export default ContactList;
