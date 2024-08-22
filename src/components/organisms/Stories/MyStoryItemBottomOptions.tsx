import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  SendIcon3,
  Typography,
  useIsFocused,
  useNavigate,
} from '~/components/elemental';
import {scale} from '~/utils/methods';
import {TouchableOpacity} from 'react-native';
import ShareModal from '~/components/molecules/ShareModal';
import SeenModal from './SeenModal';
import {model} from '~/data/model';

const MyStoryItemBottomOptions = ({
  onPauseTimeLine,
  itemIndex,
  item,
  onPressOut,
  data,
}: {
  onPauseTimeLine: any;
  itemIndex: number;
  item: number;
  onPressOut: any;
  data?: any;
}) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleShareModal, setVisibleShareModal] = useState(false);
  const {navigateWithName} = useNavigate();

  const onCloseShareModal = () => {
    onPressOut();
    setVisibleShareModal(false);
  };
  const onSendPress = () => {
    onPauseTimeLine();
    setVisibleShareModal(true);
  };

  const onReplyPress = () => {
    onPauseTimeLine();
    setVisibleDetail(true);
  };
  const onCloseDetail = () => {
    setVisibleDetail(false);
    onPressOut();
  };

  const onAddStoryPress = () => {
    setVisibleDetail(false);
    navigateWithName('AddStory');
    onPauseTimeLine();
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) onPressOut();
  }, [isFocused]);

  return (
    <>
      <HStack position="absolute" left={0} right={0} zIndex={1000} bottom={0}>
        <HStack w="100%" px={scale(20)} space="4" bottom={scale(20)}>
          <TouchableOpacity onPress={onReplyPress} style={{flex: 1}}>
            <VStack
              alignItems="center"
              justifyContent="center"
              flex="1"
              py="2"
              borderRadius="10"
              bgColor="rgba(255, 255, 255, 0.3)">
              <Typography fontWeight="700" fontSize="sm" color="#000">
                Story Detail & New Story
              </Typography>
            </VStack>
          </TouchableOpacity>
          {model?.metaData?.configs?.socialStory?.share && (
            <HStack
              alignItems="center"
              borderRadius="10"
              px="2"
              bgColor="rgba(255, 255, 255, 0.3)">
              <SendIcon3
                color={'#000'}
                width={24}
                height={24}
                onPress={onSendPress}
              />
            </HStack>
          )}
        </HStack>
      </HStack>
      {visibleShareModal && (
        <ShareModal
          item={item?.story}
          mediaType="SHARED_STORY"
          isVisible={visibleShareModal}
          onClose={onCloseShareModal}
          deepLink={`storyDetails?id=${item?.story?.id}`}
        />
      )}
      {visibleDetail && (
        <SeenModal
          items={data}
          isVisible={visibleDetail}
          onClose={onCloseDetail}
          onAddStoryPress={onAddStoryPress}
          index={itemIndex}
        />
      )}
    </>
  );
};
export default MyStoryItemBottomOptions;
