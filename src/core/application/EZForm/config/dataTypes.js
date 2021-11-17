/*
 * File: /src/core/application/EZForm/config/dataTypes.js
 * Version: 1.0.31
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 16th August 2021 1:49 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 16th August 2021 2:25 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import moment from 'moment';

const requiredError = {
  isValid: false,
  errorMessage: 'This field is required'
};

export default {
  text: {
    identifier: 'TEXT',
    label: 'Text',
    validate: (value, isRequired) => {
      const hasValue = value != null && value.length > 0;
      if (isRequired) {
        if (hasValue) {
          return { isValid: true, errorMessage: '' };
        } else {
          return requiredError;
        }
      } else {
        return { isValid: true, errorMessage: '' };
      }
    }
  },
  number: {
    identifier: 'NUMBER',
    label: 'Number',
    validate: (value, isRequired) => {
      const validNumber = value && !isNaN(value);
      if (isRequired) {
        if (validNumber && value.length > 0) {
          return { isValid: true, errorMessage: '' };
        } else if (value && value.length > 0) {
          return {
            isValid: false,
            errorMessage: 'This field expects a number'
          };
        } else {
          return requiredError;
        }
      } else {
        if (validNumber || value == null || value.length === 0) {
          return { isValid: true, errorMessage: '' };
        } else {
          return {
            isValid: false,
            errorMessage: 'This field expects a number'
          };
        }
      }
    }
  },
  date: {
    identifier: 'DATE',
    label: 'Date',
    validate: (value, isRequired) => {
      const validDate = value && moment(value, 'MM/DD/YYYY').isValid();

      if (isRequired) {
        if (validDate) {
          return { isValid: true, errorMessage: '' };
        } else if (!value || value.length === 0) {
          return requiredError;
        } else {
          return { isValid: false, errorMessage: '' };
        }
      } else {
        if (validDate || value == null || value.length === 0) {
          return { isValid: true, errorMessage: '' };
        } else {
          return { isValid: false, errorMessage: '' };
        }
      }
    }
  }
};
