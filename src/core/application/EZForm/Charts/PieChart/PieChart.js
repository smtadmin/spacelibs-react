/*
 * File: /src/core/application/EZForm/Charts/PieChart/PieChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: Pie chart component using react-chartjs-2
 * File Created: Monday, 6th December 2021 5:09 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 29th December 2021 11:23 am
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Pie chart component
 * @param {*} props props passed from parent component
 * @returns {*} Pie chart component
 */
function PieChart(props) {
  return (
    <Pie
      ref={props.forwardedRef}
      options={{ ...props.options, scales: {} }}
      data={props.data}
      data-testid={props['data-testid'] + '-pie-chart'}
    />
  );
}

PieChart.propTypes = {
  forwardedRef: PropTypes.object,
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

export default PieChart;
