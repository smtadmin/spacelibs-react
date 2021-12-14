/*
 * File: /src/core/application/EZForm/Charts/MultiChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Multiple chart component using react-chartjs-2
 * File Created: Monday, 6th December 2021 1:19 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 9th December 2021 5:09 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

/**
 * Returns a multiple chart that can contain bar and line graphs
 * @param {*} props props passed from parent component
 * @returns {*} MultiChart component
 */
function MultiChart(props) {
  return (
    <Chart
      data={props.data}
      data-testid={`${props['data-testid']}-multi-chart`}
    />
  );
}

MultiChart.propTypes = {
  'data-testid': PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
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

export default MultiChart;
