import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  SendIcon3,
  getColor,
  useIsFocused,
  useNavigate,
} from '~/components/elemental';
import {scale} from '~/utils/methods';
import ShareModal from '~/components/molecules/ShareModal';
import SeenModal from './SeenModal';
const HighlightItemBottomOptions = ({
  onPauseTimeLine,
  item,
  onPressOut,
}: {
  onPauseTimeLine: any;
  item: number;
  onPressOut: any;
}) => {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleShareModal, setVisibleShareModal] = useState(false);

  const onCloseShareModal = () => {
    onPressOut();
    setVisibleShareModal(false);
  };
  const onSendPress = () => {
    onPauseTimeLine();
    setVisibleShareModal(true);
  };

  const onCloseDetail = () => {
    setVisibleDetail(false);
    onPressOut();
  };

  const {navigateWithName} = useNavigate();
  const onAddStoryPress = () => {
    setVisibleDetail(false);
    navigateWithName('AddStory');
    onPauseTimeLine();
  };

  /// required when user close the add story screen
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) onPressOut();
  }, [isFocused]);

  return (
    <>
      <HStack position="absolute" left={0} right={0} zIndex={1000} bottom={0}>
        <HStack w="100%" px={scale(20)} space="4" bottom={scale(20)}>
          <VStack flex="1" />
          <HStack
            alignItems="center"
            borderRadius="10"
            justifyContent="center"
            w="10"
            height="10"
            bgColor="rgba(255, 255, 255, 0.3)">
            <SendIcon3
              color={getColor({color: 'background.200'})}
              width={24}
              height={24}
              onPress={onSendPress}
            />
          </HStack>
        </HStack>
      </HStack>
      {visibleShareModal && (
        <ShareModal
          item={item}
          mediaType="SHARED_STORY"
          isVisible={visibleShareModal}
          onClose={onCloseShareModal}
          deepLink={`storyDetails?id=${item?.story?.id}`}
        />
      )}
      {visibleDetail && (
        <SeenModal
          item={item}
          isVisible={visibleDetail}
          onClose={onCloseDetail}
          onAddStoryPress={onAddStoryPress}
        />
      )}
    </>
  );
};
export default HighlightItemBottomOptions;
