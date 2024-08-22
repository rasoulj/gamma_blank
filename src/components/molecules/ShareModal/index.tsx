import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
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
  getColor,
  useAuth,
} from '~/components/elemental';
import {sharePostData} from '~/components/molecules/gallery/shareData';
import {useCreateDirectMessage} from '~/components/elemental/hooks/use_get_chat';
import {useQueryClient} from 'react-query';
import {useGetUsers} from './hooks';
import config from 'config';

const appConfig = require('app.json');
const deepLinkBaseUrl = `${config?.baseURL}/share?redirecturl=${String(
  appConfig?.name,
).toLocaleLowerCase()}://`;

const ShareModal = ({
  item,
  isVisible,
  onClose,
  mediaType = 'SHARED_POST',
  deepLink = `postDetails/${item?.id}`,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  mediaType: string;
  deepLink?: string;
}) => {
  const [sharedTo, setSharedTo] = useState([]);
  const {user} = useAuth();
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
  const users = getUsers?.pages.filter(u => u.id !== user?.id);

  const SharePostItem = useCallback(
    ({item: shareItem}: any) => {
      const [isLoadSharePost, setIsLoadSharePost] = useState(false);
      function sendMessage(receiverId) {
        setIsLoadSharePost(true);
        const input: any = {
          text: item?.text,
          conversationId: null,
          parentId: null,
          mediaType,
          mediaUrl: item?.mediaUrl,
          receiverId: receiverId,
          mediaEntityId: item?.id,
        };

        directMessage(input, {
          onSuccess: success => {
            setSharedTo(currentArray => {
              return [...currentArray, shareItem?.id];
            });
            setTimeout(() => {
              setIsLoadSharePost(false);
            }, 1000);
            setTimeout(() => {
              setSharedTo([]);
            }, 3000);
            queryClient.invalidateQueries('message_getConversation');
          },
          onError: error => {
            setIsLoadSharePost(false);
          },
        });
      }
      return (
        <TouchableWithoutFeedback>
          <View style={styles.shareListContainer}>
            <Layer style={styles.shareListInner}>
              {shareItem?.photoUrl ? (
                <Image src={shareItem?.photoUrl} style={styles.avatar} />
              ) : (
                <User2Icon width={38} height={38} />
              )}
              <Typography style={styles.fullName}>
                {shareItem?.fullName}
              </Typography>
            </Layer>
            <Button
              isLoading={isLoadSharePost}
              variant={sharedTo.includes(shareItem?.id) ? 'outline' : 'solid'}
              style={styles.shareButton}
              onPress={() => sendMessage(shareItem?.id)}>
              {sharedTo.includes(shareItem?.id) ? 'Sent' : 'Send'}
            </Button>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [sharedTo],
  );
  const renderShareHeaderItem = useCallback(({item, index}: any) => {
    return (
      <Layer style={styles.itemContainer}>
        <RelativeLayout style={styles.itemInner}>
          {item?.isNativeShare ? (
            <Share
              type={item?.type}
              data={{
                title: item?.title,
                url: deepLinkBaseUrl + deepLink,
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
        <Typography style={styles.titleTypography}>{item?.title}</Typography>
      </Layer>
    );
  }, []);

  return (
    <CustomActionSheet
      backgroundColor={getColor({color: 'background.400'})}
      isVisible={isVisible}
      onClose={onClose}>
      <View style={styles.container}>
        <Layer behavior={'height'} style={styles.innerLayer}>
          <Layer>
            <FlatList
              data={sharePostData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderShareHeaderItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </Layer>
          <Input
            onChange={text => setSearchTerm(text)}
            mx={4}
            placeholder="Search"
            startIcon="TSearchIcon"
            borderColor={'gray.400'}
            style={styles.marginBottom}
          />

          <FlatList
            data={users}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <SharePostItem item={item} />;
            }}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default memo(ShareModal);

const styles = StyleSheet.create({
  shareListInner: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
  },

  marginBottom: {marginBottom: 20},

  listFooter: {height: 100},

  titleTypography: {
    marginTop: 8,
    fontSize: 11,
  },

  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },

  innerLayer: {
    position: 'relative',
    height: (deviceHeight * 2.5) / 3,
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    marginRight: 6,
    marginLeft: 6,
  },

  itemInner: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'primary.400',
    marginLeft: 5,
  },

  shareListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  avatar: {width: 38, height: 38, borderRadius: 50},

  fullName: {fontSize: 17, marginLeft: 15},

  shareButton: {
    width: 90,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
