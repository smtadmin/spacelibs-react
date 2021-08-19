/* eslint-disable react/display-name */
/*
 * File: /src/core/application/EZForm/QuestionType/QuestionType.js
 * Version: 1.0.30
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Thursday, 5th August 2021 10:32 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 10th August 2021 4:07 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';

/* Components */
import DateField from '../../../input/DateField';
import LikertScale from './LikertScale';
import RadioBlock from '../RadioBlock';
import SelectBlock from '../SelectBlock';

/* Icons */
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import DateBlock from '../DateBlock';
import CheckboxGroup from '../../../input/CheckboxGroup';

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

export const getQuestionConfig = (type, dataType) => {
  return questionTypes[getQuestionType(type, dataType)];
};

const types = {
  text: {
    identifier: 'TEXT',
    label: 'Text'
  },
  number: {
    identifier: 'NUMBER',
    label: 'Number'
  },
  date: {
    identifier: 'DATE',
    label: 'Date'
  }
};

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
      defaultType: types.text,
      availableTypes: [types.text],
      validate: (params) => {}
    },
    getComponent: (params) =>
      params.config?.options?.length <= OPTION_THRESHOLD ? (
        <RadioBlock {...params} />
      ) : (
        <SelectBlock {...params} />
      )
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
      defaultType: types.text,
      availableTypes: [types.text]
    },
    getComponent: (params) =>
      params.config?.options?.length <= OPTION_THRESHOLD ? (
        <CheckboxGroup {...params} />
      ) : (
        <SelectBlock {...params} />
      )
  },
  DATE: {
    type: 'ENTRY',
    dropdown: {
      label: 'Date',
      icon: EventOutlinedIcon
    },
    validation: {
      defaultType: types.date,
      availableTypes: [types.date]
    },
    previewComponent: <DateField isDisabled label={'Month, Day, Year'} />,
    getComponent: (params) => <DateBlock {...params} />
  },
  LIKERT_SCALE: {
    type: 'LIKERT_SCALE',
    dropdown: {
      label: 'Likert Scale',
      icon: LinearScaleIcon
    },
    validation: {
      defaultType: types.number,
      availableTypes: [types.number]
    },
    previewComponent: <LikertScale isDisabled />,
    getComponent: (params) => {
      return <LikertScale {...params} />;
    }
  }
};
