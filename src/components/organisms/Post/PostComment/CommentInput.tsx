import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layer from '../../../atoms/Layer';
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from '../../../atoms/FormInput';
import {
  getColor,
  isDark,
  SendIcon2,
  KeyboardAvoidingView,
  CustomFormInput,
  Typography,
  CloseIcon,
} from '../../../elemental';
import {useCreateCommentPost} from '../hook';
import {useQueryClient} from 'react-query';

const CommentInput = ({replyTo, setReplyTo, postId}) => {
  const queryClient = useQueryClient();

  const {...methods} = useForm<Record<string, any>, object>({
    mode: 'onChange',
  });
  const {handleSubmit, register, reset, control} = methods;

  const {mutate: mutateCreateComment, isLoading: isCommentSendLoading} =
    useCreateCommentPost();
  const sendComment = formData => {
    let itemInput = {
      postId,
      parentId: replyTo ? replyTo?.id : null,
      text: formData?.text,
    };
    mutateCreateComment(
      {commentInput: itemInput},
      {
        onSuccess: success => {
          Keyboard.dismiss();
          console.log('Success', success);
          reset();
          queryClient.refetchQueries(['getPostComments']);
          queryClient.refetchQueries(['getPosts']);
          setReplyTo(null);
        },
        onError: error => {
          console.log('error', error);
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
      style={{
        position: 'absolute',
        bottom: 75,
        backgroundColor: replyTo ? getColor({color: 'primary.100'}) : null,
        paddingVertical: 16,
      }}>
      {replyTo && (
        <Layer
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography
            style={{
              alignSelf: 'flex-start',
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '500',
            }}>
            Replying to{' '}
            <Typography color={'secondary.500'}>
              {replyTo?.user?.fullName}
            </Typography>
          </Typography>
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => setReplyTo(null)}>
            <CloseIcon />
          </TouchableOpacity>
        </Layer>
      )}
      <FormProvider {...methods}>
        <Layer
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <FormInput
            placeholder="Comment"
            name="text"
            multiline={true}
            //   isFocus={inputFocus ? true : false}
            borderRadius={10}
            style={{
              width: '83%',
              fontSize: 14,
              paddingTop: Platform.OS === 'ios' ? 13 : 0,
              borderRadius: 10,
            }}
            height="49"
            {...register('text', {
              required: true,
            })}
          />
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: getColor({color: 'primary.500'}),
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}
            onPress={isCommentSendLoading ? null : handleSubmit(sendComment)}>
            {isCommentSendLoading ? (
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
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({});
