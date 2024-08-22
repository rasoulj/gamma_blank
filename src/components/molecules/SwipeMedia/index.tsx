import {
  FlatList,
  ImageBackground,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {
  HStack,
  deviceWidth,
  Layer,
  Typography,
  deviceHeight,
  getColor,
  useNavigate,
  IMG,
} from '../../elemental';
import Video from 'react-native-video';

const SwipeMedia = ({data}: {data: any}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>(null);
  const scrollx = useRef(new Animated.Value(0)).current;
  const {navigateWithName} = useNavigate();

  const SlideWidth = deviceWidth - 70;
  const Slide = ({item, index}: {item: any; index}) => {
    const {title, description, url, navigate, portfolioType} = item;
    return (
      <View
        style={{
          width: SlideWidth,
          height: 192,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: '#7C7B7B',
          borderRadius: 11,
          margin: 4,
        }}>
        {portfolioType?.includes('image') ? (
          <IMG
            src={url}
            resizeMode="cover"
            style={{
              width: '100%',
              // width: 115,
              height: 200,
              alignSelf: 'center',
              borderRadius: 5,
            }}
          />
        ) : (
          <Video
            source={{
              uri: url,
            }}
            style={styles.video}
            muted={false}
            repeat={false}
            paused={true}
            onLoadError={er => console.log('err', er)}
            controls
          />
        )}
      </View>
    );
  };

  const UpdateCurrentSlideIndex = (e: any) => {
    const contextOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contextOffsetX / deviceWidth);
    setCurrentSlideIndex(currentIndex);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != data.length) {
      console.log('sdfd');

      const offset = nextSlideIndex * deviceWidth;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  const skip = () => {
    const lastSlideIndex = data.length - 1;
    const offset = lastSlideIndex * deviceWidth;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  const Footer = () => {
    return (
      <TouchableOpacity
        style={styles.onboarding_button}
        onPress={() => goNextSlide()}>
        {/* <ArrowRight2 width={9} height={19} color={Colors.WHITE} /> */}
      </TouchableOpacity>
    );
  };
  return (
    <Layer
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={UpdateCurrentSlideIndex}
        pagingEnabled
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {x: scrollx}}}],
        //   {
        //     useNativeDriver: false,
        //   },
        // )}
        snapToInterval={SlideWidth + 8}
        // bounces={false}
        // scrollEventThrottle={40}
        contentContainerStyle={{alignItems: 'center'}}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={item => Slide(item)}
      />
      {data?.length > 5 ? (
        <Typography
          style={{
            color: getColor({color: 'primary.300'}),
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {currentSlideIndex + 1}/{data?.length}
        </Typography>
      ) : (
        <Layer
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: -18,
            marginTop: 10,
          }}>
          {[...Array(data?.length).keys()].map(item => {
            return (
              <Layer
                key={item}
                style={{
                  width: currentSlideIndex === item ? 24 : 10,
                  height: 10,
                  backgroundColor:
                    currentSlideIndex === item
                      ? getColor({color: 'primary.600'})
                      : getColor({color: 'primary.300'}),
                  borderRadius: 100,
                  margin: 2,
                }}
              />
            );
          })}
        </Layer>
      )}
    </Layer>
  );
};

export default SwipeMedia;

const styles = StyleSheet.create({
  slide: {
    width: 200,
    height: 200,
    // backgroundColor: Colors.GRAY3,
  },
  onboarding_button: {
    // backgroundColor: Colors.PRIMARY,
    // width: scale(50),
    // height: scale(50),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 5,
  },
});
