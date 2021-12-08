/*
 * File: /src/core/application/EZForm/Charts/PieChart/PieChart.test.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Test suite for pie chart compoonent
 * File Created: Monday, 6th December 2021 5:09 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 11:24 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import PieChart from './PieChart';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};

it('Renders without any options with valid data', () => {
  const pieChart = render(
    <PieChart data={data} options={{}} data-testid='test' />
  );
  expect(pieChart).toBeTruthy();
  expect(screen.getByTestId('test-pie-chart')).toBeTruthy();
});
