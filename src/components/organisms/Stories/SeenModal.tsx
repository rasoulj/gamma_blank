import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  BoldCameraIconSet,
  Box,
  Divider,
  FlatList,
  HStack,
  Header,
  Image,
  Typography,
  VStack,
  View,
  deviceWidth,
  scale,
} from '~/components/elemental';
import {useGetStorySeensQuery} from './hooks';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel-v4';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {UserAvatar} from '~/components';
import {getColor} from '~/utils/helper/theme.methods';

const itemWidth = scale(116);

const SeenModal = ({
  isVisible,
  onClose,
  items,
  onAddStoryPress,
  index,
}: {
  isVisible: boolean;
  onClose: any;
  items: any;
  onAddStoryPress: () => void;
  index?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const {data, isLoading} = useGetStorySeensQuery({
    storyId: items?.[currentIndex]?.story?.id,
  });
  const seenData =
    data?.story_getStories?.result?.items?.[0]?.story?.seens ?? [];

  const renderItem = useCallback(({item, index}) => {
    return <UserAvatar user={item?.user} hasShadow={false} />;
  }, []);

  const carouselRef = React.useRef<Carousel>(null);
  const keyExtractor = React.useCallback(
    (item: any, index: number) => item?.id ?? `el-${index}`,
    [],
  );

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Header title="Story Detail" onClickBack={onClose} />
            <HStack alignSelf="center" space="1" mt="8" alignItems="center">
              <Carousel
                activeSlideAlignment="center"
                inactiveSlideScale={0.85}
                keyExtractor={keyExtractor}
                ref={carouselRef}
                autoplay={false}
                sliderWidth={deviceWidth}
                itemWidth={itemWidth + 10}
                data={[...items, {id: -1}]}
                renderItem={({item, index}) => (
                  <DetailImage {...{item, index, onAddStoryPress}} />
                )}
                firstItem={currentIndex}
                onSnapToItem={index => setCurrentIndex(index)}
              />
            </HStack>
            <VStack mx="5" flex="1" space="5" mt="4">
              <Divider />
              <Typography fontSize="md" color="gray.800" fontWeight="500">
                Viewed by
              </Typography>
              {isLoading && (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              )}
              <FlatList
                data={seenData}
                renderItem={renderItem}
                isLoading={isLoading}
                setEmptyComponent
                ItemSeparatorComponent={<Box h="4" />}
              />
            </VStack>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
export default SeenModal;

const DetailImage = ({item, index, onAddStoryPress}) => {
  const [imageUrl, setImageUrl] = useState(item?.story?.mediaUrl);

  const getThumbnail = async () => {
    if (item?.story?.mediaType === 'IMAGE') setImageUrl(item?.story?.mediaUrl);
    else {
      if (item?.story?.thumbnail) setImageUrl(item?.story?.thumbnail);
      else {
        let url = await createThumbnailVideo(item?.story?.mediaUrl, 0);
        setImageUrl({uri: url});
      }
    }
  };
  useEffect(() => {
    getThumbnail();
  }, []);

  return (
    <>
      {item?.id === -1 ? (
        <TouchableOpacity style={styles.cameraStyle} onPress={onAddStoryPress}>
          <VStack style={[styles.addItem]} bgColor="gray.500">
            <BoldCameraIconSet
              width={scale(31)}
              height={scale(31)}
              color="#FAFAFA"
            />
          </VStack>
        </TouchableOpacity>
      ) : (
        <Image src={imageUrl} style={styles.itemPreview} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: getColor({color: 'background.200'})},

  itemPreview: {
    width: scale(116),
    height: scale(184),
    backgroundColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
  },

  addItem: {
    width: scale(88),
    height: scale(139),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loading: {top: 50, position: 'absolute', alignSelf: 'center'},

  cameraStyle: {
    width: scale(116),
    height: scale(184),
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
});
