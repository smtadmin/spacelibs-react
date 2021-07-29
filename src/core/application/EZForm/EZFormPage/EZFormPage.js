/*
 * File: EZFormPage
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Formatter for the EZForm page wrapper
 * File Created: Friday, 19th February 2021 2:05 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 29th July 2021 4:23 pm
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';

/**
 * Formatter for the EZForm page wrapper
 *
 * @param {*} props Component props
 * @returns {*} Component
 */
function EZFormPage(props) {
  const theme = useTheme();
  return (
    <div
      className="form-page-wrapper"
      css={css`
        color: ${theme.palette.text.primary};
      `}>
      <h2 data-testid="page-title" className="form-header">
        {props.title}
      </h2>
      <p data-testid="page-desc" className="form-description">
        {props.description}
      </p>
      <p className="required-page-header">
        Required <span style={{ color: 'red' }}>*</span>
      </p>
      <div data-testid="question-list">
        {props.questions &&
          props.questions.map((question) => (
            <QuestionBlock
              key={question.identifier}
              onValueChanged={props.onValueChanged}
              {...question}
            />
          ))}
      </div>
    </div>
  );
}

EZFormPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string,
  formTitle: PropTypes.string,
  description: PropTypes.string,
  onValueChanged: PropTypes.func
};

export default EZFormPage;
