/*
 * File: /src/core/application/EZForm/MultiChart/MultiChart.test.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Test suite for MultiChart component
 * File Created: Monday, 6th December 2021 1:19 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 11:29 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiChart from './MultiChart';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [100, 300, 500, 200, 900, 700, 400]
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [100, 300, 500, 200, 900, 700, 400],
      borderColor: 'white',
      borderWidth: 2
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [100, 300, 500, 200, 900, 700, 400]
    }
  ]
};
it('Renders without any options or data', () => {
  const multiChart = render(
    <MultiChart data={data} options={{}} data-testid='test' />
  );
  expect(multiChart).toBeTruthy();
  expect(screen.getByTestId('test-multi-chart')).toBeTruthy();
});
