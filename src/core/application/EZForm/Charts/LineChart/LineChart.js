/*
 * File: /src/core/application/EZForm/Charts/LineChart/LineChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Line chart component using react-chartjs-2
 * File Created: Wednesday, 8th December 2021 11:32 am
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Line chart component
 * @param {*} props props passed from parent component
 * @returns {*} Line chart component
 */
function LineChart(props) {
  return (
    <Line
      options={props.options}
      data={props.data}
      data-testid={props['data-testid'] + '-line-chart'}
    />
  );
}

LineChart.propTypes = {
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

export default LineChart;
