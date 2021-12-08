/*
 * File: /src/core/application/EZForm/Charts/RadarChart/RadarChart.test.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Test suite for radar chart component
 * File Created: Wednesday, 8th December 2021 1:46 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 1:48 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RadarChart from './RadarChart';

const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }
  ]
};

it('Renders without any options or data', () => {
  const radarChart = render(
    <RadarChart data={data} options={{}} data-testid='test' />
  );
  expect(radarChart).toBeTruthy();
  expect(screen.getByTestId('test-radar-chart')).toBeTruthy();
});
