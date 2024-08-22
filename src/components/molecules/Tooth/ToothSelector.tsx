import images from '~/assets/images/tooth/images';
import React, {useState} from 'react';
import {ImageSourcePropType, TouchableWithoutFeedback} from 'react-native';
import {StyleSheet} from 'react-native';
import {Center, Text, View} from 'native-base';
import {Tooth} from './Tooth';
import {ChevronUpIcon, ChevronDownIcon} from '../../elemental';
type Props = React.ComponentProps<typeof View> & {
  children?: React.ReactElement;
  onSelectTooth: (tooth: ToothType) => void;
  hasUpDownSelector?: boolean;
};

export type ToothType = {
  image: string;
  imageSelected: ImageSourcePropType;
  number: number;
};

const toothArray = [
  {
    image: images.tooth1,
    imageSelected: images.tooth1Dark,
    number: 1,
  },
  {
    image: images.tooth2,
    imageSelected: images.tooth2Dark,
    number: 2,
  },
  {
    image: images.tooth3,
    imageSelected: images.tooth3Dark,
    number: 3,
  },
  {
    image: images.tooth4,
    imageSelected: images.tooth4Dark,
    number: 4,
  },
  {
    image: images.tooth5,
    imageSelected: images.tooth5Dark,
    number: 5,
  },
  {
    image: images.tooth6,
    imageSelected: images.tooth6Dark,
    number: 6,
  },
  {
    image: images.tooth7,
    imageSelected: images.tooth7Dark,
    number: 7,
  },
  {
    image: images.tooth8,
    imageSelected: images.tooth8Dark,
    number: 8,
  },
  {
    image: images.tooth9,
    imageSelected: images.tooth9Dark,
    number: 9,
  },
  {
    image: images.tooth10,
    imageSelected: images.tooth10Dark,
    number: 10,
  },
  {
    image: images.tooth11,
    imageSelected: images.tooth11Dark,
    number: 11,
  },
  {
    image: images.tooth12,
    imageSelected: images.tooth12Dark,
    number: 12,
  },
  {
    image: images.tooth13,
    imageSelected: images.tooth13Dark,
    number: 13,
  },
  {
    image: images.tooth14,
    imageSelected: images.tooth14Dark,
    number: 14,
  },
  {
    image: images.tooth15,
    imageSelected: images.tooth15Dark,
    number: 15,
  },
  {
    image: images.tooth16,
    imageSelected: images.tooth16Dark,
    number: 16,
  },
  {
    image: images.tooth17,
    imageSelected: images.tooth17Dark,
    number: 17,
  },
  {
    image: images.tooth18,
    imageSelected: images.tooth18Dark,
    number: 18,
  },
  {
    image: images.tooth19,
    imageSelected: images.tooth19Dark,
    number: 19,
  },
  {
    image: images.tooth20,
    imageSelected: images.tooth20Dark,
    number: 20,
  },
  {
    image: images.tooth21,
    imageSelected: images.tooth21Dark,
    number: 21,
  },
  {
    image: images.tooth22,
    imageSelected: images.tooth22Dark,
    number: 22,
  },
  {
    image: images.tooth23,
    imageSelected: images.tooth23Dark,
    number: 23,
  },
  {
    image: images.tooth24,
    imageSelected: images.tooth24Dark,
    number: 24,
  },
  {
    image: images.tooth25,
    imageSelected: images.tooth25Dark,
    number: 25,
  },
  {
    image: images.tooth26,
    imageSelected: images.tooth26Dark,
    number: 26,
  },
  {
    image: images.tooth27,
    imageSelected: images.tooth27Dark,
    number: 27,
  },
  {
    image: images.tooth28,
    imageSelected: images.tooth28Dark,
    number: 28,
  },
  {
    image: images.tooth29,
    imageSelected: images.tooth29Dark,
    number: 29,
  },
  {
    image: images.tooth30,
    imageSelected: images.tooth30Dark,
    number: 30,
  },
  {
    image: images.tooth31,
    imageSelected: images.tooth31Dark,
    number: 31,
  },
  {
    image: images.tooth32,
    imageSelected: images.tooth32Dark,
    number: 32,
  },
];

const half = Math.ceil(toothArray.length / 2);
const topHalf = toothArray.splice(0, half);
const bottomHalf = toothArray.splice(-half);
const size = 240;
const length = 16;
const symbolSize = 10;

function degToRad(deg: number) {
  return (deg * Math.PI) / 168;
}

