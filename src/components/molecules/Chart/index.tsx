import React from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Doughnut from './Doughnut';

const Chart = ({
  layout,
  data,
  time,
  size,
}: {
  layout: 'bar' | 'doughnut' | 'pie' | 'area';
  data: Array<{x: number; y: number; label?: string}>;
  time?: string;
  size?: number;
}) => {
  switch (layout) {
    case 'area':
      return <AreaChart {...{data, time, size}} />;
    case 'pie':
      return <PieChart {...{data, time, size}} />;
    case 'doughnut':
      return <Doughnut {...{data, time, size}} />;
    default:
      return <BarChart {...{data}} />;
  }
};

export default Chart;
