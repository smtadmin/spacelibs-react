/* eslint-disable react/display-name */
/*
 * File: /src/core/application/EZForm/config/questionTypes.js
 * Version: 1.0.31
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 16th August 2021 1:48 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 23rd August 2021 9:47 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';

/* Components */
import DateField from '../../../input/DateField';
import LikertScale from '../QuestionType/LikertScale';
import RadioBlock from '../RadioBlock';
import SelectBlock from '../SelectBlock';
import ErrorQuestionWrapper from '../ErrorQuestionWrapper';

/* Icons */
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import DateBlock from '../DateBlock';
import CheckBlock from '../CheckBlock';

/* SMT */
import dataTypes from './dataTypes';

/* Gets the Question Type */
export const getQuestionType = (type, dataType) => {
  for (let key in questionTypes) {
    const object = questionTypes[key];
    if (object.type === type) {
      for (let dt of object.validation.availableTypes) {
        if (dt.identifier === dataType) {
          return key;
        }
      }
    }
  }
};

/* Gets the Question Config */
export const getQuestionConfig = (type, dataType) => {
  const configType = getQuestionType(type, dataType);
  if (!configType)
    throw Error(
      `Couldn't find a config type for {type: ${type}, dataType: ${dataType}}`
    );

  return questionTypes[configType];
};

const response = {
  entry: (question) => {
    if (question.value == null || question.value.length === 0) {
      return [];
    }

    return [
      {
        question: question.identifier,
        questionGroupId: question.groupIdentifier,
        value: question.value[0]
      }
    ];
  },
  multi: (question) => {
    let values = [];
    for (let option of question.value) {
      const value =
        question.altResponseId === option.identifier
          ? option.value
          : option.displayText;
      values.push({
        question: question.identifier,
        questionGroupId: question.groupIdentifier,
        value: value
      });
    }
    return values;
  },
  choice: (question) => {
    if (!Array.isArray(question.value)) question.value = [question.value];

    if (question.value == null || question.value.length === 0) return [];
    const value =
      question.altResponseId === question.value[0].identifier
        ? question.value[0].value
        : question.value[0].displayText;

    return [
      {
        question: question.identifier,
        questionGroupId: question.groupIdentifier,
        value: value
      }
    ];
  }
};

/* Gets Validation Object */
const validation = {
  choice: (data) => {
    const hasValues =
      data.value != null &&
      ((Array.isArray(data.value) && data.value.length > 0) ||
        !Array.isArray(data.value));
    let value;
    if (hasValues) {
      if (!Array.isArray(data.value)) {
        value =
          data.altResponseId === data.value.identifier
            ? data.value.value
            : data.value.displayText;
      } else {
        value =
          data.altResponseId === data.value[0].identifier
            ? data.value[0].value
            : data.value[0].displayText;
      }
    }

    const dataType = dataTypes[data.dataType.code.toLowerCase()];
    return dataType.validate(value, data.required);
  },
  entry: (data) => {
    const hasValues = data.value != null && data.value.length;
    const value = hasValues ? data.value[0] : null;
    const dataType = dataTypes[data.dataType.code.toLowerCase()];
    return dataType.validate(value, data.required);
  },
  multi: (data) => {
    let values = data.value;
    let altId = data.altResponseId;

    for (let option of values) {
      const value =
        option.identifier === altId ? option.value : option.displayText;
      const dataType = dataTypes[data.dataType.code.toLowerCase()];
      let error = dataType.validate(value, data.required);
      if (!error.isValid) {
        return error;
      }
    }

    if (data.required && values.length === 0) {
      return {
        isValid: false,
        errorMessage: 'This field is required'
      };
    }

    return { isValid: true, errorMessage: '' };
  }
};

/* Add Question Types here */
const OPTION_THRESHOLD = 4;
export const questionTypes = {
  CHOICE: {
    type: 'CHOICE',
    dropdown: {
      label: 'Choice',
      icon: RadioButtonCheckedIcon
    },
    options: {
      icon: RadioButtonUncheckedIcon
    },
    validation: {
      defaultType: dataTypes.text,
      availableTypes: [dataTypes.text, dataTypes.number],
      validate: validation.choice
    },
    getComponent: (params) =>
      params.config?.options?.length <= OPTION_THRESHOLD ? (
        <RadioBlock {...params} />
      ) : (
        <SelectBlock {...params} />
      ),
    getResponse: response.choice
  },
  MULTI: {
    type: 'MULTI',
    dropdown: {
      label: 'Multiple Choice',
      icon: CheckBoxIcon
    },
    options: {
      icon: CheckBoxOutlineBlankIcon
    },
    validation: {
      defaultType: dataTypes.text,
      availableTypes: [dataTypes.text, dataTypes.number],
      validate: validation.multi
    },
    getComponent: (params) =>
      params.config?.options?.length <= OPTION_THRESHOLD ? (
        <CheckBlock {...params} />
      ) : (
        <SelectBlock {...params} />
      ),
    getResponse: response.multi
  },
  DATE: {
    type: 'ENTRY',
    dropdown: {
      label: 'Date',
      icon: EventOutlinedIcon
    },
    validation: {
      defaultType: dataTypes.date,
      availableTypes: [dataTypes.date],
      validate: validation.entry
    },
    previewComponent: <DateField isDisabled label={'Month, Day, Year'} />,
    getComponent: (params) => <DateBlock {...params} />,
    getResponse: response.entry
  },
  LIKERT_SCALE: {
    type: 'LIKERT_SCALE',
    dropdown: {
      label: 'Likert Scale',
      icon: LinearScaleIcon
    },
    validation: {
      defaultType: dataTypes.number,
      availableTypes: [dataTypes.number],
      validate: validation.choice
    },
    previewComponent: <LikertScale isDisabled />,
    getComponent: (params) => {
      const { errorMessage, ...rest } = params;
      return (
        <ErrorQuestionWrapper errorMessage={errorMessage}>
          <LikertScale {...rest} />
        </ErrorQuestionWrapper>
      );
    },
    getResponse: response.choice
  }
};
