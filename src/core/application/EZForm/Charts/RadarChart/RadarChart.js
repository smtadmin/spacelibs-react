/*
 * File: /src/core/application/EZForm/Charts/RadarChart/RadarChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Radar chart component using react-chartjs-2
 * File Created: Wednesday, 8th December 2021 1:46 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 9th December 2021 5:02 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * Radar chart component
 * @param {*} props props passed from parent component
 * @returns {*} Radar chart component
 */
function RadarChart(props) {
  return (
    <Radar
      options={props.options}
      data={props.data}
      data-testid={props['data-testid'] + '-radar-chart'}
    />
  );
}

RadarChart.propTypes = {
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

export default RadarChart;
