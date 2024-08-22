import React from 'react';
import {VictoryArea, VictoryChart} from 'victory-native';

const sampleData = [
  {x: 1, y: 2, y0: 0},
  {x: 2, y: 10, y0: 0},
  {x: 3, y: 15, y0: 0},
  {x: 4, y: 14, y0: 0},
  {x: 5, y: 16, y0: 0},
  {x: 6, y: 20, y0: 0},
  {x: 7, y: 13, y0: 0},
  {x: 8, y: 15, y0: 0},
  {x: 9, y: 14, y0: 0},
  {x: 10, y: 2, y0: 0},
];

const AreaChart = ({
  data = sampleData,
}: {
  data: Array<{x: number; y: number; y0?: number}>;
}) => {
  var minX = Math.min(...data.map(item => item.x));
  var maxX = Math.max(...data.map(item => item.x));
  var minY = Math.min(...data.map(item => item.y));
  var maxY = Math.max(...data.map(item => item.y));

  return (
    <VictoryChart
      maxDomain={{x: maxX, y: maxY + 5}}
      minDomain={{x: minX, y: 0}}>
      <VictoryArea
        interpolation="natural"
        data={data}
        style={{
          data: {
            fill: '#BCE6DB',
            fillOpacity: 1,
            stroke: '#1DE9B6',
            strokeWidth: 3,
          },
        }}
        animate={{
          duration: 2000,
          onLoad: {duration: 1000},
        }}
      />
    </VictoryChart>
  );
};

export default AreaChart;
