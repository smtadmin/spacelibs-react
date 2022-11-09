/*
 * File: /src/core/survey/QuestionBlock/QuestionBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Question Factory Component
 * File Created: Tuesday, 9th February 2021 6:10 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 27th February 2022 2:32 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DateBlock from '../DateBlock';
import RadioBlock from '../RadioBlock';
import CheckBlock from '../CheckBlock';
import SelectBlock from '../SelectBlock';
import TextBlock from '../TextBlock';
import LikertScale from '../QuestionType/LikertScale';
import { getQuestionConfig } from '../config/questionTypes';
import QuestionLabel from '../QuestionLabel';
import { deepEqual } from 'fast-equals';
import { withTheme } from '@material-ui/core/styles';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';

// const QuestionBox = styled.div`
//   padding-top: 1em;
//   padding-left: 2em;
//   border: 0.1em solid #f0f0f0;
//   border-left: 0.5em solid white;
//   box-shadow: 0.1em 0.2em 0.1em grey, inset 0.3em 0 0 0 #034e77;
//   border-radius: 0.5em;
// `;

// const ThemedQuestionBox = withStyles((theme) => ({
//   root: { backgroundColor: theme.palette.primary.light }
// }))(QuestionBox);

/**
 * Question Factory
 */
class QuestionBlock extends React.Component {
  /**
   * Returns a component for the given params
   *
   * @param {*} type Question
   * @param {*} dataType Type of data the question accepts
   * @param {*} optionCount How many options a question has
   * @returns {*} React component to render
   * @memberof QuestionBlock
   */
  getComponent(type, dataType, optionCount) {
    const componentMap = this.getComponentMap(optionCount);
    const componentFunc = componentMap[type];

    if (!componentFunc) {
      console.error(
        'Component Factory does not support (Type=' +
          type +
          ', DataType=' +
          dataType +
          ')'
      );
      return null;
    }

    let Component = componentFunc(dataType);
    return <Component {...this.props} />;
  }

  /**
   * Method to get a map of block components;
   *
   * @param {*} optionCount Amount of options, if any
   * @returns {*} Map of Block components
   * @memberof QuestionBlock
   */
  getComponentMap(optionCount) {
    let threshold = 4;

    let dictionary = {};
    dictionary['MULTI'] =
      optionCount <= threshold
        ? this.getShortMulti.bind(this)
        : this.getLongComponent.bind(this);
    dictionary['CHOICE'] =
      optionCount <= threshold
        ? this.getShortChoice.bind(this)
        : this.getLongComponent.bind(this);
    dictionary['ENTRY'] = this.getEntryComponent.bind(this);
    dictionary['LIKERT_SCALE'] = this.getLikertComponent.bind(this);
    return dictionary;
  }

  /**
   * Gets a component for an ENTRY type question
   *
   * @param {*} dataType DataType of question
   * @returns {*} ___Block Component
   * @memberof QuestionBlock
   */
  getEntryComponent(dataType) {
    let dictionary = {};
    dictionary['DATE'] = DateBlock;
    dictionary['TEXT'] = TextBlock;
    dictionary['EMAIL'] = TextBlock;
    dictionary['PHONE'] = TextBlock;
    dictionary['NUMBER'] = TextBlock;
    dictionary['DOUBLE'] = TextBlock;
    return dictionary[dataType];
  }

  /**
   * Gets a Likert Scale Component
   *
   * @returns {*} Likert Scale object
   * @memberof QuestionBlock
   */
  getLikertComponent() {
    return LikertScale;
  }

  /**
   * Gets a component for a Choice type question with less than 5 options
   *
   * @param {*} dataType DataType of question
   * @returns {*} ___Block Component
   * @memberof QuestionBlock
   */
  getShortChoice(dataType) {
    let dictionary = {};
    dictionary['TEXT'] = RadioBlock;
    dictionary['NUMBER'] = RadioBlock;
    return dictionary[dataType];
  }

  /**
   * Gets a component for a MULTI type question with less than 5 options
   *
   * @param {*} dataType DataType of question
   * @returns {*} ___Block Component
   * @memberof QuestionBlock
   */
  getShortMulti(dataType) {
    let dictionary = {};
    dictionary['TEXT'] = CheckBlock;
    dictionary['NUMBER'] = CheckBlock;
    return dictionary[dataType];
  }

  /**
   * Gets a component for a Choice type question with more than 4 options
   *
   * @param {*} dataType DataType of question
   * @returns {*} ___Block Component
   * @memberof QuestionBlock
   */
  getLongComponent(dataType) {
    let dictionary = {};
    dictionary['TEXT'] = SelectBlock;
    dictionary['NUMBER'] = SelectBlock;
    return dictionary[dataType];
  }

  /**
   * Render Question Block
   *
   * @returns {*} - Rendered component
   * @memberof QuestionBlock
  /**
   *
   *
   * @return {*} 
   * @memberof QuestionBlock
   */
  render() {
    const type = this.props.type;
    const dataType = this.props.dataType.code;
    const { label, ...rest } = this.props;

    let questionProps = rest;
    questionProps.config = {
      options: this.props.options
    };
    delete questionProps.options;

    const questionConfig = getQuestionConfig(type, dataType);
    return (
      <div className={'question-block-wrapper pt-3 pl-1'}>
        <div
          css={css`
            padding-top: 1em;
            padding-left: 2em;
            border: 0.1em solid ${this.props.theme.palette.secondary.main};
            border-left: 0.5em solid ${this.props.theme.palette.secondary.main};
            box-shadow: 0.1em 0.2em 0.1em
                ${this.props.theme.palette.secondary.main},
              inset 0.2em 0 0 0 ${this.props.theme.palette.primary.main};
            border-radius: 0.5em;
          `}
        >
          <QuestionLabel
            label={label}
            helperText={this.props.helperText}
            required={this.props.required}
            number={this.props.number}
          />

          <div className='pt-2'>
            {questionConfig.getComponent(questionProps)}
          </div>
        </div>
      </div>
    );
  }
}

QuestionBlock.defaultProps = {
  variant: 'standard',
  required: false
};

QuestionBlock.propTypes = {
  value: PropTypes.any,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  config: PropTypes.any,
  identifier: PropTypes.string.isRequired,
  number: PropTypes.number,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.oneOf(['ENTRY', 'CHOICE', 'MULTI', 'LIKERT_SCALE'])
    .isRequired,
  dataType: PropTypes.shape({
    code: PropTypes.oneOf([
      'DATE',
      'EMAIL',
      'TEXT',
      'PHONE',
      'NUMBER',
      'DOUBLE'
    ]).isRequired,
    isMultiple: PropTypes.bool
  }),
  placeholder: PropTypes.string,
  isAlternateResponseAllowed: PropTypes.bool,
  // Choice details
  maxCount: PropTypes.number, // Also used by Text
  alternateResponseAllowed: PropTypes.bool,

  // Date
  minDate: PropTypes.string,
  maxDate: PropTypes.string,

  // Text
  textType: PropTypes.string,
  matchesPattern: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      displayText: PropTypes.string.isRequired,
      helperText: PropTypes.string,
      isSelected: PropTypes.bool,
      isDisabled: PropTypes.bool
    })
  ),
  onValueChanged: PropTypes.func.isRequired
};

const areEqual = (prevProps, nextProps) => deepEqual(prevProps, nextProps);

export default withTheme(React.memo(QuestionBlock, areEqual));
