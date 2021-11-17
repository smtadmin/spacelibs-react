/*
 * File: /src/core/application/EZForm/EZFormValidator/EZFormValidator.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Module to validate different parts of an EZForm form
 * File Created: Tuesday, 27th April 2021 4:30 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 20th August 2021 2:20 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import { getQuestionConfig } from '../config/questionTypes';

/**
 * This is the EZForm Validator class
 *
 * @class EZFormValidator
 */
export default class EZFormValidator {
  /**
   * This validates an EZForm Page and returns the validated page with errors
   *
   * @param {*} page - Page object
   * @returns {*} Validated page and any errors
   * @memberof EZFormValidator
   */
  validatePage(page) {
    let errors = [];
    for (let question of page.questions) {
      const validateObject = this.validateQuestion(question);
      if (!validateObject.isValid) {
        let label = question.number ? question.number + '. ' : '';
        errors.push(label + '"' + question.label + '"');
      }

      question.isValid = validateObject.isValid;
      question.errorMessage = validateObject.errorMessage;
    }
    return {
      validatedPage: page,
      errors: errors,
      hasErrors: errors.length > 0
    };
  }

  /**
   * Method to get an aggregated list of errors
   *
   * @param {*} errors error-ing questions
   * @returns {*} String message for errors
   */
  getErrorMessageForErrors(errors) {
    if (errors.length === 0) {
      return null;
    }
    if (errors.length === 1) {
      return errors[0];
    } else {
      let output = '';
      for (let error of errors) {
        output += error + ', ';
      }
      return output.slice(0, -2);
    }
  }

  /**
   *Validates that the required questions were answered and all of the input values are valid
   *
   * @param {*} question - The question to validate
   * @returns {*} - Object with boolean isValid and an error if the validation returns false
   * @memberof EZForm
   */
  validateQuestion(question) {
    const { type, dataType } = question;
    const configObject = getQuestionConfig(type, dataType.code);
    return configObject.validation.validate(question);
  }
}
