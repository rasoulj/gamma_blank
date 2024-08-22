import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Divider, Typography, VStack, useToast} from '~/components/elemental';
import {useMutePostMutation, useMuteStoryMutation} from './hooks';

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
  const {mutate: storyMutate, isLoading: storyIsLoading} =
    useMuteStoryMutation();
  const {toast} = useToast();
  const onMutePostAndStory = () => {
    mutate(
      {targetUserId: item?.poster?.id},
      {
        onSuccess: data => {
          console.log(JSON.stringify({muteData: data}));
          if (data?.post_mutePost?.status?.code === 1) {
            onMuteStoryPress();
          } else {
            toast({message: data?.post_mutePost?.status?.value});
          }
        },
        onError: errorData => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };
  const onMuteStoryPress = () => {
    storyMutate(
      {targetUserId: item?.poster?.id},
      {
        onSuccess: data => {
          console.log(JSON.stringify({muteData: data}));
          if (data?.story_muteStory?.status?.code === 1) {
            toast({message: 'Muted'});
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
  return (
    <>
      <CustomActionSheet isVisible={isVisible} onClose={onClose}>
        {isLoading && (
          <VStack>
            <ActivityIndicator></ActivityIndicator>
          </VStack>
        )}
        <View
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 10,
            width: '100%',
          }}>
          <VStack space="8px">
            <Typography alignSelf="center" fontWeight="700" fontSize="lg">
              {`Mute ${item?.user?.fullName}`}
            </Typography>
            <Typography
              alignSelf="center"
              fontWeight="500"
              fontSize="sm"
              color="gray.500">
              You can unmute them from their profile
            </Typography>
            <VStack space="16px" mt="8px">
              <TouchableOpacity onPress={onMuteStoryPress}>
                <Typography color="error.500" fontWeight="700" fontSize="sm">
                  Mute Stories
                </Typography>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity onPress={onMutePostAndStory}>
                <Typography color="error.500" fontWeight="700" fontSize="sm">
                  Mute Stories and Posts
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

const styles = StyleSheet.create({});
