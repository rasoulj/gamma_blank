import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  VStack,
} from 'native-base';
import React, {Fragment, useRef} from 'react';
import {LeftArrow, RightArrow} from '~/assets';
import {scale} from '../../elemental';

const HorizontalList = ({
  data,
  size,
  w,
  h,
  renderCustomItem = null,
  manualScrollEnable = false,
}: {
  data: any;
  size?: number;
  w?: number;
  h?: number;
  renderCustomItem?: any;
  manualScrollEnable?: boolean;
}) => {
  const scrollRef = useRef();
  const [pos, setPos] = React.useState(0);

  const scroll = scrollOffset => {
    scrollRef?.current?.scrollTo({animated: true, x: pos + scrollOffset});
  };

  const ScrollHandler = () => {
    return (
      <HStack space="4" alignSelf="center">
        <Pressable onPressIn={() => scroll(-60)}>
          <Center>
            <LeftArrow />
          </Center>
        </Pressable>
        <Pressable onPressIn={() => scroll(60)}>
          <Center>
            <RightArrow />
          </Center>
        </Pressable>
      </HStack>
    );
  };

  const renderItem = (item: any) => {
    return (
      <Fragment>
        <Image
          size={size}
          h={h}
          w={w}
          resizeMode="cover"
          borderRadius="xl"
          source={{
            uri: item?.uri,
          }}
        />
        <ItemSeparatorComponent />
      </Fragment>
    );
  };

  const ItemSeparatorComponent = () => <Box w="3" />;

  return (
    <VStack space="5">
      <ScrollView
        ref={scrollRef}
        py="2"
        horizontal
        pl="3"
        onScroll={e => setPos(e.nativeEvent.contentOffset.x)}
        contentContainerStyle={{paddingEnd: scale(20)}}
        showsHorizontalScrollIndicator={false}>
        {data.map((item: any) =>
          renderCustomItem ? renderCustomItem?.(item) : renderItem(item),
        )}
      </ScrollView>

      {manualScrollEnable ? <ScrollHandler /> : null}
    </VStack>
  );
};

export default HorizontalList;
