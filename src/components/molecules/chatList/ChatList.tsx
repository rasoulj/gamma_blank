import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
import {
  Header,
  Screen,
  Typography,
  Card,
  Layer,
  Button,
  IMG,
  deviceHeight,
  relativeTimeFromNow,
  Message2Icon,
  User2Icon,
  ContactIcon,
} from '~/components/elemental';
import {useRoute} from '@react-navigation/native';
import {useGetChatList} from '../../elemental/hooks/use_get_chat';
import {getColor} from '~/utils/helper/theme.methods';

const ChatList = ({navigation}) => {
  const {params} = useRoute();

  const [userId, setUserId] = useState();

  const {
    data: getUserMessages,
    isLoading: getUserMessagesLoading,
    error: getUserMessagesError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetChatList({
    order: {
      latestMessageDate: 'DESC',
    },
  });

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Screen isLoading={getUserMessagesLoading}>
      <Header
        title="Chat"
        localNavigate={navigation}
        style={styles.marginBottom}
      />
      <FlatList
        data={getUserMessages?.pages || []}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          onLoadMore?.();
        }}
        renderItem={({item, index}) => {
          return item?.receiver?.map((name, i) => (
            <TouchableWithoutFeedback
              style={styles.tw}
              onPress={() =>
                navigation.navigate({
                  name: 'DirectMessage',
                  params: {item: name},
                })
              }
              key={i}>
              <Card style={styles.card}>
                <Layer style={styles.box}>
                  <Layer>
                    {name?.photoUrl ? (
                      <IMG
                        src={name?.photoUrl}
                        style={styles.photo}
                        alt="profile"
                      />
                    ) : (
                      <User2Icon width={54} height={54} />
                    )}
                  </Layer>
                  <Layer style={styles.boxText}>
                    <Layer>
                      <Typography fontWeight="600">{name?.fullName}</Typography>
                      <Typography style={styles.howText}>
                        {item?.lastMessage?.text?.length > 10
                          ? item?.lastMessage?.text?.substring(0, 10 - 3) +
                            '...'
                          : item?.lastMessage?.text}
                        {item?.lastMessage?.text === null && 'Photo'}
                      </Typography>
                    </Layer>
                    <Layer style={styles.date}>
                      <Typography color="gray.500">
                        {relativeTimeFromNow(item?.latestMessageDate)}
                      </Typography>
                    </Layer>
                  </Layer>
                </Layer>
              </Card>
            </TouchableWithoutFeedback>
          ));
        }}
        ListEmptyComponent={
          <>
            <Layer style={styles.emptyList}>
              <ContactIcon />
              <Layer>
                <Typography
                  color={'primary.400'}
                  fontSize="xl"
                  fontWeight="700"
                  textAlign="center"
                  marginTop={16}>
                  You have no messages yet
                </Typography>
                <Button
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate({name: 'Contact', params: {}});
                  }}>
                  Start Chat
                </Button>
              </Layer>
            </Layer>
          </>
        }
        contentContainerStyle={styles.contentContainerStyle}
      />
      {getUserMessages?.totalCount > 0 && (
        <View style={styles.iconContainer}>
          <Layer
            onPress={() => navigation.navigate({name: 'Contact', params: {}})}
            style={styles.icon}>
            <Message2Icon />
          </Layer>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 75,
    right: 10,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: getColor({color: 'primary.400'}),
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderBottomColor: 'dark.100',
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
    color: 'gray.500',
  },
  button: {
    marginHorizontal: 32,
    height: 49,
    width: 198,
    marginTop: 22,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - 350,
  },
  marginBottom: {marginHorizontal: 5},
  tw: {
    marginBottom: 10,
  },
  date: {
    height: 50,
    justifyContent: 'flex-end',
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
});

export default ChatList;
