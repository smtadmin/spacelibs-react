/*
 * File: /src/core/application/EZForm/Charts/BarChart/BarChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Bar chart component using react-chartjs-2
 * File Created: Monday, 6th December 2021 3:40 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 9th December 2021 5:01 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Returns a multiple chart that can contain bar and line graphs
 * @param {*} props props passed from parent component
 * @returns {*} BarChart component
 */
function BarChart(props) {
  return (
    <Bar
      options={props.options}
      data={props.data}
      data-testid={`${props['data-testid']}-bar-chart`}
    />
  );
}

BarChart.propTypes = {
  'data-testid': PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.array,
        backgroundColor: PropTypes.array,
        borderColor: PropTypes.array,
        borderWidth: PropTypes.number
      })
    )
  }),
  options: PropTypes.shape({
    responsive: PropTypes.bool,
    plugins: PropTypes.shape({
      legend: PropTypes.shape({
        position: PropTypes.string
      }),
      title: PropTypes.shape({
        display: PropTypes.bool,
        text: PropTypes.string
      })
    })
  })
};

export default BarChart;
