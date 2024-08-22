import {HStack, VStack, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import {Image} from '~/components';
import useAuthStore from '~/stores/authStore';
import {
  Button,
  Typography,
  deviceWidth,
  getColor,
  useNavigate,
} from '../../elemental';
import image_1 from './initial_images/1.png';
import image_2 from './initial_images/2.png';
import image_3 from './initial_images/3.png';

const initialData = [
  {
    id: 1,
    title: 'Post Content!',
    description: 'Diverse categoryList Image , video or text',
    image: image_1,
  },
  {
    id: 2,
    title: 'Tag a category for post',
    description:
      'sports , politics, science , art, georaphy, events or event more!',
    image: image_2,
  },
  {
    id: 3,
    title: 'Filter in search',
    description:
      "See what's on the mind of others Explore in a professional way",
    image: image_3,
  },
];
interface IProps {
  data?: any[];
  dotActiveColor?: string;
  path?: string;
}

export default function Onboarding({
  data = initialData,
  dotActiveColor,
  path,
}: IProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = React.useRef<Carousel>(null);
  const {navigateWithName} = useNavigate();
  const {setIsOnboardingVisited} = useAuthStore();

  const onNext = (index: number) => {
    const arrayLength = data?.length;
    let nextIndex = index;
    if (index < arrayLength - 1) {
      nextIndex = index + 1;
      if (carouselRef && carouselRef.current) {
        carouselRef.current.snapToItem(nextIndex);
      }
    } else {
      setIsOnboardingVisited(true);
      navigateWithName(path);
    }
  };

  const keyExtractor = React.useCallback(
    (item: any, index: number) => item?.id ?? `el-${index}`,
    [],
  );

  function renderItem({item, index}) {
    return (
      <VStack mt="80px" space="80px">
        <Image
          source={
            typeof item.image === 'string' ? {uri: item.image} : item.image
          }
          resizeMode="contain"
          style={styles.image}
        />
        {item.title && (
          <Typography
            style={{
              fontSize: 22,
              fontWeight: '700',
              lineHeight: 28,
              textAlign: 'center',
              marginHorizontal: 20,
            }}>
            {item.title}
          </Typography>
        )}
        {item?.description && (
          <Typography
            style={{
              fontSize: 16,
              fontWeight: '400',
              lineHeight: 22,
              textAlign: 'center',
              marginHorizontal: 20,
              color: getColor({color: 'gray.800'}),
            }}>
            {item.description}
          </Typography>
        )}
      </VStack>
    );
  }

  return (
    <VStack justifyContent="space-between" flex={1} space="24px">
      <View>
        <Carousel
          keyExtractor={keyExtractor}
          ref={carouselRef}
          autoplay={false}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          data={data}
          renderItem={renderItem}
          firstItem={currentIndex}
          onSnapToItem={index => setCurrentIndex(index)}
        />
      </View>
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={currentIndex}
        containerStyle={styles.containerStyle}
        dotStyle={[
          styles.activeDotStyle,
          {
            backgroundColor: dotActiveColor ?? getColor({color: 'primary.400'}),
          },
        ]}
        inactiveDotStyle={styles.dotStyle}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.9}
      />
      <Button style={styles.button} onPress={() => onNext(currentIndex)}>
        <Typography color={'background.500'} style={styles.buttonText}>
          {data?.length === currentIndex ? 'Start' : 'Next'}
        </Typography>
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    marginVertical: 20,
    height: 36,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  containerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -5,
    backgroundColor: getColor({color: 'primary.300'}),
  },
  activeDotStyle: {
    width: 35,
    height: 10,
    borderRadius: 4,
    marginHorizontal: -5,
  },
  image: {
    alignSelf:"center",
    width: '80%',
    height: 255,
  },
});
