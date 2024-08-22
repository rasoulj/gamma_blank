import {Center, FlatList, Text, View} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  graphqlFetcher,
  TelegramIcon,
  useMutation,
  useToast,
} from '~/components/elemental';
import {scale, verticalScale} from '../../elemental';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';
import {
  useGetCurrentUser,
  useGetVonageMessages,
  VONAGE_CREATE_MESSAGE,
} from './hooks';

const LiveStreamChat = ({vonageSessionId}: {vonageSessionId: any}) => {
  const [textMessage, setTextMessage] = useState('');
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useMutation(args => {
    return graphqlFetcher(VONAGE_CREATE_MESSAGE, args);
  });

  const {data: currentUserData} = useGetCurrentUser();
  const currentUserId = currentUserData?.user_getCurrentUser?.result?.id;

  const {data, fetchNextPage, hasNextPage, error} = useGetVonageMessages(
    {
      order: {
        createdDate: 'DESC',
      },
    },
    vonageSessionId,
  );
  const messages = data?.pages || [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const sendPress = () => {
    let input = {
      attachment: null,
      text: textMessage,
      vonageSessionId: 9,
    };

    mutate(
      {input},
      {
        onSuccess: success => {
          queryClient.invalidateQueries('getVonageMessages');
          setTextMessage('');
        },
        onError: error => {
          console.log('error', error);

          toast({message: error.toString()});
        },
      },
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const currentUser = item?.senderId === currentUserId;

    switch (currentUser) {
      case true:
        return <RightMessage {...{item}} />;

      default:
        return <LeftMessage {...{item}} />;
    }
  };

  const ItemSeparatorComponent = () => (
    <View h={verticalScale(8)} bg="#F4F4F5" />
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F4F4F5',
        paddingVertical: scale(10),
        paddingHorizontal: scale(8),
        marginHorizontal: 10,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Body />

      <FlatList
        inverted
        data={messages || []}
        keyExtractor={(_, index: number) => `key${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        flex={1}
        bg="#F4F4F5"
        onEndReachedThreshold={0.9}
        onEndReached={() => onLoadMore?.()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={10}>
        <View
          bg="#F4F4F5"
          style={{
            height: scale(45),
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 7,
          }}>
          <TextInput
            value={textMessage}
            onChangeText={setTextMessage}
            placeholder="Type here"
            placeholderTextColor="#818181"
            style={styles.input}
          />
          <TouchableOpacity
            disabled={textMessage?.length < 1 || isLoading}
            activeOpacity={0.7}
            onPress={sendPress}
            style={styles.sendButton}>
            {isLoading ? (
              <Center size="12">
                <ActivityIndicator color={'#1DE9B6'} size="small" />
              </Center>
            ) : (
              <TelegramIcon
                color={textMessage?.length < 1 ? 'gray' : '#1DE9B6'}
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LiveStreamChat;

const Body = () => {
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: '#E4E4E7',
          borderRadius: 12,
        }}>
        <Text
          style={[
            {
              fontSize: scale(11),
              textAlign: 'center',
              marginTop: 4,
              paddingHorizontal: scale(16),
              paddingVertical: scale(8),
              color: 'black',
            },
          ]}>
          {
            'Messages can only be seen by people in the call and are deleted when the call ends'
          }
        </Text>
      </View>

      <View style={{width: scale(10)}} />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    paddingBottom: 50,
  },
  box: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  input: {
    color: 'black',
    fontSize: 14,
    textAlignVertical: 'top',
    paddingTop: 0,
    height: '100%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 25,
    paddingLeft: 15,
  },
  sendButton: {},
});
