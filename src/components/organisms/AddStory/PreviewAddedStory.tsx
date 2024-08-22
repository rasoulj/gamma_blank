import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Image,
  Button,
  ArrowLeftIconSet,
  useRoute,
  useNavigate,
  VolumeHighIconSet,
  VolumeSlashIconSet,
  ConfirmationActionSheet,
  useToast,
  HStack,
  VStack,
} from '~/components/elemental';
import CustomVideo from '~/components/atoms/CustomVideo';
import {StackActions} from '@react-navigation/native';
import {Video} from 'react-native-compressor';
import uploaderStore from '~/stores/uploaderStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUpdateStoryMutation} from './hooks';
import {useQueryClient} from 'react-query';

const PreviewAddedStory = () => {
  const {params} = useRoute();
  const media = params?.media;
  const type = params?.type ?? params?.mediaType;

  const setCreateStoryData = uploaderStore(state => state.setCreateStoryData);

  const [isVisibleDraftModal, setIsVisibleModal] = useState<boolean>(false);
  const source = useMemo(
    () =>
      params?.id
        ? params?.mediaUrl
        : media?.indexOf('file://') === 0
        ? media
        : `file://${media}`,
    [media],
  );

  const compressId = useRef('0');

  const {navigation, navigateWithName} = useNavigate();
  const onGoBack = () => {
    if (compressId?.current != '0') {
      Video.cancelCompression(compressId?.current);
    }
    navigation.goBack();
  };

  const {mutate, isLoading: isUpdating} = useUpdateStoryMutation();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const onUpdateStory = () => {
    mutate(
      {
        input: {
          id: params?.id,
          mediaUrl: params?.mediaUrl,
          isDraft: false,
          mediaType: type,
          isMute: params?.isMute,
          thumbnail: params?.thumbnail,
        },
      },
      {
        onSuccess: data => {
          if (data?.story_updateStory?.status?.code === 1) {
            toast({message: 'Success', type: 'success'});
            queryClient.invalidateQueries(['story_getLastStoriesOfUsers'], {
              exact: false,
            });
            queryClient.invalidateQueries(['story_getMyLastStoriesOfUsers'], {
              exact: false,
            });
            navigateWithName('socialHome');
          } else {
            toast({
              message: data?.story_updateStory?.status?.value,
              type: 'error',
            });
          }
        },
        onError: data => {
          toast({message: 'Something went wrong', type: 'error'});
        },
      },
    );
  };

  const onAddPress = async (isDraft = false) => {
    setCreateStoryData({...params, isDraft, isMute});
    navigation.goBack();
    navigation.dispatch(StackActions.popToTop());
    return;
  };

  const [isMute, setIsMute] = useState(params?.isMute ?? false);
  const onMutePress = () => {
    setIsMute(prev => !prev);
  };

  const onCloseModal = () => setIsVisibleModal(false);
  const onPressDraft = () => {
    onAddPress(true);
  };

  const onBackPress = () => {
    if (!params?.isDraft) setIsVisibleModal(true);
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <HStack
        justifyContent="space-between"
        zIndex={10000}
        top={4}
        left={0}
        right={0}
        pt="7"
        position={'absolute'}>
        <TouchableOpacity onPress={onBackPress}>
          <VStack
            w={10}
            mx="5"
            h={10}
            borderRadius="20"
            alignItems="center"
            justifyContent="center"
            bgColor="rgba(255, 255, 255, 0.3)">
            <ArrowLeftIconSet color="gray.800" />
          </VStack>
        </TouchableOpacity>
        <HStack>
          {type === 'VIDEO' && (
            <TouchableOpacity onPress={onMutePress}>
              <VStack
                w="10"
                mr="5"
                h="10"
                borderRadius="20"
                alignItems="center"
                justifyContent="center"
                bgColor="rgba(255, 255, 255, 0.3)">
                {isMute ? (
                  <VolumeSlashIconSet color="gray.800" />
                ) : (
                  <VolumeHighIconSet color="gray.800" />
                )}
              </VStack>
            </TouchableOpacity>
          )}
        </HStack>
      </HStack>
      {type === 'IMAGE' ? (
        <Image
          style={styles.fullSize}
          src={{uri: source}}
          resizeMode="contain"
        />
      ) : (
        <CustomVideo
          source={source}
          style={styles.fullSize}
          isMute={isMute}
          resizeMode="contain"
        />
      )}
      <VStack style={styles.bottomBtn}>
        <Button
          isLoading={isUpdating}
          onPress={() => {
            params?.id ? onUpdateStory() : onAddPress(false);
          }}>
          Add Story
        </Button>
      </VStack>
      {isVisibleDraftModal && (
        <ConfirmationActionSheet
          title="Save as draft?"
          description="Drafts let you save your edits, so you come back later."
          isOpen={isVisibleDraftModal}
          onClose={onCloseModal}
          onConfirmPress={onPressDraft}
          confirmButtonText="Save draft"
          confirmBtnColor="primary.500"
          onCancelPress={onGoBack}
        />
      )}
    </SafeAreaView>
  );
};
export default PreviewAddedStory;

const styles = StyleSheet.create({
  bottomBtn: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 10000,
  },

  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    top: 0,
  },

  container: {flex: 1, backgroundColor: 'black'},

  fullSize: {
    width: '100%',
    height: '100%',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },

  flex1: {flex: 1, backgroundColor: 'black'},
});
