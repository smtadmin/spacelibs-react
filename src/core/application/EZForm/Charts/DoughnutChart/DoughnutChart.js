/*
 * File: /src/core/application/EZForm/Charts/DoughnutChart/DoughnutChart.js
 * Version: 1.0.44
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 8th December 2021 1:53 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 1:54 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Doughnut chart component
 * @param {*} props props passed from parent component
 * @returns {*} Doughnut chart component
 */
function DoughnutChart(props) {
  return (
    <Doughnut
      options={props.options}
      data={props.data}
      data-testid={props['data-testid'] + '-doughnut-chart'}
    />
  );
}

DoughnutChart.propTypes = {
  'data-testid': PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.array,
      backgroundColor: PropTypes.array,
      borderColor: PropTypes.array,
      borderWidth: PropTypes.number
    })
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

export default DoughnutChart;
