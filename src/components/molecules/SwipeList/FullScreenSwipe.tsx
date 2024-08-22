import {
  FlatList,
  ImageBackground,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HStack, deviceWidth, Layer, Typography, getColor} from '../../elemental';


const FullScreenSwipe = ({data}:{data:any}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>(null);

  const Slide = ({item}: {item: any}) => {
    const {title, description} = item;
    return (
      <View
        style={{
          width: deviceWidth,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#7C7B7B",
        }}>
        <ImageBackground
          source={item?.image ? {uri: item?.image} : require('./woman.png')}
          resizeMode="contain"
          style={{
            width: deviceWidth,
            height: '95%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Layer style={{width: '80%'}}>
            <Layer
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Typography
                style={{
                  textAlign: 'left',
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {title}
              </Typography>
              <View
                style={{
                  width: 6,
                  height: 6,
                  margin: 5,
                  backgroundColor: '#fff',
                  borderRadius: 100,
                }}
              />
              <Typography
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#fff',
                }}>
                {28}
              </Typography>
            </Layer>
            <Typography
              style={{
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'left',
                marginBottom: 100,
                color: '#fff',
              }}>
              {description}
            </Typography>
          </Layer>
        </ImageBackground>
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
        contentContainerStyle={{alignItems: 'center'}}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={item => Slide(item)}
      />

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 70,
          marginTop: 10,
        }}>
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
          [...Array(data?.length).keys()].map(item => {
            return (
              <View
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
          })
        )}
      </View>
    </Layer>
  );
};

export default FullScreenSwipe;

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
});