const calculateSymbolPosition = (deg: any) => {
  const angleRad = degToRad(deg);
  const radius = size / 2;
  const center = radius;
  // Calculate symbol position
  // Subtract half of symbol size to center it on the circle
  const x = -radius * Math.cos(angleRad) - symbolSize;
  const y = -radius * 1.2 * Math.sin(angleRad) - symbolSize * -2.5 + 20;
  return {x, y};
};

const calculateTextPosition = (deg: number) => {
  const angleRad = degToRad(deg);
  const radius = size / 1.6;
  const center = radius;
  const x = -radius * Math.cos(angleRad) + center - symbolSize;
  const y = -radius * 1.2 * Math.sin(angleRad) + center - symbolSize * -2;
  return {x, y};
};

const ToothSelector = ({
  hasUpDownSelector,
  children,
  onSelectTooth,
  ...otherProps
}: Props) => {
  const [selectedHalf, setSelectedHalf] = useState<'up' | 'down'>('up');

  const [selectedTooth, setSelectedTooth] = useState<ToothType>();

  return (
    <View
      alignItems={'center'}
      flex={1}
      my={8}
      flexDirection={'row'}
      {...otherProps}>
      {hasUpDownSelector && (
        <View zIndex={1} position={'absolute'} style={{marginLeft: 10}}>
          <TouchableWithoutFeedback onPress={() => setSelectedHalf('up')}>
            <Center width={8} height={8}>
              <ChevronUpIcon />
            </Center>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setSelectedHalf('down')}>
            <Center width={8} height={8}>
              <ChevronDownIcon />
            </Center>
          </TouchableWithoutFeedback>
        </View>
      )}

      <View flex={1}>
        {!hasUpDownSelector || selectedHalf === 'up' ? (
          <View flex={1}>
            <View style={s.circle}>
              {Array.from(Array(length), (_, index) => (
                <React.Fragment key={index}>
                  <Tooth
                    onPress={() => {
                      setSelectedTooth(topHalf[index]);
                      onSelectTooth(topHalf[index]);
                    }}
                    style={[
                      s.symbol,
                      {
                        left:
                          calculateSymbolPosition((index * 180) / length).x -
                          10,
                        top: calculateSymbolPosition((index * 180) / length).y,
                      },
                    ]}
                    isSelected={
                      topHalf[index]?.number === selectedTooth?.number
                    }
                    source={
                      topHalf[index]?.number === selectedTooth?.number
                        ? topHalf[index]?.imageSelected
                        : topHalf[index]?.image
                    }
                  />

                  <Text
                    color="primary"
                    mx={0}
                    style={[
                      s.symbol,
                      {
                        left:
                          calculateTextPosition((index * 180) / length).x - 32,
                        top:
                          calculateTextPosition((index * 180) / length).y - 3,
                      },
                    ]}>
                    {topHalf[index]?.number}
                  </Text>
                </React.Fragment>
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}

        <View
          zIndex={1}
          justifyContent={'center'}
          alignItems="center"
          position={'absolute'}
          top={selectedHalf === 'up' ? '35%' : '0%'}
          left="35%">
          {children}
        </View>

        {!hasUpDownSelector || selectedHalf === 'down' ? (
          <View flex={1}>
            <View style={s.circle}>
              {Array.from(Array(length), (_, index) => (
                <React.Fragment key={index ** 2}>
                  <Tooth
                    onPress={() => {
                      setSelectedTooth(bottomHalf[index]);
                      onSelectTooth(bottomHalf[index]);
                    }}
                    isSelected={
                      bottomHalf[index]?.number === selectedTooth?.number
                    }
                    style={[
                      s.symbol,
                      {
                        right:
                          calculateSymbolPosition((index * 180) / length).x - 5,
                        bottom:
                          calculateSymbolPosition((index * 180) / length).y +
                          150,
                      },
                    ]}
                    source={
                      bottomHalf[index]?.number === selectedTooth?.number
                        ? bottomHalf[index]?.imageSelected
                        : bottomHalf[index]?.image
                    }
                  />

                  <Text
                    color="primary"
                    mx={1}
                    style={[
                      s.symbol,
                      {
                        right:
                          calculateTextPosition((index * 180) / length).x - 30,
                        bottom:
                          calculateTextPosition((index * 180) / length).y + 140,
                      },
                    ]}>
                    {bottomHalf[index]?.number}
                  </Text>
                </React.Fragment>
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: size,
    height: size * 0.9,
  },
  symbol: {
    position: 'absolute',

    fontSize: 12,
  },
});

export default ToothSelector;
