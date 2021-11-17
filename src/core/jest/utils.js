/*
 * File: /src/jest/helpers.js
 * Version: 0.0.1
 * Project: ezform-webapp
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 18th August 2021 9:18 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 19th August 2021 3:36 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const mocks = {
  getLastCallArguments: (mockedFunction) => {
    const allCalls = mockedFunction.mock.calls;
    return allCalls[allCalls.length - 1];
  }
};

export const inputs = {
  select: {
    selectValue: (optionList, dataTestIdPrefix, options) => {
      if (!Array.isArray(optionList)) {
        optionList = [optionList];
      }

      const caseSensitive = options?.caseSensitive ?? true;
      const containsText = options?.containsText ?? false;

      const prefix = dataTestIdPrefix;

      // Create list of all options
      userEvent.click(screen.getByTestId(`${prefix}-select-input`));
      let allOptions = [];
      screen.queryAllByTestId(`${prefix}-select-option`).forEach((val) => {
        allOptions.push(val.textContent);
      });

      // Try find optionList options
      let missing = [];
      for (let option of optionList) {
        userEvent.type(screen.getByTestId(`${prefix}-select-input`), option);

        const all = screen.queryAllByTestId(`${prefix}-select-option`);
        let found = false;
        for (let element of all) {
          const optionText = element.textContent;
          const optionAltered = caseSensitive
            ? optionText
            : optionText.toLowerCase();
          const inputAltered = caseSensitive ? option : option.toLowerCase();

          if (
            (containsText && optionAltered.includes(inputAltered)) ||
            optionAltered === inputAltered
          ) {
            userEvent.click(element);
            found = true;
            break;
          }
        }

        if (!found) {
          missing.push(option);
        }
      }

      if (missing.length > 0) {
        throw Error(getErrorMessage(missing, allOptions));
      }
    }
  }
};

/**
 * Get ErrorMessage the shows the missing options and the full list of available options
 *
 * @param {*} missingList Missing options
 * @param {*} allList Full list of options
 * @returns {*} Error Message
 */
function getErrorMessage(missingList, allList) {
  let mList = [];
  let fullList = [];
  allList.map((val) => fullList.push(`"${val}"`));
  missingList.map((val) => mList.push(`"${val}"`));

  return `Couldn't find [${mList}] in the following options [${fullList}]`;
}
