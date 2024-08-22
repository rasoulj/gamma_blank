import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import FormInput from '../../../atoms/FormInput';
import {
  NCameraIcon,
  SendIcon2,
  isDark,
  CloseIcon,
  Typography,
  IMG,
} from '../../../elemental';
import {FormProvider, useForm} from 'react-hook-form';
import useUploader from '../../../elemental/hooks/useUploader';
import {useCreateDirectMessage} from '../../../elemental/hooks/use_get_chat';
import {useQueryClient} from 'react-query';
import {UndoIcon} from '~/assets';
import {getColor} from '~/utils/helper/theme.methods';

const MessageInput = ({
  item,
  replyTo,
  setReplyTo,
  onMessageSent,
  mediaType,
  mediaEntityId,
  mediaUrl,
  allowUploadImage = true,
  autoFocus,
}: {
  item: any;
  replyTo?: any;
  setReplyTo?: any;
  onMessageSent?: any;
  mediaType?: string;
  mediaEntityId?: number;
  mediaUrl?: string;
  allowUploadImage?: boolean;
  autoFocus?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    onPress: uploadMedia,
    values: MediaValue,
    cleanImage,
    isLoading: UploadLoading,
  } = useUploader({
    type: 'photo',
    name: 'photo',
    isCamera: true,
    isGallery: true,
  });
  const {...methods} = useForm<Record<string, any>, object>({
    mode: 'onChange',
  });
  const {mutate: directMessage, isLoading: directMessageLoading} =
    useCreateDirectMessage();
  const {handleSubmit, register, reset} = methods;

  function sendMessage(values) {
    const input: any = {
      text: values?.text,
      conversationId: item?.conversationId,
      parentId: replyTo?.id ? replyTo?.id : null,
      mediaType: mediaType ? mediaType : MediaValue?.photo ? 'IMAGE' : 'NONE',
      mediaUrl: mediaUrl
        ? mediaUrl
        : MediaValue?.photo
        ? MediaValue?.photo
        : '',
      receiverId: item?.receiver ? item?.receiver?.[0]?.id : item?.id,
      mediaEntityId,
    };

    directMessage(input, {
      onSuccess: success => {
        reset();
        cleanImage();
        setReplyTo?.({});
        queryClient.invalidateQueries('message_getUserMessages');
        queryClient.invalidateQueries('message_getConversation');
        queryClient.invalidateQueries('getUserMessages');
        queryClient.invalidateQueries('chat_messages');
        onMessageSent?.();
      },
    });
  }

  return (
    <Layer style={styles.container}>
      <FormProvider {...methods}>
        <FormInput
          placeholder="Message..."
          name="text"
          multiline={true}
          style={styles.formInput}
          height="49"
          {...register('text', {
            required: true,
          })}
          InputRightElement={
            allowUploadImage ? (
              UploadLoading ? (
                <ActivityIndicator style={styles.marginRight} size={'small'} />
              ) : (
                <TouchableOpacity onPress={uploadMedia}>
                  <NCameraIcon
                    style={styles.cameraIcon}
                    color={getColor({color: 'gray.400'})}
                  />
                </TouchableOpacity>
              )
            ) : undefined
          }
          autoFocus={autoFocus}
        />
      </FormProvider>
      {replyTo?.createdAt && (
        <Layer style={styles.replyContainer}>
          <UndoIcon />
          {replyTo?.mediaUrl !== '' && (
            <IMG src={replyTo?.mediaUrl} style={styles.replyImg} />
          )}
          <Layer style={styles.replyTextContainer}>
            <Typography
              color={isDark() ? 'gray.800' : 'gray.50'}
              fontSize="sm"
              fontWeight="500"
              textTransform="capitalize">
              {replyTo?.sender?.fullName}
            </Typography>
            <Typography
              color={isDark() ? 'gray.300' : 'gray.500'}
              fontSize="xs"
              fontWeight="400"
              marginTop={-5}>
              {replyTo?.mediaUrl ? 'Photo' : replyTo?.text}
            </Typography>
          </Layer>
          <TouchableOpacity onPress={() => setReplyTo({})} style={styles.close}>
            <CloseIcon style={{margin: 10}} width={12} height={12} />
          </TouchableOpacity>
        </Layer>
      )}
      {MediaValue?.photo && (
        <Layer style={styles.messageMedia}>
          <IMG
            src={MediaValue?.photo}
            resizeMode="cover"
            style={styles.media}
          />
          <TouchableOpacity onPress={cleanImage} style={styles.clean}>
            <CloseIcon style={styles.margin} width={12} height={12} />
          </TouchableOpacity>
        </Layer>
      )}
      <TouchableOpacity
        style={styles.sendTouchable}
        onPress={directMessageLoading ? null : handleSubmit(sendMessage)}>
        {directMessageLoading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <SendIcon2
            color={getColor({
              color: isDark('primary') ? 'gray.50' : 'gray.800',
            })}
          />
        )}
      </TouchableOpacity>
    </Layer>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },

  formInput: {
    width: '82%',
    fontSize: 14,
    paddingTop: Platform.OS === 'ios' ? 13 : 6,
  },

  marginRight: {marginRight: 10},

  cameraIcon: {marginRight: 10, alignSelf: 'center'},

  replyContainer: {
    position: 'absolute',
    bottom: 58,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: getColor({color: 'primary.100'}),
    paddingHorizontal: 8,
    paddingVertical: 11.5,
    borderRadius: 8,
    alignItems: 'center',
  },

  replyImg: {
    width: 35,
    height: 35,
    borderRadius: 4,
    marginHorizontal: 3,
  },

  replyTextContainer: {height: 20, justifyContent: 'center', marginLeft: 6},

  messageMedia: {
    width: '100%',
    position: 'absolute',
    bottom: 58,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 8,
    padding: 21,
  },

  close: {position: 'absolute', top: 0, right: 0},

  media: {
    width: '100%',
    height: 170,
    borderRadius: 10,
  },

  clean: {position: 'absolute', top: 0, right: 0},

  margin: {margin: 10},

  sendTouchable: {
    width: 50,
    height: 50,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
