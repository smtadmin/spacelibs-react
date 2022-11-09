/*
 * File: /src/core/application/EZForm/Charts/PolarAreaChart/PolarAreaChart.test.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Test suite for PolarAreaChart component
 * File Created: Wednesday, 8th December 2021 11:43 am
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 1:48 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import PolarAreaChart from './PolarAreaChart';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderWidth: 1
    }
  ]
};

it('Renders without any options or data', () => {
  const polarAreaChart = render(
    <PolarAreaChart data={data} options={{}} data-testid='test' />
  );
  expect(polarAreaChart).toBeTruthy();
  expect(screen.getByTestId('test-polar-area-chart')).toBeTruthy();
});
