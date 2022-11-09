/*
 * File: /src/core/application/EZForm/Charts/LineChart/Linechart.test.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Test suite for line chart component
 * File Created: Wednesday, 8th December 2021 11:32 am
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 11:42 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 300, 500, 200, 900, 700, 400],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: [100, 300, 500, 200, 900, 700, 400],
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};

it('Renders without any options or data', () => {
  const lineChart = render(
    <LineChart data={data} options={{}} data-testid='test' />
  );
  expect(lineChart).toBeTruthy();
  expect(screen.getByTestId('test-line-chart')).toBeTruthy();
});
