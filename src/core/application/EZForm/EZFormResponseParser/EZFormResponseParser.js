/*
 * File: /src/core/application/EZForm/EZFormResponseParser/EZFormResponseParser.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Parser that converts EZForm question data to question responses
 * File Created: Tuesday, 27th April 2021 5:07 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 20th August 2021 2:19 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import { getQuestionConfig } from '../config/questionTypes';

/**
 * EZForm question response parser
 *
 * @class EZFormResponseParser
 */
class EZFormResponseParser {
  /**
   * Gets the response array for an EZForm
   *
   * @param {*} ezformData - EZForm data object
   * @returns {*} Array of EZForm question responses
   * @memberof EZFormResponseParser
   */
  getResponseDataForEZForm(ezformData) {
    let data = [];
    for (let page of ezformData.pages) {
      for (let question of page.questions) {
        let values = this.getResponseValuesFromQuestion(question);
        for (var value of values) {
          data.push(value);
        }
      }
    }
    return data;
  }

  /**
   * Gets the current value(s) for a question to send as a response to the backend
   *
   * @param {*} question Question object
   * @returns {*} Array of values
   * @memberof EZForm
   */
  getResponseValuesFromQuestion(question) {
    const { type, dataType } = question;
    const questionConfig = getQuestionConfig(type, dataType.code);
    return questionConfig.getResponse(question);
  }
}

export default EZFormResponseParser;
