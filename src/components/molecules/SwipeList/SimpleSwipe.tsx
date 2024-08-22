import React, {useEffect, useRef} from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Layer,
  Typography,
  deviceWidth,
  getColor,
  useNavigate,
} from '../../elemental';

const SimpleSwipe = ({data}: {data: any}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>(null);
  const {navigateWithName} = useNavigate();

  const SlideWidth = deviceWidth - 40;
  const Slide = ({item, index}: {item: any; index}) => {
    const {title, navigate, params} = item;
    return (
      <TouchableOpacity
        style={[
          styles.slideContainer,
          {
            width: SlideWidth,
            marginLeft: index === 0 ? 20 : 4,
            marginRight: index === data?.length - 1 ? 20 : 4,
          },
        ]}
        onPress={() => navigateWithName(navigate, params)}>
        <ImageBackground
          source={item?.image ? {uri: item?.image} : require('./woman.png')}
          resizeMode="cover"
          style={styles.imageBackground}>
          <Layer style={[styles.layer, {width: SlideWidth}]}>
            <Layer style={styles.layerInner}>
              <Layer style={styles.titleContainer}>
                <Typography style={styles.title}>
                  {title}
                </Typography>
                <Typography style={styles.discount}>
                  {item?.discount}%{' '}
                  <Typography style={styles.discountText}>
                    Discount
                  </Typography>
                </Typography>
              </Layer>
            </Layer>
          </Layer>
        </ImageBackground>
      </TouchableOpacity>
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
    if (nextSlideIndex != data?.length) {
      const offset = nextSlideIndex * SlideWidth + 7;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  useEffect(() => {
    goNextSlide();
  }, []);

  return (
    <Layer style={styles.container}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={UpdateCurrentSlideIndex}
        pagingEnabled
        snapToInterval={SlideWidth + 8}
        contentContainerStyle={styles.flatListContent}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={item => Slide(item)}
      />
      {data?.length > 7 ? (
        <Typography style={styles.paginationText}>
          {currentSlideIndex + 1}/{data?.length}
        </Typography>
      ) : (
        <Layer style={styles.paginationDotsContainer}>
          {[...Array(data?.length).keys()].map(item => {
            return (
              <Layer
                key={item}
                style={[
                  styles.paginationDot,
                  {
                    width: currentSlideIndex === item ? 30 : 8,
                    backgroundColor:
                      currentSlideIndex === item
                        ? getColor({color: 'primary.600'})
                        : getColor({color: 'primary.300'}),
                  },
                ]}
              />
            );
          })}
        </Layer>
      )}
    </Layer>
  );
};

export default SimpleSwipe;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slideContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: getColor({color:"gray.300"}),
    borderRadius: 5,
    margin: 4,
  },
  imageBackground: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  layer: {
    justifyContent: 'flex-end',
    backgroundColor: getColor({color:"gray.800"}) + 80,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
  },
  layerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '60%',
  },
  title: {
    color: 'gray.50',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: 7,
  },
  discount: {
    color: 'gray.50',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'left',
  },
  discountText: {
    color: 'gray.50',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  flatListContent: {
    alignItems: 'center',
  },
  paginationText: {
    color: getColor({color: 'primary.300'}),
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -18,
    marginTop: 10,
  },
  paginationDot: {
    height: 7,
    borderRadius: 100,
    margin: 2,
  },
});
