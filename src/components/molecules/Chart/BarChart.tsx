import React from 'react';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {scale} from '../../elemental';

const sampleData = [
  {x: 16, y: 5},
  {x: 17, y: 21},
  {x: 18, y: 7},
  {x: 19, y: 9},
  {x: 20, y: 16},
  {x: 21, y: 14},
  {x: 22, y: 7},
];

const BarChart = ({
  data = sampleData,
}: {
  data: Array<{x: number; y: number}>;
}) => {
  var minX = Math.min(...data.map(item => item.x));
  var maxX = Math.max(...data.map(item => item.x));
  var minY = Math.min(...data.map(item => item.y));
  var maxY = Math.max(...data.map(item => item.y));

  return (
    <VictoryChart
      maxDomain={{x: maxX, y: maxY + 5}}
      minDomain={{x: minX - 1, y: 0}}
      theme={VictoryTheme.material}
      domainPadding={{x: 15}}>
      <VictoryBar
        alignment="end"
        barWidth={scale(10)}
        style={{
          data: {fill: '#1DE9B6'},
        }}
        data={data}
        animate={{
          duration: 2000,
          onLoad: {duration: 1000},
        }}
        cornerRadius={{topLeft: 5, topRight: 5}}
      />
    </VictoryChart>
  );
};

export default BarChart;
