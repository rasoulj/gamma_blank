import dayjs from 'dayjs';
import {Center, Text} from 'native-base';
import React from 'react';
import Svg from 'react-native-svg';
import {VictoryPie} from 'victory-native';
import {scale} from '../../elemental';

const customSize = scale(300);

const color = [
  '#D81B60',
  '#8E24AA',
  '#F4511E',
  '#1E88E5',
  '#00ACC1',
  '#43A047',
];

const sampleData = [
  {x: 1, y: 2, label: ' '},
  {x: 2, y: 3, label: ' '},
  {x: 3, y: 5, label: ' '},
  {x: 1, y: 2, label: ' '},
  {x: 2, y: 3, label: ' '},
  {x: 3, y: 5, label: ' '},
];

const DoughnutChart = ({
  data = sampleData,
  time = new Date().toString?.(),
  size = customSize,
}: {
  data: Array<{x: number; y: number; label: string}>;
  time: string;
  size?: number;
}) => {
  return (
    <Center>
      <Svg width={size} height={size}>
        <Center size={size} position="absolute">
          <Text fontSize={scale(16)} bold>
            {dayjs(time).format('H')} hour {dayjs(time).format('m')} mins
          </Text>
        </Center>

        <VictoryPie
          innerRadius={130}
          colorScale={color}
          data={sampleData}
          standalone={false}
          style={{data: {}}}
        />
      </Svg>
    </Center>
  );
};

export default DoughnutChart;
