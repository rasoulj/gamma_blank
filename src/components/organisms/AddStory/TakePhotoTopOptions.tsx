import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowDownIconSet,
  CloseIconSet,
  ExportIconSet,
  Typography,
  VStack,
  scale,
  useNavigate,
  CircleIcon,
  HStack,
  ThreeDotsIcon,
} from '~/components/elemental';
import {MAX_VIDEO_STORY_DURATION} from './AddStory';
import {model} from '~/data/model';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import DraftModal from './DraftsModal';
import PostDraftModal from '../CreatePost/DraftsModal';

const socialConfigs = model?.metaData?.configs?.social;

const TakePhotoTopOptions = ({
  recordingStartTime,
  recordingEndTime,
  setEndRecordingReached,
  currentItem = 'Story',
  setCurrentItem,
  backOnPress,
  isPhotoStory,
  pt = 0,
  inputRef,
}: {
  recordingStartTime?: Date;
  recordingEndTime?: Date;
  currentItem: string;
  setEndRecordingReached?: any;
  setCurrentItem?: (value: any) => void;
  backOnPress?: any;
  pt?: string | number;
  isPhotoStory?: any;
  inputRef?: any;
}) => {
  const [time, setTime] = useState<string | undefined>();
  const [intervalVal, setIntervalVal] = useState<any>();
  const [data, setData] = useState(['Post', 'Reels', 'Live']);

  const menuItems = useMemo(() => {
    let tmenuItems = [];
    socialConfigs?.story && tmenuItems.push('Story');
    socialConfigs?.post && tmenuItems.push('Post');
    socialConfigs?.reels && tmenuItems.push('Reels');
    socialConfigs?.live && tmenuItems.push('Live');
    setCurrentItem(tmenuItems?.[0]);
    let tempItems = [...tmenuItems];
    tempItems.splice(0, 1);
    setData(tempItems);
    return tmenuItems;
  }, []);

  const {navigation} = useNavigate();
  const goBackOnPress = () => {
    if (!backOnPress) {
      navigation.goBack();
    } else {
      backOnPress?.();
    }
  };

  useEffect(() => {
    if (recordingEndTime) {
      clearInterval(intervalVal);
    }
  }, [recordingEndTime]);

  useEffect(() => {
    if (recordingStartTime) {
      let current = setInterval(() => {
        let seconds = dayjs(new Date()).diff(recordingStartTime, 'seconds');
        if (seconds === MAX_VIDEO_STORY_DURATION) {
          setEndRecordingReached?.(true);
        }
        setTime('00:' + (seconds < 10 ? '0' + seconds : seconds));
      }, 1 * 1000);
      setIntervalVal(current);
    } else {
      setTime(undefined);
    }
    return () => clearInterval(intervalVal);
  }, [recordingStartTime]);

  const onItemPress = (item, index) => {
    const tempData = [...data];
    setShowMenu(false);
    if (item != currentItem) {
      tempData[index] = currentItem;
      setCurrentItem(item);
      setData(tempData);
    }
  };
  const [showMenu, setShowMenu] = useState(false);
  const onPressSeeStory = () => setShowMenu(prev => !prev);

  const [visibleDraftMenu, setVisibleDraftMenu] = useState(false);
  const onCloseDraft = () => setVisibleDraftMenu(false);
  const onOpenDraftMenu = () => setVisibleDraftMenu(true);

  const [visibleDraftList, setVisibleDraftList] = useState(false);
  const onCloseDraftList = () => setVisibleDraftList(false);
  const onOpenDraftList = () => {
    onCloseDraft();
    setVisibleDraftList(true);
  };

  return (
    <>
      <VStack top="5" position="absolute" zIndex={100} left={0} right={0}>
        <HStack
          px="5"
          pt="2"
          width="full"
          alignItems="center"
          justifyContent="space-between"
          pt={pt}
          backgroundColor="transparent">
          <TouchableOpacity onPress={goBackOnPress}>
            <VStack
              w="10"
              h="10"
              borderRadius="20"
              alignItems="center"
              justifyContent="center"
              bgColor="rgba(255, 255, 255, 0.3)">
              <CloseIconSet
                color={'gray.800'}
                width={scale(24)}
                height={scale(24)}
              />
            </VStack>
          </TouchableOpacity>
          <VStack
            position="absolute"
            alignSelf="center"
            alignItems="center"
            zIndex={100}
            left={60}
            right={60}>
            <TouchableOpacity onPress={onPressSeeStory}>
              <HStack
                pl="4"
                py="2"
                pr={menuItems?.length > 1 ? '4' : '4'}
                w="99"
                space="2"
                bgColor="rgba(255, 255, 255, 0.3)"
                alignItems="center"
                justifyContent={menuItems?.length === 1 ? 'center' : undefined}
                borderRadius={'10'}>
                <Typography color="gray.800" fontSize="md" fontWeight="600">
                  {currentItem}
                </Typography>
                {menuItems?.length > 1 && (
                  <ArrowDownIconSet
                    color="gray.800"
                    width={scale(20)}
                    height={scale(20)}
                  />
                )}
              </HStack>
            </TouchableOpacity>
          </VStack>
          <HStack
            flex="1"
            justifyContent={'flex-end'}
            alignItems="center"
            space="1">
            {isPhotoStory && (
              <>
                {time && <CircleIcon color="error.500" />}
                <Typography color="#fff">{time}</Typography>
              </>
            )}
            {currentItem != 'Live' && (
              <TouchableOpacity onPress={onOpenDraftMenu}>
                <ThreeDotsIcon style={styles.menuIcon} />
              </TouchableOpacity>
            )}
          </HStack>
        </HStack>
        {showMenu && (
          <VStack
            width="full"
            space="1"
            alignItems="center"
            justifyContent="space-between">
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemPress(item, index)}
                  key={(item, index) => `${item}`}>
                  <HStack
                    py="2"
                    w="99"
                    alignItems="center"
                    mt={index === 0 ? 1 : 0}
                    justifyContent="center"
                    bgColor="rgba(255, 255, 255, 0.3)"
                    borderRadius={'10'}>
                    <Typography color="gray.800" fontSize="md" fontWeight="600">
                      {item}
                    </Typography>
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </VStack>
        )}
      </VStack>
      {visibleDraftMenu && (
        <CustomActionSheet isVisible={visibleDraftMenu} onClose={onCloseDraft}>
          <TouchableOpacity onPress={onOpenDraftList}>
            <HStack space="2" alignItems="center" padding="5">
              <ExportIconSet />
              <Typography>Drafts</Typography>
            </HStack>
          </TouchableOpacity>
        </CustomActionSheet>
      )}
      {visibleDraftList && currentItem === 'Story' && (
        <DraftModal isVisible={visibleDraftList} onClose={onCloseDraftList} />
      )}
      {visibleDraftList &&
        (currentItem === 'Reels' || currentItem === 'Post') && (
          <PostDraftModal
            postType={currentItem}
            isVisible={visibleDraftList}
            onClose={onCloseDraftList}
          />
        )}
    </>
  );
};
export default TakePhotoTopOptions;

const styles = StyleSheet.create({
  menuIcon: {transform: [{rotate: '90deg'}]},
});
