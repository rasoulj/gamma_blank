import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import ModalContainer from '~/components/atoms/ModalContainer';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Image,
  Input,
  Layer,
  RelativeLayout,
  Typography,
  User2Icon,
  deviceHeight,
  Share,
} from '~/components/elemental';
import {sharePostData} from '~/components/molecules/gallery/shareData';
import {useCreateDirectMessage} from '~/components/elemental/hooks/use_get_chat';
import {useQueryClient} from 'react-query';
import {useGetUsers} from '../../hook';

const ShareModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const deepLink = `apsy://apsy/postDetails/${item?.id}`;
  const [sharedTo, setSharedTo] = useState([]);

  const {mutate: directMessage, isLoading: isLoaingSent} =
    useCreateDirectMessage();

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = React.useState('');

  const {data: getUsers, isLoading: getUsersLoading} = useGetUsers({
    where: {
      fullName: {
        startsWith: searchTerm,
      },
    },
  });
  const SharePostItem = useCallback(
    ({item: shareItem}: any) => {
      const [isLoadSharePost, setIsLoadSharePost] = useState(false);
      function sendMessage(receiverId) {
        setIsLoadSharePost(true);
        const input: any = {
          text: item?.content,
          conversationId: null,
          parentId: null,
          mediaType: 'SHARED_POST',
          mediaUrl: item?.mediaUrl,
          receiverId: receiverId,
          mediaEntityId: item?.id,
        };

        directMessage(input, {
          onSuccess: (success: any) => {
            if (success?.message_createDirectMessage?.status?.code === 1) {
              setSharedTo(currentArray => {
                return [...currentArray, shareItem?.id];
              });
              queryClient.invalidateQueries('message_getConversation');
              console.log('Success', success);
            }
            setTimeout(() => {
              setIsLoadSharePost(false);
            }, 1000);
          },
          onError: error => {
            setIsLoadSharePost(false);
            console.log('error', error);
          },
        });
      }
      return (
        <TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 20,
            }}>
            <Layer
              style={{
                flexDirection: 'row',
                width: '70%',
                alignItems: 'center',
              }}>
              {shareItem?.photoUrl ? (
                <Image
                  src={shareItem?.photoUrl}
                  style={{width: 38, height: 38, borderRadius: 50}}
                />
              ) : (
                <User2Icon width={38} height={38} />
              )}
              <Typography style={{fontSize: 17, marginLeft: 15}}>
                {shareItem?.fullName}
              </Typography>
            </Layer>
            <Button
              isLoading={isLoadSharePost}
              variant={sharedTo.includes(shareItem?.id) ? 'outline' : 'solid'}
              style={{
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => sendMessage(shareItem?.id)}>
              {sharedTo.includes(shareItem?.id) ? 'Sent' : 'Send'}
            </Button>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [sharedTo],
  );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          width: '100%',
        }}>
        <Layer
          behavior={'height'}
          style={{
            position: 'relative',
            height: (deviceHeight * 2.5) / 3,
          }}>
          <Layer>
            <FlatList
              data={sharePostData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}: any) => {
                return (
                  <Layer
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 30,
                      marginRight: 6,
                      marginLeft: 6,
                    }}>
                    <RelativeLayout
                      style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: 'primary.400',
                        marginLeft: 5,
                      }}>
                      {item?.isNativeShare ? (
                        <Share
                          type={item?.type}
                          data={{
                            title: item?.title,
                            url: deepLink,
                            isNativeShare: item?.isNativeShare,
                          }}
                          data-id={''}
                          name={''}
                          style={undefined}
                          iconProps={undefined}
                          isNativeShare={false}
                          navigate={undefined}
                        />
                      ) : (
                        <Share
                          type={item?.type}
                          data={{
                            title: item?.title,
                            url: deepLink,
                            social: item?.social,
                          }}
                          data-id={''}
                          name={''}
                          style={undefined}
                          iconProps={undefined}
                          isNativeShare={false}
                          navigate={undefined}
                        />
                      )}
                    </RelativeLayout>
                    <Typography
                      style={{
                        marginTop: 8,
                        fontSize: 11,
                      }}>
                      {item?.title}
                    </Typography>
                  </Layer>
                );
              }}
            />
          </Layer>
          <Input
            onChange={text => setSearchTerm(text)}
            mx={4}
            placeholder="Search"
            startIcon="TSearchIcon"
            borderColor={'gray.400'}
            style={{marginBottom: 20}}
          />

          <FlatList
            data={getUsers?.pages}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <SharePostItem item={item} />;
            }}
            ListFooterComponent={<View style={{height: 100}} />}
          />
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default memo(ShareModal);

const styles = StyleSheet.create({});
