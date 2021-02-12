/*
 * File: CheckboxGroup.test
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Testing suite for the CheckboxGroup functionality
 * File Created: Thursday, 11th February 2021 9:55 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 2:12 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import {
  render,
  screen
} from "@testing-library/react";
import CheckboxGroup from "./CheckboxGroup";
import userEvent from '@testing-library/user-event';

const singleOptionNoValues = {
  alignment: "horizontal",
  number: 1,
  identifier: "1",
  type: "date",
  label: "Date Action Completed",
  isRequired: true,
  value: [],
  onValueChanged: () => { },
  config: {
    options: [
      {
        identifier: "A",
        displayText: "Option A",
        isSelected: undefined,
        isDisabled: undefined,
      }
    ],
  },
};

const twoOptionsOneSelectedValue = {
  number: 1,
  identifier: "1",
  type: "date",
  label: "Date Action Completed",
  isRequired: true,
  value: [
    {
      identifier: "B",
      displayText: "Option B",
      isDisabled: false,
    },
  ],
  onValueChanged: () => {},
  subText: "Error occurred",
  config: {
    options: [
      {
        identifier: "A",
        displayText: "Option A",
        isSelected: undefined,
        isDisabled: undefined,
      },
      {
        identifier: "B",
        displayText: "Option B",
        isDisabled: false,
      },
    ],
  },
};

const configWithUndefinedOptionValues = {
  number: 1,
  identifier: "1",
  type: "date",
  label: "Date Action Completed",
  isRequired: true,
  value: [
  ],
  onValueChanged: () => { },
  subText: "Error occurred",
  config: {
    options: [
      {
        identifier: "A",
        displayText: "Option A",
        isSelected: undefined,
        isDisabled: undefined,
      },
      {
        identifier: "B",
        displayText: "Option B",
        isDisabled: false,
      },
    ],
  },
};

/**
 * CheckboxGroup smoke test
 */
it("Renders without crashing", () => {
  const element = render(<CheckboxGroup {...twoOptionsOneSelectedValue} value={[]} />);
  expect(element).toBeTruthy();
});

/**
 * It renders a single values in the checkbox correctly
 */
it("Renders with single value", () => {
  const element = render(<CheckboxGroup {...singleOptionNoValues} />);
  expect(element).toMatchSnapshot();
});

/**
 * It renders multiple values in the checkbox correctly
 */
it("Renders with values", () => {
  const element = render(<CheckboxGroup {...twoOptionsOneSelectedValue} />);
  expect(element).toMatchSnapshot();
});

/**
 * It renders out a checkbox with the label in the correct place when the labelPlacement prop is set to left
 */
it("Renders correctly when labelPlacement is set to left", () => {
  const element = render(<CheckboxGroup {...singleOptionNoValues} labelPlacement="left" />);
  expect(element).toMatchSnapshot();
});

/**
 * It renders out a checkbox with the label in the correct place when the labelPlacement prop is set to top
 */
it("Renders correctly when labelPlacement is set to the top position", () => {  const element = render(<CheckboxGroup {...singleOptionNoValues} labelPlacement="top" />);
  expect(element).toMatchSnapshot();
});

/**
 * It correctly fires the callback when a user input is detected
 */
it("updates the correct field when a checkbox is selected", () => {
  const mockedFunction = jest.fn();  render(<CheckboxGroup {...configWithUndefinedOptionValues} onValueChanged={mockedFunction} />);
  const element = screen.getAllByTestId('checkbox')[0];
  const input = element.children[0].children[0];
  userEvent.click(input);
  expect(mockedFunction).toHaveBeenCalled();
});
