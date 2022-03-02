/*
 * File: /src/core/survey/QuestionLabel/QuestionLabel.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Question Label component
 * File Created: Wednesday, 10th February 2021 11:08 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 1st March 2022 7:00 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../../input/Tooltip';
import { useTheme } from '@material-ui/core/styles';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';

/**
 * QuestionLabel Component
 *
 * @param {*} props - Component props
 * @returns {*} Component
 */
function QuestionLabel(props) {
  const theme = useTheme();
  /**
   * Returns the number label
   *
   * @returns {*} Number String
   */
  function getNumber() {
    if (props.number == null) return null;
    else return props.number + '.';
  }

  return (
    <div
      className={'question-label'}
      css={css`
        font-size: 1.2em;
      `}
    >
      {getNumber()} {props.label}{' '}
      {props.required && (
        <span
          css={css`
            color: ${theme.palette.error.main};
          `}
        >
          *
        </span>
      )}{' '}
      <Tooltip text={props.helperText} />
    </div>
  );
}

QuestionLabel.defaultProps = {
  required: false
};

QuestionLabel.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool
};

export default QuestionLabel;
