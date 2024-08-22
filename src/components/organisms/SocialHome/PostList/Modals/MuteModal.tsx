import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Divider, Typography, VStack, useToast} from '~/components/elemental';
import {useMutePostMutation, useMuteStoryMutation} from '../../hook';
import {useQueryClient} from 'react-query';

const MuteModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {mutate, isLoading} = useMutePostMutation();
  const {toast} = useToast();

  const {mutate: storyMutate} = useMuteStoryMutation();
  const onMutePostAndStory = () => {
    storyMutate(
      {targetUserId: item?.poster?.id},
      {
        onSuccess: data => {
          if (data?.story_muteStory?.status?.code === 1) {
            onMutePostPress();
          } else {
            toast({message: data?.story_muteStory?.status?.value});
          }
        },
        onError: errorData => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const queryClient = useQueryClient();
  const onMutePostPress = () => {
    mutate(
      {targetUserId: item?.poster?.id},
      {
        onSuccess: data => {
          if (data?.post_mutePost?.code === 1) {
            toast({message: 'Muted'});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            onClose();
          } else {
            toast({message: data?.post_mutePost?.value});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            onClose();
          }
        },
        onError: errorData => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        {isLoading && (
          <VStack>
            <ActivityIndicator></ActivityIndicator>
          </VStack>
        )}
        <View style={styles.container}>
          <VStack space="2">
            <Typography alignSelf="center" fontWeight="700" fontSize="lg">
              {`Mute ${item?.poster?.fullName}`}
            </Typography>
            <Typography
              alignSelf="center"
              fontWeight="500"
              fontSize="sm"
              color="gray.500">
              You can unmute them from their profile
            </Typography>
            <VStack space="4" mt="2">
              <TouchableOpacity onPress={onMutePostPress}>
                <Typography color="error.500" fontWeight="700" fontSize="sm">
                  Mute Posts
                </Typography>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity onPress={onMutePostAndStory}>
                <Typography color="error.500" fontWeight="700" fontSize="sm">
                  Mute Posts and Story
                </Typography>
              </TouchableOpacity>
              <Divider />
              <Typography
                fontWeight="700"
                fontSize="sm"
                onPress={onClose}
                color="gray.800">
                Cancel
              </Typography>
            </VStack>
          </VStack>
        </View>
      </CustomActionSheet>
    </>
  );
};

export default MuteModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
});
