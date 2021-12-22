/*
 * File: /src/core/application/EZForm/Charts/PolarAreaChart/PolarAreaChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Polar Area Chart component using react-chartjs-2
 * File Created: Wednesday, 8th December 2021 11:43 am
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 22nd December 2021 3:04 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

/**
 * PolarArea chart component
 * @param {*} props props passed from parent component
 * @returns {*} PolarArea chart component
 */
function PolarAreaChart(props) {
  return (
    <PolarArea
      options={{ ...props.options, scales: {} }}
      data={props.data}
      data-testid={props['data-testid'] + '-polar-area-chart'}
    />
  );
}

PolarAreaChart.propTypes = {
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
    }),
    scales: PropTypes.shape({
      y: PropTypes.shape({
        title: PropTypes.shape({
          display: PropTypes.bool,
          text: PropTypes.string
        })
      }),
      x: PropTypes.shape({
        title: PropTypes.shape({
          display: PropTypes.bool,
          text: PropTypes.string
        })
      })
    })
  })
};

export default PolarAreaChart;
