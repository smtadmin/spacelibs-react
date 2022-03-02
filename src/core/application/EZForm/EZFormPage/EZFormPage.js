/*
 * File: EZFormPage
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Formatter for the EZForm page wrapper
 * File Created: Friday, 19th February 2021 2:05 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 2nd March 2022 11:53 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
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
      className='form-page-wrapper'
      css={css`
        color: ${theme.palette.text.primary};
      `}
    >
      <div
        className='ezform-title'
        css={css`
          color: ${theme.palette.text.primary};
        `}
      >
        {props.formName}
      </div>
      <h2 data-testid='page-title' className='form-header'>
        {props.title}
      </h2>
      <p data-testid='page-desc' className='form-description'>
        {props.description}
      </p>
      <p className='required-page-header'>
        Required{' '}
        <span
          css={css`
            color: ${theme.palette.error.main};
          `}
        >
          *
        </span>
      </p>
      <div data-testid='question-list'>
        {props.questions &&
          props.questions.map((question) => (
            <QuestionBlock
              key={question.identifier}
              onValueChanged={(value) =>
                props.onValueChanged(question.identifier, value)
              }
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
  onValueChanged: PropTypes.func,
  formName: PropTypes.string
};

export default EZFormPage;
